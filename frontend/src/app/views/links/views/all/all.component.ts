import { Component, NgZone, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LinksService } from '../../../../core/services/links/links.service';
import { LinksStore } from '../../../../core/store/links/links.store';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { PlaceholderComponent } from '../../components/link-card/placeholder/placeholder.component';
import { LinkCardComponent } from '../../components/link-card/link-card.component';
import { HlmButtonDirective } from '../../../../core/components/ui-button-helm/src/lib/hlm-button.directive';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    PlaceholderComponent,
    LinkCardComponent,
    HlmButtonDirective,
    RouterLink,
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css',
})
export class AllLinksComponent {
  ngZone = inject(NgZone);
  route = inject(ActivatedRoute);
  linksService = inject(LinksService);
  linksStore = inject(LinksStore);

  links = this.ngZone.runOutsideAngular(() =>
    injectQuery(() => ({
      queryKey: ['get-all-links'],
      queryFn: async () => {
        try {
          const fetchedLinks = await this.linksService.getAllLinks();
          return this.ngZone.run(() => {
            this.linksStore.setAllLinks(
              fetchedLinks.filter(this.linksService.filterFunction),
            );
            return fetchedLinks;
          });
        } catch (error) {
          this.linksStore.setAllLinks([]);
          return null;
        }
      },
    })),
  );
}
