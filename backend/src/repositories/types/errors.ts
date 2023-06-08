/* eslint-disable max-classes-per-file */
export class NonexistentRecordError extends Error {}

export class DeletedRecordError extends Error {}

export class ConflictingRecordError extends Error {}

export class WrongOwnershipError extends Error {}