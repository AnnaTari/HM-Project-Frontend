import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EmployeeModel} from "../shared/models/employee.model";
import {Observable} from "rxjs";
import {RegistrationDtoModel} from "../shared/models/registrationDto-model";
import {FormControl, ɵValue} from "@angular/forms";
import {EventModel} from "../shared/models/event.model";
import {EventWithPictureModel} from "../shared/models/eventWithPicture.model";

@Injectable({
  providedIn: 'root'
})

export class EmployeeApi {
  private endpoint = '/api/employee';

  constructor(private httpClient: HttpClient) {
  }

  public participate(registrationDtoModel: RegistrationDtoModel): Observable<EmployeeModel> {
    console.log(registrationDtoModel.escortName, registrationDtoModel.eventHsvId);
    return this.httpClient.post<EmployeeModel>(this.endpoint, registrationDtoModel);
  }

}


