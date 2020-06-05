import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./shared/admin-layout/admin-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";

const routes: Routes = [
  {
    path: "", component: AdminLayoutComponent, children: [
      {path: "", redirectTo: "/admin/login", pathMatch: "full"},
      {path: "login", component: LoginPageComponent},
      {path: "dashboard", component: DashboardPageComponent},
      {path: "create", component: CreatePageComponent},
      {path: "edit/:id", component: EditPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AdminRoutingModule {
}
