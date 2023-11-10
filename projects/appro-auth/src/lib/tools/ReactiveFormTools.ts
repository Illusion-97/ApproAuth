import {FormGroup} from "@angular/forms";

export const getControl = (form: FormGroup, name: string) => {
  return form.controls[name];
}

export const isInvalid = (form: FormGroup, name: string) => {
  const control = getControl(form,name);
  return control ? control.touched && control.invalid : true;
}

export const hasError = (form: FormGroup, name: string, errorCode: string) => {
  const control = getControl(form,name);
  return control ? control.touched && control.hasError(errorCode) : true;
}
