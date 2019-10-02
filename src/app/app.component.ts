import { Component, OnInit } from '@angular/core';
import { Word } from './interfaces/word';
import { CardProviderService } from './services/card-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Wordie';
  words: Word[];
  routes: object[];

  constructor(private cardService: CardProviderService, public router: Router) {}

  ngOnInit() {
    this.words = this.cardService.availableWords;
    this.routes = this.router.config.map(route => {
      let icon: string;
      let title: string;
      switch (route.path) {
        case 'auth':
          icon = 'lock-outline';
          title = 'Authentication';
          break;
        default:
          icon = 'question-mark-circle-outline';
          title = route.path;
          break;
      }
      return {
        ...route,
        icon,
        title
      };
    });
  }
}
