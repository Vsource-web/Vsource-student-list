import axios from "axios";

export const studentRegistrationService = {
    create: async (data: any) => {
        return axios.post("/api/student-registration", data);
    },
    list: async () => {
        return axios.get("/api/student-registration");
    }
};
