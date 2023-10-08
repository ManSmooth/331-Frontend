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
	<div class="p-4 border border-black w-64">
		<div>
			<div class="flex flex-col gap-2">
				<p class="text-xl">{{ organizer.name }}</p>
				<div v-if="organizer.ownEvents" class="text-left opacity-75">
					<p v-for="event of organizer.ownEvents" :key="event.id">
						{{ event.title }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
