import moment from 'moment';

export function formatDate(timeStr, cformat = 'YYYY-MM-DD') {
  return timeStr ? moment(timeStr, cformat) : null;
}
export function formatDateStr(timeStr, cformat = 'YYYY-MM-DD') {
  return timeStr ? moment(timeStr).format(cformat) : null;
}
