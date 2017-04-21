
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, Jsonp, URLSearchParams } from '@angular/http';
import { Util } from '../utils';

@Injectable()
export class VerifyCodeService {

    readonly verifyCodeURL = 'http://192.168.1.73:8080/php/phoneMessage.php';

    constructor(private http: Http, private jsonp: Jsonp) {}

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    // 获取验证码
    public getVerifyCode(mobile: string): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        });
        let options = new RequestOptions({headers: headers});
        let data = new URLSearchParams();
        data.append('phone', mobile);
        data.append('actType', '1');
        return this.http
                .post(this.verifyCodeURL, data, options)
                .map(this.extractData);
    }
    
    // 核实验证码
    public validateVerifyCode(mobile: string, verification: string): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Access-Control-Allow-Headers': 'Range, Origin, X-Requested-With, Cache-Control, Content-Type, Accept',
            'Access-Control-Expose-Headers': 'ETag',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
        });
        let options = new RequestOptions({headers: headers});
        let data = new URLSearchParams();
        data.append('phone', mobile);
        data.append('verification', verification);
        data.append('actType', '2');
        return this.http.post(this.verifyCodeURL, data, options);
    }
    
}