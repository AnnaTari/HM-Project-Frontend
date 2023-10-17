import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'http://localhost:8080/findAllUsers';

  constructor(private httpClient: HttpClient) {
  }

  public save(user: UserModel) {
    let response = this.httpClient.get<UserModel>(this.endpoint);
    response.subscribe((data)=>console.log(data));
  }


}
