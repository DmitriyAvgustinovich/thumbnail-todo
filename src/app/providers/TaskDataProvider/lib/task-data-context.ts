import React from "react";

import { ITask } from "shared/types/ITask";

export const TaskDataContext = React.createContext<ITask>({} as ITask);
