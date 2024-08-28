<template>
    <div class="max-w-4xl px-6 mx-auto">
        <h1 class="text-4xl font-extrabold text-blue-600">{{ props.title }}</h1>
        <h3 class="text-xl font-semibold py-2.5">{{ props.subTitle }}</h3>
        <p class="max-w-xl">{{ props.note }}</p>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
        subTitle: String,
        note: String
    })
</script>