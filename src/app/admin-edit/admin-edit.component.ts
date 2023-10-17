import { Component } from '@angular/core';
import {EventModel} from "../shared/models/event.model";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent {

   actualEvents: EventModel[] = [
    {id: 1, title:'Superman'},
    {id: 2, title:'Batman'},
    {id: 5, title:'BatGirl'},
    {id: 3, title:'Robin'},
    {id: 4, title:'Flash'}
  ];

  futureEvents: EventModel[] = [
    {id: 1, title:'HSV'},
    {id: 2, title:'Football'},
    {id: 5, title:'BatGivxf'},
    {id: 3, title:'Robinfdv'},
    {id: 4, title:'Flashfxv'}
  ];
}
