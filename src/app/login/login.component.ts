import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminApi} from "../api/admin.api";
import {UserModel} from "../shared/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private userService: AdminApi, private router: Router) {
  }

  onSubmit() {
    let admin = {
      adminName: this.loginForm.value.username!,
      adminPassword: this.loginForm.value.password!
    }
    this.userService.check(admin);
    this.router.navigate(['admin-edit']);
  }
}
