/**
 * @user-login.service.ts
 * @description 用户登录相关服务
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-13
 * @version v1.0
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../model/user-model';
import { Util } from '../utils';

@Injectable()
export class UserLoginService {
    readonly userLoginURL = 'mock-data/user-login-mock.json';
    readonly userValidateURL = 'http://192.168.1.73:9595/php/itemConfig.php';
    readonly verifyCodeURL = 'http://192.168.1.73:9595/php/checkCode.php';

    public subject: Subject<User> = new Subject<User>();

    constructor(public http: Http) {}

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Promise.reject(errMsg);
    }

    public get currentUser(): Observable<User> {
        return this.subject.asObservable();
    }
    // 验证用户是否存在
    public userValidate(userName: string): Observable<any> {
        // let body = '{"userName":"' + userName+'"}';
        let body = {
            action: 'checkAccount',
            category: 'userManager',
            type: userName.indexOf('@') > -1 ? 1 : 2, // 1：邮件, 2：手机
            account: userName
        };
        console.log(Util.JsonToUrlParams(body));
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.userValidateURL, Util.JsonToUrlParams(body), options)
            .map(this.extractData);
        // return this.http.get(this.userValidateURL)
        //     .map(this.extractData);
    }
    // 核对验证码
    public vcodeValidate(vcode: string): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
        let body = { code: vcode };
        let options = new RequestOptions({headers: headers});
        console.log( Util.JsonToUrlParams(body) );
        return this.http.post(this.verifyCodeURL, Util.JsonToUrlParams(body), options)
            .map(this.extractData);
        // return this.http.get(this.verifyCodeURL)
        //     .map(this.extractData);
    }
    // 登录
    public login(user: User) {

    }
    // 退出
    public logout(): void {
        
    }
    
}