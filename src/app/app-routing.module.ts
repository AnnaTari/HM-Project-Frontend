import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from "./login/login.component";
import {AdminEditComponent} from "./admin-edit/admin-edit.component";
import {TermsAndConditionsComponent} from "./terms-and-conditions/terms-and-conditions.component";

//defines your routes
const routes: Routes = [
  {path: 'home', title: "Homepage", component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin-edit', component: AdminEditComponent},
  {path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}, //route that defaults to the home-component
  {path: '**', component: HomepageComponent} //wildcard route - in case the user attempt to navigate where nothing exists
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
