import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WinnerModel} from "../shared/models/winner.model";
import {EventModel} from "../shared/models/event.model";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";
import {share} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class WinnerApi {
  private endpoint = 'api/winner';

  constructor(private httpClient: HttpClient) {

  }

//startLottery method
  public startLottery(event: EventWithPictureModel) {
    let response = this.httpClient.post<WinnerModel[]>(this.endpoint, event.eventHsvId).pipe(share());
    response.subscribe((data => console.log(data)));
    return response;
  }

}
