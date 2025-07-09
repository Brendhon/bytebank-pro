import { NavItemLabel, NavMenuItem } from '@/core/types/nav';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
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
  imports: [LucideAngularModule], // Required imports
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
   * Computed signal for determining if any navigation is currently pending.
   */
  readonly isPendingComputed = computed(() => this.isPendingSignal());

  /**
   * Computed signal for getting the current pending href.
   */
  readonly pendingHrefComputed = computed(() => this.pendingHrefSignal());

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
    this.onNavigate.emit(href);
    setTimeout(() => this.setPendingState(null, false), 200);
  }

  /**
   * Computed signal for checking if a navigation item is currently active.
   * @param label The label of the navigation item.
   * @returns `true` if the item is active, `false` otherwise.
   */
  isActive = computed(() => (label: string): boolean => {
    const currentValue = this.current();
    if (!currentValue || !label) return false;
    return currentValue === label;
  });

  /**
   * Checks if a navigation item is currently active (matches the `current` input).
   * @param label The label of the navigation item.
   * @returns `true` if the item is active, `false` otherwise.
   * @deprecated Use isActive computed signal instead
   */
  isActiveMethod(label: string): boolean {
    return this.isActive()(label);
  }

  /**
   * Computed signal for checking if an item is currently pending navigation.
   * @param href The href to check against pending state.
   * @returns `true` if the item is pending, `false` otherwise.
   */
  isPendingForHref = computed(
    () => (href: string) => this.isPendingComputed() && this.pendingHrefComputed() === href
  );

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
   * Computed signal for getting color classes based on active state.
   */
  getColorClasses = computed(() => (label: string) => {
    const isActive = this.isActive()(label);
    return isActive ? 'nav-menu-button-active' : 'nav-menu-button-inactive';
  });

  /**
   * Computed signal for getting button classes.
   */
  getButtonClasses = computed(() => (label: string) => {
    const colorClasses = this.getColorClasses()(label);
    return `nav-menu-button ${colorClasses}`;
  });
}
