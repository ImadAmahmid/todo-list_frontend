import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { USER_STORAGE_KEY } from './auth.service';
import { map } from 'rxjs/operators';
import { TodoItem } from '../models/todo-item';


@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private httpClient: HttpClient) { }

  getTodoItems() {
    console.log('Getting todo items..')

    if (!this.isLocalStorageAvailable) return

    const httpOptions = this.setHeaders();

    return this.httpClient.get('http://localhost:8088/api/v1/user/todos', httpOptions).pipe(
      map((res: any) => {
        let todos = [];
        for(const item of res){
          todos.push(new TodoItem(item));
        } 
        return todos;
      })
    );
  }

  
  deleteTodoItem(todoId:number) {
    console.log('Deleting todo items..')

    if (!this.isLocalStorageAvailable) return
    const httpOptions = this.setHeaders();

    return this.httpClient.delete('http://localhost:8088/api/v1/todo/' + todoId, httpOptions);
  }
  
  createOrUpdateItems(todoItem :TodoItem) {
    console.log('Create todo items..')

    if (!this.isLocalStorageAvailable) return

    const httpOptions = this.setHeaders();

    return this.httpClient.post('http://localhost:8088/api/v1/todo/', todoItem, httpOptions).pipe(
      map((res: any) => {
        // We could store the user information as well in this step
        console.log('Result', res);
        return new TodoItem(res);
      })
    );
  }

  setHeaders() {
    var httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + localStorage.getItem(USER_STORAGE_KEY)
    });

    return {
      headers: httpHeaders
    };
  }
}
