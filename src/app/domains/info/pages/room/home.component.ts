import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './templates/home.component.html',
  styleUrl: './templates/home.component.scss'
})
export class HomeComponent {

}
