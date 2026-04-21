import axiosInstance from "./axiosInstance";

export const createAppointment = async (appointmentData) => {
  const response = await axiosInstance.post("/appointments/create", appointmentData);
  return response.data;
};

export const getAllAppointments = async () => {
  const response = await axiosInstance.get("/appointments/all");  // ← /all
  return response.data;
};

export const loginAdmin = async (username, password) => {
  const response = await axiosInstance.post("/auth/login", { username, password });
  return response.data;
};