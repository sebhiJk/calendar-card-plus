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
    }

    public disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('calendar-card-show-detail', this._handleShowDetail as unknown as EventListener);
        this.removeEventListener('calendar-card-range-changed', this._handleRangeChanged as unknown as EventListener);
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

        // Standard: Heute bis Heute + 7 Tage (verhindert das Laden von 23 alten Tagen)
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
        events.forEach(e => {
            const dStr = e.start.date || e.start.dateTime;
            if (dStr) {
                const d = new Date(dStr);
                dayMap.add(d.toISOString().split('T')[0]);
            }
        });

        const current = new Date(start);
        current.setHours(0, 0, 0, 0);
        const last = new Date(end);
        last.setHours(0, 0, 0, 0);

        while (current <= last) {
            const key = current.toISOString().split('T')[0];
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

        return result.sort((a: CalendarEvent, b: CalendarEvent) => {
            const dateA = new Date(a.start.dateTime || a.start.date!).getTime();
            const dateB = new Date(b.start.dateTime || b.start.date!).getTime();
            return dateA - dateB;
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

        // Berechne Start/Ende für den Header
        const displayStart = this._customStart || new Date();
        const displayEnd = this._customEnd || new Date(displayStart.getTime() + 6 * 86400000);

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
            .calendar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
                padding-bottom: 8px;
                border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.1));
            }
            .calendar-header-title {
                font-size: 1.2em;
                font-weight: 500;
                color: var(--primary-text-color);
            }
            .calendar-header-week {
                font-size: 0.9em;
                color: var(--secondary-text-color);
                margin-top: 4px;
                text-align: center;
            }
            .nav-btn {
                background: none;
                border: none;
                color: var(--primary-text-color);
                cursor: pointer;
                padding: 4px;
                border-radius: 50%;
                transition: background-color 0.2s;
            }
            .nav-btn:hover {
                background-color: var(--secondary-background-color);
            }
            
            .day-container {
                display: flex;
                gap: 16px;
                padding: 12px 0;
                border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.05));
            }
            .day-container:last-child {
                border-bottom: none;
            }
            
            .calendar-date-icon {
                display: flex;
                flex-direction: column;
                width: 44px;
                height: 48px;
                border-radius: 8px;
                background-color: var(--card-background-color, #fff);
                box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                overflow: hidden;
                text-align: center;
                flex-shrink: 0;
                border: 1px solid var(--divider-color, rgba(255,255,255,0.1));
            }
            .calendar-date-icon .month {
                background-color: #f44336;
                color: white;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                padding: 2px 0;
                line-height: 1.2;
            }
            .calendar-date-icon .day {
                font-size: 20px;
                font-weight: bold;
                color: var(--primary-text-color);
                line-height: 28px;
                background-color: var(--card-background-color);
            }
            
            .day-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .day-header-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 6px;
            }
            .day-title {
                font-size: 16px;
                font-weight: 600;
                color: var(--primary-text-color);
            }
            .add-event-btn {
                background: none;
                border: none;
                color: var(--secondary-text-color);
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            .add-event-btn:hover {
                color: var(--primary-color);
                background-color: var(--secondary-background-color);
            }
            
            .event-bubble {
                background-color: var(--secondary-background-color, rgba(120, 120, 120, 0.1));
                border-radius: 6px;
                padding: 8px 12px;
                margin-bottom: 6px;
                cursor: pointer;
                transition: background-color 0.2s, transform 0.1s;
                border-left: 4px solid var(--primary-color);
                display: flex;
                flex-direction: column;
            }
            .event-bubble:hover {
                background-color: var(--divider-color, rgba(120, 120, 120, 0.2));
            }
            .event-bubble:last-child {
                margin-bottom: 0;
            }
            .event-time {
                font-size: 12px;
                color: var(--secondary-text-color);
                margin-bottom: 2px;
                font-weight: 500;
            }
            .event-title {
                font-size: 15px;
                font-weight: 500;
                color: var(--primary-text-color);
            }
            .no-events-text {
                font-size: 14px;
                color: var(--secondary-text-color);
                font-style: italic;
                padding: 4px 0;
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