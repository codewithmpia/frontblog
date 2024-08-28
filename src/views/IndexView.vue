<template>
    <section>
        <HeadContent
        title="Tous les articles"
        sub-title="Ne manquez aucune actualité"
        note="Je partage via ce blog des astuces et découvertes dans le domaine de l'informatique" />
    </section>

    <section class="w-full my-12">
        <div class="max-w-4xl px-6 mx-auto">
            <Alerts :category="category" :text="text" v-if="isShow" :action="hideAlert" />
            <div class="w-full flex flex-col gap-10">
                <template v-for="post in postsStore.posts" :key="post.slug">
                    <RouterLink :to="{name: 'detail', params: {slug: post.slug}}" class="w-full block shadow-md rounded-2xl border border-solid border-gray-300 hover:border-blue-600">
                        <img :src="post.image_url" :alt="post.slug" class="w-full h-44 object-cover rounded-2xl shadow-md">
                        <div class="w-full p-6">
                            <h3 class="text-2xl font-bold">{{ post.title }}</h3>
                            <p class="mt-3">{{ truncateText(post.resume, 200) }}</p>
                            <div class="w-full flex items-center gap-6 uppercase text-sm mt-6">
                                <span>{{ formatDate(post.created_at) }}</span>
                                <span>{{ post.author }}</span>
                                <span class="hidden sm:block">{{ post.views }} vues</span>
                                <span class="hidden sm:block">{{ post.comments.length }} Commentaires</span>
                            </div>
                        </div>
                    </RouterLink>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { usePostsStore } from '@/stores/usePostsStore';
    import { formatDate } from "@/utils";
    import HeadContent from '@/components/HeadContent.vue';
    import Alerts from '@/components/Alerts.vue';

    const postsStore = usePostsStore();
    const category = ref("");
    const text = ref("");
    const isShow = ref(false);

    const hideAlert = () => {
        isShow.value = false;
    }

    onMounted(async () => {
        await postsStore.fetchPosts();
        if (postsStore.posts.length === 0) {
            category.value = "info";
            text.value = "Aucun article n'est disponible";
            isShow.value = true;
        }
    });

    watch(() => postsStore.post, (newPost) => {
        if (newPost.slug) {
            postsStore.updatePostViews(newPost.slug, newPost.views);
        }
    });

    const truncateText = (text, limit) => {
        if (text.length <= limit) {
            return text;
        }
        return text.slice(0, limit) + "...";
    }
</script>
