import axiosApiInstance from './axiosApiInstance';
import { FailureResponse } from '@mydoctor/common/types';
import { AppointmentDto } from '@mydoctor/common/dto';

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
  createNewAppointment({
    startAt,
    endAt,
    clientEmail,
  }: {
    startAt: string;
    endAt: string;
    clientEmail: string;
  }) {
    return axiosApiInstance.post<AppointmentDto | FailureResponse>(
      `${API_URL}/create`,
      {
        startAt,
        endAt,
        clientEmail,
      },
    );
  }
  updateAppointment({
    id,
    startAt,
    endAt,
    clientEmail,
  }: {
    id: string | number;
    startAt: string;
    endAt: string;
    clientEmail: string;
  }) {
    return axiosApiInstance.put<AppointmentDto | FailureResponse>(
      `${API_URL}`,
      {
        id,
        startAt,
        endAt,
        clientEmail,
      },
    );
  }

  deleteAppointment({ id }: { id: string | number }) {
    return axiosApiInstance.delete<void | FailureResponse>(`${API_URL}/${id}`);
  }
}
export default new AppointmentService();
