import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from './components/products/products';
import { Categories } from './components/categories/categories';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Products, Categories],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
