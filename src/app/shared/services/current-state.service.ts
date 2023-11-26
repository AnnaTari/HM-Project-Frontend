import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {EventModel} from "../models/event.model";
import {AdminModel} from "../models/admin.model";
import {EmployeeModel} from "../models/employee.model";
import {EventWithPictureModel} from "../models/eventWithPicture.model";


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
    employeeId: 0,
    employeeName: "",
    employeeEmail: ""
  });

  private actualEvents$: BehaviorSubject<EventWithPictureModel[]> = new BehaviorSubject<EventWithPictureModel[]>([]);

  private futureEvents$: BehaviorSubject<EventWithPictureModel[]> = new BehaviorSubject<EventWithPictureModel[]>([]);

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
    this.employee$.next(employee);

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

  setActualEvents(actualEvents: EventWithPictureModel[]) {
    this.actualEvents$.next(actualEvents);
  }

  getActualEvents(): Observable<EventWithPictureModel[]> {
    return this.actualEvents$.asObservable();
  }

  setFutureEvents(futureEvents: EventWithPictureModel[]) {
    this.futureEvents$.next(futureEvents);
  }

  getFutureEvents(): Observable<EventWithPictureModel[]> {
    return this.futureEvents$.asObservable();
  }

  setExpiredEvents(expiredEvents: EventModel[]) {
    this.expiredEvents$.next(expiredEvents);
  }

  getExpiredEvents(): Observable<EventModel[]> {
    return this.expiredEvents$.asObservable();
  }


  separateActualAndFutureEvents(events: EventWithPictureModel[]) {
    let actualEvents: EventWithPictureModel[] = [];
    let futureEvents: EventWithPictureModel[] = [];
    let expiredEvents: EventWithPictureModel[] = [];
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
