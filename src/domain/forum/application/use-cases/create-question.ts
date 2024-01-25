import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { Either, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateQuestionUseCaseRequest {
  title: string
  content: string
  authorId: string
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>
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

    return right({
      question,
    })
  }
}
