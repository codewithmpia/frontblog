import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [],
        post: {},
        isLoading: false,
        error: null,
    }),
    actions: {
        async fetchPosts() {
            this.isLoading = true;
            try {
                const response = await axios.get('https://mpiadev.pythonanywhere.com/api/posts');
                this.posts = response.data;
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
        async fetchPost(slug) {
            this.isLoading = true;
            try {
                const response = await axios.get(`https://mpiadev.pythonanywhere.com/api/posts/${slug}`);
                if (response.status === 201) {
                    this.post = response.data;
                    this.updatePostViews(slug, response.data.views);
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.isLoading = false;
            }
        },
        updatePostViews(slug, views) {
            const post = this.posts.find(post => post.slug === slug);
            if (post) {
                post.views = views;
            }
        }
    }
});
