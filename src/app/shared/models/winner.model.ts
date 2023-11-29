//structure of winner model with data types
export interface WinnerModel {
  employeeId: number,
  eventHsvId: number,
  blacklistId: number,
  name: string,
  email: string,
  escortName: string,
  winner: boolean,
  substituteWinner: boolean,
  blacklistCounter: number,
  ticketAmount:number,
}
