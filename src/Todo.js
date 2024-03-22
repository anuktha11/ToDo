import React, { useState } from "react";
import "./Todo.css";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function Todo() {
  const [input, setInput] = useState(" ");
  const [data, setData] = useState([]);
  const [editId,setEditId]=useState(0)


  const addTodo = () => {
    if(input !== ''){
    setData([...data, { list: input, id: Date.now(), status: false }]);
    setInput("");
    }
    if(editId){
      const editTodo =data.find((todo)=>todo.id==editId)
      const updateTodo=data.map((to)=>to.id===editTodo.id
    ?(to={id:to.id,list:input})
    :(to={id:to.id,list:to.list}))
    setData(updateTodo)
    setEditId(0)
    setInput('')
    }
  };

  const onEdit = (id) => {
    
  const editTodo  =  data.find((to)=>to.id === id )
  setInput(editTodo.list) 
  setEditId(editTodo.id)
};


  const onDelete = (id) => {
    setData(data.filter((to) => to.id !== id));
  };
  const onComplete = (id) => {
    let complete = data.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setData(complete);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>

      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          className="form-control"
          placeholder="Enter your Todos ....."
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <button onClick={addTodo}> {editId?"EDIT":"ADD"}  </button>
      </form>
      <div className="list">
        <ul>
          {data.map((todo) => (
            <li className="form-control" id={todo.status ? "todo" : ""}>
              {todo.list}
              <span>
                <IoMdCheckmarkCircleOutline
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={() => onComplete(todo.id)}
                />

                <GrEdit
                  className="list-item-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => onEdit(todo.id)}
                />

                <RiDeleteBin6Line
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => onDelete(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
