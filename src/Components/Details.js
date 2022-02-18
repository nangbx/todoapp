import React, { useState, useEffect } from "react";
import "./Form.scss";
import moment from "moment";
import { notiSuccess, notiWarning } from "../Notification/notification";
import { useDispatch } from "react-redux";
import { updateTask } from "../Redux/Actions";

const buttonStyle = {
	width: "100%",
	marginTop: "50px",
	padding: "10px 0px",
	backgroundColor: "rgb(92, 184, 92)",
	color: "white",
	border: "0",
	borderRadius: "10px",
	fontSize: "30px",
};
export default function Details({ item, hidden, index }) {
	const [task, setTask] = useState(item);
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		setTask(item);
	}, [hidden]);

	const handleUpdate = () => {
		if (!/^(?!\s*$).+/.test(task.title)) {
			notiWarning("Cập nhập thất bại!");
			setError("Tiều đề chưa hợp lệ");
		} else {
			dispatch(updateTask(task, item));
			notiSuccess("Cập nhập thành công!");
		}
	};
	return (
		<div className='form' style={{ padding: "30px" }} hidden={hidden}>
			<input
				type='text'
				id='name'
				placeholder='Add new task...'
				value={task.title}
				onChange={(e) => {
					setTask((prev) => ({
						...prev,
						title: e.target.value,
					}));
					setError("");
				}}
			/>
			<span style={{ color: "red" }}>{error}</span>
			<p className='subtitle'>
				<b>Description</b>
			</p>
			<textarea
				rows={8}
				cols={50}
				id='description'
				value={task.description}
				onChange={(e) =>
					setTask((prev) => ({
						...prev,
						description: e.target.value,
					}))
				}
			/>
			<div className='option'>
				<div className='time'>
					<p>
						<b>Due Date</b>
					</p>
					<input
						type='date'
						className='box'
						value={task.date}
						onChange={(e) => {
							if (e.target.value < moment().format("yyyy-MM-DD")) {
								notiWarning("Ngày không hợp lệ");
							} else {
								setTask((prev) => ({
									...prev,
									date: e.target.value,
								}));
							}
						}}
					/>
				</div>
				<div className='piority'>
					<p>
						<b>Piority</b>
					</p>
					<select
						id='piority'
						size={1}
						className='box'
						value={task.piority}
						onChange={(e) => {
							setTask((prev) => ({
								...prev,
								piority: e.target.value,
							}));
						}}
					>
						<option value='low'>Low</option>
						<option value='normal'>Normal</option>
						<option value='hight'>High</option>
					</select>
				</div>
			</div>
			<button style={buttonStyle} onClick={handleUpdate}>
				Update
			</button>
		</div>
	);
}
