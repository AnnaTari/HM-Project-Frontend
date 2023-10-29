import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {EmployeeModel, UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  private admin$: BehaviorSubject<UserModel>= new BehaviorSubject<UserModel>({admin_id: 0, adminname: "", password: ""});
  private employee$: BehaviorSubject<EmployeeModel>= new BehaviorSubject<EmployeeModel>({employee_id: 0, employeename: "", email: ""});

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
}
