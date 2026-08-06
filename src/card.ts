import { fetchCalendarEvents } from './ha/data/calendar';
import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig, CalendarEvent } from './types';
import { renderCalendar } from './calendar';
import './popup-dialog';

@customElement('calendar-card-plus')
export class CalendarCardPlus extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private config!: CalendarCardPlusConfig;
    @state() private _events: CalendarEvent[] | undefined = undefined;
    @state() private _customStart?: Date;
    @state() private _customEnd?: Date;

    public connectedCallback() {
        super.connectedCallback();
        this.addEventListener('calendar-card-show-detail', this._handleShowDetail as unknown as EventListener);
        this.addEventListener('calendar-card-range-changed', this._handleRangeChanged as unknown as EventListener);
        this.addEventListener('calendar-card-add-event', this._handleAddEvent as unknown as EventListener);
    }

    public disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('calendar-card-show-detail', this._handleShowDetail as unknown as EventListener);
        this.removeEventListener('calendar-card-range-changed', this._handleRangeChanged as unknown as EventListener);
        this.removeEventListener('calendar-card-add-event', this._handleAddEvent as unknown as EventListener);
    }

    private _handleRangeChanged = (e: CustomEvent) => {
        this._customStart = e.detail.start;
        this._customEnd = e.detail.end;
        this._fetchEvents();
    };

    protected willUpdate(changedProps: Map<string, any>) {
        super.willUpdate(changedProps);
        
        if (this.hass && this.config) {
            if (this._events === undefined || changedProps.has('config')) {
                this._fetchEvents();
            }
        }
    }

    public setConfig(config: CalendarCardPlusConfig): void {
        if (!config) {
            throw new Error('Invalid configuration');
        }
        this.config = config;
    }

    private async _fetchEvents() {
        if (!this.hass || !this.config) return;

        let start = this._customStart;
        if (!start) {
            start = new Date();
            start.setHours(0, 0, 0, 0);
        }

        let end = this._customEnd;
        if (!end) {
            end = new Date(start);
            end.setDate(end.getDate() + 7);
            end.setHours(23, 59, 59, 999);
        }

        const calendars = Object.keys(this.hass.states)
            .filter(eid => eid.startsWith('calendar.'))
            .filter(eid => !this.config.exclude_entities?.includes(eid));

        if (calendars.length === 0) {
            this._events = [];
            return;
        }

        const allEvents = await fetchCalendarEvents(this.hass, start, end, calendars);

        if (this.config.show_empty_days) {
            this._events = this._injectEmptyDays(allEvents, start, end);
        } else {
            this._events = allEvents;
        }
        this.requestUpdate();
    }

    private _injectEmptyDays(events: CalendarEvent[], start: Date, end: Date): CalendarEvent[] {
        const result: CalendarEvent[] = [...events];
        const dayMap = new Set<string>();
        
        // Lokale Umwandlung ohne UTC-Zeitverschiebung (verhindert falschen Tag)
        const toLocalKey = (d: Date) => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };

        events.forEach(e => {
            if (e.start.date) {
                dayMap.add(e.start.date);
            } else if (e.start.dateTime) {
                dayMap.add(toLocalKey(new Date(e.start.dateTime)));
            }
        });

        const current = new Date(start);
        current.setHours(0, 0, 0, 0);
        const last = new Date(end);
        last.setHours(0, 0, 0, 0);

        while (current <= last) {
            const key = toLocalKey(current);
            if (!dayMap.has(key)) {
                result.push({
                    start: { date: key },
                    end: { date: key },
                    summary: 'Keine Termine',
                    is_empty: true,
                    entity_id: 'empty',
                    calendar_name: ''
                });
            }
            current.setDate(current.getDate() + 1);
        }

        return result.sort((a, b) => {
            const getVal = (ev: CalendarEvent) => {
                if (ev.start.dateTime) return new Date(ev.start.dateTime).getTime();
                const [y, m, d] = ev.start.date!.split('-').map(Number);
                return new Date(y, m - 1, d, 0, 0, 0).getTime();
            };
            return getVal(a) - getVal(b);
        });
    }

    private _handleShowDetail = async (e: CustomEvent) => {
        this._showPopup('calendar-card-plus-popup', {
            hass: this.hass,
            config: this.config,
            opener: this,
            mode: 'detail',
            title: e.detail.title,
            events: e.detail.entities
        });
    }

    private _handleAddEvent = (e: CustomEvent) => {
        // Öffnet das standard Home Assistant Pop-up ohne Import-Blocker
        this.dispatchEvent(
            new CustomEvent('show-dialog', {
                bubbles: true,
                composed: true,
                detail: {
                    dialogTag: 'ha-dialog-calendar-event-editor',
                    dialogParams: e.detail
                }
            })
        );
    }

    private _showPopup(dialogTag: string, dialogParams: any): void {
        this.dispatchEvent(
            new CustomEvent('show-dialog', {
                detail: {
                    dialogTag,
                    dialogImport: () => import('./popup-dialog'),
                    dialogParams: {
                        ...dialogParams,
                        onEventSaved: this._onEventSaved
                    },
                },
                bubbles: true,
                composed: true,
            })
        );
    }

    private _onEventSaved = () => {
        this._events = undefined;
        this.requestUpdate();
        this._fetchEvents();
    };

    protected render(): TemplateResult {
        if (!this.config || !this.hass) {
            return html``;
        }

        const displayStart = this._customStart || new Date();
        const displayEnd = this._customEnd || new Date(displayStart.getTime() + 7 * 86400000);

        const content = renderCalendar(this.hass, this._events, this.config, displayStart, displayEnd);

        return html`
            <ha-card>
                ${content}
            </ha-card>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            :host {
                display: block;
            }
            ha-card {
                height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                padding: 16px;
            }
            
            /* --- Header --- */
            .calendar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }
            .calendar-header-title {
                text-align: center;
                font-size: 1.1em;
                font-weight: 500;
                color: var(--primary-text-color);
            }
            .calendar-header-week {
                font-size: 0.85em;
                color: var(--secondary-text-color);
                margin-top: 2px;
            }
            .nav-btn {
                background: none;
                border: none;
                color: var(--primary-text-color);
                cursor: pointer;
                padding: 4px;
                display: flex;
            }
            .nav-btn ha-icon {
                --mdc-icon-size: 24px;
            }

            /* --- Tage (Bubbles) --- */
            .calendar-days-list {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .day-bubble {
                border: 1px solid;
                border-radius: var(--ha-card-border-radius, 12px);
                padding: 12px 16px;
                background-color: var(--card-background-color, #1c1c1e);
                display: flex;
                flex-direction: column;
            }
            .day-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }
            .day-title {
                font-weight: bold;
                font-size: 1.05em;
                color: var(--primary-text-color);
            }
            .add-event-btn {
                background: none;
                border: none;
                color: var(--secondary-text-color);
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .add-event-btn:hover {
                color: var(--primary-color);
            }
            .add-event-btn ha-icon {
                --mdc-icon-size: 24px;
            }

            /* --- Events (Textliste) --- */
            .event-item {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                margin-bottom: 6px;
                cursor: pointer;
            }
            .event-item:last-child {
                margin-bottom: 0;
            }
            .event-time {
                font-size: 0.9em;
                color: var(--secondary-text-color);
                min-width: 65px;
                white-space: nowrap;
            }
            .event-title {
                font-size: 0.9em;
                color: var(--primary-text-color);
                word-break: break-word;
            }
            .no-events {
                font-size: 0.9em;
                color: var(--secondary-text-color);
            }
        `;
    }

    public getCardSize(): number {
        return 4;
    }

    public static async getConfigElement() {
        await import('./editor');
        return document.createElement('calendar-card-plus-editor');
    }

    public static getStubConfig(_hass: HomeAssistant): CalendarCardPlusConfig {
         return {
            type: 'custom:calendar-card-plus',
            exclude_entities: [],
            show_empty_days: true
         };
    }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'calendar-card-plus',
    name: 'Dynamic Calendar Card Plus',
    preview: true,
    description: 'A standalone calendar card with dynamic grid styling',
});