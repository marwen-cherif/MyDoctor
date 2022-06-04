import axiosApiInstance from '../helpers/axiosApiInstance';
import { RoleType } from '@mydoctor/common/enums';

class AppService {
  getProfile() {
    return axiosApiInstance.get<{
      id: string;
      email: string;
      lastName: string;
      firstName: string;
      createdAt: string;
      lastModifiedAt?: string;
      phone: string;
      phoneCountryPrefix: string;
      roles: {
        id: string;
        name: RoleType;
      }[];
    }>(`${process.env.REACT_APP_BACK_END_BASE_URL}/profile`);
  }
}
export default new AppService();
