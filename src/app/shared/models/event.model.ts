export interface EventModel {
  eventHsvId: number,
  adminId: number,
  matchName: string,
  matchDetails: string,
  eventDate: Date,
  location: string,
  picture: File | null,
  deadline: Date,
  ticketType: number,
  ticketAmount: number,
  registrationDate: Date,
}
