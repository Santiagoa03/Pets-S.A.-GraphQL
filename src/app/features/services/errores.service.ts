import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  getErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    if (control && control.invalid && control.touched) {
      if (control?.errors?.['required']) {
        return 'Este campo es obligatorio';
      } else if (control?.errors?.['pattern']) {
        return 'El formato del campo es incorrecto';
      } else if (control?.errors?.['maxLength']) {
        return `La longitud máxima permitida es ${control.errors['maxLength'].requiredLength}`;
      }
    }
    return '';
  }
}
