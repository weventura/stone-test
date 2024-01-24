import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleFilterComponent } from './bubble-filter.component';

describe('BubbleFilterComponent', () => {
  let component: BubbleFilterComponent;
  let fixture: ComponentFixture<BubbleFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BubbleFilterComponent]
    });

    fixture = TestBed.createComponent(BubbleFilterComponent);
    component = fixture.componentInstance;

    component.filter = {  
      id: 123,
      name: 'All',
      enable: true
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event ', () => {
    const eventSpy = spyOn(component.event, 'emit');

    component.onEvent();

    expect(eventSpy).toHaveBeenCalledWith(component.filter);
  });

});
