const DAYS_SR = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
const MONTHS_SR = ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'];

export function formatDate(date = new Date()): string {
  const day = DAYS_SR[date.getDay()];
  const dayNum = date.getDate();
  const month = MONTHS_SR[date.getMonth()];
  return `${day}, ${dayNum}. ${month}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
}
