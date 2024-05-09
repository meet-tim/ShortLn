import { Component, WritableSignal, signal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component'; 
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { toast } from 'ngx-sonner';
import { HlmButtonDirective } from '../../core/components/ui-button-helm/src/lib/hlm-button.directive';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [
    HeaderComponent,
    HlmLabelDirective,
    HlmSwitchComponent,
    HlmButtonDirective,
  ],
  providers: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
})
export class LinksComponent {
  links: WritableSignal<{ longUrl: string; shortenedUrl: string }[]> = signal([
    {
      longUrl: 'https://www.konadu.dev/sdaklf;dsfjksdafsd;kffalfsdfsadklfj',
      shortenedUrl: 'https://www.konadu.dev',
    },
    {
      longUrl: 'https://www.konadu.dev/sdaklf;dsfjksdafsd;kffalfsdfsadklfj',
      shortenedUrl: 'https://www.konadu.dev',
    },
    {
      longUrl: 'https://www.konadu.dev/sdaklf;dsfjksdafsd;kffalfsdfsadklfj',
      shortenedUrl: 'https://www.konadu.dev',
    },
  ]);

  onCheckboxChange(value: boolean) {
    console.log(value);
  }

  onDeleteClick() {
    this.links.update((prev) => prev.slice(0, prev.length - 1));
    toast('Link deleted', {
      description: 'Link has been deleted successfully',
      action: {
        label: 'Ok',
        onClick: () => null,
      },
    });
  }

  onCopyClick() {
    toast('Link copied', {
      description: 'Link has been copied to clipboard',
      action: {
        label: 'Ok',
        onClick: () => null,
      },
    });
  }
}
