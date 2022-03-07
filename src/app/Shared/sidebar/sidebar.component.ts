import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnDestroy {

  selectedMenu: string;
  routeEvent : Subscription;

  constructor(
    public _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeEvent = this.router.events
      .subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.selectedMenu = event.url;
          }
        });
  }

  userLogout() {
    this._authService.logOut();
  }

  getSelectedRoute(route: any) {
    this.selectedMenu = route;
  }

  checkIfRouterActive(route: string) {
    if (this.selectedMenu == route) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.routeEvent.unsubscribe();
  }

}
