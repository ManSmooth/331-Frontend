<script setup lang="ts">
	import BaseInput from "@/components/BaseInput.vue";
	import BaseSelect from "@/components/BaseSelect.vue";
	import OrganizerService from "@/services/OrganizerService";
	import { useMessageStore } from "@/stores/message";
	import type { OrganizerItem } from "@/types";
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	const store = useMessageStore();
	const organizer = ref<OrganizerItem>({
		id: 0,
		name: "",
	});
	const router = useRouter();
	function saveOrganizer() {
		OrganizerService.saveOrganizer(organizer.value)
			.then((response) => {
				router.push({
					name: "organizer-list",
				});
				store.updateMessage(
					`You have successfully added a new organizer`
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
		<h1 class="text-2xl">Create an organizer</h1>
		<form
			@submit.prevent="saveOrganizer"
			class="flex flex-col gap-2 w-2/3 max-w-lg">
			<BaseInput label="Name" v-model="organizer.name" />
			<button
				class="border border-black border-opacity-50 rounded-md px-2 py-1 bg-amber-300 w-32 mx-auto"
				type="submit">
				Submit
			</button>
		</form>

		<pre
			class="text-left border border-black border-opacity-50 p-4 rounded-lg w-full"
			>{{ organizer }}</pre
		>
	</main>
</template>
