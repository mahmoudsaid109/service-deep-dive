import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TasksServices {
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
  }
  updateTaskStatus(taskId: string, newStaus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStaus } : task
      )
    );
  }
}
