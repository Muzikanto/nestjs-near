import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { NEST_IPFS_KEY } from './nest-ipfs.utils';
// import { create } from 'ipfs-http-client';

const create = require('ipfs-http-client').create;

export type NestIpfs = any;

@Global()
@Module({})
export class NestIpfsModule {
  public static forRootAsync(): DynamicModule {
    const nearProvider: Provider = {
      provide: NEST_IPFS_KEY,
      useFactory: async (): Promise<NestIpfs> => {
        return create();
      },
    };

    const dynamicModule: DynamicModule = {
      module: NestIpfsModule,
      providers: [nearProvider],
      exports: [nearProvider],
    };

    return dynamicModule;
  }
}
