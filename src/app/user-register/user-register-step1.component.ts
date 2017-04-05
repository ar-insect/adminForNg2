/**
 * @user-register-step1.component.ts
 * @description 用户注册模块第 1 步
 * @author 阿虫
 * @email ar.insect@gmail.com
 * @date 2017-03-13
 * @version v1.0
 */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

import { Util } from '../utils';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user-model'; // 用户模型
import { AppBaseComponent } from '../app.base.component';

@Component({
    selector: 'app-user-register-step1',
    templateUrl: 'app/user-register/user-register-step1.component.html',
    styleUrls: [],
})
export class UserRegisterStep1Component extends AppBaseComponent implements OnInit {
    public userForm: FormGroup;
    public userInfo: User = new User();
    public formErrors = {
        'userName': '',
        // 'nickName': '',
        // 'email': '',
        'password': '',
        'confirmPassword': '',
        'formError': '',
        'vcode': ''
    };

    validationMessages = {
        'userName': {
            'required': '用户名必须输入。',
            'minlength': '用户名4到32个字符。'
        },
        'nickName': {
            'required': '昵称必须输入。',
            'minlength': '昵称2到32个字符。'
        },
        'email': {
            'required': '邮箱必须输入。',
            'pattern': '请输入正确的邮箱地址。'
        },
        'password': {
            'required': '密码必须输入。',
            'minlength': '密码至少要8位。'
        },
        'confirmPassword': {
            'required': '重复密码必须输入。',
            'minlength': '密码至少要8位。',
            'validateEqual': "两次输入的密码不一致。"
        },
        'vcode': {
            'required': '验证码必须输入。',
            'minlength': '4位验证码',
            'maxlength': '4位验证码'
        },
    };

    constructor(
        public fb: FormBuilder,
        //public userRegisterService: UserRegisterService,
        public router: Router,
        public route: ActivatedRoute,
    ) {
        super();
    }

    ngOnInit() {

        this.buildForm();
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            "userName": [
                this.userInfo.userName,
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(32)
                ]
            ],
            // "nickName": [
            //     this.userInfo.nickName,
            //     [
            //     Validators.required,
            //     Validators.minLength(2),
            //     Validators.maxLength(32)
            //     ]
            // ],
            // "email": [
            //     this.userInfo.email,
            //     [
            //     Validators.required,
            //     Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
            //     ]
            // ],
            "password": [
                this.userInfo.password,
                [
                Validators.required,
                Validators.minLength(8),
                ]
            ],
            "confirmPassword": [
                this.userInfo.confirmPassword,
                [
                Validators.required,
                Validators.minLength(8)
                ]
            ],
            "vcode": [
                this.userInfo.vcode,
                [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(4)
                ]
            ]
        });
        this.userForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.userForm) { return; }
        const form = this.userForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    doRegister() {

    }

    testEmail() {

    }

}