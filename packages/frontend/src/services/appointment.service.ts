import axios from 'axios';

import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_BACK_END_BASE_URL}/appointments`;

class AppointmentService {
  getAllAppointments() {
    return axios.get(`${API_URL}/all`);
  }
  createNewAppointment() {
    return axios.get(`${API_URL}/create`, { headers: authHeader() });
  }
}
export default new AppointmentService();
