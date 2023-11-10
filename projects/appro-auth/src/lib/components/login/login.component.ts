import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getControl} from "../../tools/ReactiveFormTools";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading: boolean = false
  form : FormGroup = new FormGroup<any>({
    email : new FormControl<string>("", {nonNullable: true, validators: [Validators.email, Validators.required]}),
    password : new FormControl<string>("", Validators.required)
  })

  constructor(private service: AuthService) {
  }

  handleLogin() {
    this.form.markAllAsTouched()
    if(this.form.valid) {
      this.service.login(this.form.value).subscribe({
        next : username => {
          console.log(username)
        },
        error : err => {
          console.log(err.error)}
      })
    }
  }

  getControl(name: string) {
    return this.form.controls[name];
  }

  isInvalid(name: string) {
    const control = this.getControl(name);
    return control ? control.touched && control.invalid : true;
  }

  hasError(name: string, errorCode: string) {
    const control = this.getControl(name);
    return control ? control.touched && control.hasError(errorCode) : true;
  }
}
