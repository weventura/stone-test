import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReviewComponent } from './card-review.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { REVIEW_MOCK } from '../../mocks/review.mock';
import { MockModule, MockProvider } from 'ng-mocks';

describe('CardReviewComponent', () => {
  let component: CardReviewComponent;
  let fixture: ComponentFixture<CardReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardReviewComponent],
      imports: [MockModule(FontAwesomeModule)],
      providers: [MockProvider(FaIconLibrary)]
    });

    fixture = TestBed.createComponent(CardReviewComponent);
    component = fixture.componentInstance;

    component.review = REVIEW_MOCK;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format rate correctly', () => {
    const rate = 3.456;
    const formattedRate = component.onFormatRate(rate);
    
    expect(typeof formattedRate).toBe('string');
    expect(formattedRate.split('.')[1].length).toBe(1);
    expect(formattedRate).toBe('3.5');
  });

  it('should get initial name', () => {
    const name = 'pedro';
    const initialName = component.onGetInitialsName(name);

    expect(typeof initialName).toBe('string');
    expect(initialName[0]).toBe('P');
    expect(initialName).toBe('P');
  });
});
