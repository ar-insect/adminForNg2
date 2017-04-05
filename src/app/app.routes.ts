
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
// import { UserLoginComponent }   from './user-login/user-login.component';
// import { UserRegisterComponent } from './user-register/user-register.component';
import { IndexComponent } from './index/index.component';
// import { PaginationTableComponent } from './temp/pagination.component'; // 分页表格demo

export const appRoutes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  // { path: 'login',  component: UserLoginComponent },
  // { path: 'register', component: UserRegisterComponent },
  // { path: 'pagination', redirectTo: 'pagination/page/1', pathMatch: 'full' },
  // { path: 'pagination/page/:page', component: PaginationTableComponent }
  { path:'**', //fallback router must in the last
		component: IndexComponent }
];