import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserApi {
  private endpoint = '/api/users';

  constructor(private httpClient: HttpClient) {
  }

  public check(user: UserModel) {
    let response = this.httpClient.get<UserModel>(this.endpoint);
    response.subscribe((data)=>console.log(data));
  }


}
