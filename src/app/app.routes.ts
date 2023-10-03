import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";
import { ImpressumComponent } from "src/app/impressum/impressum.component";
import { AboutComponent } from "src/app/about/about.component";
import { DatenschutzComponent } from "src/app/datenschutz/datenschutz.component";
import { TodoDetailsComponent } from "src/app/todo-details/todo-details.component";
import { NotFoundComponent } from "src/app/not-found/not-found.component";

export const appRoutes= [
  {path: '', component: TodoListComponent},
  {path: 'create', component: TodoFormComponent},
  {path: 'about', component: AboutComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'datenschutz', component: DatenschutzComponent},
  {path: 'details/:id', component: TodoDetailsComponent},
  {path: 'notfound/', component: NotFoundComponent},
];
