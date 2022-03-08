import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountFrequentlyWordsComponent } from './count-frequently-words.component';

describe('CountFrequentlyWordsComponent', () => {
  let component: CountFrequentlyWordsComponent;
  let fixture: ComponentFixture<CountFrequentlyWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountFrequentlyWordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountFrequentlyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
