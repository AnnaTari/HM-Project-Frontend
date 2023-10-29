import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {EventModel} from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  private admin$: BehaviorSubject<UserModel>= new BehaviorSubject<UserModel>({admin_id: 0, adminname: "", password: ""});
  private events$: BehaviorSubject<EventModel[]>= new BehaviorSubject<EventModel[]>([]);
   constructor() {
  }

  setAdminObs(admin: UserModel) {
    this.admin$.next(admin);
  }

  getAdminObs() {
    return this.admin$.asObservable();
  }

  //Events
  setEventObs(event: EventModel[]) {
    this.events$.next(event);
  }

  getEventObs() : Observable<EventModel[]>{
    return this.events$.asObservable();
  }
}
