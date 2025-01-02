import { Box } from "@mui/material";
import { format, getDay, parse, startOfWeek } from "date-fns";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import { filterGridCommunications } from "utils/date";

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
  const communications = useSelector((state: any) => state.communication.communications);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const filteredNotifications = filterGridCommunications(companies, communications);

    const newEvents: any = filteredNotifications
      .map((company: any) => {
        const nextCommunicationDate = company.nextScheduledCommunication;

        if (nextCommunicationDate) {
          return {
            title: `${company.name}: Scheduled Communication`,
            start: new Date(nextCommunicationDate), // Set the scheduled date
            end: new Date(nextCommunicationDate), // End date is the same for one-day event
          };
        }
        return null;
      })
      .filter((event: any) => event !== null); // Remove any null entries if no date exists

    setEvents(newEvents); 
  }, [companies, communications]);

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
