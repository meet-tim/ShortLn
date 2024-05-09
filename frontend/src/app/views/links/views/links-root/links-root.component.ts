import { Component, WritableSignal, signal } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { toast } from 'ngx-sonner';
import { LinkCardComponent } from '../../components/link-card/link-card.component';

@Component({
  selector: 'app-links-root',
  standalone: true,
  imports: [
    HlmLabelDirective,
    HlmSwitchComponent,
    HlmButtonDirective,
    LinkCardComponent,
  ],
  templateUrl: './links-root.component.html',
  styleUrl: './links-root.component.css',
})
export class LinksRootComponent {
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
