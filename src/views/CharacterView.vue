<template>
  <MainContainer>
    <div class="text-white">
      <img class="h-32 md:h-80 object-center mx-auto"
        src="https://logos-world.net/wp-content/uploads/2022/01/Rick-And-Morty-Logo.png" />
    </div>
    <div v-if="state.isLoading" class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 h-scren">
      <div class="border-t-transparent border-solid animate-spin rounded-full border-gray-900 border-8 h-32 w-32">
      </div>
    </div>
    <div v-else>
      <ul class="flex flex-row gap-8 flex-wrap justify-center">
        <li v-for="character in visibleCharacters" :key="character.id"
          class="bg-black/40 border-black/20 border-2 flex flex-col shadow-lg w-80 rounded-md h-[21rem] text-white">
          <CharacterCard :id="character.id" :name="character.name" :status="character.status" :species="character.species"
            :type="character.type" :gender="character.gender" :image="character.image" />
        </li>
      </ul>

      <div class="text-white flex flex-col justify-center mt-10 text-xl">
        <button v-if="visibleCount < totalCharacterCount" @click="visibleCount = visibleCount + STEP" class="text-white my-5">
          Load more
        </button>
        <div class="flex flex-row justify-center gap-2">
          <button @click="handlePrevPage" :disabled="page === 1" class="text-white hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-90">
            &lt
          </button>
          <p>Page {{ page }}</p>
          <button @click="handleNextPage" :disabled:="page === 42" class="text-white hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-90">
            >
          </button>
        </div>
      </div>
    </div>
  </MainContainer>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import CharacterCard from '@/components/CharacterCard.vue';
import MainContainer from '@/components/MainContainer.vue';
import { useRoute, useRouter } from 'vue-router';

const url = ref("https://rickandmortyapi.com/api/character/");
const DEFAULT_VISIBLE_CHARACTERS = 12;
const STEP = 8;

const visibleCount = ref(DEFAULT_VISIBLE_CHARACTERS);

const visibleCharacters = computed(() => {
  return state.characters.filter((_, index) => index < visibleCount.value)
});

const totalCharacterCount = computed(() => {
  return state.characters.length
});

const route = useRoute();
const router = useRouter();

const page = ref(Number(route.query.page) || 1);

const updateData = () => {
  fetchData(page.value);
  visibleCount.value = DEFAULT_VISIBLE_CHARACTERS;
  router.push({
    query: {
      page: page.value
    },
  });
}

const handleNextPage = () => {
  page.value++;
  updateData();
  window.scrollTo(0, 0);
}

const handlePrevPage = () => {
  page.value--;
  updateData();
  window.scrollTo(0, 0);
}

onMounted(() => {
  updateData();
});

const fetchData = async (page: number) => {
  try {
    state.isLoading = true;
    const { data } = await axios.get(`${url.value}?page=${page}`);

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
};

const state = reactive({
  characters: [] as Character[],
  isLoading: false,
  isError: false,
});

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