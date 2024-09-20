export class TodoItem {
    id: number;
    title: string;
    description: string;
    status: Status;
    isCompleted: boolean;
    isBeingUpdated: boolean;

    constructor(todoItem :any) {
        this.id = todoItem.id | 0;
        this.title = todoItem.title || 'Title Example';
        this.description = todoItem.description || 'Description example';
        this.status = todoItem.status || Status.NEW;
        this.isCompleted = todoItem.status === 'COMPLETED';
        this.isBeingUpdated = false;
    }
}

export enum Status {
    NEW,
    IN_PROGRESS,
    COMPLETED
}