/**
 * @index.component.ts
 * @description 首页
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-30
 * @version v1.0
 */
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { /** ng4 动画引擎 */
        trigger,
        state,
        style,
        animate,
        transition
} from '@angular/animations';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { AppBaseComponent } from '../app.base.component';
import { Consult } from '../model/consult-model'; // form model
import { Util } from '../utils';
import { VerifyCodeService } from '../services/verify-code.service'; // 验证码服务

@Component({
    // selector: 'app-index', // 用了`router-outlet`这个钩子可以不配置
    templateUrl: 'app/index/index.component.html',
    styleUrls: ['app/index/index.component.scss'],
    // animations: [
    //     trigger('toolkitLevel1State', [
    //         // 两种状态
    //         state('inactive', style({
    //             display: 'none',
    //             // transform: 'scale(1)'
    //         })),
    //         state('active', style({
    //             display: 'block',
    //             // transform: 'scale(1.1)'
    //         })),
    //         transition('inactive => active', animate('500ms ease-in')),
    //         transition('active => inactive', animate('500ms ease-out'))
    //     ]),
    //     trigger('toolkitLevel2State', [
    //         // 两种状态
    //         state('inactive', style({
    //             display: 'none',
    //             // transform: 'scale(1)'
    //         })),
    //         state('active', style({
    //             display: 'block',
    //             // transform: 'scale(1.1)'
    //         })),
    //         transition('inactive => active', animate('500ms ease-in')),
    //         transition('active => inactive', animate('500ms ease-out'))
    //     ])
    // ]
})
export class IndexComponent extends AppBaseComponent implements OnInit {
    
    public error : Error;
    
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public vCodeService: VerifyCodeService
    ) {
        super();
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

    private timer: any;
    private step: number = 60;
    private isDisabled: boolean = false;
    // public error : Error;
    public consult: Consult = new Consult();

    @ViewChild('smModal') public smModal: ModalDirective;
    @ViewChild('lgModal') public lgModal: ModalDirective;

    level1State: string = 'inactive'; // toolkit level1 state.
    level2State: string = 'inactive'; // toolkit level2 state.
    level2PopState: boolean = false;
    
    toggleLevel1State() {
        if (this.level1State == 'inactive') {
            this.level1State = 'active';
        } else {
            this.level1State = 'inactive';
            this.level2State = 'inactive';
        }
    }

    toggleLevel2State() {
        if (this.level2State == 'inactive') {
            this.level2State = 'active';
        } else {
            this.level2State = 'inactive';
        }
    }
    level2Pop() {
        this.level1State = 'active';
        this.level2State = 'active';
    }

    openSmModal() {
        this.lgModal.hide();
        this.smModal.show();
    }

    openLgModal() {
        this.lgModal.show();
    }

    getVcode(event) {
        this.isDisabled = true;
        let button: HTMLElement = event.target;
        button.innerHTML = `${this.step}'s`;
        this.timer = setInterval(() => {
            this.step--;
            if (this.step === 0) {
                this.step = 60;
                this.isDisabled = false;
                button.innerHTML = '重新获取验证码';
                return clearInterval(this.timer);
            }
            button.innerHTML = `${this.step}('s)`;
        }, 1000);
        this.vCodeService.getVerifyCode(this.consult.mobile).subscribe(responseData => {
            console.log(responseData);
        });
    }

    doSubmit() {
        alert('submit');
    }

}