import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CurrentStateService} from "../shared/services/current-state.service";
import {UserModel} from "../shared/models/user.model";
import {AdminApi} from "../api/admin.api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  messageShow: boolean = true;

  adminUser: UserModel = {
    adminId: 0,
    adminName: "",
    adminPassword: ""
  }

  constructor(private currentStateService: CurrentStateService, private router: Router) {
  }

  ngOnInit() {
    this.currentStateService.getAdmin().subscribe((data) => this.adminUser = data);
  }

  onSubmit() {
    console.log("Anfrage abgeschickt")
    let admin: { adminName: string, adminPassword: string } = {
      adminName: this.loginForm.value.username!,
      adminPassword: this.loginForm.value.password!
    }
    this.currentStateService.setAdmin(admin);
    console.log("Hallo")
    console.log("ifi")
    console.log(this.adminUser);
    /*
if () {
  console.log("richtig")
  this.messageShow = true;
  this.router.navigate(['admin-edit']);
} else {
  console.log("falsch")
  this.messageShow = false;
}

 */
  }
}
