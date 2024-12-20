import { Component } from '@angular/core';
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";

@Component({
  selector: 'app-root',
  imports: [DefaultLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-practice';
}
