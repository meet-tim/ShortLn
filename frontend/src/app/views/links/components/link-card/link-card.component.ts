import { Component, Input } from '@angular/core';
import { toast } from 'ngx-sonner';

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

  onDeleteClick() {
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
    navigator.clipboard.writeText(this.props.shortenedUrl);
  }
}
