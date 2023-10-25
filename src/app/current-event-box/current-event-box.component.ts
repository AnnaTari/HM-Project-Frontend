import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-current-event-box',
  templateUrl: './current-event-box.component.html',
  styleUrls: ['./current-event-box.component.css']
})
export class CurrentEventBoxComponent {

  constructor (private router: Router) { }
  navigateToEventPage() {
    this.router.navigate(['./event-page']);
  }

 @Input()
  event:string= "";

}
