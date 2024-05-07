import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { toast } from 'ngx-sonner';
import { HlmButtonDirective } from '../../core/components/ui-button-helm/src/lib/hlm-button.directive';
import { HlmCheckboxComponent } from '../../core/components/ui-checkbox-helm/src/lib/hlm-checkbox.component';
import { HlmInputDirective } from '../../core/components/ui-input-helm/src/lib/hlm-input.directive';
import { HlmLabelDirective } from '../../core/components/ui-label-helm/src/lib/hlm-label.directive';
import { IUserLogInDetails } from '../../core/services/auth/auth.interface';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    HlmInputDirective,
    ReactiveFormsModule,
    CommonModule,
    HlmLabelDirective,
    HlmCheckboxComponent,
    HlmButtonDirective,
    CommonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private response!: string | Error;
  checkboxValue = false;

  singInMutation = injectMutation(() => ({
    mutationFn: (logInDetails: IUserLogInDetails) =>
      this.authService.signIn(logInDetails),
    onSuccess: (data) => {
      this.response = data.access_token;
    },
    onError: (error) => {
      this.response = error;
      console.error(error);
      toast('Error logging in', {
        description: 'Check your email and password and try again',
        action: {
          label: 'Close',
          onClick: () => null,
        },
      });
    },
  }));

  singInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onCheckboxChange(event: unknown) {
    this.checkboxValue = event as boolean;
    this.singInForm.updateValueAndValidity();
  }

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (
      this.singInForm.controls.email.invalid &&
      this.singInForm.controls.password.invalid
    ) {
      this.singInForm.markAllAsTouched();
      return;
    }

    this.singInMutation.mutate({
      email: this.singInForm.controls.email.value ?? '',
      password: this.singInForm.controls.password.value ?? '',
    });
  }
}
