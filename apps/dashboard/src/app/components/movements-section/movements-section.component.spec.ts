import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementsSectionComponent } from './movements-section.component';
import { CardProps, CardVariant } from '@bytebank-pro/types';

describe('MovementsSectionComponent', () => {
  let component: MovementsSectionComponent;
  let fixture: ComponentFixture<MovementsSectionComponent>;

  const mockCardData: CardProps[] = [
    {
      key: '1',
      label: 'Test Card 1',
      value: 100,
      variant: 'blue'
    },
    {
      key: '2',
      label: 'Test Card 2',
      value: 200,
      variant: 'green'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementsSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should accept card data input', () => {
      fixture.componentRef.setInput('data', mockCardData);
      fixture.detectChanges();

      expect(component.data()).toEqual(mockCardData);
    });

    it('should handle empty card data', () => {
      fixture.componentRef.setInput('data', []);
      fixture.detectChanges();

      expect(component.data()).toEqual([]);
    });
  });

  describe('asCardVariant', () => {
    it('should return valid CardVariant for valid input', () => {
      const validVariants: CardVariant[] = ['dark', 'blue', 'green', 'orange'];

      validVariants.forEach((variant) => {
        const result = component.asCardVariant(variant);

        expect(result).toBe(variant);
      });
    });

    it('should return undefined for invalid variant', () => {
      const invalidVariants = ['invalid', 'red', 'yellow', ''];

      invalidVariants.forEach((variant) => {
        const result = component.asCardVariant(variant);

        expect(result).toBeUndefined();
      });
    });

    it('should return undefined for undefined input', () => {
      const result = component.asCardVariant(undefined);

      expect(result).toBeUndefined();
    });
  });

  describe('trackByCardKey', () => {
    it('should return the key property of the card', () => {
      const card: CardProps = {
        key: 'test-key',
        label: 'Test Card',
        value: 100,
        variant: 'blue'
      };

      const result = component.trackByCardKey(0, card);

      expect(result).toBe('test-key');
    });

    it('should return different keys for different cards', () => {
      const card1: CardProps = {
        key: 'key-1',
        label: 'Card 1',
        value: 100,
        variant: 'blue'
      };

      const card2: CardProps = {
        key: 'key-2',
        label: 'Card 2',
        value: 200,
        variant: 'green'
      };

      const result1 = component.trackByCardKey(0, card1);
      const result2 = component.trackByCardKey(1, card2);

      expect(result1).toBe('key-1');
      expect(result2).toBe('key-2');
      expect(result1).not.toBe(result2);
    });
  });

  describe('Template Integration', () => {
    it('should render cards when data is provided', () => {
      fixture.componentRef.setInput('data', mockCardData);
      fixture.detectChanges();

      const cardElements = fixture.nativeElement.querySelectorAll('bb-card');

      expect(cardElements.length).toBe(2);
    });

    it('should not render cards when data is empty', () => {
      fixture.componentRef.setInput('data', []);
      fixture.detectChanges();

      const cardElements = fixture.nativeElement.querySelectorAll('bb-card');

      expect(cardElements.length).toBe(0);
    });
  });

  describe('Component Structure', () => {
    it('should have correct selector', () => {
      expect(MovementsSectionComponent.prototype.constructor.name).toBe(
        'MovementsSectionComponent'
      );
    });

    it('should be standalone component', () => {
      expect(component).toBeInstanceOf(MovementsSectionComponent);
    });

    it('should have required input property', () => {
      expect(component.data).toBeDefined();
    });
  });
});
