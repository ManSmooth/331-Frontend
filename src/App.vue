<script setup lang="ts">
	import { RouterLink, RouterView, useRouter } from "vue-router";
	import { useMessageStore } from "@/stores/message";
	import { storeToRefs } from "pinia";
	import { useAuthStore } from "./stores/auth";
	const store = useMessageStore();
	const { message } = storeToRefs(store);
	const authStore = useAuthStore();
	const router = useRouter();
	function logout() {
		authStore.logout();
		router.push({ name: "login" });
	}
	const token = localStorage.getItem("access_token");
	const user = localStorage.getItem("user");
	if (token && user) {
		authStore.reload(token, JSON.parse(user));
	} else {
		logout();
	}
</script>

<template>
	<header class="max-h-screen leading-normal w-full mb-4">
		<div id="flashMessage" class="text-center" v-if="message">
			<h4>{{ message }}</h4>
		</div>
		<nav class="flex gap-2 w-full justify-center">
			<div>
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
				<span v-if="authStore.isAdmin">
					|
					<RouterLink
						class="opacity-50 [&.router-link-active]:opacity-100"
						:to="{ name: 'add-event' }"
						>Add Event</RouterLink
					>
				</span>
			</div>
			<div
				class="flex flex-row absolute right-4 gap-2"
				v-if="authStore.currentUserName">
				<RouterLink
					class="opacity-50 [&.router-link-active]:opacity-100"
					:to="{
						name: 'organizer-detail',
						params: { id: authStore.currentID },
					}"
					><font-awesome-icon icon="fa-user" />
					{{ authStore.currentUserName }}</RouterLink
				>
				|
				<a
					@click="logout"
					class="opacity-50 [&.router-link-active]:opacity-100 cursor-pointer"
					><font-awesome-icon icon="fa-sign-out-alt" /> Logout</a
				>
			</div>
			<div class="flex flex-row absolute right-4 gap-2" v-else>
				<RouterLink
					class="opacity-50 [&.router-link-active]:opacity-100"
					:to="{ name: 'register' }"
					><font-awesome-icon icon="fa-user-plus" />
					Register</RouterLink
				>
				|
				<RouterLink
					class="opacity-50 [&.router-link-active]:opacity-100"
					:to="{ name: 'login' }"
					><font-awesome-icon icon="fa-sign-in-alt" />
					Login</RouterLink
				>
			</div>
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
