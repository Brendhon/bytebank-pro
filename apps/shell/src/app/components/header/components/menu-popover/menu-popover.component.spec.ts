import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MenuPopoverComponent } from './menu-popover.component';
import { NavMenuComponent } from '@/components/nav-menu/nav-menu.component';

describe('MenuPopoverComponent', () => {
  let component: MenuPopoverComponent;
  let fixture: ComponentFixture<MenuPopoverComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPopoverComponent, NavMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPopoverComponent);
    component = fixture.componentInstance;

    // Set required input before detecting changes
    fixture.componentRef.setInput('pathname', '/dashboard');
    fixture.detectChanges();

    element = fixture.debugElement.query(
      By.css('[data-testid="menu-popover-container"]')
    )?.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the menu button', () => {
    const menuButton = fixture.debugElement.query(By.css('[data-testid="menu-button"]'));

    expect(menuButton).toBeTruthy();
  });

  it('should render NavMenuComponent inside popover when opened', () => {
    // Open the popover first
    component.openMenu();
    fixture.detectChanges();

    const navMenuElement = fixture.debugElement.query(
      By.css('[data-testid="nav-menu-inside-popover"]')
    );

    expect(navMenuElement).toBeTruthy();
  });

  it('should emit onNavigate event when NavMenuComponent emits', () => {
    const testHref = '/transactions';
    spyOn(component.onNavigate, 'emit');

    // Open the popover first
    component.openMenu();
    fixture.detectChanges();

    // Get NavMenuComponent instance directly from the component
    const navMenuComponent = fixture.debugElement.query(
      By.directive(NavMenuComponent)
    )?.componentInstance;

    expect(navMenuComponent).toBeTruthy();
    navMenuComponent.onNavigate.emit(testHref);

    expect(component.onNavigate.emit).toHaveBeenCalledWith(testHref);
  });

  it('should close menu after navigation', () => {
    const testHref = '/settings';
    spyOn(component.onNavigate, 'emit');
    spyOn(component, 'closeMenu');

    // Open the popover first
    component.openMenu();
    fixture.detectChanges();

    // Get NavMenuComponent instance directly from the component
    const navMenuComponent = fixture.debugElement.query(
      By.directive(NavMenuComponent)
    )?.componentInstance;

    expect(navMenuComponent).toBeTruthy();
    navMenuComponent.onNavigate.emit(testHref);

    expect(component.onNavigate.emit).toHaveBeenCalledWith(testHref);
    expect(component.closeMenu).toHaveBeenCalled();
  });

  it('should have the correct container structure', () => {
    expect(element).toBeTruthy();
    expect(element.classList.contains('flex')).toBeTruthy();
    expect(element.classList.contains('md:hidden')).toBeTruthy();
  });

  it('should compute currentNavLabel based on pathname', () => {
    fixture.componentRef.setInput('pathname', '/transactions');
    fixture.detectChanges();

    expect(component.currentNavLabel()).toBe('Transações');
  });

  it('should handle popover open/close state changes', () => {
    const isOpen = true;
    component.handlePopoverOpenChange(isOpen);

    expect(component.isMenuOpen()).toBe(isOpen);
  });

  it('should open menu when openMenu is called', () => {
    component.openMenu();

    expect(component.isMenuOpen()).toBe(true);
  });

  it('should close menu when closeMenu is called', () => {
    component.openMenu();
    component.closeMenu();

    expect(component.isMenuOpen()).toBe(false);
  });
});
