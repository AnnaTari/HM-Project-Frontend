import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WinnerModel} from "../shared/models/winner.model";
import {EventModel} from "../shared/models/event.model";


@Injectable({
  providedIn: 'root'
})
export class WinnerApi {
  private endpoint = 'api/winner';

  constructor(private httpClient: HttpClient) {

  }
  public findAllParticipants() {
    let response = this.httpClient.get<WinnerModel[]>(this.endpoint);
    response.subscribe((data => console.log(data)))
    return response;
  }

  public nameWinner() {

  }


}
