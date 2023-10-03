import { Injectable } from "@angular/core";
import { Todo } from "src/app/todo";

export function getTodoFromString(t) {
  if (!t) return undefined;
  return {
    id: t.id,
    title: t.title,
    description: t.description,
    dueDate: t.dueDate
  } as Todo
}

export function todo2String(t) {
  let arr = [t.id, t.title, t.description, t.dueDate.toString()]
  return arr.join('///');
}


@Injectable()
export class DataService {

  public items: any;
  public key: string = 'none';

  constructor() {
  }

  setKey(key: string) {
    this.key = key
  }

  setCache() {
    if (!this.items) return;
    window.localStorage.setItem(this.key, JSON.stringify(this.items));
  }

  getCache() {
    let cache: Todo | string | string[] = window.localStorage.getItem(this.key);
    if (!cache) {
      return undefined;
    } else {}
    const result = []
    JSON.parse(cache).forEach(c => {
      result.push({
      id: parseInt(c.id),
      title: c.title,
      description: c.description,
      dueDate: new Date(c.dueDate)
    } as Todo)
    });
    return result;
  }
}
