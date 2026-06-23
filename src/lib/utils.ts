/**
 * Formats a date string into a Thai Buddhist Era date format.
 * Example: 2025-01-10T08:00:00Z -> 10 มกราคม 2568
 */
export function formatThaiDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม"
    ];

    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543; // Convert to Buddhist Era (B.E.)

    return `${day} ${month} ${year}`;
  } catch {
    return dateString;
  }
}

/**
 * Basic conditional class merger to keep performance optimal without external runtimes
 */
export function cn(...classes: Array<string | undefined | null | boolean>): string {
  return classes.filter(Boolean).join(" ");
}
