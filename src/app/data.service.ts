import { Injectable } from "@angular/core";
import { Todo } from "src/app/todo";

export function getTodoFromString(t) {
  if (!t) return undefined;
  let arr = t.split('///')
  return {
    id: arr[0],
    title: arr[1],
    description: arr[2],
    dueDate: new Date(arr[3])
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
