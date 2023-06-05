import { Result } from '@badrap/result';

const genericError = Result.err(new Error('Sorry. Some error has occured.'));

export default genericError;
