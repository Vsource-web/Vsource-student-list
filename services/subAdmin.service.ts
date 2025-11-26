// src/services/subAdmin.service.ts
"use client";

import api from "@/lib/axios";
import { SubAdmin } from "@/types/subAdmin";

export const subAdminService = {
  list: async (): Promise<SubAdmin[]> => {
    const res = await api.get("/api/users");
    return res.data.data;
  },

  create: async (data: any): Promise<SubAdmin> => {
    const res = await api.post("/api/users", data);
    return res.data.data;
  },

  update: async (id: string, data: any): Promise<SubAdmin> => {
    const res = await api.put(`/api/users/${id}`, data);
    return res.data.data;
  },

  delete: async (id: string): Promise<boolean> => {
    await api.delete(`/api/users/${id}`);
    return true;
  },
};
