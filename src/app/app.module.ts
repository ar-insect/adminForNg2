/**
 * app.module.ts
 * @description 应用程式module
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @version v1.0
 */
import { NgModule, APP_INITIALIZER, TRANSLATIONS }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule, Http }    from '@angular/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { SharedModule } from './shared/shared.module'; // 应用程式共享的模块

// service.
import { AppConfigService } from './public/app-config.service'; // 应用程式配置方面的服务，在整个应用启动之前执行
// import { UserLoginService } from './user-login/user-login.service'; // 登录服务
// import { UserRegisterService } from './user-register/user-register.service'; // 注册服务
// directive.
// import { EqualValidator } from './user-register/directives/equal-validator.directive';
import { AppComponent } from './app.component'; // 应用视图入口
import { AppHead } from './app-head/app-head.component'; // 应用程式头部
import { AppSidebar } from './app-sidebar/app-sidebar.component'; // 左侧导航菜单
import { SidebarNavList } from './app-sidebar/sidebar-nav-list.component';
import { AppFoot } from './app-foot/app-foot.component'; // // 应用程式尾部
import { IndexComponent } from './index/index.component'; // 首页

// 路由配置
import { appRoutes } from './app.routes';
// UI base library use by ng2-bootstrap.
import { ModalModule } from 'ng2-bootstrap/modal';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { DropdownModule, DropdownDirective } from 'ng2-bootstrap/dropdown';

export function configServiceFactory (config: AppConfigService) {
  console.log('------application init------');
  return () => null;
  // 加载完成应用程式配置再启动整个应用
  // return () => config.load();
}

@NgModule({
  imports:      [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, './assets/i18n/', '.json'),
      deps: [ Http ]
    }),
    SharedModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    DropdownModule.forRoot(),
   ], // 主模块中所需要的依赖
  declarations: [ 
    AppComponent,         // 主视图
    // EqualValidator,
    AppHead,
    AppSidebar,
    SidebarNavList,
    AppFoot,
    IndexComponent,
    ], // 声明本模块中拥有的视图类
  providers: [
    AppConfigService,
    // UserLoginService, // 登录服务
    // UserRegisterService, // 注册服务
    // PostTableService,
    {
      provide: APP_INITIALIZER, // 应用程式初始化服务
      useFactory: configServiceFactory,
      deps: [ AppConfigService ],
      multi: true
    },
    
  ],
  bootstrap: [ AppComponent ] // 指定应用的主视图（根组件）
})
export class AppModule {

}
