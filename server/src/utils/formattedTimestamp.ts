function formattedTimestamp(date: Date) {
  const formattedDate = date.toLocaleDateString("fr-FR");
  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `Le ${formattedDate} à ${formattedTime}`;
}

export default formattedTimestamp;
