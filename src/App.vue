<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
      <nav class="flex gap-5">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/characters">characters</RouterLink>
      </nav>

  <RouterView />
</template>
