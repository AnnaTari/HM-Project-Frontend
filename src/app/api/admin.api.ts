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

  //login method that sends username and password to the localhost: 8200
  public login(admin:AdminModel): Observable<AdminModel> {
    return this.httpClient.post <AdminModel>(this.endpoint, admin);
  }
}
