import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSlideToggleChange } from '@angular/material';
import { Task, SearchTask, ParentTask } from '../Task';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../ErrorStateMatcher';
import { TaskServiceService } from '../task-service.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-task-manager-home',
  templateUrl: './task-manager-home.component.html',
  styleUrls: ['./task-manager-home.component.css']
})
export class TaskManagerHomeComponent implements OnInit {
  testData: Task[];
  constructor(private taskService: TaskServiceService) {

    this.createTask = new Task();
    this.createTask.IsCreate = true;
    this.selectedTab = 0;
    this.searchTask = new SearchTask();

  }

  displayedColumns = ['Task', 'ParentTask', 'Priority', 'Start Date', 'End Date', 'Action'];
  dataSource: MatTableDataSource<Task>;
  createTask: Task;
  selectedTab: number;
  searchTask: SearchTask;
  parentTasks: ParentTask[];


  TaskFormControl = new FormControl('', [
    Validators.required,
  ]);
  PriorityFormControl = new FormControl('', [
    Validators.required,
  ]);
  StartFormControl = new FormControl('', [
    Validators.required,
  ]);
  EndFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  ngOnInit() {
    this.taskService.getParents().subscribe(a => this.parentTasks = a);
    this.taskService.getTasks().subscribe(a => this.setData(a));
  }

  applyFilter() {
    console.log("applyFilter");
    console.log(this.searchTask);
    let filters = [];
    if (this.searchTask.Task != null && this.searchTask.Task.trim() != "") {
      filters.push({ columnId: "Task", value: this.searchTask.Task });
    }
    if (this.searchTask.ParentTask != null && this.searchTask.ParentTask.trim() != "") {
      filters.push({ columnId: "ParentTask", value: this.searchTask.ParentTask });
    }
    if ((this.searchTask.PriorityFrom != null && this.searchTask.PriorityFrom > 0) && (this.searchTask.PriorityTo != null && this.searchTask.PriorityTo)) {
      filters.push({ columnId: "Priority", value: this.searchTask.PriorityFrom + "," + this.searchTask.PriorityTo });
    }
    if (this.searchTask.StartDate != null) {
      filters.push({ columnId: "StartDate", value: this.searchTask.StartDate });
    }
    if (this.searchTask.EndDate != null) {
      filters.push({ columnId: "EndDate", value: this.searchTask.EndDate });
    }
    const tableFilters = [];
    filters.forEach((filter) => {
      tableFilters.push({
        id: filter.columnId,
        value: filter.value
      });
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }

  setData(a: any) {
    this.dataSource = new MatTableDataSource(a)
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);
      //const columns = (<any>Object).values(data);

      filters.forEach(filter => {
        let val: string;
        let columnName: string;
        val = data[filter.id] === null ? '' : data[filter.id];
        columnName = filter.id;
        console.log("val" + val);
        console.log("columnName" + filter.id);
        if (filter.id == "Priority") {
          let priorityArray = filter.value.toString().split(",", 2);
          let start = priorityArray[0];
          let end = priorityArray[1];
          console.log(start);
          console.log(end);
          matchFilter.push((val >= start));
          matchFilter.push((val <= end));
        }
        else if (filter.id == "StartDate" || filter.id == "EndDate") {
          matchFilter.push(new Date(val).getDate() == new Date(filter.value).getDate());
        }
        else {
          console.log("filter.value" + filter.value);
          matchFilter.push(val.toString().toLowerCase().trim() == filter.value.toString().toLowerCase().trim());
        }
      });
      return matchFilter.every(Boolean); // AND condition
      // return matchFilter.some(Boolean); // OR condition
    }
  }

  editTask(taskId: number) {
    this.selectedTab = 0;
    this.taskService.getTasksById(taskId).subscribe(a => this.createTask = a);
    this.createTask.IsCreate = false;
  }

  endTask(taskId: number) {
    this.taskService.endTaskById(taskId).subscribe(g => this.taskService.getTasks().subscribe(a => this.setData(a)));
  }
  cancelUpdate() {
    this.selectedTab = 1;
    this.createTask = new Task();
    this.createTask.IsCreate = true;
    this.searchTask = new SearchTask();
  }
  Reset() {
    this.selectedTab = 0;
    this.createTask = new Task();
    this.createTask.IsCreate = true;
    this.searchTask = new SearchTask();
  }

  onTabClick(event: MatTabChangeEvent) {
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab name=> ', event.tab.textLabel);
    if (event.index == 1) {
      this.createTask = new Task();
      this.createTask.IsCreate = true;
      this.taskService.getTasks().subscribe(a => this.setData(a));
      this.searchTask = new SearchTask();
    }
  }

  onclickTab() {
    console.log('onclickTab');
  }


  onSubmit(CreateTask: NgForm) {
    console.log(CreateTask.value);
    if (CreateTask.valid) {
      let localTask: Task = new Task();
      localTask = CreateTask.value;
      if (localTask.TaskId != undefined && localTask.TaskId > 0) {
        this.taskService.updateTask(CreateTask.value, localTask.TaskId).subscribe(g => this.taskService.getTasks().subscribe(a => this.setData(a)));
        this.selectedTab = 1;
        this.createTask = new Task();
        this.searchTask = new SearchTask();
        this.createTask.IsCreate = true;
      }
      else {
        this.taskService.addTask(CreateTask.value).subscribe(g => this.taskService.getTasks().subscribe(a => this.setData(a)));
        this.selectedTab = 1;
        this.createTask = new Task();
        this.searchTask = new SearchTask();
        this.createTask.IsCreate = true;
      }
    }
    else {
      //DO nothing
    }


  }
}
