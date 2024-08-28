<template>
    <header class="w-full fixed inset-x-0 top-0 bg-white">
        <div class="max-w-4xl px-6 mx-auto">
            <nav class="w-full h-16 flex justify-between items-center border-b border-solid border-gray-300">
                <RouterLink :to="{name: 'index'}" class="flex items-center gap-2 uppercase font-semibold hover:text-blue-600">
                    <Logo  class="text-orange-600"/>
                    <span>codewhithmpia.fr</span>
                </RouterLink>
                <div class="h-full hidden sm:flex items-center gap-6">
                    <RouterLink :to="{name: 'index'}" :class="{'text-blue-600': $route.name === 'index'}" class="uppercase font-medium hover:text-blue-600">Tous les articles</RouterLink>
                    <RouterLink :to="{name: 'contact'}" :class="{'text-blue-600': $route.name === 'contact'}" class="uppercase font-medium hover:text-blue-600">Contact</RouterLink>
                </div>
                <Menu @click="toggleMobileMenu" class="block sm:hidden cursor-pointer hover:text-blue-600" />

                <div :class="isOpen ? 'flex flex-col items-center justify-center sm:hidden': 'hidden'" class="fixed inset-0 bg-white/90 backdrop-blur-md">
                    <div class="h-16 absolute inset-x-0 top-0 px-6">
                        <div class="h-full flex items-center justify-between mx-auto border-b border-solid border-gray-300">
                            <RouterLink @click="toggleMobileMenu" :to="{name: 'index'}" class="flex items-center gap-2 uppercase font-semibold hover:text-blue-600">
                                <Logo  class="text-orange-600"/>
                                <span>codewhithmpia.fr</span>
                            </RouterLink>
                            <Close @click="toggleMobileMenu" class="cursor-pointer hover:text-blue-600" />
                        </div>
                    </div>

                    <div class="h-full flex flex-col items-center justify-center gap-4">
                        <RouterLink @click="toggleMobileMenu" :to="{name: 'index'}" :class="{'text-blue-600': $route.name === 'index'}" class="uppercase font-medium hover:text-blue-600">Tous les articles</RouterLink>
                        <RouterLink @click="toggleMobileMenu" :to="{name: 'contact'}" :class="{'text-blue-600': $route.name === 'contact'}" class="uppercase font-medium hover:text-blue-600">Me Contacter</RouterLink>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import Logo from './icons/Logo.vue';
    import Menu from './icons/Menu.vue';
    import Close from './icons/Close.vue';
import { is } from 'date-fns/locale';

    const route = useRouter();
    const isOpen = ref(false);

    const toggleMobileMenu = () => {
        isOpen.value = !isOpen.value
    }
</script>