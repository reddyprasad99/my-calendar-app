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
  const communications = useSelector((state: any) => state.communication.communications); // Assuming you have a communication slice
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    console.log("Updated companies or communications:", companies);
    
    // Debugging: Check each company and their nextScheduledCommunication
    companies.forEach((company: any) => {
      console.log(`Company: ${company.name}, Next Communication: ${company.nextScheduledCommunication}`);
    });

    const filteredNotifications = filterGridCommunications(companies, communications);

    const newEvents: any = filteredNotifications
      .map((company: any) => {
        console.log(`Filtering company: ${company.name}`);
        
        // Ensure the company has a valid nextScheduledCommunication date
        const nextCommunicationDate = company.nextScheduledCommunication;

        if (nextCommunicationDate) {
          console.log(`Next Communication Date for ${company.name}:`, nextCommunicationDate);
          return {
            title: `${company.name}: Scheduled Communication`,
            start: new Date(nextCommunicationDate), // Set the scheduled date
            end: new Date(nextCommunicationDate), // End date is the same for one-day event
          };
        }
        console.log(`No scheduled communication for ${company.name}`);
        return null;
      })
      .filter((event: any) => event !== null); // Remove any null entries if no date exists

    setEvents(newEvents); // Update the events state with the new events
  }, [companies, communications]); // Dependency array ensures it re-renders when companies or communications change

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
