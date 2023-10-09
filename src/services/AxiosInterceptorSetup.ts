import { useRouter } from "vue-router";
import apiClient from "./AxiosClient";
import { useAuthStore } from "@/stores/auth";
import type { AxiosError } from "axios";
import router from "@/router";

apiClient.interceptors.request.use(
	(req) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			req.headers["Authorization"] = `Bearer ${token}`;
		}
		return req;
	},
	(err) => {
		return Promise.reject(err);
	}
);

apiClient.interceptors.response.use(
	(res) => {
		return res;
	},
	(err: AxiosError) => {
		if (err.response?.status === 403) {
			return router.push({ name: "login" });
		}
		return router.push({ name: "network-error" });
	}
);
