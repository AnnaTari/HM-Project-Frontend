import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "../components/pop-up/pop-up.component";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MatDialogService {

  constructor(public dialog: MatDialog) {
  }

  openDialogWithVariableText(text: string): void {
    this.dialog.open(PopUpComponent, {
      data: {dynamicText: text} // Pass the variable text as data
    });
      }
}
