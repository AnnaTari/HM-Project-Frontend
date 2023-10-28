import {Time} from "@angular/common";

export interface EventModel {
  eventHsvId: number |null,
  adminId: number,
  matchName: string,
  matchDetails: string,
  eventDate: Date,
  eventTime: Time,
  location: string,
  picture: File,
  deadline: Date,
  ticketType: number,
  ticketAmount: number,
  registrationDate: Date,
}
