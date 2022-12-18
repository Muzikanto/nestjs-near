import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import * as nearAPI from 'near-api-js';
import { NEST_NEAR_KEY } from './nest-near.utils';

export type NestNearOptions = nearAPI.ConnectConfig;
export type NestNear = nearAPI.Near;

@Global()
@Module({
  imports: [],
  providers: [],
})
export class NestNearModule {
  public static forRootAsync(opts: NestNearOptions): DynamicModule {
    const nearProvider: Provider = {
      provide: NEST_NEAR_KEY,
      useFactory: (): Promise<NestNear> => {
        return nearAPI.connect(opts);
      },
    };

    const dynamicModule: DynamicModule = {
      module: NestNearModule,
      providers: [nearProvider],
      exports: [nearProvider],
    };

    return dynamicModule;
  }
}
