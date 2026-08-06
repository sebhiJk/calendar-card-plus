import { html, TemplateResult } from 'lit';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig, CalendarEvent } from './types';
import { getDayColor } from './card';

let currentOffsetDays = 0;

export interface EventGroup {
    date: Date;
    events: CalendarEvent[];
    calendar_name?: string;
}

// -------------------------------------------------------------------
// HILFSFUNKTIONEN FÜR POPUP & DARSTELLUNG
// -------------------------------------------------------------------
export function _resolveColor(item: any, _config?: any, ..._rest: any[]): string {
    if (item && item.color) return item.color;
    return 'var(--primary-color, #03a9f4)';
}

export function _renderDynamicIcon(item: any, _config?: any, ..._rest: any[]): TemplateResult {
    let d = new Date();
    if (item && (item.start?.date || item.start?.dateTime)) {
        d = new Date(item.start.date || item.start.dateTime);
    }
    const dayColor = getDayColor(d);
    const monthStr = d.toLocaleDateString('de', { month: 'short' }).toUpperCase().replace('.', '');
    const dayNum = d.getDate();

    return html`
        <div style="display: inline-flex; flex-direction: column; width: 36px; height: 38px; border-radius: 6px; background-color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; text-align: center; border: 1px solid rgba(0,0,0,0.1); flex-shrink: 0; line-height: 1;">
            <div style="background-color: ${dayColor}; color: white; font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 0;">${monthStr}</div>
            <div style="font-size: 16px; font-weight: bold; color: #333; padding-top: 2px; background-color: #fff;">${dayNum}</div>
        </div>
    `;
}

export function _resolveBackgroundColor(_item?: any, _config?: any, ..._rest: any[]): string {
    return 'var(--card-background-color, #1c1c1e)';
}

export function _formatDuration(_hass: HomeAssistant, start: any, end: any, isAllDay: boolean): string {
    if (isAllDay) return 'Ganztägig';
    const s = new Date(start);
    const e = new Date(end);
    return `${s.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${e.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
}

export function _formatLocalizedDuration(_hass: HomeAssistant, diffMins: number): string {
    const h = Math.floor(diffMins / 60);
    const m = Math.floor(diffMins % 60);
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
}

export function _groupEventsByDate(events: CalendarEvent[]): EventGroup[] {
    const grouped: Record<string, EventGroup> = {};
    (events || []).forEach((ev: CalendarEvent) => {
        const dateStr = ev.start.date || ev.start.dateTime;
        if (!dateStr) return;
        const d = new Date(dateStr);
        const key = d.toDateString();
        if (!grouped[key]) {
            grouped[key] = { date: d, events: [] };
        }
        grouped[key].events.push(ev);
    });
    return Object.values(grouped);
}

export function _groupEventsByDateAndCalendar(events: CalendarEvent[]): EventGroup[] {
    return _groupEventsByDate(events);
}

// -------------------------------------------------------------------
// HAUPT RENDER FUNKTIONEN
// -------------------------------------------------------------------
export function renderCalendar(
    hass: HomeAssistant,
    events: CalendarEvent[] | undefined,
    config: CalendarCardPlusConfig,
    displayStart: Date,
    displayEnd: Date
): TemplateResult {
    if (!events) {
        return html`<div style="padding: 16px; text-align: center;">Lade Termine...</div>`;
    }

    const groupedByDay = _groupEventsByDay(events);

    return html`
        <div class="calendar-container">
            ${_renderHeader(hass, config, displayStart, displayEnd)}
            
            <div class="calendar-days-list">
                ${Object.keys(groupedByDay).sort().map(dayStr => {
                    const [y, m, d] = dayStr.split('-').map(Number);
                    const dayDate = new Date(y, m - 1, d);
                    const dayEvents = groupedByDay[dayStr];
                    return _renderDayRow(hass, dayDate, dayEvents, config);
                })}
            </div>
        </div>
    `;
}

function _renderHeader(
    hass: HomeAssistant, 
    config: CalendarCardPlusConfig, 
    start: Date, 
    end: Date
): TemplateResult {
    const startStr = start.toLocaleDateString(hass.language || 'de', { day: '2-digit', month: '2-digit' });
    const endStr = end.toLocaleDateString(hass.language || 'de', { day: '2-digit', month: '2-digit' });

    return html`
        <div class="calendar-header">
            <button class="nav-btn" @click=${(e: Event) => _navigate(e, -7)}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>

            <div class="calendar-header-title">
                ${config.title || 'Kalender'}
                <div class="calendar-header-week">${startStr} - ${endStr}</div>
            </div>

            <button class="nav-btn" @click=${(e: Event) => _navigate(e, 7)}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
        </div>
    `;
}

function _navigate(e: Event, offsetDays: number) {
    currentOffsetDays += offsetDays;

    const start = new Date();
    start.setDate(start.getDate() + currentOffsetDays);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    end.setHours(23, 59, 59, 999);

    const target = e.currentTarget as HTMLElement;
    target.dispatchEvent(
        new CustomEvent('calendar-card-range-changed', {
            bubbles: true,
            composed: true,
            detail: { start, end }
        })
    );
}

function _renderDayRow(
    hass: HomeAssistant, 
    dayDate: Date, 
    events: CalendarEvent[], 
    config: CalendarCardPlusConfig
): TemplateResult {
    const dayColor = getDayColor(dayDate);
    const weekdayFull = dayDate.toLocaleDateString(hass.language || 'de', { weekday: 'long' });

    const monthStr = dayDate.toLocaleDateString(hass.language || 'de', { month: 'short' }).toUpperCase().replace('.', '');
    const dayNum = dayDate.getDate();

    const isToday = new Date().toDateString() === dayDate.toDateString();
    const realEvents = events.filter((ev: CalendarEvent) => !ev.is_empty);

    return html`
        <div class="day-bubble ${isToday ? 'today' : ''}" style="border-left: 4px solid ${dayColor};">
            <div class="day-column-left">
                <div class="calendar-date-icon">
                    <div class="month" style="background-color: ${dayColor};">${monthStr}</div>
                    <div class="day">${dayNum}</div>
                </div>
                <div class="weekday-name">${weekdayFull}</div>
            </div>

            <div class="day-column-middle">
                ${realEvents.length === 0 
                    ? html`<div class="no-events">Keine Termine</div>`
                    : realEvents.map((ev: CalendarEvent) => html`
                        <div class="event-item" @click=${(e: Event) => _handleEventClick(e, ev)}>
                            <span class="event-time">${_formatEventTime(ev)}</span>
                            <span class="event-title">${ev.summary}</span>
                        </div>
                    `)
                }
            </div>

            <div class="day-column-right">
                <button class="add-event-btn" @click=${(e: Event) => _handleAddEventForDay(e, dayDate, hass, config)}>
                    <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
                </button>
            </div>
        </div>
    `;
}

function _handleEventClick(e: Event, ev: CalendarEvent) {
    e.stopPropagation();
    const target = e.currentTarget as HTMLElement;
    target.dispatchEvent(
        new CustomEvent('calendar-card-show-detail', {
            bubbles: true,
            composed: true,
            detail: {
                entities: [ev],
                title: ev.summary
            }
        })
    );
}

function _handleAddEventForDay(e: Event, dayDate: Date, hass: HomeAssistant, config?: CalendarCardPlusConfig) {
    e.stopPropagation();

    const startDate = new Date(dayDate);
    startDate.setHours(8, 0, 0, 0);

    let entityId = config?.entity;
    if (!entityId && config?.entities && Array.isArray(config.entities) && config.entities.length > 0) {
        entityId = typeof config.entities[0] === 'string' ? config.entities[0] : config.entities[0].entity;
    }
    if (!entityId) {
        const calendars = Object.keys(hass.states || {}).filter(eid => eid.startsWith('calendar.'));
        entityId = calendars.length > 0 ? calendars[0] : '';
    }

    const target = e.currentTarget as HTMLElement;
    target.dispatchEvent(
        new CustomEvent('calendar-card-add-event', {
            bubbles: true,
            composed: true,
            detail: {
                calendarId: entityId,
                selectedDate: startDate,
            }
        })
    );
}

function _groupEventsByDay(events: CalendarEvent[]): Record<string, CalendarEvent[]> {
    const grouped: Record<string, CalendarEvent[]> = {};
    const toLocalKey = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    events.forEach((ev: CalendarEvent) => {
        let key = "";
        if (ev.start.date) {
            key = ev.start.date;
        } else if (ev.start.dateTime) {
            key = toLocalKey(new Date(ev.start.dateTime));
        }
        if (!key) return;

        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(ev);
    });
    return grouped;
}

function _formatEventTime(ev: CalendarEvent): string {
    if (ev.start.date) return 'Ganztägig';
    if (ev.start.dateTime) {
        const start = new Date(ev.start.dateTime);
        return start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return '';
}