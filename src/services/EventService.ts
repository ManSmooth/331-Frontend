import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { EventItem } from "@/types";
const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default {
	getEvents(
		perPage: number = 0,
		page: number = 0,
		keyword: string = ""
	): Promise<AxiosResponse<EventItem[]>> {
		let temp_concat: String[] = [];
		if (keyword) {
			temp_concat.push(`desc=${keyword}`);
		}
		if (perPage != 0) {
			temp_concat.push(`_limit=${perPage}`);
		}
		if (page != 0) {
			temp_concat.push(`_page=${page}`);
		}
		return apiClient.get<EventItem[]>(`/events?${temp_concat.join("&")}`);
	},
	getEventById(id: number): Promise<AxiosResponse<EventItem>> {
		return apiClient.get<EventItem>(`/events/${id}`);
	},
	saveEvent(event: EventItem): Promise<AxiosResponse<EventItem>> {
		if (event.organizer?.id == 0) {
			event.organizer = undefined;
		}
		return apiClient.post<EventItem>("/events", event);
	},
};
