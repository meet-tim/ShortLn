import {
  Component,
  Input,
  WritableSignal,
  inject,
  signal
} from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { toast } from 'ngx-sonner';
import { LinksService } from '../../../../core/services/links/links.service';

@Component({
  selector: 'app-link-card',
  standalone: true,
  imports: [],
  templateUrl: './link-card.component.html',
  styleUrl: './link-card.component.css',
})
export class LinkCardComponent {
  @Input({ required: true }) props!: {
    longUrl: string;
    shortenedUrl: string;
    urlId: string;
  };
  onDeleteAnimatePulse: WritableSignal<boolean> = signal(false);

  linksService = inject(LinksService);
  deleteMutation = injectMutation((client) => ({
    mutationFn: (urlId: string) => this.linksService.deleteLink(urlId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['get-all-links'] });
      toast('Link deleted', {
        description: 'Link has been deleted successfully',
        action: {
          label: 'Ok',
          onClick: () => null,
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  }));

  onDeleteClick() {
    console.log(this.onDeleteAnimatePulse);
    this.onDeleteAnimatePulse.set(true);
    this.deleteMutation.mutate(this.props.urlId);
    toast('Deleting link', {
      description: 'Link is being deleted',
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
    navigator.clipboard.writeText(this.props.shortenedUrl);
  }
}
