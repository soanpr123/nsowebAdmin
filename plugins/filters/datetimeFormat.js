import { format } from 'date-fns';
import { parseDateString } from '@/utils/date';

/**
 * @param {Date|number|string} date
 * @param {string} format
 * @param {string|null} fromFormat
 */
export default function (date, toFormat = 'HH:mm:ss dd/MM/yyyy', fromFormat) {
    const then = typeof date === 'string' ? parseDateString(date, fromFormat) : date;

    return then ? format(then, toFormat) : null;
}
