import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {EventModel} from "../shared/models/event.model";
import {EventApi} from "../api/event.api";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private eventApi: EventApi) { }

  getDataFromBackend():Observable<any> {
    return new BehaviorSubject({id:2 , title:"Endlich"})
  }
}
