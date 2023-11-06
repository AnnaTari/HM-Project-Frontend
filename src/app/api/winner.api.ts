import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WinnerModel} from "../shared/models/winner.model";


@Injectable({
  providedIn: 'root'
})
export class WinnerApi {
  private endpoint = 'api/winner';

  constructor(private httpClient: HttpClient) {

  }
 /* public check() {
    let response = this.httpClient.get<WinnerModel[]>(this.endpoint);
    return response;
  }*/
}
