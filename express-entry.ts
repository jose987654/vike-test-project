import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { authjsHandler, authjsSessionMiddleware } from "./server/authjs-handler";

import { createTodoHandler } from "./server/create-todo-handler";
import { registerUserHandler, loginUserHandler, getUserProfileHandler, updateUserProfileHandler } from "./server/user-handlers";
import { getAllTodosHandler, getTodoByIdHandler, updateTodoHandler, deleteTodoHandler } from "./server/todo-handlers";
import { createProjectHandler, getProjectTasksHandler } from "./server/project-handlers";
import { searchHandler } from "./server/search-handler";
import { fileUploadHandler } from "./server/file-upload-handler";
import { webhookHandler } from "./server/webhook-handler";
import { createHandler, createMiddleware } from "@universal-middleware/express";
import express, { Request, Response } from "express"; // Ensure correct imports
import { vikeHandler } from "./server/vike-handler";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const hmrPort = process.env.HMR_PORT ? parseInt(process.env.HMR_PORT, 10) : 24678;

export default (await startServer()) as unknown;

async function startServer() {
  const app = express();

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(`${root}/dist/client`));
  } else {
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true, hmr: { port: hmrPort } },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.use(createMiddleware(authjsSessionMiddleware)());

  /**
   * Auth.js route
   * @link {@see https://authjs.dev/getting-started/installation}
   **/
  app.all("/api/auth/*", createHandler(authjsHandler)());

  app.post("/api/todo/create", createHandler(createTodoHandler)());

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  app.all("*", createHandler(vikeHandler)());

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
  // User routes
  app.post("/api/user/register", createHandler(registerUserHandler));
  app.post("/api/user/login", createHandler(loginUserHandler));
  app.get("/api/user/profile", createHandler(getUserProfileHandler));
  app.put("/api/user/profile", createHandler(updateUserProfileHandler));

  // Todo routes (expanding on the existing create route)
  app.get("/api/todo", createHandler(getAllTodosHandler)());
  app.get("/api/todo/:id", createHandler(getTodoByIdHandler)());
  app.put("/api/todo/:id", createHandler(updateTodoHandler)());
  app.delete("/api/todo/:id", createHandler(deleteTodoHandler)());

  // Example of a more complex route
  app.post("/api/project", createHandler(createProjectHandler)());
  app.get("/api/project/:id/tasks", createHandler(getProjectTasksHandler)());

  // Search route
  app.get("/api/search", createHandler(searchHandler)());

  // File upload route
  app.post("/api/upload", createHandler(fileUploadHandler)());

  // Webhook route for external integrations
  app.post("/api/webhook", createHandler(webhookHandler)());

  return app;
}
