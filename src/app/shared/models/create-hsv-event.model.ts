export interface CreateHsvEventModel{
  gameTitle: string,
  gameDate: Date,
  gameTime: String,
  gamePlace: String, //Ort des Spieks
  registrationDeadline: Date, // Frist zur Anmeldung
  ticketAmount: number, // Anzahl der Tickets
  ticketKind: number, //wie viele Leute dann gehen können 2er Tickets
  //gamePicture:
}
