import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './tasks.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksServices {
  private tasks = signal<Task[]>([]);
  private loggingServices = inject(LoggingService);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingServices.log('ADDED TASK WITH TITLE :' + taskData.title);
  }
  updateTaskStatus(taskId: string, newStaus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStaus } : task
      )
    );

    this.loggingServices.log('CHANGE TASK STATUS TO :' + newStaus);
  }
}
