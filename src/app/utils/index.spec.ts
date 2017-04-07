import { Util } from './index';

describe('util test', () => {
    it('util.JsonToUrlParams', () => {
        expect(Util.JsonToUrlParams({a:'123'})).toBe('a=123');
    });

});
