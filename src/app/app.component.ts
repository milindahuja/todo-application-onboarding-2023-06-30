import { Component } from '@angular/core';
import { InitializationService } from './services/initialization-service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private initService: InitializationService) {
    this.initService.initializeApp().subscribe();
  }
}
