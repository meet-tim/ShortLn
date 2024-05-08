import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserProfileResponse } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpClient = inject(HttpClient);

  fetchUserProfile() {
    return lastValueFrom<UserProfileResponse>(
      this.httpClient.get<UserProfileResponse>(
        `${environment.apiUrl}/auth/profile`
      )
    );
  }
}
