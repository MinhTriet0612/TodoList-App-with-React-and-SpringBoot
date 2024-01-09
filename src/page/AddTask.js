import React, { useContext } from "react";
import { Button, Form, Input, Flex } from "antd";
import { Link } from "react-router-dom";
import Select from "react-select";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { TaskContext } from "../store/TaskContext";

const { Option } = Select;
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

const options = [
	{ label: "In Day", value: "IN_DAY" },
	{ label: "In Three Day", value: "IN_THREE_DAYS" },
	{ label: "In Week", value: "IN_WEEK" },
	{ label: "In Two Weeks", value: "IN_TWO_WEEKS" },
	{ label: "In Month", value: "IN_MONTH" },
];

const AddTaskPage = () => {
	const { tasks, addTaskService } = useContext(TaskContext);
	const titleRef = React.useRef("");
	const priorityRef = React.useRef("");
	const noteRef = React.useRef("");
	const taskName = tasks.map((task) => task.title.toLowerCase());
	// 	// Variable for notification
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

	const onSubmit = () => {
		console.log(
			noteRef.current.input.value,
			titleRef.current.input.value,
			priorityRef.current.value,
		);

		const task = {
			status: "IN_PROGRESS",
			title: titleRef.current.input.value,
			priority: priorityRef.current.value,
			note: noteRef.current.input.value,
		};

		addTaskService(task);
	};
	return (
		<>
			<h1 style={{ textAlign: "center", marginBottom: "5%" }}>Add Task</h1>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				style={{ margin: "0 auto " }}
			>
				<Form.Item
					label="Task Name"
					name="taskName"
					rules={[
						{
							required: true,
							message: "Please input your task name!",
						},
					]}
				>
					<Input ref={titleRef} />
				</Form.Item>
				<Form.Item
					label="Priority"
					name="Priority"
					rules={[
						{
							required: true,
							message: "Please input your option!",
						},
					]}
				>
					<Select
						placeholder="Select a option and change input text above"
						onChange={(e) => {
							priorityRef.current = e;
						}}
						options={options}
					/>
				</Form.Item>

				<Form.Item label="Description" name="description">
					<Input ref={noteRef} />
				</Form.Item>
				<Flex style={{ justifyContent: "center", gap: "1rem" }}>
					{contextHolder}
					<Button type="primary" htmlType="submit" onClick={() => onSubmit()}>
						Submit
					</Button>
					<Button>
						<Link to="/" style={{ textDecoration: "none" }}>
							Back
						</Link>
					</Button>
				</Flex>
			</Form>
		</>
	);
};

export default AddTaskPage;
