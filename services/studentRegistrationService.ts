import api from "@/lib/axios";

export const studentRegistrationService = {
    create: (data: any) =>
        api.post("/api/student-registration", data),

    list: () =>
        api.get("/api/student-registration"),

    getById: (id: string) =>
        api.get(`/api/student-registration/${id}`),

    update: (id: string, data: any) =>
        api.put(`/api/student-registration/${id}`, data),

    delete: (id: string) =>
        api.delete(`/api/student-registration/${id}`),
};
