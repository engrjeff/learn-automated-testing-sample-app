import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/tasks', () => {
    return HttpResponse.json([
      { id: 1, title: 'Learn testing', completed: true },
      { id: 2, title: 'Learn React', completed: false },
      { id: 3, title: 'Learn Cypress', completed: false },
    ]);
  }),
];
