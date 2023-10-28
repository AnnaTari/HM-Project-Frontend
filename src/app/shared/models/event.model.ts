import {Time} from "@angular/common";

export interface EventModel {
  eventHsvId: number,
  eventTypeId: number,
  adminId: number,
  matchName: string,
  matchDetails: string,
  eventDate: Date,
  eventTime: Time,
  location: string,
  picture: File,
  deadline: Date,
  ticketAmount: number,
  registrationDate: Date,
}
