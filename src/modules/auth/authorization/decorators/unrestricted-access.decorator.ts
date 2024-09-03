import { SetMetadata } from '@nestjs/common';

export const UNRESTRICTED_KEY = 'unrestricted';
export const UnrestrictedAccess = () => SetMetadata(UNRESTRICTED_KEY, true);
