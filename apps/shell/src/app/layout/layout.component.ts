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
    // Get the current pathname from Router events
    this.pathname$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => {
        // Map the URL to a NavItemLabel. This mapping might need refinement based on your exact routing setup.
        // Example: /dashboard -> 'Dashboard', /transactions -> 'Transações', etc.
        const path = event.urlAfterRedirects.split('?')[0]; // Remove query params
        return getLabelFromPath(path); // Use utility function to get NavItemLabel
      }),
      startWith(this.getInitialPathname()), // Provide an initial value
      takeUntilDestroyed(this.destroyRef)
    ) as Observable<NavItemLabel>;

    // Get user name from auth service session mock using modern approach
    this.userName$ = of('Jane Doe').pipe(
      delay(1000), // Simulate network delay
      startWith(''), // Provide an initial empty value
      takeUntilDestroyed(this.destroyRef)
    ) as Observable<string>;
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
    if (link?.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      this.router.navigateByUrl(link || '/');
    }
  }

  /**
   * Handles user logout, clearing the session.
   */
  handleLogout(): void {
    console.log('Logout clicked!');
  }

  /**
   * Handles user login action.
   * In this simulated example, it just logs in a user. In a real app, this would redirect to a login form.
   */
  handleLogin(): void {
    console.log('Login clicked!');
  }

  /**
   * Handles open account action.
   * In this simulated example, it just logs to console. In a real app, this would redirect to an account creation form.
   */
  handleOpenAccount(): void {
    console.log('Open Account clicked!');
    // In a real app, you would navigate to an account creation route, e.g.:
    // this.router.navigate(['/register']);
  }
}
