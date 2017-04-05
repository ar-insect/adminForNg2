/**
 * @user-register-step3.component.ts
 * @description 用户注册模块第 3 步
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-13
 * @version v1.0
 */
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { User } from '../model/user-model'; // 用户模型
import { AppBaseComponent } from '../app.base.component';
import { Util } from '../utils';

@Component({
    selector: 'app-user-register-step3', // 用了`router-outlet`这个钩子可以不配置
    templateUrl: 'app/user-register/user-register-step3.component.html',
    styleUrls: [],
})
export class UserRegisterStep3Component extends AppBaseComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }
}