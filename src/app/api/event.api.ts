import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  public addEvent(event: EventModel, byteArray: number[]) {
    const formData = new FormData();
    formData.append('event', new Blob([JSON.stringify(event)], {
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

  public test(formData: FormData) {
    return this.httpClient.post(this.endpoint + "/test", formData).subscribe();
  }
}
