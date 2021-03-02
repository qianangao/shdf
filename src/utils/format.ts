import moment from 'moment';

export function formatDate(timeStr: moment.MomentInput, cformat = 'YYYY-MM-DD') {
  return timeStr ? moment(timeStr, cformat) : null;
}
export function formatDateStr(timeStr: moment.MomentInput, cformat = 'YYYY-MM-DD') {
  return timeStr ? moment(timeStr).format(cformat) : null;
}
export function formatTimeToSeconds(timeStr: moment.MomentInput) {
  return moment(timeStr).seconds();
}
export function formatTimeStrToSeconds(timeStr: string) {
  const hour = timeStr.split(':')[0];
  const min = timeStr.split(':')[1];
  const sec = timeStr.split(':')[2];

  return Number(hour * 3600) + Number(min * 60) + Number(sec);
}
