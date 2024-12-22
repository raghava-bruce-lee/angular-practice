import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RouterOutlet } from '@angular/router';
import { useUserStore } from './core/stores/user';
import { useSpinnerStore } from './core/stores/spinner';

@Component({
  selector: 'app-root',
  imports: [DefaultLayoutComponent, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly userStore = inject(useUserStore);
  readonly spinnerStore = inject(useSpinnerStore);

  title = 'angular-practice';
}
