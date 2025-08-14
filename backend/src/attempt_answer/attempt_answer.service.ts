import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttemptAnswerDto } from './dto/create-attempt_answer.dto';
import { UpdateAttemptAnswerDto } from './dto/update-attempt_answer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AttemptAnswer } from './model/attempt_answer.model';
import { Model, Types } from 'mongoose';

@Injectable()
export class AttemptAnswerService {
  constructor(
    @InjectModel(AttemptAnswer.name)
    private readonly attemptAnswerModel: Model<AttemptAnswer>,
  ) {}
  async create(createAttemptAnswerDto: CreateAttemptAnswerDto) {
    const { attemptId, questionId, choice } = createAttemptAnswerDto;

    const existing = await this.attemptAnswerModel.findOne({
      attemptId,
      questionId,
    });

    if (existing) {
      return this.attemptAnswerModel.findOneAndUpdate(
        { attemptId, questionId },
        { choice },
        { new: true },
      );
    }

    return await this.attemptAnswerModel.create(createAttemptAnswerDto);
  }

  async findAll() {
    return await this.attemptAnswerModel.find();
  }

  async findAllByAttemptId(attemptId: string) {
    const answers = await this.attemptAnswerModel
      .find({
        attemptId: attemptId,
      })
      // .populate('choiceId');
    console.log(answers);

    return answers;
  }

  async findOne(id: string) {
    const result = await this.attemptAnswerModel.findOne({
      _id: new Types.ObjectId(id),
    });

    if (!result) {
      throw new NotFoundException('Attempt Answer not found');
    }
    return result;
  }

  async update(id: string, updateAttemptAnswerDto: UpdateAttemptAnswerDto) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('Attempt Answer not found');
    }
    return await this.attemptAnswerModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateAttemptAnswerDto,
    );
  }

  async remove(id: string) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('Attempt Answer not found');
    }
    return await this.attemptAnswerModel.findOneAndUpdate({
      _id: new Types.ObjectId(id),
    });
  }
}
