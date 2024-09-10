import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



import { v4 as uuidv4 } from 'uuid';
const App = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const [showFinished, setshowFinished] = useState(true)

useEffect(() => {
  let todoString = (localStorage.getItem("todos"))
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
}, [])


  const saveToLs = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  
  const handleEdit = (e, id)=>{
   let t = todos.filter(i=> i.id === id)
   setTodo(t[0].todo)
   let newTodos = todos.filter((item=>{
    return item.id !== id
   }))
   setTodos(newTodos)
   saveToLs()
  }
  const handleDelete = (e, id)=>{
   let newTodos = todos.filter((item=>{
    return item.id !== id
   }))
   setTodos(newTodos)
   saveToLs()
  }

  const handleAdd = ()=>{
   setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}]) 
   setTodo("");
   saveToLs()
  }


  const handleChange = (e)=>{
   setTodo(e.target.value)
  }

  const handleCheckBox = (e)=>{
   let id = e.target.name; 
   console.log("The id is ",id)
   let index = todos.findIndex(item=>{
    return item.id === id;
   })
   let newTodos = [...todos]
  newTodos[index].isCompleted = !newTodos[index].isCompleted;
setTodos(newTodos)
saveToLs()
  }

  const toggleFinished = ()=>{
setshowFinished(!showFinished)
  }

  return  (
     <>
    <Navbar/>
    {/* container  */}
    <div className='md:container  mx-auto my-5 rounded-xl bg-violet-200 min-h-[88vh] py-3 px-6  md:w-1/2 '>
    <h1 className='text-xl font-bold text-center'>i-Task Manage Your Todos at one place </h1>
      {/* addTodo */}
      <div className='addTodo my-5 '>
      <h2 className='text-lg font-bold'>Add A Todo</h2>
      <div className='flex'>
      <input onChange={handleChange} value={todo} className='w-full py-1 px-5 rounded-full ' type="text" />
      <button className='bg-violet-900 hover:bg-violet-950 px-4 py-1 text-sm font-bold text-white rounded-full mx-2 'onClick={handleAdd} disabled={todo.length<=3}>Add </button>
      </div>
      </div>

      <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished 
      <h2>Your Todos</h2>
      {/* todos  */}
      <div className='todos'>
        {todos.length === 0 && <div> There is no todos </div>}
        {/* todo  */}
        {todos.map((item, index)=>(

(showFinished || !item.isCompleted) &&  <div className="todo flex justify-between  my-2 " key={index}>
<div className='flex gap-5'>
          <input name={item.id}  onChange={handleCheckBox} type="checkbox"   checked={item.isCompleted}/>
        <div className={item.isCompleted?"line-through": ""}> {item.todo} </div>
</div>

        <div className="buttons flex gap-2 h-full">
        {/* <button className='bg-violet-900 hover:bg-violet-950 py-1 px-2 text-sm font-bold text-white rounded-md ' onClick={handleEdit}>Edit </button> */}
        <button className='bg-violet-900 hover:bg-violet-950 py-1 px-2 text-sm font-bold text-white rounded-md ' onClick={(e)=>{handleEdit(e, item.id)}}> <FaEdit/> </button>
        <button className='bg-violet-900 hover:bg-violet-950 py-1 px-2 text-sm font-bold text-white rounded-md ' onClick={(e)=>{handleDelete(e, item.id)}}> <MdDelete /></button>
        </div>
        </div>

        ))}


      </div>

    </div>
    </>
  )
}

export default App