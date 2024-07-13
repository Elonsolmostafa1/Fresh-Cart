// implement

import { AbstractControl, ValidationErrors } from '@angular/forms';

export let passwordMatch = (
  control: AbstractControl
): ValidationErrors | null => {
  // register form
  let { password, rePassword } = control.value;
  
  return password == rePassword && password && rePassword
    ? null
    : { passwordMismatch: true };
};
