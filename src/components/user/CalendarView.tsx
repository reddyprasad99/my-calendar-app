import { Box } from "@mui/material";
import { format, getDay, parse, startOfWeek } from "date-fns";
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import { filterNotifications } from "utils/date";

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

function CalendarView() {
  const companies = useSelector((state: any) => state.company.companies);
  const communications = useSelector((state: any) => state.communication.communications); // Assuming you have a communication slice

  const filteredNotifications = filterNotifications(companies, communications);

  const events = filteredNotifications
    .map((company: any) => {
      // Find the next scheduled communication date
      const nextCommunicationDate = company.nextScheduledCommunication;

      if (nextCommunicationDate) {
        return {
          title: `Scheduled Communication: ${company.name}`,
          start: new Date(nextCommunicationDate), // Set the scheduled date
          end: new Date(nextCommunicationDate), // End date is the same for one-day event
        };
      }
      return null;
    })
    .filter((event: any) => event !== null); // Remove any null entries if no date exists

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
