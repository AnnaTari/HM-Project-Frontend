import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs";
import {EmployeeModel, UserModel} from "../models/user.model";

import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {EventModel} from "../models/event.model";


@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  private admin$: BehaviorSubject<UserModel>= new BehaviorSubject<UserModel>({admin_id: 0, adminname: "", password: ""});

  private employee$: BehaviorSubject<EmployeeModel>= new BehaviorSubject<EmployeeModel>({employee_id: 0, employeename: "", email: ""});

  constructor() {

  private events$: BehaviorSubject<EventModel[]>= new BehaviorSubject<EventModel[]>([]);
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

  //Events
  setEventObs(event: EventModel[]) {
    this.events$.next(event);
  }

  getEventObs() : Observable<EventModel[]>{
    return this.events$.asObservable();

  }
}
