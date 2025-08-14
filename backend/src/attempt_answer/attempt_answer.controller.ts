import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttemptAnswerService } from './attempt_answer.service';
import { CreateAttemptAnswerDto } from './dto/create-attempt_answer.dto';
import { UpdateAttemptAnswerDto } from './dto/update-attempt_answer.dto';

@Controller('attempt-answer')
export class AttemptAnswerController {
  constructor(private readonly attemptAnswerService: AttemptAnswerService) {}

  @Post()
  create(@Body() createAttemptAnswerDto: CreateAttemptAnswerDto) {
    return this.attemptAnswerService.create(createAttemptAnswerDto);
  }

  @Get()
  findAll() {
    return this.attemptAnswerService.findAll();
  }

  @Get('attempt/:attemptId')
  findAllById(@Param('attemptId') attemptId: string) {
    return this.attemptAnswerService.findAllByAttemptId(attemptId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attemptAnswerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttemptAnswerDto: UpdateAttemptAnswerDto,
  ) {
    return this.attemptAnswerService.update(id, updateAttemptAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attemptAnswerService.remove(id);
  }
}
