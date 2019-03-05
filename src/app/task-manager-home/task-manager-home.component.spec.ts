import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerHomeComponent } from './task-manager-home.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TaskServiceService } from '../task-service.service';

describe('TaskManagerHomeComponent', () => {
  let component: TaskManagerHomeComponent;
  let fixture: ComponentFixture<TaskManagerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [TaskManagerHomeComponent],
      providers: [TaskServiceService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
