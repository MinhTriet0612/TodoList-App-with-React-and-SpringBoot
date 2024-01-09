import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddTaskPage from "./page/AddTask";
import EditTaskPage from "./page/EditTask";
import HomePage from "./page/Home";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: "/add-task",
			element: <AddTaskPage />,
		},
		{
			path: "/edit-task/:id",
			element: <EditTaskPage />,
		},
	]);

	return (
		<div className="todo-app">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
