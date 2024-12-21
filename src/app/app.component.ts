import { Component } from '@angular/core';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [DefaultLayoutComponent, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-practice';
}
