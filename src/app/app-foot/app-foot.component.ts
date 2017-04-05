/**
 * @app-foot.component.ts
 * @description 应用尾部
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-13
 * @version v1.0
 */
import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '../app.base.component';

@Component({
    selector: 'app-foot',
    templateUrl: 'app/app-foot/app-foot.component.html',
    styleUrls: ['app/app-foot/app-foot.component.scss'],
})
export class AppFoot extends AppBaseComponent implements OnInit {
    constructor(
    ) {
        super();
    }
    ngOnInit() {
        console.log('load foot');
        
    }
}