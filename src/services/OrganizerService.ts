import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { OrganizerItem } from "@/types";
const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default {
	getOrganizers(
		perPage: number = 0,
		page: number = 0
	): Promise<AxiosResponse<OrganizerItem[]>> {
		let temp_concat: String[] = [];
		if (perPage != 0) {
			temp_concat.push(`_limit=${perPage}`);
		}
		if (page != 0) {
			temp_concat.push(`_page=${page}`);
		}
		return apiClient.get<OrganizerItem[]>(
			`/organizers?${temp_concat.join("&")}`
		);
	},
	getOrganizerById(id: number): Promise<AxiosResponse<OrganizerItem>> {
		return apiClient.get<OrganizerItem>(`/organizers/${id}`);
	},
	saveOrganizer(organizer: OrganizerItem): Promise<AxiosResponse<OrganizerItem>> {
		return apiClient.post<OrganizerItem>("/organizers", organizer);
	},
};
