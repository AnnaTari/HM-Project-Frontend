import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {EventModel} from "../models/event.model";
import {EmployeeModel, AdminModel} from "../models/admin.model";
import {EventWithPictureModel} from "../models/eventWithPicture.model";
import {WinnerModel} from "../models/winner.model";


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

  private actualEvents$: BehaviorSubject<EventWithPictureModel[]> = new BehaviorSubject<EventWithPictureModel[]>([]);

  private futureEvents$: BehaviorSubject<EventWithPictureModel[]> = new BehaviorSubject<EventWithPictureModel[]>([]);

  private expiredEvents$: BehaviorSubject<EventWithPictureModel[]> = new BehaviorSubject<EventWithPictureModel[]>([]);

  private events$: BehaviorSubject<EventWithPictureModel[]> = new BehaviorSubject<EventWithPictureModel[]>([]);
  private winner$: BehaviorSubject<WinnerModel[]> = new BehaviorSubject<WinnerModel[]>([]);

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
  setEventObs(event: EventWithPictureModel[]) {
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

  setExpiredEvents(expiredEvents: EventWithPictureModel[]) {
    this.expiredEvents$.next(expiredEvents);
  }

  getExpiredEvents(): Observable<EventWithPictureModel[]> {
    return this.expiredEvents$.asObservable();
  }


  separateActualAndFutureEvents(events: EventWithPictureModel[]) {
    let actualEvents: EventWithPictureModel[] = [];
    let futureEvents: EventWithPictureModel[] = [];
    let expiredEvents: EventWithPictureModel[] = [];
    events.forEach((event) => {
      let currentDateTime = new Date();
      let registrationDate = new Date(event.registrationDate);
      let eventDate = new Date(event.eventDate);
      let deadline = new Date(event.deadline);
      if (registrationDate.toISOString() <= currentDateTime.toISOString() && deadline.toISOString() > currentDateTime.toISOString()) {
        actualEvents.push(event);
      } else if (registrationDate.toISOString() > currentDateTime.toISOString()) {
        futureEvents.push(event);
      } else if (deadline.toISOString() < currentDateTime.toISOString() && eventDate.toISOString() > currentDateTime.toISOString()) {
        expiredEvents.push(event);
      }
    })
    console.log(expiredEvents);
    this.setActualEvents(actualEvents);
    this.setFutureEvents(futureEvents);
    this.setExpiredEvents(expiredEvents);
  }

  //manage state of winners within the application
  setWinner(winner: WinnerModel[]) {
    this.winner$.next(winner);
  }

  getWinner(): Observable<WinnerModel[]> {
    return this.winner$.asObservable();
  }

}
