import React, {
  useState
} from "react";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import  db  from "../backend/firebase-config.js";
import { collection, addDoc, onSnapshot,deleteDoc, doc, updateDoc, setDoc  } from "firebase/firestore";

function BoardCard({ board, onDelete}) {

  const [tasks , setTasks] = useState([]);

  const [newTask , setNewTask] = useState({
    title: '',
    description: '',
    boardId: board.boardId,
    dueDate: '',
    assignee: '',
    isCompleted: false,
    taskId: 0,
  });

  const handleTaskChange = (e) => {
    console.log({ [e.target.name]: e.target.value});
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const createTask = async (task) => {

    const boardsRef = doc(db, "boards", board.boardId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(boardsRef, {
      tasks: [...tasks, task]
    });
    
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    // create a new task in the firebase database
    createTask(newTask);
    setTasks([...tasks, newTask]);
    setNewTask({
      title: '',
      description: '',
      boardId: board.boardId,
      dueDate: '',
      assignedTo: '',
      isCompleted: false,
      taskId: 0,
    });
  };
  
  // onSnapshot(collection(db, "boards"), (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     if (doc.id === board.boardId) {
  //       setTasks(doc.data().tasks);
  //     }
  //   });
  // });

  return (
    <div className="px-8 mt-10 lg:mb-10 bg-red-800 md:mx-3 border-2 rounded-xl
      border-black mx-auto justify-center align-center w-56 md:w-72">
      
      <button
        className="border-2 border-black w-[50px] float-right bg-black text-white font-bold mt-4"
        onClick={() => onDelete(board.boardId)}>X
      </button>

      <h1 className="text-2xl font-bold text-white justify-center mx-auto py-3">{board.title}</h1>
    
      <div className="flex flex-col gap-2">
         {tasks.map((task , index) => {
           return ( <TaskCard key={index} task = { task } /> )
         })}
      </div>

      < TaskForm task={newTask} handleTaskChange={handleTaskChange} handleTaskSubmit={ handleTaskSubmit } />

      <h6 className="text-2xl font-bold text-white justify-center mx-auto pb-3 pt-1">
        {tasks.length > 0 && tasks.length ===1 ? `${tasks.length} Task`: `${tasks.length} Tasks`}
      </h6>
    </div>
  );
}

export default BoardCard;

