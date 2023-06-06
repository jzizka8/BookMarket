import type { Result } from "@badrap/result";
import type { User } from "@prisma/client";

export type UserCreateData = {
  username: string,
  hashedPassword: string,
}

export type UserCreateResult = Promise<Result<User>>;