<script setup lang="ts">
	import EventCard from "@/components/EventCard.vue";
	import OrganizerService from "@/services/OrganizerService";
	import { type OrganizerItem } from "@/types";
	import { ref } from "vue";
	const organizer = ref<OrganizerItem | null>(null);

	const props = defineProps({
		id: String,
	});

	OrganizerService.getOrganizerById(Number(props.id))
		.then((response) => {
			organizer.value = response.data;
		})
		.catch((error) => {
			console.log(error);
		});
</script>
<template>
	<div v-if="organizer" class="flex flex-col gap-4">
		<h1 class="text-2xl">{{ organizer.name }}</h1>
		<p v-if="organizer.image" class="flex justify-center">
			<img :src="organizer.image" class="w-64 shadow-lg" />
		</p>
		<h1 class="text-lg self-start">Events</h1>
		<div class="grid grid-cols-3 gap-4">
			<EventCard
				:event="event"
				v-for="event of organizer.ownEvents"
				:key="event.id" />
		</div>
	</div>
</template>
@/types
