import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HlmInputDirective } from '../../core/components/ui-input-helm/src/lib/hlm-input.directive';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    HlmInputDirective,
    ReactiveFormsModule,
    CommonModule,
    HlmButtonDirective,
  ],
  providers: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);

  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  signInFormSubscription!: Subscription;

  ngOnInit(): void {
    this.signInFormSubscription = this.signUpForm.valueChanges.subscribe(
      (value) => {
        console.log({ ...value });
      }
    );
  }

  ngOnDestroy(): void {
    this.signInFormSubscription.unsubscribe();
  }

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
    console.log({ ...this.signUpForm.value });
  }
}
