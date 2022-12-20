import { Controller, Get, Post, Req } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck() {}

  @Post()
  webhook(@Req() req): Promise<void> {
    const { body } = req;
    if (body.action.type !== 'createCard') {
      return;
    }

    return this.appService.updateCard(body.action.data);
  }
}
