import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  message:string="";
  constructor(private appService:AppService) {
    this.appService.getMessage.subscribe(msg => this.message = msg);;
  }

  ngOnInit(): void {
  }

  updateMessage(){
    this.appService.setMessage('This is updated msg from test component.');
  }

}
