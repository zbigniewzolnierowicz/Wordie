import { Component, OnInit } from '@angular/core';
import { Word } from './interfaces/word';
import { CardProviderService } from './services/card-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Wordie';
  words: Word[];
  constructor(private cardService: CardProviderService) {}
  ngOnInit() {
    this.words = this.cardService.availableWords;
  }
}
