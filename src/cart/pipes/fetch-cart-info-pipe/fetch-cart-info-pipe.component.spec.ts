import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCartInfoPipeComponent } from './fetch-cart-info-pipe.component';

describe('FetchCartInfoPipeComponent', () => {
  let component: FetchCartInfoPipeComponent;
  let fixture: ComponentFixture<FetchCartInfoPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchCartInfoPipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchCartInfoPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
