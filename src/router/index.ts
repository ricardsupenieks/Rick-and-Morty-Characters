import { createRouter, createWebHistory } from 'vue-router';
import CharacterView from '../views/CharacterView.vue';
import SingleCharacterView from '../views/SingleCharacterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'characters',
      component: CharacterView
    },
    {
      path: '/:id',
      name: 'character',
      component: SingleCharacterView
    }
  ]
});

export default router;
