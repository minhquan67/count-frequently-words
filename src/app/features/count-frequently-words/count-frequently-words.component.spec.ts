import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CountFrequentlyWordsService } from 'src/app/services/count-frequently-words.service';

import { CountFrequentlyWordsComponent } from './count-frequently-words.component';
import createSpyObj = jasmine.createSpyObj;

describe('CountFrequentlyWordsComponent', () => {
  let component: CountFrequentlyWordsComponent;
  let fixture: ComponentFixture<CountFrequentlyWordsComponent>;
  let countFrequentlyWordsServiceMock :CountFrequentlyWordsService;
  let httpClient: HttpClient;
  const topTenWords: [string, number][] = [
    ['random',10],
    ['data',9],
    ['restaurant',8],
    ['count',7],
    ['frequently',6],
    ['word',5],
    ['service',4],
    ['good',3],
    ['comeback',2],
    ['five',1],
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: CountFrequentlyWordsService, useClass: CountFrequentlyWordsService },
      ],
      declarations: [ CountFrequentlyWordsComponent ]
    })
    .compileComponents();
    countFrequentlyWordsServiceMock = TestBed.inject(CountFrequentlyWordsService);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountFrequentlyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the error if rest api not input', () => {
    component.countFrequentlyWordsForm.controls['restApi'].setValue('');
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.error'));
    expect(error).toBeTruthy();
    const errorMessage = error.nativeElement.innerText;
    expect(errorMessage).toEqual('Restful api is required.');
  });

  it('should show the number character when user input', () => {
    const CONTENT_INPUT = 'user input';
    component.countFrequentlyWordsForm.controls['userInput'].setValue(CONTENT_INPUT);
    fixture.detectChanges();
    const contentUserInputSelector = fixture.debugElement.query(By.css('.content_user-input'));
    expect(contentUserInputSelector).toBeTruthy();
    const contentUserInput = contentUserInputSelector.query(By.css('label')).nativeElement.innerText;
    expect(contentUserInput).toEqual('The Number of letter user input: '+ CONTENT_INPUT.length);
  });

  it('should show data when user input rest api and click load data button', fakeAsync(() => {
    spyOn(countFrequentlyWordsServiceMock, 'topTenWords').and.returnValue(topTenWords);
    spyOn(httpClient,'get').and.returnValue(of(new Object()));
    let loadBtn = fixture.debugElement.nativeElement.querySelector('button')
    loadBtn.click();
    tick();
    expect(component.loadData).toHaveBeenCalled();
    expect(component.topTenWords).toEqual(topTenWords);
  }));
});
