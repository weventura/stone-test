import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [MockModule(FontAwesomeModule)],
      providers: [MockProvider(FaIconLibrary)]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChanged event with the selected page', () => {
    const pageChangedSpy = spyOn(component.pageChanged, 'emit');

    component.onPageChange(3);

    expect(component.currentPage).toBe(3);
    expect(pageChangedSpy).toHaveBeenCalledWith(3);
  });

  it('should decrease buttonStartIndex and update currentPage if possible', () => {
    component.buttonStartIndex = 6;

    component.onPrevious();

    expect(component.buttonStartIndex).toBe(1);
    expect(component.currentPage).toBe(1);
  });

  it('should increase buttonStartIndex and update currentPage if buttonStartIndex is less than lastButtonStartIndex', () => {
    component.buttonStartIndex = 1;
    component.totalPages = 10;
    component.itemsPerPage = 2;
    component.buttonsToShow = 3;

    fixture.detectChanges();

    component.onNext();
    
    expect(component.buttonStartIndex).toBe(4);
    expect(component.currentPage).toBe(4);
  });
});
