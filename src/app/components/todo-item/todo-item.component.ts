import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo = new EventEmitter <Todo>();
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onToggle(todo) {
    // Toggle in UI
    this.todo.completed = !todo.completed;
    // Toggle on servers
    this.todoService.toggleCompleted(todo).subscribe(
      todo => console.log(todo)
    );
  }
  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }

}
