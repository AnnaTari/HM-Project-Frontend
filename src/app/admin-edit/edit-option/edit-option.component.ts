import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventApi} from "../../api/event.api";
import {EventModel} from "../../shared/models/event.model";
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "../../shared/components/pop-up/pop-up.component";
import {PopupActionModel} from "../../shared/models/popup-action.model";
import {CurrentStateService} from "../../shared/services/current-state.service";

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.css'],
})
export class EditOptionComponent {
  @Input()
  event: EventModel = {
    eventDate: new Date(),
    eventHsvId: 0,
    adminId: 0,
    deadline: new Date(),
    location: "",
    matchDetails: "",
    matchName: "",
    picture: null,
    registrationDate: new Date(),
    ticketAmount: 0,
    ticketType: 0,
  };

  deleteText: string = "Möchten Sie dieses Event wirklich löschen?";

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private eventApi: EventApi, private currentStateService: CurrentStateService) {
  }

  openDialog() {
    const segments = this.route.snapshot.url.map(segments => segments.path);
    let dialogRef = this.dialog.open(PopUpComponent, {
      data: {action: false, message: this.deleteText, route: segments},
    });

    dialogRef.afterClosed().subscribe((result: PopupActionModel) => {
      if (result.action) {
        this.eventApi.deleteEvent(this.event).subscribe(
          (events) => this.currentStateService.separateActualAndFutureEvents(events));
      }
    });
  }

  editEvent() {

  }
}
