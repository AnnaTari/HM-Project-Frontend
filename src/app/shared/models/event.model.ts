export interface EventModel {
  eventHsvId: number,
  adminId: number,
  match_name: string,
  matchDetails: string,
  eventDate: Date,
  location: string,
  //picture: File,
  deadline: Date,
  ticketType: number,
  ticketAmount: number,
  registrationDate: Date,
}
