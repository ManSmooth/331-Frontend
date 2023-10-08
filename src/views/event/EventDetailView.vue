<script setup lang="ts">
	import { type EventItem } from "@/types";
	import type { PropType } from "vue";

	defineProps({
		event: {
			type: Object as PropType<EventItem>,
			require: true,
		},
	});
</script>
<template>
	<div v-if="event" class="flex flex-col items-center">
		<p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
		<p>{{ event.description }}</p>
		<div
			class="w-4/5 max-w-6xl grid grid-cols-3 gap-3 items-center justify-items-center">
			<img
				:key="image"
				v-for="image of event.images"
				:src="image"
				class="h-auto max-h-[24em] p-4 bg-white shadow-lg" />
		</div>
	</div>
</template>
@/types
