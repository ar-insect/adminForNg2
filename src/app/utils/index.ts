export namespace Util {
   
   export function JsonToUrlParams(obj: Object): string  {
    return Object.keys(obj).map(
        key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');
    }

    export function rand(m?: number): string {
        let seed = m || 13;
        return new Date().getTime().toString().substring(13 - seed);
    }
}