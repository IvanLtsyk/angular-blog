import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent} from './shared/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AuthGuard} from "./services/auth.guard";
import {SharedModule} from "../shared/shared.module";
import {SearchPostsPipe} from './pipes/search-posts.pipe';
import {AlertComponent} from "./shared/alert/alert.component";
import {AlertService} from "./services/AlertService";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePageComponent,
    EditPageComponent,
    DashboardPageComponent,
    SearchPostsPipe,
    AlertComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AlertService,
  ]
})
export class AdminModule {
}
