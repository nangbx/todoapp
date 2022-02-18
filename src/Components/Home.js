import React, { useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { notiSuccess, notiWarning } from "../Notification/notification";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, updateTask } from "../Redux/Actions";
import Details from "./Details";
import Bulk from "./Bulk";

function ListItem({ item, index, set }) {
	const dispatch = useDispatch();
	const [hidden, setHidden] = useState(true);
	const handleRemove = (item) => {
		dispatch(removeTask(item));
		notiSuccess("Đã xóa thành công!");
		set("");
	};
	const handleCheck = (e) => {
		var temp = item;
		temp.state = e.target.checked;
		dispatch(updateTask(temp, item));
	};
	return (
		<div key={index} className='todo-item'>
			<div className='info'>
				<div className='name'>
					<input
						type='checkbox'
						id='check'
						checked={item.state}
						onChange={handleCheck}
					/>
					<p>{item.title}</p>
				</div>
				<div className='action'>
					<button id='detail' onClick={() => setHidden((prev) => !prev)}>
						Detail
					</button>
					<button id='remove' onClick={() => handleRemove(item)}>
						Remove
					</button>
				</div>
			</div>
			<Details item={item} hidden={hidden} index={index} />
		</div>
	);
}

export default function Home() {
	let navigate = useNavigate();
	const { todos, bulk } = useSelector((state) => state.todo);
	const [search, setSearch] = useState("");
	const handleNewTask = () => {
		navigate("/new");
	};
	return (
		<React.Fragment>
			<div className='home'>
				<h1 className='title'>To Do List</h1>
				<div className='todo-list'>
					<input
						type='text'
						id='search'
						placeholder='Search...'
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
					{todos.length ? (
						todos
							.filter((item) => {
								return (
									item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
								);
							})
							.map((item, index) => (
								<ListItem
									key={index}
									item={item}
									index={index}
									set={setSearch}
								/>
							))
					) : (
						<h3>Chưa có task</h3>
					)}
				</div>
				<div className='footer'>
					<button onClick={handleNewTask}>Add to do</button>
				</div>
			</div>
			{bulk ? <Bulk /> : ""}
		</React.Fragment>
	);
}
