<h1 align="center">nestjs-near</h1>

<div align="center">

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/nestjs-near">
    <img alt="" src="https://img.shields.io/npm/v/nestjs-near.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="github issues" href="https://www.npmjs.com/package/nestjs-near">
    <img alt="github issues" src="https://img.shields.io/github/issues-closed/muzikanto/nestjs-near?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Package size" href="https://www.npmjs.com/package/nestjs-near">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/nestjs-near?style=for-the-badge&labelColor=000000">
    </a>
  <a aria-label="Downloads" href="https://www.npmjs.com/package/nestjs-near">
    <img alt="npm" src="https://img.shields.io/npm/dm/nestjs-near?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Prettier" href="https://www.npmjs.com/package/nestjs-near">
      <img alt="npm" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&labelColor=000000">
    </a>
    <a aria-label="Prettier" href="https://www.npmjs.com/package/nestjs-near">
        <img alt="npm" src="https://img.shields.io/badge/types-included-32715f.svg?style=for-the-badge&labelColor=000000">
    </a>
    <a aria-label="License" href="https://github.com/Muzikanto/nestjs-near/blob/master/LICENSE.md">
        <img alt="" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000">
    </a>
</p>
</div>

## Introduction

Quick implementation of near in your application.
Generation of typed smart contract methods.
Including ready for use typed methods in popular smart contract [Standards](https://github.com/Muzikanto/nestjs-near/tree/master/src/standards).

## Navigation

-  [install](#setup)
-  [example](#quick-example) Quick example

## Setup

You'll need to install the package from npm `npm i nestjs-near near-api-js`.

## Quick Example

```typescript jsx
// app.module.ts
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

// test.service.ts
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
```

## Authors

-  Maksim Schiriy [@maksim-schiriy](https://www.linkedin.com/in/maksim-schiriy/?locale=en_US)
