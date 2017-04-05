
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { StaticParams } from './static-params'; // 应用程式静态配置
import { Util } from '../utils';

@Injectable()
export class AppConfigService {
    readonly configURL = 'http://192.168.1.73:9595/servlet/getUserSelfLoginPage';
    
    constructor(public http: Http) {
    }

    setConfig(conf: any) {
        console.log( conf.result );
        
    }

    load(): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
        let body = {
            "action": "getUserSelfLoginPage",
            "category": "adminCenter"
        };
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.configURL, Util.JsonToUrlParams(body), options)
            .map(response => response.json())
            .toPromise()
            .then(conf => {
                console.log('###############', conf);
                this.setConfig(conf);
            })
            .catch(this.handleError);
    }

    handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }
}

