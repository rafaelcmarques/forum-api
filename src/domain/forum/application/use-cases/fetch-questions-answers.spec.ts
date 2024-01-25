import { FetchQuestionsAnswersUseCase } from './fetch-questions-answers'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionsAnswersUseCase

describe('Fetch recent questions', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch answers of a questions', async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryAnswerRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    console.log(inMemoryAnswerRepository.items)

    const result = await sut.execute({ page: 1, questionId: 'question-1' })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const result = await sut.execute({
      page: 2,
      questionId: 'question-1',
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
