import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

// Reçois en paramètre un Control dont la valeur doit être égale à celle du control auquel sera appliqué ce validateur
export function MustMatch(matchingControl: AbstractControl) : ValidatorFn {
  return (control : AbstractControl) : ValidationErrors | null => {
    return control.value !== matchingControl.value ? {mustmatch : {value: control.value}} : null
  }
}
