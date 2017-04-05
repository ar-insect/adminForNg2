/**
 * @user-validator.directive.ts
 * @description 用户登录验证指令
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-13
 * @version v1.0
 */
import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, FormControl, AbstractControl, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from "rxjs";
import { UserLoginService } from '../user-login.service'; // 登录服务

@Directive({
    selector: '[validateVcode][ngModel]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS, // ng2 async validator
            useExisting: forwardRef(() => VcodeValidatorDirective),
            multi: true
        }
    ]
})
export class VcodeValidatorDirective implements Validator {
    constructor(public userLoginService: UserLoginService ) {
    }
    
    validateVcodeObservable(vcode: string) {
        return new Observable(observer => {
            this.userLoginService.vcodeValidate(vcode).subscribe(responseData => {
                console.log(responseData);
                // if (responseData.errorCode === 1) { 
                //     // verify error.
                //     observer.next({ validateVcode: { valid: false }, message="验证码错误，请重新输入。" });
                // } else {
                //     observer.next(null);
                // }
            });
        });
    }

    validate(c: AbstractControl): Observable<{[key : string] : any}> {
        return this.validateVcodeObservable(c.value).first();
    }
}