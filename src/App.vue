<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
      <nav class="flex gap-5 text-white">
        <RouterLink to="/" class="hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-90">Home</RouterLink>
        <RouterLink to="/" class="hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-90">characters</RouterLink>
      </nav>

  <RouterView />
</template>
