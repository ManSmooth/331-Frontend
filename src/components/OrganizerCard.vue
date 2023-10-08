<script setup lang="ts">
	import type { OrganizerItem } from "@/types";
	import type { PropType } from "vue";
	const props = defineProps({
		organizer: {
			type: Object as PropType<OrganizerItem>,
			required: true,
		},
	});
</script>

<template>
	<RouterLink
		:to="{ name: 'organizer-detail', params: { id: organizer.id } }"
		class="p-4 border shadow-lg bg-stone-50 w-64">
		<div class="flex flex-col gap-2">
			<img
				v-if="organizer.image"
				class="w-full shadow-sm"
				:src="organizer.image" />
			<p class="text-xl">{{ organizer.name }}</p>
			<p class="text-xs">
				Own Event:
				{{ organizer.ownEvents ? organizer.ownEvents.length : 0 }}
			</p>
		</div>
	</RouterLink>
</template>
