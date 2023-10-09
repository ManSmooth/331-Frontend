<script setup lang="ts">
	import UUID from "@/features/UniqueID";
	import ErrorMessage from "./ErrorMessage.vue";
	import { computed } from "vue";
	const props = withDefaults(
		defineProps<{
			placeholder?: string;
			modelValue?: any;
			error?: string;
			required?: boolean;
			type?: string;
		}>(),
		{
			placeholder: "",
			modelValue: "",
			error: "",
			required: false,
			type: "text",
		}
	);
	const uuid = UUID().getID();
	const isError = computed(() => {
		return props.error ? true : false;
	});
</script>
<template>
	<div class="mt-2 flex flex-col">
		<input
			:type="type"
			:id="uuid"
			class="form-input rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 sm:text-sm sm:leading-6 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600"
			:class="{
				'text-red-700 ring-red-300 placeholder:text-red-400 focus:ring-red-600':
					isError,
			}"
			:value="modelValue"
			:placeholder="placeholder"
			@input="
				$emit(
					'update:modelValue',
					($event.target as HTMLInputElement)?.value
				)
			"
			v-bind="$attrs"
			:aria-describedby="error ? `${uuid}-error` : undefined"
			:aria-invalid="error ? true : false"
			:required="required" />
		<ErrorMessage
			class="flex text-xs text-red-700 items-center gap-2"
			v-if="error"
			:id="`${uuid}-error`">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-3 h-3">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6 18L18 6M6 6l12 12" />
			</svg>
			<p>
				{{ error }}
			</p>
		</ErrorMessage>
	</div>
</template>
