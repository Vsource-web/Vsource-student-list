import api from "@/lib/axios";

export const paymentService = {
    list: () => api.get("/api/payments").then(res => res.data.data),
    getById: (id: string) =>
        api.get(`/api/payments/${id}`).then(res => res.data.data),
    create: (data: any) =>
        api.post("/api/payments", data).then(res => res.data.data),
    update: (id: string, data: any) =>
        api.put(`/api/payments/${id}`, data).then(res => res.data.data),
    delete: (id: string) =>
        api.delete(`/api/payments/${id}`).then(res => res.data.data),
};
