import type { Get, UniversalHandler } from "@universal-middleware/core";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoResponse {
  message: string;
  todo?: Todo;
  todos?: Todo[];
}

export const getAllTodosHandler: Get<[], UniversalHandler<Universal.Context & object>> =
  () => async (_request, _context, _runtime) => {
    // Implement get all todos logic
    return new Response(JSON.stringify({ message: "All todos retrieved successfully", todos: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

export const getTodoByIdHandler: Get<[], UniversalHandler<Universal.Context & object>> =
  () => async (request, _context, _runtime) => {
    const id = request.url.split('/').pop();
    // Implement get todo by id logic
    return new Response(JSON.stringify({ message: "Todo retrieved successfully", todo: { id, text: "Sample Todo", completed: false } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

export const updateTodoHandler: Get<[], UniversalHandler<Universal.Context & object>> =
  () => async (request, _context, _runtime) => {
    const id = request.url.split('/').pop();
    const updatedTodo = await request.json() as Partial<Todo>;
    // Implement update todo logic
    return new Response(JSON.stringify({ message: "Todo updated successfully", todo: { ...updatedTodo, id } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

export const deleteTodoHandler: Get<[], UniversalHandler<Universal.Context & object>> =
  () => async (request, _context, _runtime) => {
    const id = request.url.split('/').pop();
    // Implement delete todo logic
    return new Response(JSON.stringify({ message: "Todo deleted successfully" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };