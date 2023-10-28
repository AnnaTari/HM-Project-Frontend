import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserModel} from "../models/user.model";
import {EventModel} from "../models/event.model";
import {Time} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  private admin$: BehaviorSubject<UserModel>= new BehaviorSubject<UserModel>({admin_id: 0, adminname: "", password: ""});
  private events$: BehaviorSubject<EventModel>= new BehaviorSubject<EventModel>({eventHsvId: 0, adminId: 0, matchName: "", matchDetails: "", eventDate: Date, eventTime: Time, location:"", picture:File, deadline: Date, ticketType: 0, ticketAmount: 0, registrationDate: Date});
  constructor() {
  }

  setAdminObs(admin: UserModel) {
    this.admin$.next(admin);
  }

  getAdminObs() {
    return this.admin$.asObservable();
  }

  //Events




  setEventObs(event: EventModel) {
    this.events$.next(event);
  }

  getEventObs() {
    return this.events$.asObservable();
  }
}
