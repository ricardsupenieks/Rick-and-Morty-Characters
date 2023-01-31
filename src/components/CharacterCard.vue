<template>
    <RouterLink :to="`/${props.id}`">
        <img :class="{
            'h-28 w-28 rounded-full mx-auto my-6 border-2 filter grayscale': props.status === 'Dead',
            'h-28 w-28 rounded-full mx-auto my-6 border-2': props.status === 'Alive' || props.status === 'unknown',
        }" :src="props.image">
        <h1 class="text-xl text-center">{{ props.name }}</h1>
        <p :class="{
            'mx-auto text-center text-green-400': props.status === 'Alive',
            'mx-auto text-center text-red-500': props.status === 'Dead',
            'mx-auto text-center text-stone-500': props.status === 'unknown'
        }">{{ props.status }}</p>
        <p class="mx-10 text-center mt-8">{{ props.species }} - {{ props.gender }}</p>
        <p class="mx-10 text-center mt-2">{{ props.type }}</p>
    </RouterLink>
</template>

<script setup lang="ts">

interface Character {
    id: number;
    name: string;
    status: "Dead" | "Alive" | "unknown";
    species: string;
    type: string;
    gender: "Male" | "Female";
    image: string;
}

const props = defineProps<Character>();
</script>