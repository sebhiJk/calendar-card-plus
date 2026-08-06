import { html, TemplateResult } from 'lit';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig, CalendarEvent } from './types';

let currentOffsetDays = 0;

export interface EventGroup {
    date: Date;
    events: CalendarEvent[];
    calendar_name?: string;
}

// -------------------------------------------------------------------
// EXPORTIERTE HILFSFUNKTIONEN FÜR DAS DETAIL-POPUP (popup-dialog.ts)
// -------------------------------------------------------------------
export function _resolveColor(item: any, _config?: any, ..._rest: any[]): string {
    if (item && item.color) return item.color;
    return 'var(--primary-color, #03a9f4)';
}

export function _renderDynamicIcon(item: any, _config?: any, ..._rest: any[]): TemplateResult {
    const icon = (item && item.icon) ? item.icon : 'mdi:calendar';
    return html`<ha-icon .icon=${icon}></ha-icon>`;
}

export function _resolveBackgroundColor(_item?: any, _config?: any, ..._rest: any[]): string {
    return 'var(--card-background-color, #1c1c1e)';
}

export function _formatDuration(_hass: any, start: any, end: any, isAllDay: boolean): string {
    if (isAllDay) return 'Ganztägig';
    const s = new Date(start);
    const e = new Date(end);
    return `${s.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${e.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
}

export function _formatLocalizedDuration(_hass: any, diffMins: number): string {
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
// HAUPT RENDER FUNKTIONEN FÜR DIE KARTE
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
                ${Object.keys(groupedByDay).map(dayStr => {
                    const dayDate = new Date(dayStr);
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
            <button class="nav-btn" @click=${(e: Event) => _navigate(e, -7)} title="Vorherige Woche">
                <ha-icon icon="mdi:chevron-left" style="--mdc-icon-size: 28px;"></ha-icon>
            </button>

            <div style="display: flex; flex-direction: column; align-items: center;">
                <div class="calendar-header-title">${config.title || 'Kalender'}</div>
                <div class="calendar-header-week">${startStr} - ${endStr}</div>
            </div>

            <button class="nav-btn" @click=${(e: Event) => _navigate(e, 7)} title="Nächste Woche">
                <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 28px;"></ha-icon>
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
    const monthStr = dayDate.toLocaleDateString(hass.language || 'de', { month: 'short' }).toUpperCase();
    const dayNum = dayDate.getDate();
    
    const weekdayStr = dayDate.toLocaleDateString(hass.language || 'de', { weekday: 'long' });
    const realEvents = events.filter(ev => !ev.is_empty);

    return html`
        <div class="day-container">
            <!-- Kalender Icon (Monat/Tag) -->
            <div class="calendar-date-icon">
                <div class="month">${monthStr}</div>
                <div class="day">${dayNum}</div>
            </div>

            <!-- Tagesinhalt -->
            <div class="day-content">
                <div class="day-header-info">
                    <span class="day-title">${weekdayStr}</span>
                    <button class="add-event-btn" @click=${(e: Event) => _handleAddEventForDay(e, dayDate, config)}>
                        <ha-icon icon="mdi:plus-circle-outline" style="--mdc-icon-size: 24px;"></ha-icon>
                    </button>
                </div>

                ${realEvents.length === 0 
                    ? html`<div class="no-events-text">Keine Termine</div>` 
                    : realEvents.map(ev => _renderEventBubble(ev, config))
                }
            </div>
        </div>
    `;
}

function _renderEventBubble(ev: CalendarEvent, config: CalendarCardPlusConfig): TemplateResult {
    const color = _resolveColor(ev, config);
    
    return html`
        <div class="event-bubble" style="border-left-color: ${color};" @click=${(e: Event) => _handleEventClick(e, ev)}>
            <div class="event-time">${_formatEventTime(ev)}</div>
            <div class="event-title">${ev.summary}</div>
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

function _handleAddEventForDay(e: Event, dayDate: Date, config?: CalendarCardPlusConfig) {
    e.stopPropagation();

    // Standardmäßig auf 08:00 Uhr am angewählten Tag setzen
    const startDate = new Date(dayDate);
    startDate.setHours(8, 0, 0, 0);

    const endDate = new Date(dayDate);
    endDate.setHours(9, 0, 0, 0);

    let entityId = config?.entity;
    if (!entityId && config?.entities && Array.isArray(config.entities) && config.entities.length > 0) {
        entityId = typeof config.entities[0] === 'string' ? config.entities[0] : config.entities[0].entity;
    }

    const target = e.currentTarget as HTMLElement;

    // Öffnet den nativen HA Event Editor
    target.dispatchEvent(
        new CustomEvent('show-dialog', {
            bubbles: true,
            composed: true,
            detail: {
                dialogTag: 'ha-dialog-calendar-event-editor',
                dialogImport: () => Promise.resolve(), 
                dialogParams: {
                    selectedDate: startDate,
                    startDate: startDate,
                    endDate: endDate,
                    calendarId: entityId,
                    entityId: entityId,
                },
            },
        })
    );
}

function _groupEventsByDay(events: CalendarEvent[]): Record<string, CalendarEvent[]> {
    const grouped: Record<string, CalendarEvent[]> = {};
    events.forEach(ev => {
        const dateStr = ev.start.date || ev.start.dateTime;
        if (!dateStr) return;
        const key = new Date(dateStr).toDateString();
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
        const end = ev.end.dateTime ? new Date(ev.end.dateTime) : null;
        
        const startStr = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (end) {
            const endStr = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `${startStr} - ${endStr}`;
        }
        return startStr;
    }
    return '';
}