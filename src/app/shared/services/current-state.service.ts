import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AdminApi} from "../../api/admin.api";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  public admin$= new BehaviorSubject<UserModel>({adminId: 0, adminName: "", adminPassword: ""});

  constructor(private adminApi: AdminApi) {
  }

  setAdmin(admin: { adminName: string, adminPassword: string }) {
    this.adminApi.getAdmin(admin).subscribe((admin)=>this.admin$.next(admin));
  }

  getAdmin() {
    return this.admin$.asObservable();
  }
}
