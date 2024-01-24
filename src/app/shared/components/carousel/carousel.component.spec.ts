import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockModule, MockProvider } from 'ng-mocks';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  const mockElement = document.createElement('div');

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      imports: [MockModule(FontAwesomeModule)],
      providers: [MockProvider(FaIconLibrary)]
    });

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the right', () => {
    component.carouselElement = mockElement;

    const scrollBySpy = spyOn(component.carouselElement, 'scrollBy').and.stub();
    const addEventListenerSpy = spyOn(component.carouselElement, 'addEventListener');

    component.onRight();

    expect(scrollBySpy).toHaveBeenCalledWith({ left: 150, behavior: 'smooth' });
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', jasmine.any(Function));
  });

  it('should scroll to the left', () => {
    component.carouselElement = mockElement;

    const scrollBySpy = spyOn(component.carouselElement, 'scrollBy').and.stub();
    const addEventListenerSpy = spyOn(component.carouselElement, 'addEventListener');

    component.onLeft();

    expect(scrollBySpy).toHaveBeenCalledWith({ left: -150, behavior: 'smooth' });
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', jasmine.any(Function));
  });

  it('should handle scroll to the right', () => {
    const mockElement = document.createElement('div');

    spyOnProperty(mockElement, 'scrollLeft', 'get').and.returnValue(50);
    spyOnProperty(mockElement, 'clientWidth', 'get').and.returnValue(100);
    spyOnProperty(mockElement, 'scrollWidth', 'get').and.returnValue(200);

    component.carouselElement = mockElement;

    component.handleScrollRight();

    expect(component.displayArrowLeft).toBeTruthy();
  });

  it('should handle scroll to the left', () => {
    const mockElement = document.createElement('div');

    spyOnProperty(mockElement, 'scrollLeft', 'get').and.returnValue(0);

    component.carouselElement = mockElement;

    component.handleScrollLeft();

    expect(component.displayArrowRight).toBeTruthy();
    expect(component.displayArrowLeft).toBeFalsy();
  });
});
