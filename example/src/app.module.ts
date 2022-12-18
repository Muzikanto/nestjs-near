import { Module } from '@nestjs/common';
import * as nearAPI from 'near-api-js';
import { TestModule } from './test/test.module';
import { TEST_CONTRACT_ID } from './test/test.utils';
import { NestNearContractModule } from 'nestjs-near/lib/nest-near-contract/nest-near-contract.module';
import { NestNearModule } from 'nestjs-near/lib/nest-near/nest-near.module';

const { keyStores } = nearAPI;
const keyStore = new keyStores.InMemoryKeyStore();

// keyStore.setKey(
//   'testnet',
//   TEST_CONTRACT_ID,
//   nearAPI.KeyPair.fromString(
//     'ed25519:YOUR_CONTRACT_KEY'
//   )
// );

@Module({
  imports: [
    NestNearModule.forRootAsync({
      networkId: 'testnet',
      keyStore,
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
    }),
    NestNearContractModule.forRoot({
      accountId: TEST_CONTRACT_ID,
      contractId: TEST_CONTRACT_ID,
      viewMethods: ['ft_balance_of'],
      changeMethods: [],
    }),
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
