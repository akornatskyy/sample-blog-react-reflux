export const resolve = (r, timeout) => new Promise(resolve =>
    setTimeout(() => resolve(r), timeout || 100));

export const reject = (r, timeout) => new Promise((resolve, reject) =>
    setTimeout(() => reject(r), timeout || 100));

export const trancateWords = (s, count) => {
    s = s.split(/\s|\\n/).slice(0, count);
    if (s.length === count) {
        s.push('...');
    }

    return s.join(' ');
};

export const first = (items, predicate) => {
    for (const d of items) {
        if (predicate(d)) {
            return d;
        }
    }

    return null;
};

export const nfilter = (items, n, predicate) => {
    const r = [];

    for (const d of items) {
        if (predicate(d)) {
            r.push(d);
            n -= 1;

            if (!n) {
                break;
            }
        }
    }

    return r;
};

export const pager = (items, page, size, f) => {
    const start = page * size;
    let end = start + size;
    const paging = {};
    const r = [];

    if (page > 0) {
        paging.before = page - 1;
    }

    if (end < items.length) {
        paging.after = page + 1;
    } else {
        end = items.length;
    }

    for (let i = start; i < end; i++) {
        r.push(f(items[i]));
    }

    return {paging: paging, items: r};
};
