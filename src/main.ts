import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { TasksServices } from './app/tasks/tasks.service';

bootstrapApplication(App, appConfig,
//   {
//   providers:[TasksServices]
// }
)
  .catch((err) => console.error(err));
