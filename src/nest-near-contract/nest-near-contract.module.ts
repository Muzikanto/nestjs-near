import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import * as nearAPI from 'near-api-js';
import { NEST_NEAR_CONTRACT_KEY } from './nest-near-contract.utils';
import { ContractMethods } from 'near-api-js/lib/contract';
import { NEST_NEAR_KEY } from '../nest-near/nest-near.utils';
import { NestNear } from '../nest-near/nest-near.module';

export type NestNearContractOptions = ContractMethods & { contractId: string; accountId: string };
export type NestNearContract = nearAPI.Contract;

@Global()
@Module({
  imports: [],
  providers: [],
})
export class NestNearContractModule {
  public static forRoot(opts: NestNearContractOptions): DynamicModule {
    const nearProvider: Provider = {
      provide: NEST_NEAR_CONTRACT_KEY(opts.contractId),
      useFactory: async (nestNear: NestNear): Promise<NestNearContract> => {
        const account: nearAPI.Account = await nestNear.account(opts.accountId);
        return new nearAPI.Contract(account, opts.contractId, opts);
      },
      inject: [NEST_NEAR_KEY],
    };

    const dynamicModule: DynamicModule = {
      module: NestNearContractModule,
      providers: [nearProvider],
      exports: [nearProvider],
    };

    return dynamicModule;
  }

  onModuleInit(): void {}
}
