<script setup lang="ts">
	import EventService from "@/services/EventService";
	import type { EventItem } from "@/types";
	import type { AxiosError, AxiosResponse } from "axios";
	import type { Ref } from "vue";
	import { computed, ref, watchEffect } from "vue";
	import {
		onBeforeRouteUpdate,
		useRouter,
		type NavigationGuardNext,
	} from "vue-router";
	import EventCard from "../components/EventCard.vue";
	import BaseInput from "@/components/BaseInput.vue";
	const events: Ref<EventItem[]> = ref([]);
	const totalEvent = ref<number>(0);
	const keyword = ref<string>("");
	const props = defineProps({
		page: {
			type: Number,
			required: true,
		},
	});
	const router = useRouter();

	fetchEvents(props.page);

	onBeforeRouteUpdate((to, from, next) => {
		const toPage = Number(to.query.page);
		fetchEvents(toPage, keyword.value, next);
	});
	const hasNextPage = computed(() => {
		const totalPages = Math.ceil(totalEvent.value / 3);
		return props.page.valueOf() < totalPages;
	});
	function fetchEvents(
		page: number,
		keyword: string = "",
		next: NavigationGuardNext | null = null
	) {
		EventService.getEvents(3, page, keyword)
			.then((response: AxiosResponse<EventItem[]>) => {
				events.value = response.data;
				totalEvent.value = response.headers["x-total-count"];
				if (next) {
					next();
				}
			})
			.catch((err: AxiosError) => {
				totalEvent.value = err.response?.headers["x-total-count"];
				if (totalEvent.value > 0) {
					return router.push({
						name: "event-list",
						query: { page: Math.ceil(totalEvent.value / 3) },
					});
				} else {
					return router.push({
						name: "event-list",
						query: { page: 1 },
					});
				}
			});
	}

	watchEffect(() => {
		fetchEvents(props.page, keyword.value);
	});
</script>

<template>
	<main class="flex flex-col items-center w-2/3 max-w-2lg gap-4">
		<h1 class="text-2xl">Events For Good</h1>
		<BaseInput label="Search" v-model="keyword" />
		<div class="flex flex-col gap-4">
			<EventCard
				v-for="event in events"
				:key="event.id"
				:event="event"></EventCard>
		</div>

		<div class="flex flex-row justify-between w-full max-w-lg">
			<RouterLink
				class="border px-2 py-1 border-black"
				:class="{ invisible: page == 1 }"
				:to="{ name: 'event-list', query: { page: page - 1 } }"
				rel="prev"
				id="page-prev">
				Prev Page
			</RouterLink>

			<RouterLink
				class="border px-2 py-1 border-black"
				:class="{ invisible: !hasNextPage }"
				:to="{ name: 'event-list', query: { page: page + 1 } }"
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
