import type { Response } from 'express';
import { ZodError } from 'zod';
import type { ApiResponse } from './types';

export const failResponse = (res: Response, e: unknown) => {
  if (e instanceof ZodError) {
    const validationFailed: ApiResponse<typeof e> = {
      status: 'failure',
      data: e,
      error: `Validation failed.`,
    };
    return res.status(400).send(validationFailed);
  }
  const responseFailed: ApiResponse<object> = {
    status: 'failure',
    data: {},
    error: 'An error occurred ',
  };
  return res.status(500).send(responseFailed);
};

export const loadFailedResponse = (res: Response, message: string) => {
  const loadFailed: ApiResponse<object> = {
    status: 'failure',
    data: {},
    error: message,
  };
  return res.status(404).send(loadFailed);
};
