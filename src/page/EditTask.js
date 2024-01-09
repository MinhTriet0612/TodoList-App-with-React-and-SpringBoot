import React, { useRef, useContext } from "react";
import { Button, Form, Input, DatePicker, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { TaskContext } from "../store/TaskContext";

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

const { RangePicker } = DatePicker;
const options = [
	{ label: "In Day", value: "IN_DAY" },
	{ label: "In Three Day", value: "IN_THREE_DAYS" },
	{ label: "In Week", value: "IN_WEEK" },
	{ label: "In Two Weeks", value: "IN_TWO_WEEKS" },
	{ label: "In Month", value: "IN_MONTH" },
];

const StateTask = [
	{ label: "IN_PROGRESS", value: "IN_PROGRESS" },
	{ label: "COMPLETED", value: "COMPLETED" },
	{ label: "CANCELLED", value: "CANCELLED" },
	{ label: "OVERDUE", value: "OVERDUE" },
];

const EditTaskPage = () => {
	const { editTaskService } = useContext(TaskContext);
	const { state } = useLocation();
	// console.log(state);
	const titleRef = useRef(null);
	const statusRef = useRef(null);
	const priorityRef = useRef(null);
	const noteRef = useRef(null);

	// Variable for notification
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
		const task = {
			status: statusRef.current?.value ? statusRef.current.value : state.status,
			title: titleRef.current.input?.value
				? titleRef.current.input.value
				: state.title,
			priority: priorityRef.current?.value
				? priorityRef.current.value
				: state.priority,
			note: noteRef.current.input?.value
				? noteRef.current.input.value
				: state.note,
		};
		editTaskService(state.id, task);
	};

	return (
		<>
			<h1 style={{ textAlign: "center", marginBottom: "5%" }}>Edit Task</h1>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				style={{ margin: "0 auto " }}
			>
				<Form.Item label="Status Task" name="Status">
					<Select
						onChange={(e) => {
							statusRef.current = e;
						}}
						options={StateTask}
						placeholder={state.stateTask}
					/>
				</Form.Item>

				<Form.Item label="Task Name" name="taskName">
					<Input
						ref={titleRef}
						style={{ textAlign: "center" }}
						placeholder={state.task}
					/>
				</Form.Item>

				<Form.Item label="Priority" name="Priority">
					<Select
						onChange={(e) => {
							priorityRef.current = e;
						}}
						options={options}
						placeholder={state.target}
					/>
				</Form.Item>

				<Form.Item label="Description" name="description">
					<Input ref={noteRef} />
				</Form.Item>

				<Flex style={{ justifyContent: "center", gap: "1rem" }}>
					{contextHolder}
					<Button
						type="primary"
						htmlType="submit"
						onClick={() => {
							onSubmit();
						}}
					>
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

export default EditTaskPage;
