import { Injectable } from '@nestjs/common';
import { InjectNestNear } from 'nestjs-near/lib/nest-near/nest-near.utils';
import { InjectNestNearContract } from 'nestjs-near/lib/nest-near-contract/nest-near-contract.utils';
import { TEST_CONTRACT_ID } from './test.utils';
import { NestNearContract } from 'nestjs-near/lib/nest-near-contract/nest-near-contract.module';
import { NestNear } from 'nestjs-near/lib/nest-near/nest-near.module';

@Injectable({})
export class TestService {
  constructor(
    @InjectNestNear() public near: NestNear,
    @InjectNestNearContract(TEST_CONTRACT_ID) public contract: NestNearContract & { ft_balance_of: any },
  ) {}

  public async test(): Promise<any> {
    const account = await this.near.account('muzikant.testnet');
    const nearBalance = await account.getAccountBalance();

    const ftBalance = await this.contract.ft_balance_of({ account_id: 'muzikant.testnet' });

    return Promise.resolve({ nearBalance, ftBalance });
  }
}
