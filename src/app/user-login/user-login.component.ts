/**
 * @user-login.component.ts
 * @description 用户登录模块
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-13
 * @version v1.0
 */
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { UserLoginService } from './user-login.service'; // 登录服务
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user-model'; // 用户模型
import { AppBaseComponent } from '../app.base.component';
import { Util } from '../utils';

@Component({
    selector: 'app-user-login', // 用了`router-outlet`这个钩子可以不配置
    templateUrl: 'app/user-login/user-login.component.html',
    styleUrls: ['app/user-login/user-login.component.scss'],
})
export class UserLoginComponent extends AppBaseComponent implements OnInit {
    public user: User = new User();
    public error : Error;
    
    private vcodeURL = `http://192.168.1.73:9595/php/code.php`;
    private vcodeWholeURL: string = `${this.vcodeURL}?rand=${Util.rand()}`;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public userLoginService: UserLoginService
    ) {
        super();
        console.log(this.userLoginService);
    }
    ngOnInit() {
        console.log("--- user-login-component ---");
        console.log(this.router);
        console.log(this.activatedRoute);

        let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
        let routerState: RouterState = this.router.routerState;
        let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

        console.log(activatedRouteSnapshot);
        console.log(routerState);
        console.log(routerStateSnapshot);
        
    }
    // 换一张验证码
    public reflashVcode(): void {
        this.vcodeWholeURL = `${this.vcodeURL}?rand=${Util.rand()}`;
    }

    public doLogin(): void {
        console.log(this.user);

    }

    public doLogout(): void {

    }

    public forgetPwd(): void {

    }
}