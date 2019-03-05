export class Task {
    public TaskId?: number;
    public Task?: string;
    public ParentTask?: string;
    public Parent_Id?:number;
    public Priority?: number;
    public StartDate?: Date;
    public EndDate?: Date;
    public IsTaskEnded?: boolean;
    public IsCreate?: boolean = false;
}

export class SearchTask {
    public Task?: string;
    public ParentTask?: string;
    public PriorityFrom?: number;
    public PriorityTo?: number;
    public StartDate?: Date;
    public EndDate?: Date;
}

export class ParentTask {
    public Parent_Id?: number;
    public Parent_Task?: string;
}