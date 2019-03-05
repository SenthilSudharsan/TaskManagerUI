import { Injectable } from '@angular/core';
import { Task, ParentTask } from './Task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  testData: Task[];
  private tasksUrl = 'http://localhost/TaskSchedulerAPI/task/get';
  private tasksByIdUrl = 'http://localhost/TaskSchedulerAPI/task/get';
  private tasksCreateUrl = 'http://localhost/TaskSchedulerAPI/task/create';
  private tasksUpdateUrl = 'http://localhost/TaskSchedulerAPI/task/update';
  private tasksEndUrl = 'http://localhost/TaskSchedulerAPI/task/end';
  private parentTaskUrl = 'http://localhost/TaskSchedulerAPI/task/parents';
  constructor(private http: HttpClient) {
    this.testData = [{
      TaskId: 1, Task: "Task 1", ParentTask: "Parent Task 1", StartDate: new Date("12/20/2018"), EndDate: new Date("01/12/2019"), Priority: 10
    }];
  }


  getTasks(): Observable<Task[]> {
    //return this.testData;
    console.log('calling...');
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      catchError(this.handleError('getTasks', []))
    );;
    //return of(this.testData);
  }

  getTasksById(task_Id: number): Observable<Task> {
    //return this.testData;
    console.log('calling...getTasksById');
    return this.http.get<Task>(this.tasksByIdUrl + "/" + task_Id).pipe(
      tap(a => console.log('fetched heroes' + a)),
      catchError(this.handleError('getTasksById'))
    );;
    //return of(this.testData);
  }

  endTaskById(task_Id: number) {
    //return this.testData;
    console.log('calling...endTaskById' + task_Id);
    return this.http.post(this.tasksEndUrl + "/" + task_Id, null);
    // .pipe(
    //   tap(a => console.log('fetched heroes' + a)),
    //   catchError(this.handleError('endTaskById'))
    // );;
    //return of(this.testData);
  }

  addTask(task: Task) {
    console.log("Create calling");
    console.log(task);
    return this.http.post(this.tasksCreateUrl, task);
    // .pipe(
    //   tap((task: Task) => console.log(`added hero w/ id=${task.TaskId}`)),
    //   catchError(this.handleError<Task>('add tasks'))
    // );
  }

  updateTask(task: Task, task_Id: number) {
    console.log("update calling");
    console.log(task);
    return this.http.post(this.tasksUpdateUrl, task);
    // .pipe(
    //   tap((task: Task) => console.log(`added hero w/ id=${task.TaskId}`)),
    //   catchError(this.handleError<Task>('add tasks'))
    // );
  }

  getParents():Observable<ParentTask[]> {
    return this.http.get<ParentTask[]>(this.parentTaskUrl);
    // .pipe(
    //   tap(a => console.log('fetched heroes' + a[0].Task)),
    //   catchError(this.handleError('getTasks', []))
    // );;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
