/**
 * @app-sidebar.component.ts
 * @description 应用左侧导航菜单
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @version v1.0
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppBaseComponent } from '../app.base.component';
import { MenuConfig } from './menu-config.interface';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'app/app-sidebar/app-sidebar.component.html',
    styleUrls: ['app/app-sidebar/app-sidebar.component.scss'],
})
export class AppSidebar extends AppBaseComponent implements OnInit {
    constructor(
    ) {
        super();
    }

    ngOnInit() {
        console.log('sidebar');
        
    }

    @Output() onMiniMenu = new EventEmitter<boolean>(); // 往最外面的组件输出

    public isMini: boolean = false;

    public miniSidebar(isMini: boolean) {
        // console.log(isMini);
        this.isMini = isMini;
        this.onMiniMenu.emit(this.isMini);
    }
    
    public menuConfig: MenuConfig[] = [
        {
            iconCls: 'icon-dashboard',
            menuText: '控制台',
            url: '#',
            active: true
        },
        {
            iconCls: 'icon-text-width',
            menuText: '文字排版',
            url: '#',
            active: false
        },
        {
            iconCls: 'icon-desktop',
            menuText: 'UI 组件',
            isShow: false,
            active: false,
            subMenu: [
                {
                    iconCls: 'icon-double-angle-right',
                    menuText: '组件',
                    url: '#',
                    active: false
                },
                {
                    iconCls: 'icon-double-angle-right',
                    menuText: '按钮 &amp; 图表',
                    url: '#',
                    active: false
                },
                {
                    iconCls: 'icon-double-angle-right',
                    menuText: '树菜单',
                    url: '#',
                    active: false
                },
            ]
        },
        {
            iconCls: 'icon-list',
            menuText: '表格',
            isShow: false,
            active: false,
            subMenu: [
                {
                    iconCls: 'icon-double-angle-right',
                    menuText: '简单 &amp; 动态',
                    url: '#',
                    active: false
                },
                {
                    iconCls: 'icon-double-angle-right',
                    menuText: 'jqGrid plugin',
                    url: '#',
                    active: false
                },
            ]
        },
    ];
    
}