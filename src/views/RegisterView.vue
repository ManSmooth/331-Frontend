<script setup lang="ts">
	import ImageUpload from "@/components/ImageUpload.vue";
	import InputText from "@/components/InputText.vue";
	import apiClient from "@/services/AxiosClient";
	import { useAuthStore } from "@/stores/auth";
	import { useMessageStore } from "@/stores/message";
	import { useField, useForm } from "vee-validate";
	import { computed } from "vue";
	import { useRouter } from "vue-router";
	import * as yup from "yup";
	const authStore = useAuthStore();
	const router = useRouter();
	const messageStore = useMessageStore();

	const validationSchema = yup.object({
		firstname: yup.string().required("First name is required"),
		lastname: yup.string().required("Last name is required"),
		username: yup.string().required("Username is required"),
		email: yup
			.string()
			.required("Email is required")
			.email("Email is in correct format"),
		password: yup
			.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters long"),
		name: yup.string().required("Display name is required"),
		image: yup.string(),
	});
	const { errors, handleSubmit } = useForm({
		validationSchema,
		initialValues: {
			firstname: "",
			lastname: "",
			username: "",
			email: "",
			password: "",
			name: "",
			image: "",
		},
	});
	const { value: firstname } = useField<string>("firstname");
	const { value: lastname } = useField<string>("lastname");
	const { value: username } = useField<string>("username");
	const { value: email } = useField<string>("email");
	const { value: password } = useField<string>("password");
	const { value: name } = useField<string>("name");
	const { value: image } = useField<string>("image");
	const FormImageProxy = computed({
		get() {
			if (!image.value) {
				return [];
			}
			return [image.value];
		},
		set(v: string[]) {
			image.value = v[0];
		},
	});
	const onSubmit = handleSubmit((values) => {
		apiClient
			.post("/api/v1/auth/register", values)
			.then((res) => {
				authStore.save(res.data.access_token, res.data.user);
				router.push("/");
			})
			.catch((err) => console.error(err));
	});
</script>
<template>
	<div
		class="flex min-h-full flex-1 flex-col justify-center p-6 lg:px-8 gap-4 bg-white shadow-lg">
		<p class="text-xl">Sign in to your account.</p>
		<form @submit.prevent="onSubmit" class="flex flex-col gap-4 text-left">
			<div class="flex flex-row gap-4">
				<div>
					<label for="firstname" class="text-sm font-medium leading-6"
						>First Name</label
					>
					<InputText v-model="firstname" :error="errors.firstname" />
				</div>
				<div>
					<label for="lastname" class="text-sm font-medium leading-6"
						>Last Name</label
					>
					<InputText v-model="lastname" :error="errors.lastname" />
				</div>
			</div>
			<div>
				<label for="username" class="text-sm font-medium leading-6"
					>Username</label
				>
				<InputText v-model="username" :error="errors.username" />
			</div>
			<div>
				<label for="email" class="text-sm font-medium leading-6"
					>Email</label
				>
				<InputText v-model="email" :error="errors.email" />
			</div>
			<div>
				<label for="password" class="text-sm font-medium leading-6"
					>Password</label
				>
				<InputText
					v-model="password"
					type="password"
					:error="errors.password" />
			</div>
			<div>
				<label for="displayname" class="text-sm font-medium leading-6"
					>Display Name</label
				>
				<InputText v-model="name" :error="errors.name" />
			</div>
			<label for="pfp" class="text-sm font-medium leading-6"
				>Profile Picture</label
			>
			<ImageUpload v-model="FormImageProxy" :max="1" />
			<button
				type="submit"
				class="mt-4 border border-black px-2 py-1 rounded-md w-24 self-center bg-yellow-300 border-opacity-30">
				Submit
			</button>
		</form>
	</div>
</template>
