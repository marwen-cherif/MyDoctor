import axiosApiInstance from '../helpers/axiosApiInstance';
import {
  FailureResponse,
  UpsertClientPayload,
  UserDto,
} from '@mydoctor/common';

class AppService {
  searchClient({ searchTerm }: { searchTerm: string }) {
    const endpoint = new URL(
      `${process.env.REACT_APP_BACK_END_BASE_URL}/users`,
    );

    endpoint.searchParams.append('searchTerm', searchTerm);

    return axiosApiInstance.get<UserDto[] | FailureResponse>(endpoint.href);
  }
  upsertClient(payload: UpsertClientPayload) {
    const endpoint = new URL(
      `${process.env.REACT_APP_BACK_END_BASE_URL}/users`,
    );

    return axiosApiInstance.put<UserDto | FailureResponse>(
      endpoint.href,
      payload,
    );
  }
}
export default new AppService();
