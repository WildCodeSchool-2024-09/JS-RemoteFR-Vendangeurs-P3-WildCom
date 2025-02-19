export function formattedTimestamp(date: Date) {
  const formattedDate = date.toLocaleDateString("fr-FR");
  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `Le ${formattedDate} à ${formattedTime}`;
}

export function formattedDate(date: string) {
  const dateOject = new Date(date);

  return dateOject.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formattedTime(time: string) {
  const [hours, minutes] = time.split(":");

  return `${hours}h${minutes}`;
}
