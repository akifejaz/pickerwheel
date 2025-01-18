function makeListByRange(min, max, interval, exclude) {
    if (min > max) return [];
    if (interval == 0 && max > min) return [];
    if (interval == 0 && max == min) return [min];
    res = []
    for (let i = min; i <= max; i += interval) {
        if (exclude.includes(i)) continue;
        res.push(i);
    }
    if (res.length > MAX_OPTIONS_ALLOWED) return [];
    return res;
}