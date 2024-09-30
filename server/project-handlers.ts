import type { Get, UniversalHandler } from "@universal-middleware/core";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface Task {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
}

interface ProjectResponse {
  message: string;
  project?: Project;
  tasks?: Task[];
}

export const createProjectHandler: Get<[], UniversalHandler<Universal.Context & object>> =
  () => async (request, _context, _runtime) => {
    const newProject = await request.json() as Omit<Project, 'id'>;
    // Implement create project logic
    const createdProject: Project = {
      id: 'generated-id',
      ...newProject
    };
    return new Response(JSON.stringify({ message: "Project created successfully", project: createdProject }), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  };

export const getProjectTasksHandler: Get<[], UniversalHandler<Universal.Context & object>> =
  () => async (request, _context, _runtime) => {
    const projectId = request.url.split('/').slice(-2)[0];
    // Implement get project tasks logic
    const tasks: Task[] = [
      { id: 'task1', projectId, title: 'Sample Task 1', completed: false },
      { id: 'task2', projectId, title: 'Sample Task 2', completed: true },
    ];
    return new Response(JSON.stringify({ message: "Project tasks retrieved successfully", tasks }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };