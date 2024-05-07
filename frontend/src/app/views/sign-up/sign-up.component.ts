import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { HlmInputDirective } from '../../core/components/ui-input-helm/src/lib/hlm-input.directive';
import { IUserSignUpDetails } from '../../core/services/auth/auth.interface';
import { AuthService } from '../../core/services/auth/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    HlmInputDirective,
    ReactiveFormsModule,
    CommonModule,
    HlmButtonDirective,
    RouterLink,
  ],
  providers: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  signUpMutation = injectMutation(() => ({
    mutationFn: (signUpDetails: IUserSignUpDetails) =>
      this.authService.signUp(signUpDetails),
    onSuccess: () => {
      toast('Sign up successful', {
        description:
          'You have successfully signed up 🎉🎉🎉 Use your email and password to sign in',
        action: {
          label: 'Ok',
          onClick: () => null,
        },
      });
      this.router.navigate(['/sign-in']);
    },
    onError: (error) => {
      console.log(error);
      toast('Sign up unsuccessful', {
        description: 'Sign up was unsuccessful, try singing up again',
        action: {
          label: 'Ok',
          onClick: () => null,
        },
      });
    },
  }));

  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (
      this.signUpForm.controls.email.invalid &&
      this.signUpForm.controls.password.invalid
    ) {
      console.log(this.signUpForm.controls.email.invalid);
      console.log(this.signUpForm.controls.password.invalid);
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.signUpMutation.mutate({
      email: this.signUpForm.controls.email.value ?? '',
      password: this.signUpForm.controls.password.value ?? '',
      firstname: this.signUpForm.controls.firstName.value ?? '',
      lastname: this.signUpForm.controls.lastName.value ?? '',
    });
  }
}
