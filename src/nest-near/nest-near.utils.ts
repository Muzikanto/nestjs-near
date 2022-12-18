import { Inject } from '@nestjs/common';

export const NEST_NEAR_KEY: string = 'NEAR_CLIENT';
export const InjectNestNear = () => Inject(NEST_NEAR_KEY);
