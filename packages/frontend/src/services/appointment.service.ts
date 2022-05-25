import axiosApiInstance from './axiosApiInstance';
import { FailureResponse } from '@mydoctor/common/types/FailureResponse';
import { AppointmentDto } from '../types/Appointment';

const API_URL = `${process.env.REACT_APP_BACK_END_BASE_URL}/appointments`;

class AppointmentService {
  getAppointments({
    start,
    end,
    doctorId,
  }: {
    doctorId: string;
    start?: string;
    end?: string;
  }) {
    const endpoint = new URL(`${API_URL}/all`);

    endpoint.searchParams.append('doctorId', doctorId);

    if (start) {
      endpoint.searchParams.append('start', start);
    }
    if (end) {
      endpoint.searchParams.append('end', end);
    }

    return axiosApiInstance.get<AppointmentDto[] | FailureResponse>(
      endpoint.href,
    );
  }
  createNewAppointment() {
    return axiosApiInstance.post(`${API_URL}/create`);
  }
}
export default new AppointmentService();
