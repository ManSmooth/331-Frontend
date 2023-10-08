import EventService from "@/services/EventService";
import { useEventStore } from "@/stores/event";
import NetworkErrorView from "@/views/NetworkErrorView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import EventEditView from "@/views/event/EventEditView.vue";
import EventLayoutView from "@/views/event/EventLayoutView.vue";
import EventRegisterView from "@/views/event/EventRegisterView.vue";
import NProgress from "nprogress";
import { createRouter, createWebHistory } from "vue-router";
import EventFormView from "../views/EventFormView.vue";
import EventListView from "../views/EventListView.vue";
import OrganizerDetailView from "../views/OrganizerDetailView.vue";
import OrganizerFormView from "../views/OrganizerFormView.vue";
import OrganizerListView from "../views/OrganizerListView.vue";
import EventDetailView from "../views/event/EventDetailView.vue";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "event-list",
			component: EventListView,
			props: (route) => ({
				page: parseInt((route.query?.page as string) || "1"),
			}),
		},
		{
			path: "/organizers",
			name: "organizer-list",
			component: OrganizerListView,
			props: (route) => ({
				page: parseInt((route.query?.page as string) || "1"),
			}),
		},
		{
			path: "/add-event",
			name: "add-event",
			component: EventFormView,
		},
		{
			path: "/add-organizer",
			name: "add-organizer",
			component: OrganizerFormView,
		},
		{
			path: "/organizer/:id",
			name: "organizer-detail",
			component: OrganizerDetailView,
			props: true,
		},
		{
			path: "/event/:id",
			name: "event-layout",
			component: EventLayoutView,
			props: true,
			beforeEnter: (to) => {
				const id: number = parseInt(to.params.id as string);
				const eventStore = useEventStore();
				return EventService.getEventById(id)
					.then((response) => {
						// need to set up the data for the component
						eventStore.setEvent(response.data);
					})
					.catch((error) => {
						if (error.response && error.response.status === 404) {
							return {
								name: "404-resource",
								params: { resource: "event" },
							};
						} else {
							return { name: "network-error" };
						}
					});
			},
			children: [
				{
					path: "",
					name: "event-detail",
					component: EventDetailView,
				},
				{
					path: "edit",
					name: "event-edit",

					component: EventEditView,
				},
				{
					path: "register",
					name: "event-register",

					component: EventRegisterView,
				},
			],
		},
		{
			path: "/404/:resource",
			name: "404-resource",
			component: NotFoundView,
			props: true,
		},
		{
			path: "/:catchAll(.*)",
			name: "not-found",
			component: NotFoundView,
		},
		{
			path: "/network-error",
			name: "network-error",
			component: NetworkErrorView,
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

router.beforeEach(() => {
	NProgress.start();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
