import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskManagerHomeComponent } from './task-manager-home/task-manager-home.component';


const routes: Routes = [
  { path: 'taskmanagerhome', component: TaskManagerHomeComponent },
  { path: '', redirectTo: '/taskmanagerhome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
