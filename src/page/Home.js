import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	useContext,
} from "react";
import {
	EditOutlined,
	DeleteOutlined,
	SearchOutlined,
	FilterOutlined,
	ReloadOutlined,
	SortAscendingOutlined,
	CheckOutlined,
	SmileOutlined,
} from "@ant-design/icons";

import { Button, Flex, Form, Modal, Table, Input } from "antd";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";
import { TaskContext } from "../store/TaskContext";
import axios from "axios";
import Select from "react-select";
import { notification } from "antd";

const HomePage = () => {
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

	const [currentTask, setCurrentTask] = useState([]);
	const { tasks, removeTaskService } = useContext(TaskContext);
	const [taskAmount, setTaskAmount] = useState({});

	useEffect(() => {
		setCurrentTask(tasks);

		const calculateAmountTaskStatus = async () => {
			const res = await axios.get(
				"http://puzzled-quiet-production.up.railway.app/api/filteramount",
			);
			return res;
		};
		calculateAmountTaskStatus().then((res) => {
			setTaskAmount(res.data);
		});
	}, [tasks]);

	const sortTaskService = () => {
		axios
			.get("http://puzzled-quiet-production.up.railway.app/api/sorting")
			.then((res) => {
				console.log(res.data);
				setCurrentTask(res.data);
			});
	};

	const reloadDataService = () => {
		setCurrentTask(tasks);
	};

	const findTaskViaTitleService = (title) => {
		setCurrentTask(
			tasks.filter((task) =>
				task.title.toLowerCase().includes(title.toLowerCase()),
			),
		);
	};

	const removeTaskServiceViaID = (id) => {
		console.log("have deleted");
		removeTaskService(id);
	};

	const filterTaskService = (status, priority) => {
		console.log(status, priority);
		axios
			.get(
				"http://puzzled-quiet-production.up.railway.app/api/filterViaStatusAndPriority",
				{
					params: {
						status: status ? status : "Default",
						priority: priority ? priority : "Default",
					},
				},
			)
			.then((res) => setCurrentTask(res.data))
			.then(openNotification("Filter", "Success"));
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalOpenFilter, setIsModalOpenFilter] = useState(false);
	const statusRef = useRef(null);
	const priorityRef = useRef(null);

	const options = [
		{ label: "Default", value: "Default" },
		{ label: "In Day", value: "IN_DAY" },
		{ label: "In Three Day", value: "IN_THREE_DAYS" },
		{ label: "In Week", value: "IN_WEEK" },
		{ label: "In Two Weeks", value: "IN_TWO_WEEKS" },
		{ label: "In Month", value: "IN_MONTH" },
	];
	const StateTask = [
		{ label: "Default", value: "Default" },
		{ label: "IN_PROGRESS", value: "IN_PROGRESS" },
		{ label: "COMPLETED", value: "COMPLETED" },
		{ label: "CANCELLED", value: "CANCELLED" },
		{ label: "OVERDUE", value: "OVERDUE" },
	];
	const columns = [
		{
			title: "Tình trạng",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "Nhiệm vụ",
			dataIndex: "title",
			key: "title",
		},
		{
			title: "Mức độ quan trọng",
			dataIndex: "priority",
			key: "priority",
		},
		{
			title: "Mô tả",
			dataIndex: "note",
			key: "note",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Flex style={{ gap: "0.5rem" }}>
					<Button>
						<Link
							to={`/edit-task/${record.id}`}
							style={{ textDecoration: "none", color: "black" }}
							state={record}
						>
							<EditOutlined />
						</Link>
					</Button>

					<Button
						onClick={() => {
							removeTaskServiceViaID(record.id);
						}}
					>
						<DeleteOutlined />
					</Button>
				</Flex>
			),
		},
	];
	return (
		<>
			{contextHolder}
			<h1 style={{ margin: "1rem" }}>Quản lý công việc</h1>
			<Search
				placeholder="Tìm kiếm theo tiêu đề công việc"
				enterButton={<SearchOutlined />}
				size="middle"
				style={{ width: "30%", margin: "0 auto 5% auto" }}
				onPressEnter={(e) => {
					findTaskViaTitleService(e.target.value);
				}}
				onSearch={(value) => {
					findTaskViaTitleService(value);
				}}
				onChange={(e) => {
					if (e.target.value === "") {
						setCurrentTask([...tasks]);
					}
				}}
			/>
			<Flex style={{ margin: "0 1rem", gap: "35rem" }}>
				<Flex style={{ gap: "5px" }}>
					<Button
						style={{ fontWeight: "bold" }}
						onClick={() => setIsModalOpenFilter(true)}
					>
						{<FilterOutlined style={{ fontSize: "16px" }} />} Filter
					</Button>
					<Button
						style={{ fontWeight: "bold" }}
						onClick={() => sortTaskService()}
					>
						{<SortAscendingOutlined style={{ fontSize: "16px" }} />}Sort
					</Button>
					<Button
						onClick={() => {
							setIsModalOpen(true);
						}}
						style={{ fontWeight: "bold" }}
					>
						<CheckOutlined style={{ fontSize: "16px" }} />
						Check
					</Button>
					<Button
						style={{ fontWeight: "bold" }}
						onClick={() => reloadDataService()}
					>
						{<ReloadOutlined style={{ fontSize: "16px" }} />}
					</Button>
				</Flex>
				<Link to="add-task" style={{ textDecoration: "none" }}>
					<Button
						style={{ fontWeight: "bold" }}
						onClick={() => {
							setIsModalOpen(true);
						}}
					>
						+ Add
					</Button>
				</Link>
			</Flex>
			<Table
				dataSource={currentTask}
				columns={columns}
				style={{ margin: "1rem" }}
			/>
			<Modal
				title="Check"
				open={isModalOpen}
				onOk={() => {
					setIsModalOpen(false);
				}}
				onCancel={() => {
					setIsModalOpen(false);
				}}
			>
				<p>IN_PROGRESS: {taskAmount.IN_PROGRESS}</p>
				<p>COMPLETED: {taskAmount.COMPLETED}</p>
				<p>CANCELLED: {taskAmount.CANCELLED}</p>
				<p>OVERDUE: {taskAmount.OVERDUE}</p>
			</Modal>

			<Modal
				title="Filter"
				open={isModalOpenFilter}
				onOk={() => {
					{
						setIsModalOpenFilter(false);
						filterTaskService(
							statusRef.current?.value,
							priorityRef.current?.value,
						);
					}
				}}
				onCancel={() => {
					setIsModalOpenFilter(false);
				}}
			>
				<Form>
					<Form.Item label="Lọc theo mức độ quan trọng">
						<Select
							options={options}
							defaultValue={options[0]}
							onChange={(e) => {
								priorityRef.current = e;
							}}
						/>
					</Form.Item>
					<Form.Item label="Lọc theo trạng thái">
						<Select
							options={StateTask}
							defaultValue={options[0]}
							onChange={(e) => {
								statusRef.current = e;
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default HomePage;
