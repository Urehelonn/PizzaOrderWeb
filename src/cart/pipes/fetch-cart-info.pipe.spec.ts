import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchCartInfoPipe } from './fetch-cart-info.pipe';

describe('FetchCartInfoPipeComponent', () => {
  let component: FetchCartInfoPipe;
  let fixture: ComponentFixture<FetchCartInfoPipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchCartInfoPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchCartInfoPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
