import { GuestLayoutComponent } from '@/guest-layout/guest-layout.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ASSETS } from '@/assets/assets.config';
import { ImgComponent } from '@bytebank-pro/ui';

@Component({
  selector: 'bb-not-found',
  standalone: true,
  imports: [RouterModule, GuestLayoutComponent, ImgComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  /**
   * Image source for the 404 error page.
   * This image is displayed when the user navigates to a non-existent route.
   */
  readonly imageSrc = ASSETS.ILLUSTRATIONS.ERROR_404;
}
