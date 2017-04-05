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

function validateMobile(c: FormControl) {
    let userName = c.value;
    const MOBILE_REGEXP = /^1[0-9]{10,10}$/;
    const EMAIL_REGEXP = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    
    if (MOBILE_REGEXP.test(userName) || EMAIL_REGEXP.test(userName)) {
        return null;
    } else if (userName && userName.trim() === '') {
        return { validateUserName: { valid: false }, message: '请输入正确的邮箱或手机号' };
    } else {
        if (userName && userName.trim() !== '') {
            return { validateUserName: { valid: false }, message: '请输入正确的邮箱或手机号' };
        }
    }
}

@Directive({
    selector: '[validateUser][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useValue: validateMobile,
            multi: true
        },
        {
            provide: NG_ASYNC_VALIDATORS, // ng2 async validator
            useExisting: forwardRef(() => UserValidatorDirective),
            multi: true 
        }
    ]
})
export class UserValidatorDirective implements Validator {
    constructor(public userLoginService: UserLoginService ) {
    }
    
    validateUniqueUserObservable(userName: string) {
        return new Observable(observer => {
            this.userLoginService.userValidate(userName).subscribe(responseData => {
                console.log(responseData);
                if (responseData.errorCode === 1) {
                    // verify error.
                    observer.next({ validateUniqueUserName: { valid: false }, message: '该用户名不存在，请重新输入。' });
                } else {
                    observer.next(null);
                }
            });
        });
    }

    validate(c: AbstractControl): {[key : string] : any}|Observable<{[key : string] : any}> {
        return this.validateUniqueUserObservable(c.value).first();
    }
}