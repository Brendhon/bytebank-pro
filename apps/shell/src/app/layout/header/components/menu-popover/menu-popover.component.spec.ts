import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPopoverComponent } from './menu-popover.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MenuPopoverComponent', () => {
  let component: MenuPopoverComponent;
  let fixture: ComponentFixture<MenuPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPopoverComponent],
      schemas: [NO_ERRORS_SCHEMA] // Ignore child component errors for unit testing
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default properties', () => {
      expect(component.pathname()).toBeUndefined();
      expect(component.currentPath).toBe('/dashboard');
      expect(component.menuIcon).toBeDefined();
    });
  });

  describe('Input Properties', () => {
    it('should return default path when pathname is undefined', () => {
      expect(component.currentPath).toBe('/dashboard');
    });

    it('should return pathname when provided', () => {
      fixture.componentRef.setInput('pathname', '/transactions');
      fixture.detectChanges();

      expect(component.currentPath).toBe('/transactions');
    });

    it('should handle different pathname values', () => {
      const testPaths = ['/dashboard', '/transactions', '/settings', '/custom-path'];

      testPaths.forEach((path) => {
        fixture.componentRef.setInput('pathname', path);
        fixture.detectChanges();

        expect(component.currentPath).toBe(path);
      });
    });

    it('should handle null pathname', () => {
      fixture.componentRef.setInput('pathname', null);
      fixture.detectChanges();

      expect(component.currentPath).toBe('/dashboard');
    });

    it('should handle empty string pathname', () => {
      fixture.componentRef.setInput('pathname', '');
      fixture.detectChanges();

      expect(component.currentPath).toBe('');
    });
  });

  describe('Events', () => {
    it('should emit navigation event when handleNavigation is called', () => {
      spyOn(component.onNavigate, 'emit');

      component.handleNavigation('/test-path');

      expect(component.onNavigate.emit).toHaveBeenCalledWith('/test-path');
    });

    it('should emit navigation event with different paths', () => {
      spyOn(component.onNavigate, 'emit');
      const testPaths = ['/dashboard', '/transactions', '/settings'];

      testPaths.forEach((path) => {
        component.handleNavigation(path);

        expect(component.onNavigate.emit).toHaveBeenCalledWith(path);
      });

      expect(component.onNavigate.emit).toHaveBeenCalledTimes(testPaths.length);
    });

    it('should emit empty string when called with empty path', () => {
      spyOn(component.onNavigate, 'emit');

      component.handleNavigation('');

      expect(component.onNavigate.emit).toHaveBeenCalledWith('');
    });

    it('should emit navigation event multiple times', () => {
      spyOn(component.onNavigate, 'emit');

      component.handleNavigation('/first-path');
      component.handleNavigation('/second-path');

      expect(component.onNavigate.emit).toHaveBeenCalledTimes(2);
      expect(component.onNavigate.emit).toHaveBeenCalledWith('/first-path');
      expect(component.onNavigate.emit).toHaveBeenCalledWith('/second-path');
    });
  });

  describe('Component State', () => {
    it('should have menu icon property', () => {
      expect(component.menuIcon).toBeDefined();
    });

    it('should handle path changes reactively', () => {
      // Test initial state
      expect(component.currentPath).toBe('/dashboard');

      // Test path change
      fixture.componentRef.setInput('pathname', '/transactions');
      fixture.detectChanges();

      expect(component.currentPath).toBe('/transactions');

      // Test another path change
      fixture.componentRef.setInput('pathname', '/settings');
      fixture.detectChanges();

      expect(component.currentPath).toBe('/settings');
    });

    it('should maintain getter behavior for currentPath', () => {
      // Test getter behavior multiple calls
      expect(component.currentPath).toBe('/dashboard');
      expect(component.currentPath).toBe('/dashboard');

      fixture.componentRef.setInput('pathname', '/new-path');
      fixture.detectChanges();

      expect(component.currentPath).toBe('/new-path');
      expect(component.currentPath).toBe('/new-path');
    });
  });

  describe('Computed Properties', () => {
    it('should compute currentNavLabel for dashboard path', () => {
      fixture.componentRef.setInput('pathname', 'dashboard');
      fixture.detectChanges();

      const result = component.currentNavLabel();

      expect(result).toBe('Dashboard');
    });

    it('should compute currentNavLabel for transactions path', () => {
      fixture.componentRef.setInput('pathname', 'transactions');
      fixture.detectChanges();

      const result = component.currentNavLabel();

      expect(result).toBe('Transações');
    });

    it('should compute currentNavLabel for settings path', () => {
      fixture.componentRef.setInput('pathname', 'settings');
      fixture.detectChanges();

      const result = component.currentNavLabel();

      expect(result).toBe('Configurações');
    });

    it('should handle unknown paths in currentNavLabel', () => {
      fixture.componentRef.setInput('pathname', '/unknown-path');
      fixture.detectChanges();

      const result = component.currentNavLabel();

      // Should return undefined for unknown paths
      expect(result).toBeUndefined();
    });

    it('should update computed properties when inputs change', () => {
      fixture.componentRef.setInput('pathname', 'dashboard');
      fixture.detectChanges();
      const initialLabel = component.currentNavLabel();

      expect(initialLabel).toBe('Dashboard');

      fixture.componentRef.setInput('pathname', 'transactions');
      fixture.detectChanges();
      const updatedLabel = component.currentNavLabel();

      expect(updatedLabel).toBe('Transações');
      expect(updatedLabel).not.toBe(initialLabel);
    });

    it('should handle paths with leading slash in computed property', () => {
      // The computed property only removes trailing slash, not leading
      fixture.componentRef.setInput('pathname', '/dashboard');
      fixture.detectChanges();

      const result = component.currentNavLabel();

      // Should be undefined because '/dashboard' doesn't match 'dashboard' enum key
      expect(result).toBeUndefined();
    });

    it('should handle paths with trailing slash in computed property', () => {
      fixture.componentRef.setInput('pathname', 'dashboard/');
      fixture.detectChanges();

      const result = component.currentNavLabel();

      expect(result).toBe('Dashboard');
    });
  });

  describe('Boundary Cases', () => {
    it('should handle undefined pathname input', () => {
      fixture.componentRef.setInput('pathname', undefined);
      fixture.detectChanges();

      expect(component.currentPath).toBe('/dashboard');
    });

    it('should handle whitespace-only pathname', () => {
      fixture.componentRef.setInput('pathname', '   ');
      fixture.detectChanges();

      expect(component.currentPath).toBe('   ');
    });

    it('should handle pathname with query parameters', () => {
      fixture.componentRef.setInput('pathname', '/dashboard?tab=overview');
      fixture.detectChanges();

      expect(component.currentPath).toBe('/dashboard?tab=overview');
    });

    it('should handle pathname with hash', () => {
      fixture.componentRef.setInput('pathname', '/dashboard#section1');
      fixture.detectChanges();

      expect(component.currentPath).toBe('/dashboard#section1');
    });
  });
});
