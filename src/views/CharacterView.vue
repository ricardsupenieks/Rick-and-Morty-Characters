<template>
  <div class="text-white text-center text-4xl">
    Characters
  </div>
    <div v-if="state.isLoading" class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
      <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-32 w-32">
    </div>
  </div>
  <div v-else class="flex flex-row gap-5 flex-wrap justify-between">
      <div v-for="character in state.characters" :key="character.id" class="bg-stone-800 flex flex-col shadow-lg my-5 w-80 rounded-md h-72">
          <div class="text-white">
            <img class="h-28 w-28 rounded-full mx-auto my-6 border-4" :src="character.image">
            <p class="text-lg text-center">{{ character.name }}</p>
            <p class="mx-auto">{{ character.status }}</p>
            <p class="mx-auto">{{ character.species }}</p>
            <p class="mx-auto">{{ character.type }}</p>
            <p class="mx-auto">{{ character.gender }}</p>
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