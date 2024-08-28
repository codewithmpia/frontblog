<template>
    <div v-if="visible" :class="{
        'bg-green-100 border-green-200 text-green-900': props.category === 'success',
        'bg-blue-100 border-blue-200 text-blue-900': props.category === 'info',
        'bg-red-100 border-red-200 text-red-900': props.category === 'error'
    }" class="w-full relative flex justify-between items-center mb-6 py-2.5 px-4 rounded border border-solid">
        <strong>{{ props.text }}</strong>
        <Close class="cursor-pointer" @click="closeAlert" />
    </div>
</template>


<script setup>
import { ref } from 'vue';
import Close from './icons/Close.vue';
const props = defineProps({
    category: String,
    text: String,
    action: Function
});

const visible = ref(true);

const closeAlert = () => {
    visible.value = false;
    props.action();
}
</script>
