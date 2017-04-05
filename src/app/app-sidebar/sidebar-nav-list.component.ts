
import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AppBaseComponent } from '../app.base.component';
import { MenuConfig } from './menu-config.interface';

@Component({
    selector: 'sidebar-nav-list',
    templateUrl: 'app/app-sidebar/sidebar-nav-list.component.html'
})
export class SidebarNavList extends AppBaseComponent implements OnInit {
    constructor(
    ) {
        super();
    }
    ngOnInit() {
        console.log('sidebar-nav loading.');
        
    }

    public isMini: boolean = false;

    @Input() menuConfig: MenuConfig[];
    @Output() onMiniMenu = new EventEmitter<boolean>();

    triggerMiniMenu() {
        this.isMini = !this.isMini;
        this.onMiniMenu.emit(this.isMini);
    }

    triggerMenu(conf:any, active:boolean): boolean {
        if (conf.subMenu) {
            conf.isShow = !conf.isShow;
            console.log(`当前菜单项显示状态：${conf.isShow}`);
        } else {
            this.menuConfig.forEach(item => {
                item.active = false;
                if (item.subMenu) {
                    item.subMenu.forEach(it => it.active = false);
                }
            });
            conf.active = active;
        }
        return false;
    }

    triggerSubMenu(conf, subConf, active):boolean {
        this.menuConfig.forEach(item => {
            item.active = false;
            if (item.subMenu) {
                item.subMenu.forEach(it => it.active = false);
            }
        });
        conf.active = true;
        subConf.active = true;
        return false;
    }
}