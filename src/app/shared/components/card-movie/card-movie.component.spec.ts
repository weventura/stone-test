import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMovieComponent } from './card-movie.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MockModule, MockProvider } from 'ng-mocks';
import { DISCOVER_MOVIE_MOCK } from '../../mocks/discover-movie.mock';
import { Router } from '@angular/router';

describe('CardMovieComponent', () => {
  let component: CardMovieComponent;
  let fixture: ComponentFixture<CardMovieComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardMovieComponent],
      imports: [MockModule(FontAwesomeModule)],
      providers: [MockProvider(FaIconLibrary), MockProvider(Router)]
    });

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMovieComponent);
    component = fixture.componentInstance;
    component.movie = DISCOVER_MOVIE_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get year correctly', () => {
    const date = '2024-10-28';
    const formatteddate = component.onGetDateYear(date);
    
    expect(typeof formatteddate).toBe('string');
    expect(formatteddate).toBe('2024');
  });

  it('should be called navigate method from router', () => {
    const date = '2024-10-28';
    
    const navigateSpy = spyOn(router, 'navigate');

    component.onNavigateToDetails();
    
    expect(navigateSpy).toHaveBeenCalledWith([`movie/${component.movie.id}`]);
  });
});
