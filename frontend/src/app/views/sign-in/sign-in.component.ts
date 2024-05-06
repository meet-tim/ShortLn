import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmInputDirective } from '../../core/components/ui-input-helm/src/lib/hlm-input.directive';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HlmLabelDirective } from '../../core/components/ui-label-helm/src/lib/hlm-label.directive';
import { HlmCheckboxComponent } from '../../core/components/ui-checkbox-helm/src/lib/hlm-checkbox.component';
import { HlmButtonDirective } from '../../core/components/ui-button-helm/src/lib/hlm-button.directive';

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
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);

  singInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  signInFormSubscription!: Subscription;
  checkboxValue = false;

  ngOnInit(): void {
    this.signInFormSubscription = this.singInForm.valueChanges.subscribe(
      (value) => {
        console.log({ rememberMe: this.checkboxValue, ...value });
      }
    );
  }

  ngOnDestroy(): void {
    this.signInFormSubscription.unsubscribe();
  }

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
      console.log(this.singInForm.controls.email.invalid);
      console.log(this.singInForm.controls.password.invalid);
      this.singInForm.markAllAsTouched();
      return;
    }
    console.log({ rememberMe: this.checkboxValue, ...this.singInForm.value });
  }
}
