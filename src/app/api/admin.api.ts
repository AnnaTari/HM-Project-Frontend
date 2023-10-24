import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../shared/models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminApi {
  private endpoint = '/api/admin';

  constructor(private httpClient: HttpClient) {
  }

  public login(admin: { adminName: string, adminPassword: string }): Observable<UserModel> {
    console.log("Vor Abschicken" + admin.adminName, admin.adminPassword);
    return this.httpClient.post <UserModel>(this.endpoint, admin);
  }
}
