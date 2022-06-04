import {
  Body,
  Controller,
  Get,
  Logger,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { UpsertClientPayload, UserDto } from '@mydoctor/common/dto';
import { FailureResponse } from '@mydoctor/common/types';

import { UserService } from './user.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @Get('')
  @Roles(Role.Doctor)
  searchClient(
    @Query() query: { searchTerm: string },
    @Request() request,
  ): Promise<UserDto[] | FailureResponse> {
    this.logger.verbose('searchClient');

    return this.userService.findOneBySearchTerm({
      searchTerm: query.searchTerm,
      doctorId: request.user.id,
    });
  }

  @Put('')
  @Roles(Role.Doctor)
  upsertClient(
    @Request() request,
    @Body()
    body: UpsertClientPayload,
  ) {
    this.logger.verbose('searchClient');

    return this.userService.upsertClient(body);
  }
}
