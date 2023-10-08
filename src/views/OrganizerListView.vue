<script setup lang="ts">
	import OrganizerCard from "@/components/OrganizerCard.vue";
	import OrganizerService from "@/services/OrganizerService";
	import type { OrganizerItem } from "@/types";
	import type { AxiosResponse } from "axios";
	import type { Ref } from "vue";
	import { computed, ref } from "vue";
	import { onBeforeRouteUpdate, useRouter } from "vue-router";
	const organizers: Ref<OrganizerItem[]> = ref([]);
	const totalOrganizer = ref<number>(0);
	const props = defineProps({
		page: {
			type: Number,
			required: true,
		},
	});
	const router = useRouter();

	OrganizerService.getOrganizers(3, props.page)
		.then((response: AxiosResponse<OrganizerItem[]>) => {
			organizers.value = response.data;
			totalOrganizer.value = response.headers["x-total-count"];
		})
		.catch(() => {
			router.push({ name: "network-error" });
		});

	onBeforeRouteUpdate((to, from, next) => {
		const toPage = Number(to.query.page);
		OrganizerService.getOrganizers(3, toPage)
			.then((response: AxiosResponse<OrganizerItem[]>) => {
				organizers.value = response.data;
				totalOrganizer.value = response.headers["x-total-count"];
				next();
			})
			.catch(() => {
				next({ name: "NetworkError" });
			});
	});
	const hasNextPage = computed(() => {
		const totalPages = Math.ceil(totalOrganizer.value / 3);
		return props.page.valueOf() < totalPages;
	});
</script>

<template>
	<main class="flex flex-col items-center w-2/3 max-w-2lg gap-4">
		<h1 class="text-2xl">Organizers For Good</h1>
		<div class="flex flex-col gap-4">
			<OrganizerCard
				v-for="organizer in organizers"
				:key="organizer.id"
				:organizer="organizer"></OrganizerCard>
		</div>

		<div class="flex flex-row justify-between w-full max-w-lg">
			<RouterLink
				class="border px-2 py-1 border-black"
				:class="{ invisible: page == 1 }"
				:to="{ name: 'organizer-list', query: { page: page - 1 } }"
				rel="prev"
				id="page-prev">
				Prev Page
			</RouterLink>

			<RouterLink
				class="border px-2 py-1 border-black"
				:class="{ invisible: !hasNextPage }"
				:to="{ name: 'organizer-list', query: { page: page + 1 } }"
				rel="next"
				id="page-next">
				Next Page
			</RouterLink>
		</div>
	</main>
</template>

<style scoped>
	.pagination {
		display: flex;
		width: 290px;
	}

	.pagination a {
		flex: 1;
		text-decoration: none;
		color: #2c3e50;
	}

	#page-prev {
		text-align: left;
	}

	#page-next {
		text-align: right;
	}
</style>
@/types
