<script setup lang="ts">
	import type { EventItem } from "@/types";
	import type { PropType } from "vue";
	const props = defineProps({
		event: {
			type: Object as PropType<EventItem>,
			required: true,
		},
	});
</script>

<template>
	<RouterLink
		class="p-4 border border-black w-64"
		:to="{ name: 'event-detail', params: { id: event.id } }">
		<div>
			<div>
				<p>@{{ event.time }} on {{ event.date }}</p>
				<p class="text-xl">{{ event.title }}</p>
				<p v-if="event.organizer" class="text-xs">by {{ event.organizer.name }}</p>
			</div>
		</div>
	</RouterLink>
</template>
