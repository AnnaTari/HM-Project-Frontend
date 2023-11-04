import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventModel} from "../shared/models/event.model";


@Injectable({
  providedIn: 'root'
})
export class EventApi {
  private endpoint = 'api/events';

  constructor(private httpClient: HttpClient) {
  }

  public check() {
    let response = this.httpClient.get<EventModel[]>(this.endpoint);
    response.subscribe((data => console.log(data)))
    return response;
  }

  //I sent it to the endpoint /addEvent
  //When I use EventModel as typescript class in JSON stringify I get {"isTrusted":true}
  //-->maybe the properties of EventModel aren't enumerable. That's why I am using a plain object of event
  public addEvent(event: any, byteArray: number[]) {
    const eventJson = JSON.stringify(event);
    console.log(eventJson)
    const formData = new FormData();
    formData.append('event', new Blob([eventJson], {
      type: "application/json"
    }));
    formData.append('picture', new Blob([new Uint8Array(byteArray)], {
      type: "application/octet-stream"
    }));
    return this.httpClient.post<EventModel[]>(this.endpoint + "/addEvent", formData);
  }

  public deleteEvent(event: EventModel) {
    return this.httpClient.post<EventModel[]>(this.endpoint + "/deleteEvent", event);
  }

}
