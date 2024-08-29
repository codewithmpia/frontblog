<template>
    <section>
        <HeadContent
        :title="postStore.post.title" />
        <div class="w-full max-w-4xl px-6 mx-auto">
            <div>{{ postStore.post.resume }}</div>
            <div class="w-full flex items-center gap-6 uppercase text-sm mt-6">
                <span>{{ formatDate(postStore.post.created_at) }}</span>
                <span>{{ postStore.post.author }}</span>
                <span>{{ postStore.post.views }} vues</span>
                <span>{{ postStore.post.comments.length }} Commentaires</span>
            </div>
        </div>
    </section>

    <section class="w-full my-12">
        <div class="max-w-4xl px-6 mx-auto">
            <div v-if="postStore.isLoading">Chargement...</div>
            <div class="w-full flex flex-col gap-10">
                <img :src="postStore.post.image_url" :alt="postStore.post.slug" class="w-full h-64 object-cover rounded-2xl shadow-md">
                <div>{{ postStore.post.content }}</div>
            </div>

            <div class="my-10">
                <h3 class="text-xl font-semibold py-2.5">{{ postStore.post.comments.length }} Commentaires</h3>
                <Alerts :category="category" :text="text" v-if="isShow" :action="hideAlert" />
                
                <form @submit.prevent="submitForm" class="my-6">
                    <div class="w-full mb-3">
                        <label for="name" class="block uppercase font-medium mb-2">Votre nom</label>
                        <input type="text" name="name" id="name" v-model="name" class="w-full md:w-2/4 min-h-12 outline-none border border-solid border-gray-300 py-2.5 px-4 rounded focus:border-blue-600 focus:shadow-[0_0_0_3px_#4869ee3f]" required>
                        <span v-if="errors.name" class="text-red-600">{{ errors.name }}</span>
                    </div>
                    <div class="w-full mb-3">
                        <label for="message" class="block uppercase font-medium mb-2">Votre message</label>
                        <textarea name="message" id="message" v-model="message" class="w-full h-40 resize-none min-h-12 outline-none border border-solid border-gray-300 py-2.5 px-4 rounded focus:border-blue-600 focus:shadow-[0_0_0_3px_#4869ee3f]" required></textarea>
                        <span v-if="errors.message" class="text-red-600">{{ errors.message }}</span>
                    </div>
                    <button type="submit" class="bg-blue-600 text-white font-medium py-2.5 px-4 rounded shadow-sm hover:filter hover:brightness-110 cursor-pointer">Soumettre</button>
                </form>

                <div class="w-full flex flex-col gap-6 my-20">
                    <template v-for="comment in postStore.post.comments">
                        <div>
                            <div class="w-full flex items-center gap-3">
                                <img class="w-12 rounded-full" src="@/assets/person.png" :alt="`Commentaire ${comment.id}`">
                                <div class="flex flex-col gap-0.5">
                                    <h4 class="text-lg font-semibold">{{ comment.name }}</h4>
                                    <span>{{ HumanFormatDate(comment.created_at) }}</span>
                                </div>
                            </div>
                            <div class="my-3">{{ comment.message }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { usePostStore } from '@/stores/usePostStore';
import { formatDate, HumanFormatDate } from "@/utils";
import HeadContent from '@/components/HeadContent.vue';
import Alerts from '@/components/Alerts.vue';

const postStore = usePostStore();
const route = useRoute();
const name = ref("");
const message = ref("");
const category = ref("");
const text = ref("");
const isShow = ref(false);
const errors = ref({});

onMounted(async () => {
    if (!postStore.post.slug || postStore.post.slug !== route.params.slug) {
        await postStore.fetchPost(route.params.slug);
    }
})

const hideAlert = () => {
    isShow.value = false;
}

const resetForm = () => {
    name.value = "";
    message.value = "";
}

const validateForm = () => {
    errors.value = {};
    let valid = true;

    if (!name.value) {
        errors.value.name = "Le nom est requis.";
        valid = false;
    }

    if (!message.value) {
        errors.value.message = "Le message est requis.";
        valid = false;
    }

    return valid;
}

const submitForm = async () => {
    if (!validateForm()) {
        return;
    }

    try {
        const response = await axios.post(`https://mpiadev.pythonanywhere.com/api/posts/${route.params.slug}`, {
            name: name.value,
            message: message.value
        });

        if (response.status === 200) {
            category.value = "success";
            text.value = response.data.message;
            isShow.value = true;
            resetForm();
            await postStore.fetchPost(route.params.slug);  
        } else {
            // Mettre à jour les commentaires après une soumission réussie
            isShow.value = true;
            text.value = "Une erreur s'est produite.";
        }
    } catch (error) {
        console.log(error);
    }
}

// Utiliser watch pour surveiller les changements dans les commentaires
watch(() => postStore.post.comments, (newComments, oldComments) => {
    postStore.post.comments = newComments;
});
</script>
