import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserApi {
  private endpoint = '/api/admin';

  constructor(private httpClient: HttpClient) {
  }

  public check(user: UserModel) {
    console.log("Vor Abschicken");
    let response = this.httpClient.post <UserModel>(this.endpoint, user);
    response.subscribe((data)=>console.log(data));
  }


}
