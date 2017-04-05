/**
 * @shared.module.ts
 * @description 独立出一个模块，比如，用户登录，用户信息，用户信息设置
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-13
 * @version v1.0
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { UserLoginComponent } from '../user-login/user-login.component'; // 登录
// ...用户信息
// ...用户信息设置
// import { verificationCodeComponent } from '../public/verification-code/verification-code.component';
import { UserValidatorDirective } from '../user-login/directives/user-validator.directive';
import { VcodeValidatorDirective } from '../user-login/directives/verification-code.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    declarations: [
        UserLoginComponent,
        UserValidatorDirective,
        VcodeValidatorDirective, // 验证码
    ],
    exports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        UserLoginComponent,
    ]
})
export class SharedModule {

}