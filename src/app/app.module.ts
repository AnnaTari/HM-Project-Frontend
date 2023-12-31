import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventDetailComponent } from './admin-edit/event-detail/event-detail.component';
import { PopUpComponent } from './shared/components/pop-up/pop-up.component';
import { CurrentEventBoxComponent} from "./current-event-box/current-event-box.component";
import {TermsAndConditionsComponent} from "./terms-and-conditions/terms-and-conditions.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { EditEventComponent } from './admin-edit/edit-event/edit-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import { EditOptionComponent } from './admin-edit/edit-option/edit-option.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { RafflePageComponent } from './raffle-page/raffle-page.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatExpansionModule} from "@angular/material/expansion";

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
    PopUpComponent,
    EditEventComponent,
    EditOptionComponent,
    CurrentEventBoxComponent,
    TermsAndConditionsComponent,
    RafflePageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule, //adds RoutingModule for use
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatExpansionModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
