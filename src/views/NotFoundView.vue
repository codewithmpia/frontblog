<template>
    <section>
        <HeadContent
        title="Page introuvable"
        sub-title="Oup! Pas de panique, gardez votre calme." 
        note="Si vous avez cette page, merci de vérifier l'url puis réessayer."/>
    </section>

    <section class="w-full my-12">
        <div class="max-w-4xl px-6 mx-auto">
            <Alerts :category="category" :text="text" v-if="isShow" :action="hideAlert" />

            <RouterLink :to="{ name: 'index'}" class="flex items-center gap-1 hover:text-blue-600 underline">
                <ArrowLeft />
                <span>Retour à l'acceuil</span>.
            </RouterLink>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
    import HeadContent from '@/components/HeadContent.vue';
    import ArrowLeft from '@/components/icons/ArrowLeft.vue';
    import Alerts from '@/components/Alerts.vue';

    const category = ref("error");
    const text = ref("La page que vous cherchez n'existe pas.");
    const isShow = ref(true);

    const hideAlert = () => {
        isShow.value = false;
    }

</script>