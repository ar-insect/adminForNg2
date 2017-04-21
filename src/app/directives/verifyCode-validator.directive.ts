
import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, FormControl, AbstractControl, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from "rxjs";
import { VerifyCodeService } from '../services/verify-code.service'; // 登录服务

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
    constructor(public vCodeService: VerifyCodeService ) {
    }
    
    @Input('validateVcode') mobile: string;

    validateVcodeObservable(mobile: string, vcode: string) {
        return new Observable(observer => {
            this.vCodeService.validateVerifyCode(mobile, vcode).subscribe(responseData => {
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
        return this.validateVcodeObservable(this.mobile, c.value).first();
    }
}