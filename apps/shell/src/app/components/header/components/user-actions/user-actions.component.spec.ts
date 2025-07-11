import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserActionsComponent } from './user-actions.component';
import { environment } from 'src/environments/environment';

describe('UserActionsComponent', () => {
  let component: UserActionsComponent;
  let fixture: ComponentFixture<UserActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up if necessary
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the user actions popover', () => {
      const element = fixture.debugElement.query(
        By.css('[data-testid="user-actions-popover"]')
      )?.nativeElement;

      expect(element).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.isPopoverOpen()).toBe(false);

      expect(component.publicLinks).toBe(environment.publicLinks);

      expect(component.icons.user).toBeDefined();

      expect(component.icons.github).toBeDefined();

      expect(component.icons.figma).toBeDefined();
    });
  });

  describe('Popover State Management', () => {
    it('should open popover when openPopover is called', () => {
      expect(component.isPopoverOpen()).toBe(false);

      component.openPopover();

      expect(component.isPopoverOpen()).toBe(true);
    });

    it('should close popover when closePopover is called', () => {
      component.openPopover();

      expect(component.isPopoverOpen()).toBe(true);

      component.closePopover();

      expect(component.isPopoverOpen()).toBe(false);
    });

    it('should handle popover open/close state changes', () => {
      expect(component.isPopoverOpen()).toBe(false);

      component.handlePopoverOpenChange(true);

      expect(component.isPopoverOpen()).toBe(true);

      component.handlePopoverOpenChange(false);

      expect(component.isPopoverOpen()).toBe(false);
    });

    it('should open popover when trigger button is clicked', () => {
      const triggerButton = fixture.debugElement.query(By.css('[data-testid="user-icon-button"]'));

      expect(component.isPopoverOpen()).toBe(false);

      triggerButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.isPopoverOpen()).toBe(true);
    });
  });

  describe('Public Links', () => {
    it('should get public link from environment', () => {
      const githubLink = component.getPublicLink('github');
      const figmaLink = component.getPublicLink('figma');

      expect(githubLink).toBe(environment.publicLinks?.github || '');

      expect(figmaLink).toBe(environment.publicLinks?.figma || '');
    });

    it('should open public link in new tab', () => {
      spyOn(component, 'handleExternalLinkNavigate');

      component.openPublicLink('github');

      expect(component.handleExternalLinkNavigate).toHaveBeenCalledWith(
        environment.publicLinks?.github || ''
      );
    });
  });

  describe('External Navigation', () => {
    it('should open external link in new tab and close popover', () => {
      spyOn(window, 'open');
      spyOn(component, 'closePopover');

      const testUrl = 'https://example.com';
      component.handleExternalLinkNavigate(testUrl);

      expect(window.open).toHaveBeenCalledWith(testUrl, '_blank');

      expect(component.closePopover).toHaveBeenCalled();
    });

    it('should not open external link when URL is empty', () => {
      spyOn(window, 'open');
      spyOn(component, 'closePopover');

      component.handleExternalLinkNavigate('');

      expect(window.open).not.toHaveBeenCalled();

      expect(component.closePopover).not.toHaveBeenCalled();
    });

    it('should not open external link when URL is null', () => {
      spyOn(window, 'open');
      spyOn(component, 'closePopover');

      component.handleExternalLinkNavigate(null);

      expect(window.open).not.toHaveBeenCalled();

      expect(component.closePopover).not.toHaveBeenCalled();
    });
  });

  describe('Events', () => {
    it('should emit onLogout when logout button is clicked', () => {
      spyOn(component.logout, 'emit');
      spyOn(component, 'closePopover');

      component.handleLogout();

      expect(component.logout.emit).toHaveBeenCalled();

      expect(component.closePopover).toHaveBeenCalled();
    });
  });

  describe('Template Structure', () => {
    it('should render the trigger button with correct attributes', () => {
      const triggerButton = fixture.debugElement.query(By.css('[data-testid="user-icon-button"]'));

      expect(triggerButton).toBeTruthy();

      expect(triggerButton.nativeElement.getAttribute('type')).toBe('button');

      expect(triggerButton.nativeElement.getAttribute('aria-label')).toBe('User menu');
    });

    it('should render the user icon in trigger button', () => {
      const userIcon = fixture.debugElement.query(
        By.css('[data-testid="user-icon-button"] i-lucide')
      );

      expect(userIcon).toBeTruthy();

      expect(userIcon.nativeElement.classList).toContain('text-bytebank-orange');

      expect(userIcon.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });

    it('should not render menu content when popover is closed', () => {
      expect(component.isPopoverOpen()).toBe(false);

      const menuContent = fixture.debugElement.query(By.css('[data-testid="user-menu-content"]'));

      expect(menuContent).toBeFalsy();
    });

    it('should render the menu content container when popover is open', () => {
      component.openPopover();
      fixture.detectChanges();

      const menuContent = fixture.debugElement.query(By.css('[data-testid="user-menu-content"]'));

      expect(menuContent).toBeTruthy();

      expect(menuContent.nativeElement.classList).toContain('flex');
    });

    it('should render Github link button when popover is open', () => {
      component.openPopover();
      fixture.detectChanges();

      const githubButton = fixture.debugElement.query(By.css('[data-testid="github-link-button"]'));

      expect(githubButton).toBeTruthy();

      expect(githubButton.nativeElement.getAttribute('type')).toBe('button');

      expect(githubButton.nativeElement.textContent).toContain('Github');
    });

    it('should render Figma link button when popover is open', () => {
      component.openPopover();
      fixture.detectChanges();

      const figmaButton = fixture.debugElement.query(By.css('[data-testid="figma-link-button"]'));

      expect(figmaButton).toBeTruthy();

      expect(figmaButton.nativeElement.getAttribute('type')).toBe('button');

      expect(figmaButton.nativeElement.textContent).toContain('Figma');
    });

    it('should render divider between links and logout when popover is open', () => {
      component.openPopover();
      fixture.detectChanges();

      const divider = fixture.debugElement.query(By.css('[data-testid="user-menu-content"] hr'));

      expect(divider).toBeTruthy();

      expect(divider.nativeElement.classList).toContain('w-full');

      expect(divider.nativeElement.classList).toContain('my-2');

      expect(divider.nativeElement.classList).toContain('border-gray-200');
    });

    it('should render logout button when popover is open', () => {
      component.openPopover();
      fixture.detectChanges();

      const logoutButton = fixture.debugElement.query(By.css('[data-testid="logout-button"]'));

      expect(logoutButton).toBeTruthy();

      expect(logoutButton.nativeElement.getAttribute('type')).toBe('button');

      expect(logoutButton.nativeElement.textContent).toContain('Sair');
    });
  });

  describe('Icon Images', () => {
    it('should render Github icon image when popover is open', () => {
      component.openPopover();
      fixture.detectChanges();

      const githubIcon = fixture.debugElement.query(
        By.css('[data-testid="github-link-button"] bb-img')
      );

      expect(githubIcon).toBeTruthy();

      expect(githubIcon.nativeElement.getAttribute('alt')).toBe('Github');
    });

    it('should render Figma icon image when popover is open', () => {
      component.openPopover();
      fixture.detectChanges();

      const figmaIcon = fixture.debugElement.query(
        By.css('[data-testid="figma-link-button"] bb-img')
      );

      expect(figmaIcon).toBeTruthy();

      expect(figmaIcon.nativeElement.getAttribute('alt')).toBe('Figma');
    });
  });

  describe('Popover Configuration', () => {
    it('should configure popover with correct properties', () => {
      const popover = fixture.debugElement.query(By.css('[data-testid="user-actions-popover"]'));

      expect(popover).toBeTruthy();

      expect(popover.nativeElement.getAttribute('position')).toBe('bottom-end');
    });
  });
});
