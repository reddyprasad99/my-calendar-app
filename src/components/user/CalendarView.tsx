import { Box } from "@mui/material";
import { format, getDay, parse, startOfWeek } from "date-fns";
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Email to ABC Corp",
    start: new Date(2024, 11, 25),
    end: new Date(2024, 11, 25),
  },
  {
    title: "Phone Call with XYZ Ltd",
    start: new Date(2024, 11, 28),
    end: new Date(2024, 11, 28),
  },
];

function CalendarView() {
  return (
    <Box>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Box>
  );
}

export default CalendarView;
