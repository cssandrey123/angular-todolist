import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  todoAux:Todo;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }
  onDeleteTodo(todo:Todo){
    // Delete UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Delete from server
    this.todoService.deleteTodo(todo).subscribe();
  }
  onAddedTodo(todo: Partial<Todo>){
    // Because the object returned by the event it's not a
    // Todo object, I instantiate one here
    // this.todoAux = {
    //   id: this.todos[this.todos.length-1].id+1,
    //   title: todo.title,
    //   completed: true
    // }
    // console.log(this.todoAux);
    this.todoService.addTodo(todo).subscribe(
      todo => {this.todos.push(todo);console.log(todo)}
    );
  }

}
