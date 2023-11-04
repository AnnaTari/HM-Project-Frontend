import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminModel} from "../shared/models/admin.model";

@Injectable({
  providedIn: 'root'
})
export class AdminApi {
  private endpoint = '/api/admin';

  constructor(private httpClient: HttpClient) {
  }

  public login(admin: { adminName: string, adminPassword: string }): Observable<AdminModel> {
    console.log("Vor Abschicken" + admin.adminName, admin.adminPassword);
    return this.httpClient.post <AdminModel>(this.endpoint, admin);
  }
}
