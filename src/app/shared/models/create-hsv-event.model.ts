export interface CreateHsvEventModel{
  gameTitle: string,
  gameDate: Date,
  gameTime: String,
  gamePlace: String, //Ort des Spieks
  ticketAmount: number, // Anzahl der Tickets
  ticketKind: number, //wie viele Leute dann gehen können 2er Tickets
  registrationDeadline: Date, // Frist zur Anmeldung
  gamePicture: File, //Bild welches der Eventbeschreibung beigefügt wird
}
