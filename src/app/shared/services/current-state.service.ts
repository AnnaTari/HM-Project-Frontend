import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {EventModel} from "../models/event.model";
import {EmployeeModel, AdminModel} from "../models/admin.model";


@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  private admin$: BehaviorSubject<AdminModel> = new BehaviorSubject<AdminModel>({
    adminId: 0,
    adminName: "",
    adminPassword: ""
  });

  private employee$: BehaviorSubject<EmployeeModel> = new BehaviorSubject<EmployeeModel>({
    employee_id: 0,
    employeename: "",
    email: ""
  });

  private actualEvents$: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);

  private futureEvents$: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);

  private expiredEvents$: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);

  private events$: BehaviorSubject<EventModel[]> = new BehaviorSubject<EventModel[]>([]);

  constructor() {

  }

  setAdminObs(admin: AdminModel) {
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

  setExpiredEvents(expiredEvents: EventModel[]) {
    this.expiredEvents$.next(expiredEvents);
  }

  getExpiredEvents(): Observable<EventModel[]> {
    return this.expiredEvents$.asObservable();
  }


  separateActualAndFutureEvents(events: EventModel[]) {
    let actualEvents: EventModel[] = [];
    let futureEvents: EventModel[] = [];
    let expiredEvents: EventModel[] = [];
    events.forEach((event) => {
      let currentDateTime = new Date();
      let registrationDate = new Date(event.registrationDate);
      let deadline = new Date(event.deadline);
      if (registrationDate.toISOString() <= currentDateTime.toISOString()) {
        actualEvents.push(event);
      } else if (registrationDate.toISOString() > currentDateTime.toISOString()) {
        futureEvents.push(event);
      } else if (deadline.toISOString() < currentDateTime.toISOString()) {
        expiredEvents.push(event);
      }
    })
    this.setActualEvents(actualEvents);
    this.setFutureEvents(futureEvents);
    this.setExpiredEvents(expiredEvents);
  }
}
