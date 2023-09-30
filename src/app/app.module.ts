import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventDetailComponent } from './shared/components/event-detail/event-detail.component';
import { PopUpComponent } from './shared/components/pop-up/pop-up.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    LoginComponent,
    AdminEditComponent,
    EventPageComponent,
    EventDetailComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
