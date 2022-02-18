import React from "react";
import "./Bulk.scss";
import { useDispatch } from "react-redux";
import { completeAllTask } from "../Redux/Actions";
import { removeAllTask } from "../Redux/Actions";

export default function Bulk() {
	const dispatch = useDispatch();

	const handleDone = () => {
		dispatch(completeAllTask());
	}

	const handleRemove = () => {
		dispatch(removeAllTask());
	}
	return (
		<div className='bulk'>
			<div className='name'>Bulk action:</div>
			<div className='actions'>
				<button id='done' style={{ backgroundColor: "rgb(33,150,243)" }} onClick = {handleDone}>
					Done
				</button>
				<button id='remove' style={{ backgroundColor: "rgb(217,83,79)" }} onClick = {handleRemove}>
					Remove
				</button>
			</div>
		</div>
	);
}
