<template>
  <div class="text-white">
    <img class="h-32 md:h-80 object-center mx-auto"
      src="https://logos-world.net/wp-content/uploads/2022/01/Rick-And-Morty-Logo.png" />
  </div>
  <div v-if="state.isLoading" class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
    <div class="border-t-transparent border-solid animate-spin rounded-full border-blue-900 border-8 h-32 w-32">
    </div>
  </div>
  <ul v-else class="flex flex-row gap-8 flex-wrap justify-center">
    <li v-for="character in state.characters" :key="character.id"
      class="bg-black/40 border-black/90 border-2 flex flex-col shadow-lg w-80 rounded-md h-[21rem] text-white">
      <CharacterCard :name="character.name" :status="character.status" :species="character.species"
        :type="character.type" :gender="character.gender" :image="character.image" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import CharacterCard from '@/components/CharacterCard.vue';

onMounted(() => {
  fetchData();
});

const url = ref("https://rickandmortyapi.com/api/character");

const state = reactive({
  characters: [] as Character[],
  isLoading: false,
  isError: false,
})

interface Character {
  id: number;
  name: string;
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "Male" | "Female";
  image: string;
}

const fetchData = async () => {
  try {
    state.isLoading = true;
    const { data } = await axios.get(url.value);

    state.characters = data.results.map((character: Character) => {
      return ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        type: character.type,
        gender: character.gender,
        image: character.image,
      })
    });
    state.isLoading = false;
  } catch (error) {
    console.log("error", error);
    state.isLoading = false;
    state.isError = true;
  }
}

</script>