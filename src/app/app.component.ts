import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Word } from './interfaces/word';
import { CardProviderService } from './services/card-provider.service';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { NbSidebarService } from '@nebular/theme';
import { StatusService } from './services/status.service';

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
  ];

  constructor(
    private cardService: CardProviderService,
    public router: Router,
    public sidebarService: NbSidebarService,
    public menuService: NbMenuService,
    private statusService: StatusService
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
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  ngOnDestroy() {
    this.statusService.setStatus('inactive');
  }

}
