import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AdminApi {
  private endpoint = '/api/admin';

  constructor(private httpClient: HttpClient) {
  }

  public check(admin: any) {
    console.log("Vor Abschicken" + admin.adminName, admin.adminPassword);
    let response = this.httpClient.post <UserModel>(this.endpoint, admin);
    response.subscribe((data) => console.log(data));
  }


}
