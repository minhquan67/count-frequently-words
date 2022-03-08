import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountFrequentlyWordsService } from 'src/app/services/count-frequently-words.service';


@Component({
  selector: 'app-count-frequently-words',
  templateUrl: './count-frequently-words.component.html',
  styleUrls: ['./count-frequently-words.component.scss']
})
export class CountFrequentlyWordsComponent implements OnInit {
  
  DEFAULT_API = 'https://random-data-api.com/api/restaurant/random_restaurant';
  topTenWords: [string, number] [] = [];
  countFrequentlyWordsForm!: FormGroup; 

  constructor( private readonly countFrequentlyWordsService: CountFrequentlyWordsService, private readonly httpClient: HttpClient) { }
  
  ngOnInit(): void {
    this.countFrequentlyWordsForm = new FormGroup({
      userInput: new FormControl(''),
      restApi: new FormControl(this.DEFAULT_API, Validators.required),
    });
  }

  loadData()  {
    console.log(this.countFrequentlyWordsForm)
    this.httpClient.get(this.countFrequentlyWordsForm.value.restApi).subscribe(res => {
      this.countFrequentlyWordsService.topTenWords(res);
      this.topTenWords = this.countFrequentlyWordsService.topTenWords$;
    })
  }
}
