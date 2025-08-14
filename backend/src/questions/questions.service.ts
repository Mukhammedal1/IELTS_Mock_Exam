import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question } from './model/question.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.questionModel.create(createQuestionDto);
  }

  async findAll() {
    return await this.questionModel.find();
  }

  async findOne(id: string) {
    const result = await this.questionModel.findOne({
      _id: new Types.ObjectId(id),
    });

    if (!result) {
      throw new NotFoundException('Question not found');
    }
    return result;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('Question not found');
    }
    return await this.questionModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateQuestionDto,
    );
  }

  async remove(id: string) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('Question not found');
    }
    return await this.questionModel.findOneAndUpdate({
      _id: new Types.ObjectId(id),
    });
  }
}
