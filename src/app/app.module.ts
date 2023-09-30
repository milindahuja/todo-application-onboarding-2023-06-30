import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoFormComponent} from './todo-form/todo-form.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    TodoDetailsComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DatePipe
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
