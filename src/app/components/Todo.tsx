"use client"

import { editTodo,deleteTodo } from "@/api";
import { Task } from "@/types";
import React, {useEffect, useRef, useState} from "react";

interface TodoProps {
    todo: Task;
}

const Todo = ({ todo }: TodoProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskTitle, seteditedTaskTitle] = useState(todo.text);

    useEffect(() => {
        if(isEditing) {
            ref.current?.focus();
        }
    }, [isEditing]);

    const ref = useRef<HTMLInputElement>(null);

    const handleEdit = async() => {
        setIsEditing(true);
    }

    const handleSave = async() => {
        await editTodo(todo.id, editedTaskTitle);
        setIsEditing(false);
    }

    const handleDelete = async() => {
        await deleteTodo(todo.id);
        setIsEditing(false);
    }

    return (
        <li key={todo.id} className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow">
            {isEditing ? (<input ref={ref} type="text" value={editedTaskTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => seteditedTaskTitle(e.target.value)} className="mr-2 py-1 px-2 rounded border-gray-400 border" />):
            (<span>{todo.text}</span>) }
            <div>
                {isEditing ? 
                    (<button className="text-blue-500 mr-3" onClick={handleSave}>save</button>):
                    (<button className="text-green-500 mr-3" onClick={handleEdit}>edit</button>) 
                }
                <button className="text-red-300" onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
};

export default Todo;