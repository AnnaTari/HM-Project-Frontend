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

  public addEvent(event: EventModel) {
    return this.httpClient.post<EventModel[]>(this.endpoint + "/addEvent", event);
  }

  public deleteEvent(event: EventModel) {
    return this.httpClient.post<EventModel[]>(this.endpoint + "/deleteEvent", event);
  }
}
