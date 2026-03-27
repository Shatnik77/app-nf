import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';

@Component({
  imports: [NavComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'shell';
}
