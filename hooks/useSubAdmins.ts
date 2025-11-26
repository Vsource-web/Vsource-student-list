"use client";

import { useQuery } from "@tanstack/react-query";
import { subAdminService } from "@/services/subAdmin.service";
import { SubAdmin } from "@/types/subAdmin";

export function useSubAdmins() {
    return useQuery<SubAdmin[]>({
        queryKey: ["sub-admins"],
        queryFn: async () => {
            const list = await subAdminService.list();
            return list.filter((u) => u.role === "SUB_ADMIN");
        },
        refetchOnWindowFocus: false,
    });
}
