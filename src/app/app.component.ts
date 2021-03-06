import { Component, OnInit, OnDestroy, HostListener, Inject, AfterContentInit } from '@angular/core';
import { Word } from './interfaces/word';
import { CardProviderService } from './services/card-provider.service';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService, NB_WINDOW } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';
import { StatusService } from './services/status.service';
import { Store } from '@ngrx/store';
import * as actions from 'src/app/modules/cards/actions/card.actions';
import * as fromCards from 'src/app/modules/cards/reducers/card.reducer';
import { filter, map } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { Observable } from 'rxjs';
import { UserRoles } from './enums/user-roles.enum';
import { LearningStatus } from './enums/learning-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {
  title = 'Wordie';
  words: Word[];
  userData$: Observable<{id?: string, username?: string, password?: string, role?: string}> = this.logInService.loggedInAccountData$;
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
      title: 'Admin',
      icon: 'settings-2',
      link: 'admin'
    },
    {
      title: 'User',
      icon: 'settings-2',
      link: 'user'
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
    }
  ];
  things: object[] = [
    {
      title: 'Profile'
    },
    {
      title: 'Log out'
    }
  ];

  roles = [
    {
      id: 'admin',
      name: UserRoles.ADMIN
    },
    {
      id: 'user',
      name: UserRoles.USER
    }
  ];

  userRole: string;

  constructor(
    private cardService: CardProviderService,
    public router: Router,
    public sidebarService: NbSidebarService,
    public menuService: NbMenuService,
    private statusService: StatusService,
    private store: Store<fromCards.State>,
    private nbMenuService: NbMenuService,
    public logInService: LoginService,
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
      const initialState: Word[] = [
        {
          id: 0,
          originalWord: 'compiler',
          translation: 'kompilator',
          isLearned: LearningStatus.UNKNOWN
        },
        {
          id: 1,
          originalWord: 'graphics card',
          translation: 'karta graficzna',
          isLearned: LearningStatus.UNKNOWN
        }
      ];
      initialState.forEach(word => this.store.dispatch(new actions.AddCard(word)));
      this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'profile-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        switch (title) {
          case 'Log out':
            this.logInService.logOut();
            this.router.navigate(['auth', 'login']);
            break;
          default:
            break;
        }
      });
    }
  ngAfterContentInit() {
    this.userData$.subscribe(data => {
      switch (data.role) {
        case UserRoles.USER:
          this.items[this.items.findIndex(item => item.title === 'Admin')].hidden = true;
          this.items[this.items.findIndex(item => item.title === 'User')].hidden = false;
          this.items[this.items.findIndex(item => item.title === 'Authentication')].hidden = true;
          this.items[this.items.findIndex(item => item.title === 'Authentication')].children.map(item => item.hidden = true);
          break;
        case UserRoles.ADMIN:
          this.items[this.items.findIndex(item => item.title === 'Admin')].hidden = false;
          this.items[this.items.findIndex(item => item.title === 'User')].hidden = true;
          this.items[this.items.findIndex(item => item.title === 'Authentication')].hidden = true;
          this.items[this.items.findIndex(item => item.title === 'Authentication')].children.map(item => item.hidden = true);
          break;
        default:
          this.items[this.items.findIndex(item => item.title === 'Admin')].hidden = true;
          this.items[this.items.findIndex(item => item.title === 'User')].hidden = true;
          this.items[this.items.findIndex(item => item.title === 'Authentication')].hidden = false;
          this.items[this.items.findIndex(item => item.title === 'Authentication')].children.map(item => item.hidden = false);
      }
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  ngOnDestroy() {
    this.statusService.setStatus('inactive');
  }

}
