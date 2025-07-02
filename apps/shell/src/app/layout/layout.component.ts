import { NavMenuComponent } from '@/components/nav-menu/nav-menu.component';
import { NavItemLabel } from '@/core/types/nav';
import { getLabelFromPath } from '@/core/utils/nav';
import { HeaderComponent } from '@/components/header/header.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, filter, map, startWith, delay, of } from 'rxjs';
import { FooterComponent } from '../components/footer/footer.component';
import { AuthService } from '@/core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, NavMenuComponent, FooterComponent, RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);

  /**
   * Observable that emits the current pathname as `NavItemLabel`.
   */
  pathname$!: Observable<NavItemLabel>;

  /**
   * Observable that emits the current user's name from the authentication service.
   */
  userName$!: Observable<string>;

  /**
   * Lifecycle hook called after component initialization.
   * Initializes observables for pathname and user name.
   */
  ngOnInit(): void {
    // Initialize pathname observable based on the current router state
    this.pathname$ = this.initPathname();

    // Get user name from auth service session mock using modern approach
    this.userName$ = this.initUserName();
  }

  /**
   * Init pathname based on the current router state.
   * This method is used to set the initial value of the pathname observable.
   */
  private initPathname(): Observable<NavItemLabel> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => {
        const path = event.urlAfterRedirects.split('?')[0];
        return getLabelFromPath(path);
      }),
      startWith(this.getInitialPathname()),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  /**
   * Init user name observable.
   * This method is used to set the initial value of the userName observable.
   */
  private initUserName(): Observable<string> {
    return this.authService.getCurrentUser().pipe(
      map((user) => user?.name || ''),
      startWith(''),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  /**
   * Determines the initial pathname based on the current router state.
   * @returns The initial NavItemLabel.
   */
  private getInitialPathname(): NavItemLabel {
    const path = this.router.url.split('?')[0];
    return getLabelFromPath(path);
  }

  /**
   * Handles navigation actions, redirecting to internal or external links.
   * @param link The URL or path to navigate to.
   */
  handleNavigation(link: string): void {
    this.router.navigateByUrl(link || '/');
  }

  /**
   * Handles user logout, clearing the session.
   */
  handleLogout(): void {
    this.authService.logout();
  }
}
