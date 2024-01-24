import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarCardComponent } from './similar-card.component';
import { SIMILAR_MOCK } from '../../mocks/similar.mock';

describe('SimilarCardComponent', () => {
  let component: SimilarCardComponent;
  let fixture: ComponentFixture<SimilarCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarCardComponent]
    });

    fixture = TestBed.createComponent(SimilarCardComponent);
    component = fixture.componentInstance;

    component.similar = SIMILAR_MOCK;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should be called navigate and movieId$', () => {
    const eventSpy = spyOn(component.event, 'emit');

    component.onEvent();

    expect(eventSpy).toHaveBeenCalledWith(SIMILAR_MOCK);
  });
});
