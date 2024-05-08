import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { HlmButtonDirective } from '../../core/components/ui-button-helm/src/lib/hlm-button.directive';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [HlmButtonDirective, CommonModule],
  providers: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
})
export class LinksComponent {
  httpClient = inject(HttpClient);
}
