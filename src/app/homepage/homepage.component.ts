import { Component } from '@angular/core';
import { match } from '../futurematchdata';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  matches : match [] = [
    {opponent: 'Düsseldorf', date: new Date('2023-12-05')},
    {opponent: 'Schalke', date: new Date('2023-12-18')},
    {opponent: 'Hannover', date: new Date('2024-01-24')},
  ]
}
