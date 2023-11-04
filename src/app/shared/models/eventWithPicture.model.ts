export interface EventWithPictureModel {
  eventHsvId: number,
  adminId: number,
  matchName: string,
  matchDetails: string,
  eventDate: Date,
  location: string,
  deadline: Date,
  ticketType: number,
  ticketAmount: number,
  registrationDate: Date,
  picture: Uint8Array;
}
