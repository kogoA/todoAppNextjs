import { Task } from "./types";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<Task[]> => {
    const res = await fetch(`http://localhost:3001/tasks`, { cache: "no-store"});
    const todos = await res.json();

    return todos;
};

export const addTodo = async (todo: Task): Promise<Task> => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(todo),
    });
    const newTodo = await res.json();
    console.log(todo)

    return newTodo;
};

export const editTodo = async (id: string,newText: string): Promise<Task> => {
    const res = await fetch(`${baseUrl}/tasks/`+id, {
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({ text: newText }),
    });
    const updatedTodo = await res.json();

    return updatedTodo;
};