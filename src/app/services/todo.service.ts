import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'aplication/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl= 'https://jsonplaceholder.typicode.com/todos';
  todosLimit = '?_limit=5';
  constructor(private http:HttpClient) { }

  getTodos():Observable<Todo[]> {
    return this.http.get <Todo []>(`${this.todosUrl}${this.todosLimit}`);
  }
  
  toggleCompleted(todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url,todo,httpOptions);
  }
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url,httpOptions);
  }
  addTodo(todo:Partial<Todo>):Observable<Todo> {
    return this.http.post<Todo>(
      this.todosUrl, todo, httpOptions
    )
  }
}
