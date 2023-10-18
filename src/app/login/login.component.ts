import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserApi} from "../api/user.api";
import {UserModel} from "../shared/models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private userService: UserApi, private router: Router) {
  }

  onSubmit() {
    let user = {
      id: null,
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.userService.check(<UserModel>user);
    this.router.navigate(['admin-edit']);
  }
}
