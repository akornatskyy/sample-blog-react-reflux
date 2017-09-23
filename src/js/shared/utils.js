import {parse, differenceInDays, distanceInWordsToNow, format} from 'date-fns';


export const formatDateOrTime = d => {
    d = parse(d);
    if (differenceInDays(d, new Date()) >= -3) {
        return distanceInWordsToNow(d);
    }

    return format(d, '[on] MMMM DD, YYYY [at] hh:mm A');
};
