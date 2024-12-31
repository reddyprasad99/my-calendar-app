import dayjs from "dayjs";

export const calculateNextCommunicationDate = (lastCommunicationDate: any, periodicity: any) => {
  const [value, unit] = periodicity.split(" "); // E.g., "2 weeks" -> [2, "weeks"]
  return dayjs(lastCommunicationDate).add(parseInt(value), unit).format("YYYY-MM-DD");
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


export const filterGridCommunications = (companies: any[], communications: any[]) => {
  const today = dayjs().format("YYYY-MM-DD");

  return companies.map((company: any) => {
    const lastCommDate = company.lastFiveCommunications?.length ? company.lastFiveCommunications?.[company.lastFiveCommunications.length - 1].date  : dayjs().format("YYYY-MM-DD"); ;
  const periodicity = company.communicationPeriodicity.split(" ");
  const duration = parseInt(periodicity[0]);
  const unit = periodicity[1];

  const nextComm = dayjs(lastCommDate).add(duration, unit).format("YYYY-MM-DD");

    return {
      ...company,
      nextScheduledCommunication: nextComm,
      isOverdue: dayjs(nextComm).isBefore(today),
      isToday: dayjs(nextComm).isSame(today),
    };
  });
};

  