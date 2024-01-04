import {Component, OnInit} from '@angular/core';
import {MainComponent} from "./main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MainComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.enableDarkMode();
  }

  private enableDarkMode(): void {
    if (localStorage['theme'] !== 'default') {
      if (document && document.body) {
        document.body.classList.add('theme-' + localStorage['theme']);
      }
    }
    if (localStorage['darkMode'] === 'dark') {
      if (document && document.documentElement) {
        document.documentElement.classList.add('dark');
      }
    } else if (localStorage['darkMode'] === 'light') {
      if (document && document.documentElement) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'light');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('darkMode', 'system');
      if (document && document.documentElement) {
        document.documentElement.classList.add('dark');
      }
    } else {
      if (document && document.documentElement) {
        document.documentElement.classList.remove('dark');
      }
    }
  }

}
