/**
 * @index.component.ts
 * @description 首页
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-30
 * @version v1.0
 */
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppBaseComponent } from '../app.base.component';
import { Util } from '../utils';

@Component({
    // selector: 'app-index', // 用了`router-outlet`这个钩子可以不配置
    templateUrl: 'app/index/index.component.html',
    styleUrls: ['app/index/index.component.scss'],
})
export class IndexComponent extends AppBaseComponent implements OnInit {
    
    public error : Error;
    
    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute
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

}