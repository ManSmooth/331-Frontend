<script setup lang="ts">
import type { EventItem } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
  event: {
    type: Object as PropType<EventItem>,
    require: true
  }
})
</script>

<template>
  <p>Edit the event here</p>
</template>
@/types
