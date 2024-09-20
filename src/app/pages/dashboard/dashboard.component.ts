import { Component, } from '@angular/core';
import { TodoItemsService } from '../../services/todo-items.service';
import { TodoItem } from '../../models/todo-item';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TodoComponent } from "../../component/todo/todo.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, TodoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  todoList: Array<TodoItem> = [];

  constructor(private todoItemService: TodoItemsService, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.todoItemService.getTodoItems()?.subscribe({
      next: (res) => {
        console.log('LOAD TODOS SUCCESS', res)
        this.todoList = res;
      },
      error: (err) => {
        console.log('LOAD TODOS ERROR', err)
      }
    });
  }

    appendNewTodo() {
      let newItem = new TodoItem({})
      newItem.isBeingUpdated =true;
      this.todoList = [newItem, ...this.todoList]; 

    }

    logout() {
      console.log('LOGGING OUT ...');
      this.authService.logOut();
      this.router.navigateByUrl('/login');
    }

}
