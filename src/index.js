import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskContextProvider from "./store/TaskContext";

createRoot(document.getElementById("root")).render(
	<TaskContextProvider>
		<App />
	</TaskContextProvider>,
);
