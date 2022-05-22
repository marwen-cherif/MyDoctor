import axiosApiInstance from './axiosApiInstance';

const API_URL = `${process.env.REACT_APP_BACK_END_BASE_URL}/appointments`;

class AppointmentService {
  getAllAppointments() {
    return axiosApiInstance.get(`${API_URL}/all`);
  }
  createNewAppointment() {
    return axiosApiInstance.get(`${API_URL}/create`);
  }
}
export default new AppointmentService();
