import { Component, NgZone, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { LinksService } from '../../../../core/services/links/links.service';
import { LinksStore } from '../../../../core/store/links/links.store';
import { LinkCardComponent } from '../../components/link-card/link-card.component';
import { PlaceholderComponent } from '../../components/link-card/placeholder/placeholder.component';

@Component({
  selector: 'app-links-root',
  standalone: true,
  imports: [
    HlmLabelDirective,
    HlmSwitchComponent,
    HlmButtonDirective,
    LinkCardComponent,
    RouterLink,
    PlaceholderComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './links-root.component.html',
  styleUrl: './links-root.component.css',
})
export class LinksRootComponent {
  ngZone = inject(NgZone);
  route = inject(ActivatedRoute);
  linksService = inject(LinksService);
  linksStore = inject(LinksStore);
  formBuilder = inject(FormBuilder);

  shortenForm = this.formBuilder.array([
    this.formBuilder.group({
      longUrl: [''],
    }),
  ]);

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
  addLinkMutation = injectMutation((client) => ({
    mutationFn: (url: string) => this.linksService.addLink(url),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['get-all-links'] });
    },
    onError: (error) => {
      console.log(error);
    },
  }));

  onCheckboxChange(value: boolean) {
    console.log(value);
  }

  onAddLinkClick() {
    if (
      this.shortenForm.controls[0].value.longUrl === '' ||
      !this.shortenForm.controls[0].value.longUrl
    )
      return;
    this.addLinkMutation.mutate(this.shortenForm.controls[0].value.longUrl);
  }
}
