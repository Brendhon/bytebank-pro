import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  styleUrl: './app.css',
  templateUrl: './app.html'
})
export class App {
  protected title = 'Bytebank Pro';
}
