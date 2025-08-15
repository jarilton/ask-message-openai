import { Body, Controller, Post } from '@nestjs/common';
import { AskService } from './ask.service';

@Controller('ask')
export class AskController {
  constructor(private readonly askService: AskService) {}

  @Post()
  async askQuestion(@Body('question') question: string) {
    const answer = await this.askService.ask(question);
    return { answer };
  }
}
