import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CurrentStateService} from "../shared/services/current-state.service";
import {AdminApi} from "../api/admin.api";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  messageShow = new BehaviorSubject<boolean>(true);

  constructor(private router: Router, private currentStateService: CurrentStateService, private adminApi: AdminApi) {
  }

  onSubmit() {
    console.log("Anfrage abgeschickt")
    let admin: { adminName: string, adminPassword: string } = {
      adminName: this.loginForm.value.username!,
      adminPassword: this.loginForm.value.password!
    }
    this.adminApi.login(admin).subscribe((admin) => {
      //need to check why admin_id comes written like this from backend
      if (admin.admin_id != null) {
        this.messageShow.next(true);
        this.router.navigate(['admin-edit']);
        this.currentStateService.setAdminObs(admin);
      } else {
        this.messageShow.next(false);
      }
    })
  }
}
