<template>
    <div class="flex flex-row text-white my-6 rounded-l-full">
        <div><img :src="props.image" :class="{
            'rounded-full border-2 mx-6 filter grayscale': props.status === 'Dead',
            'rounded-full border-2 mx-6': props.status === 'Alive' || props.status === 'unknown',
            }"/>
        </div>

        <ul class="flex flex-col mx-auto w-full text-center gap-3">
            <h1 class="uppercase text-3xl mt-8">{{ props.name }}</h1>
            <p :class="{
                'mx-auto text-center text-green-400 text-xl my-2': props.status === 'Alive',                    
                'mx-auto text-center text-red-500 text-xl my-2': props.status === 'Dead',
                'mx-auto text-center text-stone-500 text-xl my-2': props.status === 'unknown'
                }">{{ props.status }}</p>

            <div class="flex flex-row justify-evenly">
                <div class="flex flex-col">
                    <h1 class="text-left text-3xl mb-2">Species:</h1>
                    <p v-if="props.type !== ''" class="text-left"> {{ props.species }} ({{ props.type }}), {{ props.gender }}</p>
                    <p v-else class="text-left"> {{ props.species }}, {{ props.gender }}</p>
                </div>

                <div class="flex flex-col">
                    <h1 class="text-left text-3xl mb-2">Location:</h1>
                    <p class="text-left">Origin location: {{ props.origin.name}}</p>
                    <p class="text-left">Last known location: {{ props.location.name}}</p>
                </div>          
                <!-- <li class="text-left">{{ props.created}}</li> -->
            </div>
        </ul>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<SingleCharacter>();

interface SingleCharacter extends Character {
    created: Date;
    location: {
        name: string,
        url:string,
    }
    origin: {
        name: string,
        url: string,
    }
};

interface Character {
    id: number;
    name: string;
    status: "Dead" | "Alive" | "unknown";
    species: string;
    type: string;
    gender: "Male" | "Female";
    image: string;
};

</script>