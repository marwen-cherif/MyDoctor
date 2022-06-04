import { UpsertClientPayload, UserDto } from '@mydoctor/common/dto';
import { FailureResponse } from '@mydoctor/common/types';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from './User.entity';
import { hashSync } from 'bcrypt';
import { Role } from './Role.entity';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(UserService.name);

  async findOne(email: string): Promise<User | undefined> {
    return User.findOne({ where: { email } });
  }
  async findOneById(userId: string): Promise<User | undefined> {
    return User.findOne({ relations: ['roles'], where: { id: userId } });
  }

  findOneBySearchTerm({
    searchTerm,
    doctorId,
  }: {
    searchTerm: string;
    doctorId: any;
  }): Promise<UserDto[] | FailureResponse> {
    const builder = User.createQueryBuilder('user').select([
      'user.id',
      'user.email',
      'user.phone',
      'user.firstName',
      'user.lastName',
      'user.phoneCountryPrefix',
    ]);

    builder
      .andWhere('user.email like :searchTerm', {
        searchTerm: `${searchTerm}%`,
      })
      .leftJoin(
        'appointment',
        'clientAppointments',
        `clientAppointments.clientId = user.id and clientAppointments.doctorId = :doctorId`,
        { doctorId },
      );

    return builder.getMany();
  }

  async upsertClient(
    upsertClientPayload: UpsertClientPayload,
  ): Promise<UserDto | FailureResponse> {
    if (upsertClientPayload.id) {
      const existingClient = await this.findOneById(upsertClientPayload.id);

      if (!existingClient) {
        return {
          type: 'NotFound',
          reason: 'Client not found',
        };
      }

      existingClient.email = upsertClientPayload.email;
      existingClient.firstName = upsertClientPayload.firstName;
      existingClient.lastName = upsertClientPayload.lastName;
      existingClient.phone = upsertClientPayload.phone;
      existingClient.phoneCountryPrefix =
        upsertClientPayload.phoneCountryPrefix;
      existingClient.lastModifiedAt = new Date();

      const updatedClient = await existingClient.save();

      return {
        id: updatedClient.id,
        email: updatedClient.email,
        lastName: updatedClient.lastName,
        firstName: updatedClient.firstName,
        phone: updatedClient.phone,
        phoneCountryPrefix: updatedClient.phoneCountryPrefix,
      };
    } else {
      const newClient = new User();

      const roles = await Role.find({ name: 'Customer' });

      newClient.createdAt = new Date();
      newClient.email = upsertClientPayload.email;
      newClient.firstName = upsertClientPayload.firstName;
      newClient.lastName = upsertClientPayload.lastName;
      newClient.phone = upsertClientPayload.phone;
      newClient.phoneCountryPrefix = upsertClientPayload.phoneCountryPrefix;
      newClient.password = hashSync(
        'test',
        parseInt(this.configService.get('PASSWORD_SALT')),
      );
      newClient.roles = roles;

      const createdClient = await newClient.save();

      return {
        id: createdClient.id,
        email: createdClient.email,
        lastName: createdClient.lastName,
        firstName: createdClient.firstName,
        phone: createdClient.phone,
        phoneCountryPrefix: createdClient.phoneCountryPrefix,
      };
    }
  }
}
