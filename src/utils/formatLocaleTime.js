

export default function formatToLocalTime(utcDate) {
    const date = new Date(utcDate);
    return date.toLocaleString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      hour12: false,
    }).replace(',', '');
}
