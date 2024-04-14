export default function FormatDate({
  inputDate,
  format = "number",
  dateOnly = false,
}: {
  inputDate: Date | string | null | undefined;
  format?: "text" | "number";
  dateOnly?: boolean;
}): string {
  if (!inputDate) {
    return "Invalid Date";
  }

  const date = new Date(inputDate);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Decide the format based on the format argument
  if (format === "number") {
    // Format the date as mm/dd/yy hh:mm AM/PM
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of year
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${month}/${day}/${year} ${formattedHour}:${formattedMinutes} ${ampm}`;
  } else {
    // Return the date in text format as it currently does
    const datePart = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);

    const timePart = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    if (dateOnly) {
      return datePart;
    }

    return `${datePart} ${timePart}`;
  }
}
