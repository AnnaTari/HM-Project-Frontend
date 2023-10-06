import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl: string

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.usersUrl);
  }

  public save(user: UserModel) {
    return this.http.post<UserModel>(this.usersUrl, user);
  }
}
