import { Routes } from '@angular/router';
import { checkAuthGuard } from './core/guards/check-auth.guard';
import { LinksComponent } from './views/links/links.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { AllLinksComponent } from './views/links/views/all/all.component';
import { LinksRootComponent } from './views/links/views/links-root/links-root.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'links',
    component: LinksComponent,
    canActivate: [checkAuthGuard],
    children: [
      { path: '', pathMatch: 'full', component: LinksRootComponent },
      { path: 'all', pathMatch: 'full', component: AllLinksComponent },
    ],
  },
  { path: '**', redirectTo: 'sign-in' },
];
