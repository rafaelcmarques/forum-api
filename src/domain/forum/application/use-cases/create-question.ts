import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface CreateQuestionUseCaseRequest {
  title: string
  content: string
  authorId: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    content,
    title,
    authorId,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      content,
      title,
      authorId: new UniqueEntityID(authorId),
    })
    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}
