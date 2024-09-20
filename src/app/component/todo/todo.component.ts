import { Component, inject, Input } from '@angular/core';
import { Status, TodoItem } from '../../models/todo-item';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItemsService } from '../../services/todo-items.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  private formBuilder = inject(FormBuilder)
  form!: FormGroup;
  error = '';
  @Input() item!: TodoItem;
  isVisible = true

  constructor(private todoItemService: TodoItemsService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.nonNullable.group({
      id: [this.item.id],
      title: [this.item.title, [Validators.required]],
      description: [this.item.description, [Validators.required, Validators.minLength(4)]],
      status: [this.item.status],
    });
  }

  createOrUpdateItem() {
    const todoDto = {
      ...this.form.getRawValue()
    };
    todoDto.id = this.item.id;
    this.todoItemService.createOrUpdateItems(todoDto)?.subscribe({
      next: (res) => {
        console.log('CREATE TODOS SUCCESS', res)
        this.item = res;
        this.item.isBeingUpdated = false;
      },
      error: (err) => {
        console.log('CREATE TODOS ERROR', err)
        this.error = ' ' + err.error.errors.join(",");
      }
    });
  }

  onEdit() {
    this.item = { ... this.item };
    this.item.isBeingUpdated = true;
  }


  toggleTodoStatus($event: any) {
    const todoDto = {
      ...this.form.getRawValue()
    };
    if ($event.target.checked === true) {
      todoDto.status = Status.COMPLETED
    } else {
      todoDto.status = Status.NEW
    }

    this.todoItemService.createOrUpdateItems(todoDto)?.subscribe({
      next: (res) => {
        console.log('UPDATE TODS STATUS SUCCESS', res)
        this.item = res;
      },
      error: (err) => {
        console.log('UPDATE TODO STATUS ERROR', err)
        this.error = ' ' + err.error.errors.join(",");
      }
    });
  }

  onDelete() {
    this.todoItemService.deleteTodoItem(this.item.id)?.subscribe({
      next: (res) => {
        console.log('DELETE TODOS SUCCESS', res)
        this.isVisible = false;
      },
      error: (err) => {
        console.log('CREATE TODOS ERROR', err)
        this.error = ' ' + err.error.errors.join(",");
      }
    });
  }
}
