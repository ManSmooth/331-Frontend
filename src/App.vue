<script setup lang="ts">
	import { RouterLink, RouterView } from "vue-router";
	import { useMessageStore } from "@/stores/message";
	import { storeToRefs } from "pinia";
	const store = useMessageStore();
	const { message } = storeToRefs(store);
</script>

<template>
	<header class="max-h-screen leading-normal w-full mb-4">
		<div id="flashMessage" class="text-center" v-if="message">
			<h4>{{ message }}</h4>
		</div>
		<nav class="flex justify-center gap-2">
			<RouterLink
				class="opacity-50 [&.router-link-active]:opacity-100"
				to="/"
				>Home</RouterLink
			>
			|
			<RouterLink
				class="opacity-50 [&.router-link-active]:opacity-100"
				:to="{ name: 'organizer-list' }"
				>Organizers</RouterLink
			>
			|
			<RouterLink
				class="opacity-50 [&.router-link-active]:opacity-100"
				:to="{ name: 'add-event' }"
				>Add Event</RouterLink
			>
			|
			<RouterLink
				class="opacity-50 [&.router-link-active]:opacity-100"
				:to="{ name: 'add-organizer' }"
				>Add Organizer</RouterLink
			>
		</nav>
	</header>
	<div class="flex flex-col items-center text-center">
		<RouterView />
	</div>
</template>

<style>
	@keyframes yellowfade {
		from {
			background: yellow;
		}
		to {
			background: transparent;
		}
	}

	#flashMessage {
		animation: yellowfade 3s ease-in-out;
	}
</style>
