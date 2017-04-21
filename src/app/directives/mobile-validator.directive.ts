
import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, FormControl, AbstractControl, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';

function validateMobile(c: FormControl) {
    let mobile = c.value;
    const MOBILE_REGEXP = /^1[0-9]{10,10}$/;

    if (MOBILE_REGEXP.test(mobile)) {
        return null;
    } else if (mobile && mobile.trim() === '') {
        return { validate: { valid: false }, message: '请输入正确的手机号' };
    } else {
        if (mobile && mobile.trim() !== '') {
            return { validate: { valid: false }, message: '请输入正确的手机号' };
        }
    }
}

@Directive({
    selector: '[validateMobile][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useValue: validateMobile,
            multi: true
        }
    ]
})
export class MobileValidatorDirective {
}