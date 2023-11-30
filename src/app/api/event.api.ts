import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventModel} from "../shared/models/event.model";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EventApi {
  private endpoint = 'api/events';

  constructor(private httpClient: HttpClient) {
  }

  //Get all events from the backend
  public getAllEvents(): Observable<EventWithPictureModel[]> {
    let response = this.httpClient.get<EventWithPictureModel[]>(this.endpoint);
    response.subscribe((events => console.log(events)))
    return response;
  }

  //Sends the created event to the backend endpoint: api/events/addEvent
  public addEvent(event: any, byteArray: number[]) {
    const formData = this.createFormData(event, byteArray);
    return this.httpClient.post<EventWithPictureModel[]>(this.endpoint + "/addEvent", formData);
  }

  public updateEvent(event: any, byteArray: number[]) {
    const formData = this.createFormData(event, byteArray);
    return this.httpClient.post<EventWithPictureModel[]>(this.endpoint + "/updateEvent", formData);
  }

  public deleteEvent(event: EventModel) {
    return this.httpClient.post<EventWithPictureModel[]>(this.endpoint + "/deleteEvent", event);
  }

  private createFormData(event: any, byteArray: number[]) {
    //When I use EventModel as typescript class in JSON stringify I get {"isTrusted":true}
    //-->That's why I am using a plain object of event
    const eventJson = JSON.stringify(event);
    console.log(eventJson)
    const formData = new FormData();
    //Appending to formData separately because picture and event have different types
    formData.append('event', new Blob([eventJson], {
      type: "application/json"
    }));
    formData.append('picture', new Blob([new Uint8Array(byteArray)], {
      type: "application/octet-stream"
    }));
    return formData;
  }


}
