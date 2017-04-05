/**
 * @app-head.component.ts
 * @description 应用头部
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-13
 * @version v1.0
 */
import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from '../app.base.component';

@Component({
    selector: 'app-head',
    templateUrl: 'app/app-head/app-head.component.html',
    styleUrls: ['app/app-head/app-head.component.scss'],
})
export class AppHead extends AppBaseComponent implements OnInit {
    constructor(
    ) {
        super();
    }
    ngOnInit() {
        console.log('load head');
        
    }
    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

}