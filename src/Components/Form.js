import React, { useState } from "react";
import "./Form.scss";
import { notiWarning } from "../Notification/notification";
import moment from "moment";
import Details from "./Details";

export default function Form({ errors, task, setTask, setErrors }) {
	return (
		<div className='form'>
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
					setErrors("");
				}}
			/>
			<span style={{ color: "red" }}>{errors}</span>
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
						data-date-format='DD/MM/YYYY'
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
		</div>
	);
}
