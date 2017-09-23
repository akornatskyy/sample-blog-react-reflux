import {resolve} from '../mock';
import samples from './samples.json';


export default {
    dailyQuote: () => resolve(samples.quote)
};
