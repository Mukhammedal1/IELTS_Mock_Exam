import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Attempt } from './model/attempt.model';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(Attempt.name)
    private readonly attemptModel: Model<Attempt>,
  ) {}
  async create(createAttemptDto: CreateAttemptDto) {
    return await this.attemptModel.create(createAttemptDto);
  }

  async findAll() {
    return await this.attemptModel.find();
  }

  async findOne(id: string) {
    const result = await this.attemptModel.findOne({
      _id: new Types.ObjectId(id),
    });

    if (!result) {
      throw new NotFoundException('Attempt not found');
    }
    return result;
  }

  async update(id: string, updateAttemptDto: UpdateAttemptDto) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('Attempt not found');
    }
    return await this.attemptModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateAttemptDto,
    );
  }

  async remove(id: string) {
    const result = await this.findOne(id);
    if (!result) {
      throw new NotFoundException('Attempt not found');
    }
    return await this.attemptModel.findOneAndUpdate({
      _id: new Types.ObjectId(id),
    });
  }
}
