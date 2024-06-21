import './style.scss'
import BaseComponent from './BaseComponent'
import { useReducer } from 'react'

interface Todos {
    id: number
    text: string
    completed: boolean
}
const Todo = () => {
    
    const reducer = (state:Todos[], action:any) => {
        switch (action.type) {
            case 'ADD_TODO':
                return [...state, action.payload]
            case 'DELETE_TODO':
                return state.filter(todo => todo.id !== action.payload)
                
            case 'TOGGLE_TODO':
                return state.map(todo => {
                        if (todo.id === action.payload) {
                            return {
                                ...todo,
                                completed: !todo.completed
                            }
                        }
                        return todo
                    })
            case 'EDIT_TODO':
                return state.map(todo => {
                    if (todo.id === action.payload.id) {
                        return {
                            ...todo,
                            text: action.payload.text
                        }
                    }
                    return todo
                })
                
            default:
                return state
        }
    }
    const [todos, dispatch] = useReducer(reducer, [])
    const addTodo = (text:string) => {
        const newTodo = {
            id: todos.length + 1,
            text,
            completed: false
        }
        console.log(newTodo)
        dispatch({type: 'ADD_TODO',payload: newTodo})
    }
    const deleteTodo = (id:number) => {
        dispatch({
            type: 'DELETE_TODO',
            payload: id
        })
    }
    const toggleTodo = (id: number) => {
        dispatch({
            type: 'TOGGLE_TODO',
            payload: id
        })
    }
    const editTodo = (todo:Todos) => {
        dispatch({
            type: 'EDIT_TODO',
            payload: todo
        })
    }
    const handleSubmit = (e:any) => {
        e.preventDefault()
        const text = e.target.text.value
        console.log(text)
        addTodo(text)
        e.target.text.value = ''
    }
    return (
      <div className='container'>
        <div className="backg">
        <div className="heading">
          <h1>TODO</h1>
          <img src="/public/images/icon-sun.svg" alt="" />
        </div>
        <div className='todo-cont'>

        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Create a new todo.." required />
          <button type="submit">Add</button>
        </form>
        <div className='todolist'>
        <div>
         {todos.map((todo) => (
            
            <div key={todo.id}>
                 <img src="/public/images/icon-check.svg" alt="" />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button className='dele' onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
              <button onClick={() => editTodo(todo)}>Edit</button>
            </div>
          ))}
        </div>
        </div>
        </div>
      </div>
            
      <BaseComponent />
        </div>
    );

}

export default Todo