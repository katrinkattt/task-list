export type ITask = {
  id: number;
  title?: string;
  description?: string;
  dateStart?: string | Date | undefined;
  dateEnd?: string | Date | undefined;
  completly?: boolean;
};

export type ITasks = ITask[];

export type ITaskState = {
  tasks: ITasks;
  trash: ITasks;
};
