<template>
	<div class="flex flex-row justify-between items-center gap-4">
		<label v-if="label">{{ label }}</label>
		<input
			class="border border-black border-opacity-25 rounded-md px-2 py-1 form-input"
			:placeholder="label"
			:value="modelValue"
			:type="type"
			:required="required"
			@input="
				emit(
					'update:modelValue',
					($event.target as HTMLInputElement)?.value
				)
			"
			v-bind="$attrs" />
	</div>
</template>

<script setup lang="ts" generic="T">
	const emit = defineEmits(["update:modelValue"]);
	defineProps<{
		label: string;
		modelValue: T;
		type?: string;
		required?: boolean;
	}>();
</script>
