import React, {useState} from "react";
import Form from "./Form.js"
import './NewTask.scss';
import { useNavigate } from "react-router-dom";
import { notiSuccess, notiWarning } from "../Notification/notification.js";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addNewTask } from "../Redux/Actions/index.js";

export default function NewTask() {
    let navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();
    const [task, setTask] = useState({
        title: '',
        description: '',
        date: moment().format('yyyy-MM-DD'),
        piority: 'normal'
    })
    const handleBack = () => {
        navigate('/');
    }
    const handleAdd = () => {
        if(!/^(?!\s*$).+/.test(task.title)){
            notiWarning('Thêm task thất bại')
            setErrors('Tiều đề chưa hợp lệ')
        } else{
            dispatch(addNewTask(task))
            navigate('/');
            notiSuccess('Thêm thành công!')
        }
    }
	return <div className="newtask">
        <h1 className="title">New Task</h1>
        <div className="back" onClick={handleBack}>
            <i className="fa-solid fa-arrow-left"></i> Back
        </div>
        <Form errors={errors} task = {task} setTask = {setTask} setErrors = {setErrors}/>
        <button className="add" onClick={handleAdd}>Add</button>
    </div>;
}
