import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { useUserStore } from '../core/stores/user';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  readonly userStore = inject(useUserStore);
  destroyRef = inject(DestroyRef);

  clickAction = output();

  headerTitle = signal('');

  ngOnInit(): void {
    const subscriber = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.route.firstChild;
          while (route?.firstChild) {
            route = route.firstChild;
          }
          return route?.snapshot.data['title'] || 'Default Title';
        })
      )
      .subscribe((title: string) => {
        this.headerTitle.set(title);
      });

    this.destroyRef.onDestroy(() => subscriber.unsubscribe());
  }

  onClick() {
    this.clickAction.emit();
  }

  onLogout() {
    this.userStore.logout();
  }
}
