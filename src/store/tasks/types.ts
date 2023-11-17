export type ITask = {
  id?: number;
  title?: string;
  description?: string;
  dateStart?: string | Date;
  dateEnd?: string | Date;
  completly?: boolean;
};

export type ITasks = ITask[];

export type ITaskState = {
  tasks: ITasks;
  newTask: ITask;
  trash: ITasks;
};
