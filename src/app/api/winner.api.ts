import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WinnerModel} from "../shared/models/winner.model";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";
import {share} from "rxjs/operators";

//class injected in root level
@Injectable({
  providedIn: 'root'
})
export class WinnerApi {

  private endpoint = 'api/winner'; //set endpoint for api calls

  constructor(private httpClient: HttpClient) { //inject httpClient to make requests

  }

//startLottery method and make HTTP POST request to the endpoint and provide response
  public startLottery(event: EventWithPictureModel) {
    let response = this.httpClient.post<WinnerModel[]>(this.endpoint, event.eventHsvId).pipe(share());
    response.subscribe((data => console.log(data)));
    return response;
  }

}
