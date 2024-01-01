import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'eco-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './templates/eco.component.html',
  styleUrl: './templates/eco.component.scss'
})
export class EcoComponent {

}
