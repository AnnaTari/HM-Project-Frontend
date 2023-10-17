import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../shared/services/user.service";
import {UserModel} from "../shared/models/user.model";

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

  constructor(private userService: UserService) {
  }

  onSubmit() {
    let user = {
      id: null,
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.userService.save(<UserModel>user);
  }
}
