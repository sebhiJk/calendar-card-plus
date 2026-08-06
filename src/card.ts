import { fetchCalendarEvents } from './ha/data/calendar';
import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig, CalendarEvent } from './types';
import { renderCalendar } from './calendar';
import './popup-dialog';

export const DEFAULT_DAY_COLORS = [
    "#2196F3", // Montag (Blau)
    "#8BC34A", // Dienstag (Grün)
    "#E91E63", // Mittwoch (Pink)
    "#FF9800", // Donnerstag (Orange)
    "#00BCD4", // Freitag (Türkis)
    "#9C27B0", // Samstag (Violett)
    "#F44336"  // Sonntag (Rot)
];

export function getDayColor(date: Date): string {
    const day = date.getDay(); // 0 = Sonntag, 1 = Montag, etc.
    const index = day === 0 ? 6 : day - 1;
    return DEFAULT_DAY_COLORS[index];
}

@customElement('calendar-card-plus')
export class CalendarCardPlus extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private config!: CalendarCardPlusConfig;
    @state() private _events: CalendarEvent[] | undefined = undefined;
    @state() private _customStart?: Date;
    @state() private _customEnd?: Date;

    // --- State für das Detail-Popup ---
    @state() private _showDetailPopup = false;
    @state() private _detailPopupTitle = '';
    @state() private _detailPopupEvents: CalendarEvent[] = [];

    private _handleRangeChanged = (e: CustomEvent) => {
        this._customStart = e.detail.start;
        this._customEnd = e.detail.end;
        this._fetchEvents();
    };

    private _handleShowDetail = (e: CustomEvent) => {
        e.stopPropagation();
        this._detailPopupTitle = e.detail.title || 'Termine';
        this._detailPopupEvents = e.detail.entities || [];
        this._showDetailPopup = true;
    };

    private _handleAddEvent = (e: CustomEvent) => {
        e.stopPropagation();
        const targetCalendar = e.detail.calendarId;
        const selectedDate = e.detail.selectedDate;

        const popup = this.shadowRoot?.querySelector('calendar-card-popup-dialog') as any;
        if (popup && typeof popup.showAddDialog === 'function') {
            popup.showAddDialog({
                calendarId: targetCalendar,
                selectedDate: selectedDate
            });
        }
    };

    private _onEventSaved = () => {
        this._events = undefined;
        this.requestUpdate();
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

        const toLocalKey = (d: Date) => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };
        const localStartStr = toLocalKey(start);
        const localEndStr = toLocalKey(end);

        const validEvents = allEvents.filter(ev => {
            let evDateStr = "";
            if (ev.start.date) {
                evDateStr = ev.start.date;
            } else if (ev.start.dateTime) {
                evDateStr = toLocalKey(new Date(ev.start.dateTime));
            }
            return evDateStr >= localStartStr && evDateStr <= localEndStr;
        });

        if (this.config.show_empty_days) {
            this._events = this._injectEmptyDays(validEvents, start, end);
        } else {
            this._events = validEvents;
        }
        this.requestUpdate();
    }

    private _injectEmptyDays(events: CalendarEvent[], start: Date, end: Date): CalendarEvent[] {
        const result: CalendarEvent[] = [...events];
        const dayMap = new Set<string>();
        
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

    protected render(): TemplateResult {
        if (!this.config || !this.hass) {
            return html``;
        }

        const displayStart = this._customStart || new Date();
        const displayEnd = this._customEnd || new Date(displayStart.getTime() + 7 * 86400000);

        const content = renderCalendar(this.hass, this._events, this.config, displayStart, displayEnd);

        return html`
            <ha-card
                @calendar-card-show-detail=${this._handleShowDetail}
                @calendar-card-range-changed=${this._handleRangeChanged}
                @calendar-card-add-event=${this._handleAddEvent}
            >
                ${content}

                <!-- Direktes Rendern des Popups innerhalb der Karte, wenn ausgelöst -->
                ${this._showDetailPopup ? html`
                    <calendar-card-plus-popup
                        .hass=${this.hass}
                        .config=${this.config}
                        .opener=${this}
                        .mode=${'detail'}
                        .title=${this._detailPopupTitle}
                        .events=${this._detailPopupEvents}
                        .onEventSaved=${this._onEventSaved}
                        @closed=${() => { this._showDetailPopup = false; }}
                    ></calendar-card-plus-popup>
                ` : ''}
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
                position: relative;
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

            .calendar-days-list {
                display: flex;
                flex-direction: column;
                background-color: var(--card-background-color, #1c1c1e);
                border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
                border-radius: var(--ha-card-border-radius, 12px);
                overflow: hidden;
            }
            .day-bubble {
                display: grid;
                grid-template-columns: 100px 1fr 40px;
                align-items: center;
                gap: 12px;
                border: none;
                border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.08));
                padding: 12px 16px;
                background-color: transparent;
            }
            .day-bubble:nth-child(odd) {
                background-color: rgba(255, 255, 255, 0.03);
            }
            .day-bubble:nth-child(even) {
                background-color: transparent;
            }
            .day-bubble.today {
                background-color: rgba(3, 169, 244, 0.08) !important;
            }
            .day-bubble:last-child {
                border-bottom: none;
            }
            .day-column-left {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 6px;
                border-right: 1px solid var(--divider-color, rgba(255,255,255,0.08));
                padding-right: 12px;
            }
            .calendar-date-icon {
                display: flex;
                flex-direction: column;
                width: 38px;
                height: 40px;
                border-radius: 6px;
                background-color: #fff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
                text-align: center;
                border: 1px solid rgba(0,0,0,0.1);
                flex-shrink: 0;
            }
            .calendar-date-icon .month {
                color: white;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                padding: 2px 0;
                line-height: 1.1;
            }
            .calendar-date-icon .day {
                font-size: 18px;
                font-weight: bold;
                color: #333;
                background-color: #fff;
                line-height: 24px;
            }
            .weekday-name {
                font-size: 0.75em;
                color: var(--secondary-text-color);
                font-weight: 500;
                text-align: center;
                white-space: nowrap;
            }
            .day-column-middle {
                display: flex;
                flex-direction: column;
                gap: 6px;
                min-width: 0;
            }
            .day-column-right {
                display: flex;
                justify-content: center;
                align-items: center;
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
                transition: background-color 0.2s, color 0.2s;
            }
            .add-event-btn:hover {
                color: var(--primary-color);
                background-color: rgba(120, 120, 120, 0.1);
            }
            .add-event-btn ha-icon {
                --mdc-icon-size: 24px;
            }
            .event-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                cursor: pointer;
            }
            .event-time {
                shadow: none;
                font-size: 0.85em;
                color: var(--secondary-text-color);
                min-width: 60px;
                white-space: nowrap;
            }
            .event-title {
                font-size: 0.9em;
                color: var(--primary-text-color);
                word-break: break-word;
            }
            .no-events {
                font-size: 0.85em;
                color: var(--secondary-text-color);
                font-style: italic;
            }
        `;
    }

    public getCardSize(): number {
        return 4;
    }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'calendar-card-plus',
    name: 'Dynamic Calendar Card Plus',
    preview: true,
    description: 'A standalone calendar card with dynamic grid styling',
});