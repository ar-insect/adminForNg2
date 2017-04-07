export function JsonToUrlParams(obj: Object): string  {
    return Object.keys(obj).map(
        key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');
}