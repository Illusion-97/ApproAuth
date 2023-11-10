import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../validators/Validators";
import {getControl} from "../../tools/ReactiveFormTools";
import {AuthService} from "../../services/auth.service";
import {RegisterFromValue} from "../../models/register-from-value";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading: boolean = false;
  err: any = undefined;
  passwordControl: FormControl<string> = new FormControl<string>("", {
    nonNullable: true,
    validators: [Validators.required]
  });
  confirmPasswordControl: FormControl<string> = new FormControl<string>("", {
    nonNullable: true,
    validators: [Validators.required, MustMatch(this.passwordControl)]
  });

  form: FormGroup = new FormGroup<any>({
    firstName: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl<string>("", {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: this.passwordControl
  });

  constructor(private service: AuthService, private router: Router) {
  }

  handleSubmit() {
    this.form.markAllAsTouched()
    if (this.confirmPasswordControl.valid && this.form.valid) {
     this.service.register(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/login'])
        },
        error: err => {
          this.err = err;
        }
      })
    }
  }

  getControl(name: string) {
    return name === 'confirmPassword' ? this.confirmPasswordControl : getControl(this.form, name)
  }

  isInvalid(control: string) {
    const c = this.getControl(control);
    return c ? c.touched && c.invalid : true
  }

  hasError(control: string, code: string) {
    const c = this.getControl(control);
    return c ? c.touched && c.hasError(code) : true
  }

  getError(control: string) {
    const c = this.getControl(control);
    const controlErrors = c ? c.errors ?? {} : {}
    const errors: any[] = []
    Object.keys(controlErrors).map(value => errors.push(controlErrors[value]))
    return errors;
  }
}
