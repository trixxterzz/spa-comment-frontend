import { create } from 'zustand';
import { authService } from '../services/auth';
import { commentService } from '../services/comment';
import { CRITERIAS, ORDERS } from '../utils/constants';

const useStore = create()((set, get) => ({
    comments: [],
    count: 0,
    user: {},
    criteria: CRITERIAS.DATES,
    order: ORDERS.DESC,
    page: 1,

    register: async (data) => {
        await authService.register(data);
    },
    login: async (data) => {
        const { user, tokens } = await authService.login(data);
        set({ user });
        return tokens;
    },
    registrationConfirm: async (data) => {
        await authService.confirmRegistration(data);
    },

    loadComments: async (page = 1, criteria = CRITERIAS.DATES, order = ORDERS.DESC) => {
        try {
            const { count, comments } = await commentService.list({ page, criteria, order });
            set({ comments, count, criteria, order, page });
        } catch (e) {
            if (e.message === 'Invalid tokens') {
                throw e;
            }
        }
    },

    writeComment: async (data) => {
        await commentService.write(data);
        const { loadComments, page, criteria, order } = get();
        await loadComments(page, criteria, order);
    },
}));

export default useStore;

