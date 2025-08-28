import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksServices } from '../tasks.service';
import { TASK_STATUS_OPTIONS, TaskStatusOptions, TaskStatusOptionsProvider } from '../tasks.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers:[TaskStatusOptionsProvider]
})
export class TasksListComponent {
  private tasksServices = inject(TasksServices);
  private selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksServices
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksServices
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksServices
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksServices.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
