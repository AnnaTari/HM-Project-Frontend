import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  private admin$: BehaviorSubject<UserModel>= new BehaviorSubject<UserModel>({admin_id: 0, adminname: "", password: ""});

  constructor() {
  }

  setAdminObs(admin: UserModel) {
    this.admin$.next(admin);
  }

  getAdminObs() {
    return this.admin$.asObservable();
  }
}
