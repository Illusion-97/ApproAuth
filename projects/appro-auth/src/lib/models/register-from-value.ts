import {FormControl, FormGroup} from "@angular/forms";

export interface RegisterFromValue {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface RegisterFromStructure { // Permet d'assurer la structure d'un formulaire en vue d'obtenir une valeur structurée
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  email: FormControl<string>,
  password: FormControl<string>
}

export function getRegisterForm() : FormGroup<RegisterFromStructure> | null {
  return null;
}
