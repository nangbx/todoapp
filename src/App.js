import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Home from "./Components/Home";
import NewTask from "./Components/NewTask";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getData } from "./Redux/Actions";

function App() {
	const dispatch = useDispatch();
	const {todos, bulk} = useSelector(state => state.todo);

	const saveLocal = () => {
		localStorage.setItem('todos', JSON.stringify(todos));
		localStorage.setItem('bulk', JSON.stringify(bulk));
	};
	const getDataLocal = () => {
		var todos = JSON.parse(localStorage.getItem('todos'));
		var bulk = JSON.parse(localStorage.getItem('bulk'));
		dispatch(getData(todos, bulk))
	}
	useEffect(() => {
		window.addEventListener("beforeunload", saveLocal);
		return () => {
			window.removeEventListener("beforeunload", saveLocal);
		};
	});
	useEffect(() => {
		getDataLocal();
	}, [])
	return (
		<div className='App' style={{ marginBottom: "100px" }}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/new' element={<NewTask />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
