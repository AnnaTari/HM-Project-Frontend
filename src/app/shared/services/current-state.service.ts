import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {EventModel} from "../models/event.model";
import {EmployeeModel, UserModel} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  private admin$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
    admin_id: 0,
    adminname: "",
    password: ""
  });

  private employee$: BehaviorSubject<EmployeeModel> = new BehaviorSubject<EmployeeModel>({
    employee_id: 0,
    employeename: "",
    email: ""
  });

  private actualEvents$: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);

  private futureEvents$: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);

  private events$: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);

  constructor() {

  }

  setAdminObs(admin: UserModel) {
    this.admin$.next(admin);
  }

  getAdminObs() {
    return this.admin$.asObservable();
  }


  setEmployeeObs(employee: EmployeeModel) {
    this.employee$.asObservable();

  }

  getEmployeeObs() {
    return this.employee$.asObservable();
  }

  //Events
  setEventObs(event: EventModel[]) {
    this.events$.next(event);
  }

  getEventObs() {
    return this.events$.asObservable();
  }

  setActualEvents(actualEvents: EventModel[]) {
    this.actualEvents$.next(actualEvents);
  }

  getActualEvents(): Observable<EventModel[]> {
    return this.actualEvents$.asObservable();
  }

  setFutureEvents(futureEvents: EventModel[]) {
    this.futureEvents$.next(futureEvents);
  }

  getFutureEvents(): Observable<EventModel[]> {
    return this.futureEvents$.asObservable();
  }

  separateActualAndFutureEvents(events: EventModel[]) {
    let actualEvents: EventModel[] = [];
    let futureEvents: EventModel[] = [];
    events.forEach((event) => {
      let currentDateTime = new Date();
      let registrationDate = new Date(event.registrationDate);
      if (registrationDate.getDate() < currentDateTime.getDate()) {
        actualEvents.push(event);
      } else {
        futureEvents.push(event);
      }
    })
    this.setActualEvents(actualEvents);
    this.setFutureEvents(futureEvents);
  }
}
