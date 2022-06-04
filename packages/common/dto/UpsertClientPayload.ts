import { UserDto } from "./UserDto";

export interface UpsertClientPayload extends Omit<UserDto, "id"> {
  id?: string;
}
