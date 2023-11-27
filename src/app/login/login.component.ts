import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CurrentStateService} from "../shared/services/current-state.service";
import {AdminApi} from "../api/admin.api";
import {BehaviorSubject} from "rxjs";
import {AdminModel} from "../shared/models/admin.model";
import {AuthService} from "../shared/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Form for logging in as an Admin
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  //Boolean value if the message should show that you logged in with false credentials
  messageShow = new BehaviorSubject<boolean>(true);

  constructor(private router: Router, private currentStateService: CurrentStateService, private adminApi: AdminApi, private authService: AuthService) {
  }

  onSubmit() {
    let admin: AdminModel = {
      adminId: 0,
      adminName: this.loginForm.value.username!,
      adminPassword: this.loginForm.value.password!
    }
    this.adminApi.login(admin).subscribe((admin) => {
      //checks if an admin with these credentials exists
      if (admin.adminId != null) {
        this.messageShow.next(true);
        this.router.navigate([this.authService.redirectUrl]);
        this.currentStateService.setAdminObs(admin);
        this.authService.login();
      } else {
        this.messageShow.next(false);
      }
    })
  }
}
