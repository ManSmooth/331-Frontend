import type { OrganizerItem, WithRole } from "@/types";
import type { AxiosInstance } from "axios";
import axios from "axios";
import { defineStore } from "pinia";

const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	withCredentials: false,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export const useAuthStore = defineStore("auth", {
	state: () => ({
		token: null as string | null,
		user: null as (OrganizerItem & WithRole) | null,
	}),
	getters: {
		currentUserName(): string {
			return this.user?.name || "";
		},
		currentID(): number {
			return this.user?.id || 0;
		},
		isAdmin(): boolean {
			return this.user?.roles.includes("ROLE_ADMIN") || false;
		},
	},
	actions: {
		login(username: string, password: string) {
			return apiClient
				.post("/api/v1/auth/authenticate", {
					username,
					password,
				})
				.then((res) => {
					this.save(res.data.access_token, res.data.user);
					return res;
				});
		},
		save(token: string, user: OrganizerItem & WithRole) {
			if (!(token && user)) {
				return;
			}
			this.token = token;
			this.user = user;
			localStorage.setItem("access_token", this.token as string);
			localStorage.setItem("user", JSON.stringify(this.user));
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${this.token}`;
		},
		logout() {
			this.token = null;
			this.user = null;
			localStorage.removeItem("access_token");
			localStorage.removeItem("user");
		},
		reload(token: string, user: OrganizerItem & WithRole) {
			this.token = token;
			this.user = user;
		},
	},
});
