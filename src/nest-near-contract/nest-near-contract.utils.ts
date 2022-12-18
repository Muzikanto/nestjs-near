import { Inject } from '@nestjs/common';

export const NEST_NEAR_CONTRACT_KEY = (contractId: string): string => `NEAR_CONTRACT:${contractId}`;
export const InjectNestNearContract = (contractId: string) => Inject(NEST_NEAR_CONTRACT_KEY(contractId));
