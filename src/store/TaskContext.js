import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

export const TaskContext = createContext({
	tasks: [],
	addTaskService: () => {},
	editTaskService: () => {},
	removeTaskService: () => {},
});

const actions = {
	ADD_TASK: "ADD_TASK",
	EDIT_TASK: "EDIT_TASK",
	REMOVE_TASK: "REMOVE_TASK",
	GET_TASKS_FROM_DATABASE: "GET_TASKS_FROM_DATABASE",
	SORT_TASK: "SORT_TASK",
};

const TaskContextProvider = ({ children }) => {
	const [api, contextHolder] = notification.useNotification();
	const openNotification = (message, description) => {
		api.open({
			message: message,
			description: description,
			icon: (
				<SmileOutlined
					style={{
						color: "#108ee9",
					}}
				/>
			),
		});
	};
	const reducer = (state, action) => {
		switch (action.type) {
			case actions.ADD_TASK: {
				let check = false;
				let id;
				const { task } = action.payload;
				axios
					.post("http://localhost:8081/api/task", {
						status: task.status,
						priority: task.priority,
						title: task.title,
						note: task.note,
					})
					.then((res) => {
						const data = [...state.tasks, res.data];
						UpdateDataFromDataBase(data);
						check = true;
						id = res.data.id;
						return true;
					})
					.then((check) =>
						check ? openNotification("Sucess", "Add Task Sucessfully") : "",
					)
					.catch((e) => openNotification("Fail", "Add Task Unsucessfully"));
				return check
					? {
							state,
							tasks: [
								...state.tasks,
								{
									id: id,
									status: task.status,
									priority: task.priority,
									title: task.title,
									note: task.note,
								},
							],
					  }
					: { ...state };
			}
			case actions.EDIT_TASK: {
				const { id, task } = action.payload;
				const currentTask = task;
				const editTask = async (id, task) => {
					const res = await axios.put(
						`http://localhost:8081/api/task/${id}`,
						task,
					);
					return res;
				};

				editTask(id, task)
					.then((res) => {})
					.then(openNotification("Sucess", "Edit Task Sucessfully"))
					.catch((e) => openNotification("Fail", "Edit Task Unsucessfully"));

				return {
					state,
					tasks: state.tasks.map((task) =>
						task.id === id ? { id: id, ...currentTask } : task,
					),
				};
			}
			case actions.REMOVE_TASK: {
				const { id } = action.payload;
				const removeTask = async (id) => {
					const res = await axios.delete(
						`http://localhost:8081/api/task/${id}`,
					);
					return res;
				};

				removeTask(id)
					.then((res) => {
						const dataHaveBeenDeleted = res.data;
						const data = state.tasks.filter(
							(task) => task.id !== dataHaveBeenDeleted.id,
						);

						dispatch({ type: actions.GET_TASKS_FROM_DATABASE, payload: data });
					})
					.then(openNotification("Sucess", "Delete Task Sucessfully"))
					.catch((e) => openNotification("Fail", "Delete Task Unsucessfully"));
				return {
					state,
					tasks: state.tasks.filter((task) => task.id !== id),
				};
			}
			case actions.GET_TASKS_FROM_DATABASE: {
				const data = action.payload;
				return { state, tasks: [...data] };
			}
		}
	};

	const [state, dispatch] = useReducer(reducer, {
		tasks: [],
	});
	const addTaskService = (data) => {
		dispatch({ type: actions.ADD_TASK, payload: { task: data } });
	};

	const editTaskService = (id, task) => {
		dispatch({ type: actions.EDIT_TASK, payload: { id, task } });
	};

	const removeTaskService = (id) => {
		dispatch({ type: actions.REMOVE_TASK, payload: { id } });
	};

	const UpdateDataFromDataBase = (data) => {
		dispatch({ type: actions.GET_TASKS_FROM_DATABASE, payload: data });
	};

	useEffect(() => {
		const getDataFromDataBase = async () => {
			const res = await axios.get("http://localhost:8081/api/task");
			return res;
		};

		getDataFromDataBase().then((res) => {
			UpdateDataFromDataBase(res.data);
		});
	}, []);

	return (
		<TaskContext.Provider
			value={{
				tasks: state.tasks,
				addTaskService,
				editTaskService,
				removeTaskService,
			}}
		>
			{children}
			{contextHolder}
		</TaskContext.Provider>
	);
};

export default TaskContextProvider;
