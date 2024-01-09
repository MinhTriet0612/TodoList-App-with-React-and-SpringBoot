import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
const NotificationMixInButton = ({ message, description }) => {
	const [api, contextHolder] = notification.useNotification();
	const openNotification = () => {
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
	return (
		<>
			{contextHolder}
			<Button
				type="primary"
				onClick={() => {
					openNotification();
				}}
			>
				Submit
			</Button>
		</>
	);
};
export default NotificationMixInButton;
