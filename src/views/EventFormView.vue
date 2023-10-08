<script setup lang="ts">
	import EventService from "@/services/EventService";
	import type { EventItem, OrganizerItem } from "@/types";
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { useMessageStore } from "@/stores/message";
	import BaseInput from "@/components/BaseInput.vue";
	import OrganizerService from "@/services/OrganizerService";
	import BaseSelect from "@/components/BaseSelect.vue";
	const store = useMessageStore();
	const organizers = ref<OrganizerItem[]>([]);
	const event = ref<EventItem>({
		id: 0,
		category: "",
		title: "",
		description: "",
		location: "",
		date: "",
		time: "",
		organizer: { id: 0 },
	});
	const router = useRouter();
	OrganizerService.getOrganizers()
		.then((response) => {
			organizers.value = response.data;
		})
		.catch(() => {
			router.push({ name: "network-error" });
		});
	function saveEvent() {
		EventService.saveEvent(event.value)
			.then((response) => {
				router.push({
					name: "event-detail",
					params: { id: response.data.id },
				});
				store.updateMessage(
					`You have successfully added a new event for ${response.data.title}`
				);
				setTimeout(() => {
					store.resetMessage();
				}, 3000);
			})
			.catch(() => {
				router.push({ name: "network-error" });
			});
	}
</script>
<template>
	<main class="flex flex-col gap-4 w-2/3 max-w-2xl items-center">
		<h1 class="text-2xl">Create an event</h1>
		<form @submit.prevent="saveEvent" class="flex flex-col gap-2 w-2/3 max-w-lg">
			<BaseInput label="Category" v-model="event.category" />
			<h3 class="text-xl">Name & describe your event</h3>
			<BaseInput label="Title" v-model="event.title" />
			<BaseInput label="Description" v-model="event.description" />
			<h3 class="text-xl">Where is your event?</h3>
			<BaseInput label="Location" v-model="event.location" />
			<h3 class="text-xl">When is your event?</h3>
			<BaseInput label="Date" v-model="event.date" />
			<BaseInput label="Time" v-model="event.time" />
			<BaseSelect
				label="Organizer"
				v-model="event.organizer!.id"
				:options="organizers"
				:key-extractor="(x) => x.id"
				:value-extractor="(x) => x.id"
				:text-extractor="(x) => x.name" />
			<button
				class="border border-black border-opacity-50 rounded-md px-2 py-1 bg-amber-300 w-32 mx-auto"
				type="submit">
				Submit
			</button>
		</form>

		<pre
			class="text-left border border-black border-opacity-50 p-4 rounded-lg w-full"
			>{{ event }}</pre
		>
	</main>
</template>
