import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller({ path: '/test' })
export class TestController {
  constructor(protected testService: TestService) {}

  @Get()
  public test(): Promise<any> {
    return this.testService.test();
  }
}
