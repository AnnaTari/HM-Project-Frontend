import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EmployeeModel} from "../shared/models/admin.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class EmployeeApi {
  private endpoint = '/api/employee';
  constructor(private httpClient: HttpClient) {
  }

  public login(employee: { name: string; email: string }): Observable<EmployeeModel> {
    console.log("Vor Abschicken" + employee.name, employee.email);
    return this.httpClient.post <EmployeeModel>(this.endpoint, employee);
  }
}


