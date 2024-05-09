import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [HeaderComponent, HlmLabelDirective, HlmSwitchComponent],
  providers: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
})
export class LinksComponent {
  links = [
    { url: 'https://www.konadu.dev' },
    { url: 'https://www.konadu.dev' },
    { url: 'https://www.konadu.dev' },
    { url: 'https://www.konadu.dev' },
    { url: 'https://www.konadu.dev' },
    { url: 'https://www.konadu.dev' },
    { url: 'https://www.konadu.dev' },
    { url: 'https://www.konadu.dev' },
  ];
  onCheckboxChange(value: boolean) {
    console.log(value);
  }
}
