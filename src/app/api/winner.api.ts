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
  public startLottery(event: EventModel) {
    let response = this.httpClient.post<WinnerModel[]>(this.endpoint, event.eventHsvId);
    response.subscribe((data => console.log(data)))
    return response;
  }

}
