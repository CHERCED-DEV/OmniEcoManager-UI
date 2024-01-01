import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'blog-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './templates/blog.component.html',
  styleUrl: './templates/blog.component.scss'
})
export class BlogComponent {

}
