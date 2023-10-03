import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class UtilsService {

    shorten(property: string) {
        if (property.length < 120) return property;
        else return property.substr(0, 120) + '...';
    }

    getDate(todo: any) {
        return todo.dueDate?.getDate().toString().padStart(2, '0') + '.' + (todo.dueDate?.getMonth() + 1).toString().padStart(2, '0') + '.' + todo?.dueDate?.getFullYear();
    }

}
