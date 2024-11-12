import { api } from "./api";

export const commentService = {
    list: (query) => api.get('/comments/', { params: query }),
    write: (data) => api.post('/comments/write', data),
}