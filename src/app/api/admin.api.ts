import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../shared/models/user.model";
import {Observable} from "rxjs";
import {CurrentStateService} from "../shared/services/current-state.service";

@Injectable({
  providedIn: 'root'
})
export class AdminApi {
  private endpoint = '/api/admin';

  constructor(private httpClient: HttpClient) {
  }

  public getAdmin(admin: { adminName: string, adminPassword: string }) {
    console.log("Vor Abschicken" + admin.adminName, admin.adminPassword);
    return this.httpClient.post <UserModel>(this.endpoint, admin);
  }


}
