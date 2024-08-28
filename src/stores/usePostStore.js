import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore('post', {
    state: () => ({
        post: {},
        isLoading: false,
        error: null,
    }),
    actions: {
        async fetchPost(slug) {
            this.isLoading = true;
            try {
                const response = await axios.get(`https://mpiadev.pythonanywhere.com/api/posts/${slug}`);
                if (response.status === 201) {
                    this.post = response.data;
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        }
    }
});
