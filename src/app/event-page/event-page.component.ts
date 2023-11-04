import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CurrentStateService} from "../shared/services/current-state.service";
import {EmployeeApi} from "../api/employee.api";
import {BehaviorSubject, Observable} from "rxjs";

import {EventModel} from "../shared/models/event.model";
import {EventApi} from "../api/event.api";


@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent {

  participationForm = new FormGroup({
    employeename: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
   // escortname: new FormControl(``),
  })

  isLoggedIn = new BehaviorSubject<boolean>(true);
  constructor(private router: Router, private currentStateService: CurrentStateService, private employeeApi: EmployeeApi) {
  }

 /* events$: Observable<EventModel[]>;
  constructor(private eventApi: EventApi) {
    this.events$ = this.eventApi.check();
  } */


  onSubmit() {
    console.log("Teilnahme bestätigt")
    let employee: { name: string, email: string } = {
      name: this.participationForm.value.employeename!,
      email: this.participationForm.value.email!
    }
    this.employeeApi.login(employee).subscribe(employee => {
      //need to check why hm_user_id comes written like this from backend
      if (employee.employee_id != null) {
        this.isLoggedIn.next(true);
        this.router.navigate(['employee-edit']);
        this.currentStateService.setEmployeeObs(employee);
      } else {
        this.isLoggedIn.next(false);
      }
    })

  }
}
