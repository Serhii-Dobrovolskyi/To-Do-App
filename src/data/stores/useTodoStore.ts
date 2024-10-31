import { create } from 'zustand'
import { generateId } from '../helper';
interface Task {
   id: string;
   title: string;
   createdAt: number;
}

interface ToDoStore{
   tasks: Task[];
   createTask: (title:string)=> void;
   updateTask:(id:string, title:string)=>void;
   removeTask: (id: string) =>void;
}

export const useToDoStore = create<ToDoStore>((set,get)=>({
   tasks: [
         {
            id:'asdf',
            title:'My default task',
            createdAt:2134
         },
         {
            id:'asdf2',
            title:'My second task',
            createdAt: 21346
         }
   ],
   createTask: (title)=> {
      const {tasks} = get();
      const newTask = {
         id: generateId(),
         title,
         createdAt: Date.now(),
      }
      set({
         tasks: [newTask].concat(tasks),
      })
   },
   updateTask: (id:string, title:string)=> {
      const {tasks} = get();
      set({
         tasks: tasks.map((task)=>({
            ...task,
            title: task.id === id ? title : task.title
         }))
      })
   },
   removeTask: (id:string)=> {
      const {tasks} = get();
      set({
         tasks: tasks.filter((task)=> task.id !== id)
      })
   }
}))