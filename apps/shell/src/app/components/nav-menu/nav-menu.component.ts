import { NavItemLabel, NavMenuItem } from '@/core/types/nav';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal, computed } from '@angular/core';
import {
  BadgeDollarSign,
  LayoutDashboard,
  Loader2,
  LucideAngularModule,
  Settings
} from 'lucide-angular'; // Import specific icons

/**
 * NavMenu component displays a vertical navigation menu with links and icons.
 * It highlights the currently active item and shows a loading indicator during navigation.
 *
 * @example
 * ```html
 * <bb-nav-menu
 * [current]="'Dashboard'"
 * (onNavigate)="handleNavigation($event)"
 * className="my-custom-nav-styles"
 * ></bb-nav-menu>
 * ```
 */
@Component({
  selector: 'bb-nav-menu', // 'bb-' prefix is mandatory
  standalone: true, // Always use standalone components
  imports: [CommonModule, LucideAngularModule], // Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush for better performance
  templateUrl: './nav-menu.component.html', // Separated template for clarity
  styleUrls: ['./nav-menu.component.css'] // Use CSS specific to component
})
export class NavMenuComponent {
  /**
   * The label of the currently active navigation item.
   */
  current = input.required<NavItemLabel>();

  /**
   * Event emitted when a navigation item is clicked.
   * Emits the `href` of the clicked item.
   */
  onNavigate = output<string>();

  /**
   * Additional CSS classes to apply to the top-level `nav` element.
   * @default ''
   */
  className = input<string>('');

  /**
   * Tracks the `href` of the navigation item that is currently initiating a pending navigation.
   */
  private pendingHrefSignal = signal<string | null>(null);

  /**
   * Indicates if a navigation transition is currently pending.
   */
  private isPendingSignal = signal<boolean>(false);

  /**
   * Public getters for template access
   */
  get pendingHref() {
    return this.pendingHrefSignal();
  }

  get isPending() {
    return this.isPendingSignal();
  }

  /**
   * Defines the list of navigation items with their labels, hrefs, and associated Lucide icons.
   */
  readonly navItems: NavMenuItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Transações', href: '/transactions', icon: BadgeDollarSign },
    { label: 'Configurações', href: '/settings', icon: Settings }
  ];

  /**
   * Icon references for template usage.
   */
  readonly LayoutDashboard = LayoutDashboard;
  readonly BadgeDollarSign = BadgeDollarSign;
  readonly Settings = Settings;
  readonly Loader2 = Loader2;

  /**
   * Handles the click event on a navigation item.
   * Sets the `pendingHref` and `isPending` flags, then emits the navigation event.
   * @param href The destination URL of the clicked navigation item.
   */
  handleClick(href: string): void {
    this.setPendingState(href, true);
    // In a real Angular app, this would typically trigger router.navigate or similar,
    // and `isPending` would be set based on router events.
    this.onNavigate.emit(href);
    // Simulate end of transition after a short delay (for demo purposes)
    setTimeout(() => this.setPendingState(null, false), 500);
  }

  /**
   * Sets the pending state for navigation.
   * @param href The href of the pending item, or `null` to clear.
   * @param pending `true` if navigation is pending, `false` otherwise.
   */
  private setPendingState(href: string | null, pending: boolean): void {
    this.pendingHrefSignal.set(href);
    this.isPendingSignal.set(pending);
  }

  /**
   * Checks if a navigation item is currently active (matches the `current` input).
   * @param label The label of the navigation item.
   * @returns `true` if the item is active, `false` otherwise.
   */
  isActive(label: string): boolean {
    return this.current() === label;
  }

  /**
   * Returns the CSS classes for the text and icon based on the active state.
   * Applies `text-orange font-bold` if active, otherwise `text-dark-gray`.
   * @param label The label of the navigation item.
   * @returns A string of CSS classes.
   */
  getColorClasses(label: string): string {
    const isActive = this.isActive(label);
    const activeClasses = 'text-orange font-bold';
    const inactiveClasses = 'text-dark-gray';
    return isActive ? activeClasses : inactiveClasses;
  }

  /**
   * Returns the combined CSS classes for a navigation button.
   * @param label The label of the navigation item.
   * @returns A string of CSS classes.
   */
  getButtonClasses(label: string): string {
    const baseClasses =
      'flex items-center w-full gap-2 px-2 py-2 rounded-md text-left transition-colors cursor-pointer';
    const colorClasses = this.getColorClasses(label);
    return `${baseClasses} ${colorClasses}`;
  }
}
