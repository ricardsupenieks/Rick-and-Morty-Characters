<template>
  <div class="text-white">
    <img class="h-96 object-center mx-auto" src="https://logos-world.net/wp-content/uploads/2022/01/Rick-And-Morty-Logo.png" />
  </div>
    <div v-if="state.isLoading" class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
      <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-32 w-32">
    </div>
  </div>
  <div v-else class="flex flex-row gap-20 flex-wrap justify-between">
      <div v-for="character in state.characters" :key="character.id" class="bg-black/40 border-black/90 border-2 flex flex-col shadow-xl w-80 rounded-md h-[21rem]">
          <div class="text-white">
            <div v-if="character.status === 'Alive'">
              <img class="h-28 w-28 rounded-full mx-auto my-6 border-2" :src="character.image">
            </div>
            <div v-else-if="character.status === 'Dead'">
              <img class="h-28 w-28 rounded-full mx-auto my-6 border-2 filter grayscale" :src="character.image">
            </div>
            <div v-else>
              <img class="h-28 w-28 rounded-full mx-auto my-6 border-2" :src="character.image">
            </div>
            <p class="text-2xl text-center">{{ character.name }}</p>
            <div v-if="character.status === 'Alive'">
              <p class="mx-auto text-center text-green-400">{{ character.status }}</p>
            </div>
            <div v-else-if="character.status === 'Dead'">
              <p class="mx-auto text-center text-red-500">{{ character.status }}</p>
            </div>
            <div v-else>
              <p class="mx-auto text-center text-stone-500">{{ character.status }}</p>
            </div>
            <p class="mx-10 text-center mt-8">{{ character.species }} - {{ character.gender }}</p>
            <p class="mx-10 text-center mt-2">{{ character.type }}</p>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">

//character list
//responsive majaslapa

import { onMounted, reactive, ref } from 'vue';

const url = ref("https://rickandmortyapi.com/api/character");

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}
const state = reactive({
  characters: [] as Character[],
  isLoading: false,
})

const fetchData = async() => {
  state.isLoading = true;
  await fetch(url.value)
    .then((response) => response.json())
    .then((data) => state.characters = data.results);
  state.isLoading = false;
}

onMounted(() => {
  fetchData();
});

</script>