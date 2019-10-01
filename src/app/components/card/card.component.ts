import { Component, OnInit, Input } from '@angular/core';
import { Word } from 'src/app/interfaces/word';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() word: Word;
  constructor() { }

  ngOnInit() {
  }

}
