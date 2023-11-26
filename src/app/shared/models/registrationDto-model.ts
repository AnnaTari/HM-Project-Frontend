import {EmployeeModel} from "./employee.model";

export interface RegistrationDtoModel{

  employee: EmployeeModel;
  eventHsvId: number;
  escortName:string;
  winner:boolean;
  substituteWinner: boolean;

}
