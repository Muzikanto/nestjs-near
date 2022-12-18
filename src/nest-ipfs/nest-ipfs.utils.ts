import { Inject } from '@nestjs/common';

export const NEST_IPFS_KEY: string = 'NEAR_IPFS';
export const InjectNestIpfs = () => Inject(NEST_IPFS_KEY);
