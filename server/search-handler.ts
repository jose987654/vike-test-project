import type { Get, UniversalHandler } from "@universal-middleware/core";

interface SearchResult {
  id: string;
  type: 'todo' | 'project' | 'user';
  title: string;
  description: string;
}

interface SearchResponse {
  message: string;
  results: SearchResult[];
}

export const searchHandler: Get<[], UniversalHandler<Universal.Context & object>> =
  () => async (request, _context, _runtime) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    
    // Implement search logic
    const results: SearchResult[] = [
      { id: '1', type: 'todo', title: 'Sample Todo', description: 'This is a sample todo item' },
      { id: '2', type: 'project', title: 'Sample Project', description: 'This is a sample project' },
      // Add more mock results as needed
    ];

    return new Response(JSON.stringify({ 
      message: "Search results retrieved successfully", 
      results 
    }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };