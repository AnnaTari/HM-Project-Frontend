import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-current-event-box',
  templateUrl: './current-event-box.component.html',
  styleUrls: ['./current-event-box.component.css']
})
export class CurrentEventBoxComponent {
 @Input()
  event:string= "";

}
