import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { toast } from 'ngx-sonner';
import { LinksService } from '../../../../core/services/links/links.service';
import { LinksStore } from '../../../../core/store/links/links.store';
import { LinkCardComponent } from '../../components/link-card/link-card.component';

@Component({
  selector: 'app-links-root',
  standalone: true,
  imports: [
    HlmLabelDirective,
    HlmSwitchComponent,
    HlmButtonDirective,
    LinkCardComponent,
    RouterLink,
  ],
  templateUrl: './links-root.component.html',
  styleUrl: './links-root.component.css',
})
export class LinksRootComponent {
  route = inject(ActivatedRoute);
  linksService = inject(LinksService);
  linksStore = inject(LinksStore);
  links_1: WritableSignal<{ longUrl: string; shortenedUrl: string }[]> = signal(
    [
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
    ],
  );

  links = injectQuery(() => ({
    queryKey: ['get-all-links'],
    queryFn: async () => {
      try {
        const fetchedLinks = await this.linksService.getAllLinks();
        this.linksStore.setAllLinks(
          fetchedLinks.filter((link) => ({
            longUrl: link.longUrl,
            shortenedUrl: link.shortenedUrl,
            urlId: link.urlId,
          })),
        );
        return fetchedLinks;
      } catch (error) {
        this.linksStore.setAllLinks([]);
        return null;
      }
    },
  }));

  onCheckboxChange(value: boolean) {
    console.log(value);
  }

  onDeleteClick() {
    this.links_1.update((prev) => prev.slice(0, prev.length - 1));
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
