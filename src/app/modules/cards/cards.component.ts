import { Component, OnInit } from '@angular/core';
import { CardProviderService } from 'src/app/services/card-provider.service';
import { Word } from 'src/app/interfaces/word';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  words: Word[];

  constructor(private cpS: CardProviderService) { }

  ngOnInit() {
    this.words = this.cpS.availableWords;
  }

}
