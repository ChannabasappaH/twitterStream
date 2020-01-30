import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAggregatorComponent } from './data-aggregator.component';

describe('DataAggregatorComponent', () => {
  let component: DataAggregatorComponent;
  let fixture: ComponentFixture<DataAggregatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAggregatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
