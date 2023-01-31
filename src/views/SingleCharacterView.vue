<template>
    <MainContainer>
        <div v-if="state.isLoading"><Spinner /></div>
        <div v-if="state.error">Error</div>

        <div v-if="state.character" class="bg-black/20 border-black/20 border-2 shadow-lg w-[1000px] mx-auto rounded-l-full">
            <CharacterPage 
                :id="state.character.id" 
                :image="state.character.image"
                :name="state.character.name"
                :status="state.character.status"
                :species="state.character.species"
                :type="state.character.type"
                :gender="state.character.gender"
                :created="state.character.created"
                :location="state.character.location"
                :origin="state.character.origin"
            />
        </div>
    </MainContainer>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainContainer from '@/components/MainContainer.vue';
import Spinner from '@/components/Spinner.vue';
import CharacterPage from '@/components/CharacterPage.vue';

onMounted(() => {
    fetchSingleCharacter();
});

const state = reactive({
    isLoading: false,
    character: null as SingleCharacter | null,
    error: "",
})

const route = useRoute();
const router = useRouter();

const characterId = route.params.id;;

const fetchSingleCharacter =async () => {
    try {
        state.isLoading = true;
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
        state.character = data;
        state.isLoading = false;
    } catch (error) {
        state.isLoading = false;
        console.log(error);
    }
}

interface Character {
    id: number;
    name: string;
    status: "Dead" | "Alive" | "unknown";
    species: string;
    type: string;
    gender: "Male" | "Female";
    image: string;
};

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

</script>