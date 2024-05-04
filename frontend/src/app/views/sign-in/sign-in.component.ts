import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  formBuilder = inject(FormBuilder);

  singInForm = this.formBuilder.group({
    email: [''],
    password: [''],
  });
}
