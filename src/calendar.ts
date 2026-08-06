import { html, TemplateResult } from 'lit';
import { HomeAssistant } from './ha/types';
import { CalendarCardPlusConfig, CalendarEvent } from './types';

let currentOffsetDays = 0;

export interface EventGroup {
    date: Date;
    events: CalendarEvent[];
    calendar_name?: string;
}

// Hilfsfunktionen für popup-dialog.ts mit flexibler Parameter-Anzahl
export function _resolveColor(_item?: any, _config?: any, ..._rest: any[]): string {
    return 'var(--primary-color, #03a9f4)';
}

export function _renderDynamicIcon(_item?: any, _config?: any, ..._rest: any[]): TemplateResult {
    return html`<ha-icon icon="mdi:calendar"></ha-icon>`;
}

export function _resolveBackgroundColor(_item?: any, _config?: any, ..._rest: any[]): string {
    return 'var(--card-background-color, #1c1c1e)';
}

export function _formatDuration(..._args: any[]): string {
    return '';
}

export function _formatLocalizedDuration(..._args: any[]): string {
    return '';
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

// Haupt-Renderfunktion der Karte
export function renderCalendar(
    hass: HomeAssistant,
    events: CalendarEvent[] | undefined,
    config: CalendarCardPlusConfig
): TemplateResult {
    if (!events) {
        return html`<div style="padding: 16px; text-align: center;">Lade Termine...</div>`;
    }

    const groupedByDay = _groupEventsByDay(events);

    return html`
        <div class="calendar-container" style="padding: 12px;">
            ${_renderHeader(hass, config)}
            <div class="calendar-days-list" style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
                ${Object.keys(groupedByDay).map(dayStr => {
                    const dayDate = new Date(dayStr);
                    const dayEvents = groupedByDay[dayStr];
                    return _renderDayBubble(hass, dayDate, dayEvents, config);
                })}
            </div>
        </div>
    `;
}

function _renderHeader(_hass: HomeAssistant, config: CalendarCardPlusConfig): TemplateResult {
    return html`
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <button 
                @click=${(e: Event) => _navigate(e, -7)} 
                style="background: none; border: none; cursor: pointer; color: var(--primary-text-color);"
                title="Vorherige Woche"
            >
                <ha-icon icon="mdi:chevron-left" style="--mdc-icon-size: 28px;"></ha-icon>
            </button>

            <span style="font-weight: bold; font-size: 1.1em; color: var(--primary-text-color);">
                ${config.title || 'Kalender'}
            </span>

            <button 
                @click=${(e: Event) => _navigate(e, 7)} 
                style="background: none; border: none; cursor: pointer; color: var(--primary-text-color);"
                title="Nächste Woche"
            >
                <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 28px;"></ha-icon>
            </button>
        </div>
    `;
}

function _navigate(e: Event, offset: number) {
    currentOffsetDays += offset;

    const start = new Date();
    start.setDate(start.getDate() + currentOffsetDays - 7);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setDate(end.getDate() + currentOffsetDays + 14);
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

function _renderDayBubble(
    hass: HomeAssistant, 
    dayDate: Date, 
    events: CalendarEvent[], 
    config: CalendarCardPlusConfig
): TemplateResult {
    const formattedDate = dayDate.toLocaleDateString(hass.language || 'de', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit'
    });

    const isToday = new Date().toDateString() === dayDate.toDateString();
    const borderColor = isToday ? 'var(--primary-color, #03a9f4)' : 'var(--divider-color, rgba(255,255,255,0.12))';

    return html`
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border: 1px solid ${borderColor}; border-radius: 12px; background: var(--card-background-color, #1c1c1e);">
            <div style="display: flex; flex-direction: column; flex: 1;">
                <span style="font-weight: 600; font-size: 0.95em; color: var(--primary-text-color); margin-bottom: 4px;">
                    ${formattedDate}
                </span>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    ${events.filter(ev => !ev.is_empty).length === 0 
                        ? html`<span style="font-size: 0.85em; color: var(--secondary-text-color);">Keine Termine</span>` 
                        : events.filter(ev => !ev.is_empty).map(ev => html`
                            <div style="font-size: 0.85em; color: var(--primary-text-color); display: flex; gap: 6px;">
                                <span style="color: var(--secondary-text-color);">${_formatEventTime(ev)}</span>
                                <span>${ev.summary}</span>
                            </div>
                          `)
                    }
                </div>
            </div>

            <button 
                @click=${(e: Event) => _handleAddEventForDay(e, dayDate, config)}
                style="background: none; border: none; color: var(--secondary-text-color); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
                title="Termin für diesen Tag hinzufügen"
            >
                <ha-icon icon="mdi:plus-circle-outline" style="--mdc-icon-size: 28px; color: ${borderColor};"></ha-icon>
            </button>
        </div>
    `;
}

function _handleAddEventForDay(e: Event, dayDate: Date, config?: CalendarCardPlusConfig) {
    e.stopPropagation();

    const startDate = new Date(dayDate);
    startDate.setHours(9, 0, 0, 0);

    const endDate = new Date(dayDate);
    endDate.setHours(10, 0, 0, 0);

    let entityId = config?.entity;
    if (!entityId && config?.entities && Array.isArray(config.entities) && config.entities.length > 0) {
        entityId = typeof config.entities[0] === 'string' ? config.entities[0] : config.entities[0].entity;
    }

    const target = e.target as HTMLElement;

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
        const d = new Date(ev.start.dateTime);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return '';
}