<script setup lang="ts">
	import InputText from "@/components/InputText.vue";
	import { useAuthStore } from "@/stores/auth";
	import { useMessageStore } from "@/stores/message";
	import { useField, useForm } from "vee-validate";
	import { useRouter } from "vue-router";
	import * as yup from "yup";
	const authStore = useAuthStore();
	const router = useRouter();
	const messageStore = useMessageStore();
	const validationSchema = yup.object({
		username: yup.string().required("Username is required"),
		password: yup
			.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters long"),
	});
	const { errors, handleSubmit } = useForm({
		validationSchema,
		initialValues: {
			username: "",
			password: "",
		},
	});
	const { value: username } = useField<string>("username");
	const { value: password } = useField<string>("password");
	const onSubmit = handleSubmit((values) => {
		authStore
			.login(values.username, values.password)
			.then((_) => router.push({ name: "event-list" }))
			.catch(() => {
				messageStore.updateMessage("Could not login");
				setTimeout(() => {
					messageStore.resetMessage();
				}, 3000);
			});
	});
</script>
<template>
	<div
		class="flex min-h-full flex-1 flex-col justify-center p-6 lg:px-8 gap-4 bg-white shadow-lg">
		<p class="text-xl">Sign in to your account.</p>
		<form @submit.prevent="onSubmit" class="flex flex-col gap-2">
			<label for="username" class="text-sm font-medium leading-6"
				>Username</label
			>
			<InputText v-model="username" :error="errors.username" />
			<label for="username" class="text-sm font-medium leading-6"
				>Password</label
			>
			<InputText
				v-model="password"
				type="password"
				:error="errors.password" />
			<button
				type="submit"
				class="mt-4 border border-black px-2 py-1 rounded-md w-24 self-center bg-yellow-300 border-opacity-30">
				Submit
			</button>
		</form>
		<p>
			Not a member?
			<RouterLink :to="{ name: 'register' }" class="underline"
				>Sign up here</RouterLink
			>
		</p>
	</div>
</template>
