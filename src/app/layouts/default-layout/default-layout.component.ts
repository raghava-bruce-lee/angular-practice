import { Component, inject, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AsyncPipe,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
  ],
})
export class DefaultLayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
