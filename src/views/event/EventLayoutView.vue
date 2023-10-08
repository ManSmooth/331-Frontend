<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'
const store = useEventStore()
const event = storeToRefs(store).event
</script>
<template>
  <div v-if="event" class="w-full">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <RouterLink :to="{ name: 'event-detail' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit' }">Edit</RouterLink>
    </div>
    <div class="w-full">
      <RouterView :event="event"></RouterView>
    </div>
  </div>
</template>
