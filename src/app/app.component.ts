import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Word } from './interfaces/word';
import { CardProviderService } from './services/card-provider.service';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';
import { StatusService } from './services/status.service';
import { Store } from '@ngrx/store';
import * as actions from 'src/app/modules/cards/actions/card.actions';
import * as fromCards from 'src/app/modules/cards/reducers/card.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Wordie';
  words: Word[];
  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home',
      link: '/'
    },
    {
      title: 'Cards',
      icon: 'book-open',
      link: 'cards'
    },
    {
      title: 'Authentication',
      children: [
        {
          title: 'Login',
          icon: 'lock',
          link: 'auth/login'
        },
        {
          title: 'Register',
          icon: 'lock',
          link: 'auth/register'
        }
      ]
    },
    {
      title: 'Admin',
      icon: 'settings-2',
      link: 'admin'
    }
  ];

  constructor(
    private cardService: CardProviderService,
    public router: Router,
    public sidebarService: NbSidebarService,
    public menuService: NbMenuService,
    private statusService: StatusService,
    private store: Store<fromCards.State>
    ) {}

    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler() {
      this.statusService.setStatus('inactive');
    }
    @HostListener('window:visibilitychange', ['$event'])
    visibilityHandler() {
      this.statusService.setStatus(document.visibilityState === 'visible' ? 'active' : 'inactive');
    }
    ngOnInit() {
    this.words = this.cardService.availableWords;
    this.menuService.onItemClick().subscribe(() => {
      this.sidebarService.collapse();
    });
    const initialState = [
      {
        id: 0,
        originalWord: 'compiler',
        translation: 'kompilator'
      },
      {
        id: 1,
        originalWord: 'graphics card',
        translation: 'karta graficzna'
      }
    ];
    initialState.forEach(word => this.store.dispatch(new actions.AddCard(word)));
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  ngOnDestroy() {
    this.statusService.setStatus('inactive');
  }

}
