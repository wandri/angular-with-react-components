import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ReactComponentComponent} from "./react/react-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  data = signal<{ value: string }[][]>([]);
  selectedCell = signal<{ row?: number, column?: number }>({row: undefined, column: undefined});

  constructor() {
    const data = generateData();
    this.data.set(data)
  }

  changeData() {
    const data = generateData();
    this.data.set(data)
  }


  componentChanged($event: { row?: number, column?: number }): void {
    this.selectedCell.set($event)
  }
}

function generateData(): { value: string }[][] {
  const data = [];

  for (let i = 0; i < 100; i++) {
    data.push([{value: generateRandomCharacters()}, {value: generateRandomCharacters()}, {value: generateRandomCharacters()}])
  }
  return data;
}

function generateRandomCharacters(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let randomWord = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomWord += alphabet[randomIndex];
  }

  return randomWord;
}
