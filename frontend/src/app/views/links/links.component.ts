import { Component, inject } from '@angular/core';
import { HlmButtonDirective } from '../../core/components/ui-button-helm/src/lib/hlm-button.directive';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [HlmButtonDirective, CommonModule],
  providers: [DatePipe],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
})
export class LinksComponent {
  httpClient = inject(HttpClient);
  datePipe = inject(DatePipe);

  profileMutation = injectMutation(() => ({
    mutationFn: () =>
      lastValueFrom<{ sub: string; email: string; iat: number; exp: number }>(
        this.httpClient.get<{
          sub: string;
          email: string;
          iat: number;
          exp: number;
        }>(`${environment.apiUrl}/auth/profile`)
      ),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  }));

  onBtnClick() {
    this.profileMutation.mutate();
  }

  transformDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return this.datePipe.transform(date, 'full');
  }
}
