import dayjs from "dayjs";

export const calculateNextCommunicationDate = (lastCommunicationDate: any, periodicity: any) => {
  const [value, unit] = periodicity.split(" "); // E.g., "2 weeks" -> [2, "weeks"]
  
  // Convert the periodicity to plural for dayjs unit handling
  const pluralUnit = unit === "week" ? "weeks" : unit === "month" ? "months" : unit;

  return dayjs(lastCommunicationDate).add(parseInt(value), pluralUnit).format("YYYY-MM-DD");
};

export const filterNotifications = (companies: any, communications: any) => {
    const today = dayjs().format("YYYY-MM-DD");
  
    return companies.map((company: any) => {
      const companyCommunications = communications.filter(
        (comm: any) => comm.companyId === company.id
      );
  
      const lastCommunication = companyCommunications.sort(
        (a: any, b: any) => dayjs(b.date).unix() - dayjs(a.date).unix()
      )[0];
  
      const nextScheduledDate = lastCommunication
        ? calculateNextCommunicationDate(lastCommunication.date, company.communicationPeriodicity)
        : today;
  
      return {
        ...company,
        lastFiveCommunications: companyCommunications.slice(-5),
        nextScheduledCommunication: nextScheduledDate,
        isOverdue: dayjs(nextScheduledDate).isBefore(today),
        isToday: dayjs(nextScheduledDate).isSame(today),
      };
    });
  };
  
  