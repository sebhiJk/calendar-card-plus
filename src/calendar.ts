import { html, TemplateResult } from "lit";
import { CalendarEvent, CalendarCardPlusConfig } from "./types";
import { HomeAssistant } from "./ha/types";
import { localize } from "./localize";

let currentWeekOffset = 0;

const DEFAULT_DAY_COLORS = [
  "#2196F3", // Montag (Blau)
  "#8BC34A", // Dienstag (Grün)
  "#E91E63", // Mittwoch (Pink)
  "#FF9800", // Donnerstag (Orange)
  "#00BCD4", // Freitag (Türkis)
  "#9C27B0", // Samstag (Violett)
  "#F44336"  // Sonntag (Rot)
];

export function renderCalendar(
  hass: HomeAssistant,
  events: CalendarEvent[] | undefined,
  config?: CalendarCardPlusConfig,
): TemplateResult {
  const lang = hass.locale?.language || hass.language || navigator.language;
  const dayColors = config?.day_colors || DEFAULT_DAY_COLORS;

  // 1. Berechnung der Woche (Montag bis Sonntag)
  const now = new Date();
  const dayOfWeek = now.getDay();
  const distToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(now);
  monday.setDate(now.getDate() + distToMonday + currentWeekOffset * 7);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const startStr = monday.toLocaleDateString(lang, { day: "2-digit", month: "2-digit" });
  const endStr = sunday.toLocaleDateString(lang, { day: "2-digit", month: "2-digit", year: "numeric" });
  const weekRangeTitle = `${startStr} - ${endStr}`;

  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDays.push(d);
  }

  // Navigation Event-Handler
  const handlePrev = (e: Event) => {
    currentWeekOffset -= 1;
    _notifyWeekChange(e, monday, sunday);
  };

  const handleNext = (e: Event) => {
    currentWeekOffset += 1;
    _notifyWeekChange(e, monday, sunday);
  };

  const handleToday = (e: Event) => {
    currentWeekOffset = 0;
    _notifyWeekChange(e, monday, sunday);
  };

  return html`
    <div class="calendar-container" style="display: flex; flex-direction: column; gap: 8px;">
      <!-- Wochen-Header mit Navigation -->
      <div 
        class="calendar-header" 
        style="display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; margin-bottom: 4px;"
      >
        <button 
          @click=${handlePrev} 
          style="background: none; border: none; color: var(--primary-text-color); cursor: pointer; display: flex; align-items: center; padding: 4px;"
          title="Vorherige Woche"
        >
          <ha-icon icon="mdi:chevron-left" style="--mdc-icon-size: 32px;"></ha-icon>
        </button>

        <span 
          @click=${handleToday}
          style="font-size: 1.35em; font-weight: bold; color: var(--primary-text-color); cursor: pointer;"
          title="Zur aktuellen Woche"
        >
          ${weekRangeTitle}
        </span>

        <button 
          @click=${handleNext} 
          style="background: none; border: none; color: var(--primary-text-color); cursor: pointer; display: flex; align-items: center; padding: 4px;"
          title="Nächste Woche"
        >
          <ha-icon icon="mdi:chevron-right" style="--mdc-icon-size: 32px;"></ha-icon>
        </button>
      </div>

      <!-- 7 Tages-Bubbles -->
      ${weekDays.map((dayDate, dayIdx) => {
        const borderColor = dayColors[dayIdx % dayColors.length];
        const dayStart = new Date(dayDate);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dayDate);
        dayEnd.setHours(23, 59, 59, 999);

        // Filter für Termine an diesem Tag
        const dayEvents = (events || []).filter((evt) => {
          if (evt.is_empty) return false;
          const eStart = new Date(evt.start.dateTime || evt.start.date!);
          const eEnd = new Date(evt.end.dateTime || evt.end.date!);
          return eStart <= dayEnd && eEnd >= dayStart;
        });

        const dynamicIcon = _renderDynamicIcon(
          hass,
          dayDate,
          borderColor,
          config?.dark_mode ?? false,
          true
        );

        return html`
          <div 
            class="day-bubble"
            style="border: 2px solid ${borderColor}; border-radius: 14px; padding: 12px 16px; background: var(--ha-card-background, var(--card-background-color, #1c1c1e)); display: flex; gap: 16px; align-items: center; justify-content: space-between;"
          >
            <!-- Tages-Icon links -->
            <div class="calendar-icon dynamic" style="width: 58px; height: 58px; flex-shrink: 0;">
              ${dynamicIcon}
            </div>

            <!-- Termine in der Mitte -->
            <div class="calendar-content" style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
              ${dayEvents.length === 0
                ? html`
                    <div style="color: var(--secondary-text-color); font-size: 1.15em; font-style: italic;">
                      ${localize(hass, "no_events")}
                    </div>
                  `
                : dayEvents.map((evt) => {
                    const title = evt.summary;
                    const start = new Date(evt.start.dateTime || evt.start.date!);
                    const end = new Date(evt.end.dateTime || evt.end.date!);
                    const isAllDay = !evt.start.dateTime;
                    const formatTime = (d: Date) => d.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });
                    const timeText = isAllDay
                      ? (hass.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "Ganztägig")
                      : `${formatTime(start)} - ${formatTime(end)}`;

                    return html`
                      <div 
                        class="event-entry"
                        @click=${(e: Event) => _handleCalendarClick(e, evt.entity_id)}
                        style="cursor: pointer; padding-bottom: 4px;"
                      >
                        <div class="event-title" style="font-size: 1.3em; font-weight: bold; color: var(--primary-text-color);">
                          ${title}
                        </div>
                        <div class="event-time" style="display: flex; align-items: center; gap: 8px; font-size: 1.1em; color: var(--secondary-text-color); margin-top: 2px;">
                          <ha-icon icon="mdi:clock-outline" style="--mdc-icon-size: 20px;"></ha-icon>
                          ${timeText}
                        </div>
                        ${evt.location
                          ? html`
                              <div class="event-location" style="display: flex; align-items: center; gap: 8px; font-size: 1.05em; color: var(--secondary-text-color); margin-top: 2px;">
                                <ha-icon icon="mdi:map-marker" style="--mdc-icon-size: 20px;"></ha-icon>
                                ${evt.location}
                              </div>
                            `
                          : ""}
                      </div>
                    `;
                  })}
            </div>

            <!-- Plus-Button ganz rechts -->
            <button 
              @click=${(e: Event) => _handleAddEventForDay(e, dayDate)}
              style="background: none; border: none; color: var(--secondary-text-color); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
              title="Termin für diesen Tag hinzufügen"
            >
              <ha-icon icon="mdi:plus-circle-outline" style="--mdc-icon-size: 32px; color: ${borderColor};"></ha-icon>
            </button>
          </div>
        `;
      })}
    </div>
  `;
}

function _notifyWeekChange(e: Event, start: Date, end: Date) {
  const target = e.target as HTMLElement;
  
  // Event abfeuern, damit die Haupt-Karte weiß, dass sich das Zeitfenster geändert hat (für vergangenen/zukünftigen Fetch)
  target.dispatchEvent(
    new CustomEvent("calendar-card-range-changed", {
      bubbles: true,
      composed: true,
      detail: { start, end, offset: currentWeekOffset }
    })
  );

  const host = (target.closest("ha-card") || target.getRootNode()) as any;
  if (host && typeof host.requestUpdate === "function") {
    host.requestUpdate();
  } else {
    target.dispatchEvent(new CustomEvent("ll-rebuild", { bubbles: true, composed: true }));
  }
}

function _handleAddEventForDay(e: Event, _date: Date) {
  e.stopPropagation();
  const event = new CustomEvent("hass-more-info", {
    bubbles: true,
    composed: true,
    detail: { entityId: "calendar" }, // Öffnet den Home Assistant Kalender-Dialog
  });
  const target = e.target as HTMLElement;
  target.dispatchEvent(event);
}

export function _resolveColor(entityId: string, config?: CalendarCardPlusConfig): string {
  const color = config?.calendar_colors?.[entityId] || config?.calendar_icon_color || "#fa3e3e";
  return _toCssColor(color);
}

export function _resolveBackgroundColor(entityId: string, config?: CalendarCardPlusConfig): string {
  const color = config?.calendar_background_colors?.[entityId] || config?.background_color || "";
  return color ? _toCssColor(color) : "";
}

export function _toCssColor(color: string): string {
  if (color.startsWith("#") || color.startsWith("rgb") || color.startsWith("hsl") || color.startsWith("var")) {
    return color;
  }
  return `var(--${color}-color)`;
}

export function _handleCompactClick(e: Event, hass: HomeAssistant, events: CalendarEvent[]) {
  const event = new CustomEvent("calendar-card-show-detail", {
    bubbles: true,
    composed: true,
    detail: { title: localize(hass, "popup_upcoming_events"), entities: events },
  });
  const target = e.target as HTMLElement;
  target.dispatchEvent(event);
}

function _handleCalendarClick(e: Event, entityId: string) {
  const event = new CustomEvent("hass-more-info", {
    bubbles: true,
    composed: true,
    detail: { entityId },
  });
  const target = e.target as HTMLElement;
  target.dispatchEvent(event);
}

export function _groupEventsByDate(events: CalendarEvent[]): { date: Date; events: CalendarEvent[] }[] {
  const groups: { [key: string]: { date: Date; events: CalendarEvent[] } } = {};
  events.forEach((event) => {
    const startDate = new Date(event.start.dateTime || event.start.date!);
    const dateKey = startDate.toISOString().split("T")[0];
    if (!groups[dateKey]) groups[dateKey] = { date: startDate, events: [] };
    groups[dateKey].events.push(event);
  });
  return Object.values(groups).sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function _groupEventsByDateAndCalendar(events: CalendarEvent[]) {
  const groups: { [key: string]: { date: Date; calendar: string; events: CalendarEvent[] } } = {};
  events.forEach((event) => {
    const startDate = new Date(event.start.dateTime || event.start.date!);
    const dateKey = startDate.toISOString().split("T")[0];
    const calendarKey = event.calendar_name || event.entity_id;
    const groupKey = `${dateKey}|${calendarKey}`;
    if (!groups[groupKey]) groups[groupKey] = { date: startDate, calendar: calendarKey, events: [] };
    groups[groupKey].events.push(event);
  });
  return Object.values(groups).sort((a, b) => {
    const dateCompare = a.date.getTime() - b.date.getTime();
    if (dateCompare !== 0) return dateCompare;
    return a.calendar.localeCompare(b.calendar);
  });
}

export function _renderDynamicIcon(
  hass: HomeAssistant,
  date: Date,
  color: string,
  darkMode: boolean = false,
  iconShowWeekday: boolean = false,
): TemplateResult {
  const lang = hass.locale?.language || hass.language || navigator.language;
  let topText: string;
  if (iconShowWeekday) {
    topText = date.toLocaleDateString(lang, { weekday: "short" }).toUpperCase();
  } else {
    topText = date.toLocaleDateString(lang, { month: "short" }).toUpperCase();
  }
  const day = date.getDate();

  const bgColor = darkMode ? "#222222" : "white";
  const dayColor = darkMode ? "white" : "#333";
  const monthColor = darkMode ? "#222222" : "white";

  return html`
    <svg viewBox="0 0 100 100" class="dynamic-calendar-icon" style="width: 100%; height: 100%; display: block;">
      <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="${bgColor}"></rect>
      <path d="M0 20 C0 8 8 0 20 0 L80 0 C92 0 100 8 100 20 L100 30 L0 30 Z" fill="${color}"></path>
      <text x="50" y="23" font-family="sans-serif" font-size="22" font-weight="bold" fill="${monthColor}" text-anchor="middle">${topText}</text>
      <text x="50" y="82" font-family="sans-serif" font-size="52" font-weight="bold" fill="${dayColor}" text-anchor="middle">${day}</text>
    </svg>
  `;
}

export function _formatDuration(hass: HomeAssistant, start: Date, end: Date, isAllDay: boolean): string {
  const diffMs = end.getTime() - start.getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (isAllDay && diffMins === 1440) {
    return hass.localize("component.calendar.entity_component._.state_attributes.all_day.name") || "All day";
  }
  if (diffMins < 60) return `${diffMins} ${localize(hass, "duration_min")}`;
  const days = Math.floor(diffMins / 1440);
  const remainingAfterDays = diffMins % 1440;
  const hours = Math.floor(remainingAfterDays / 60);
  const mins = remainingAfterDays % 60;
  const parts: string[] = [];
  if (days >= 1) parts.push(`${days} ${localize(hass, days === 1 ? "duration_day" : "duration_days")}`);
  if (hours > 0) parts.push(`${hours} ${localize(hass, "duration_hour")}`);
  if (mins > 0) parts.push(`${mins} ${localize(hass, "duration_min")}`);
  return parts.join(" ");
}

export function _formatLocalizedDuration(hass: HomeAssistant, minutes: number): string {
  if (minutes < 60) {
    if (minutes === 1) return localize(hass, "starts_in_min", "{x}", minutes.toString());
    return localize(hass, "starts_in_mins", "{x}", minutes.toString());
  }
  if (minutes < 1440) {
    const hours = Math.round(minutes / 60);
    if (hours === 1) return localize(hass, "starts_in_hour", "{x}", hours.toString());
    return localize(hass, "starts_in_hours", "{x}", hours.toString());
  }
  if (minutes < 43200) {
    const days = Math.round(minutes / 1440);
    if (days === 1) return localize(hass, "starts_in_day", "{x}", days.toString());
    return localize(hass, "starts_in_days", "{x}", days.toString());
  }
  const weeks = Math.round(minutes / 10080);
  if (weeks === 1) return localize(hass, "starts_in_week", "{x}", weeks.toString());
  return localize(hass, "starts_in_weeks", "{x}", weeks.toString());
}