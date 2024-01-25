import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {
    const response = await sut.execute({
      content: 'New question content',
      authorId: '2',
      title: 'What is a test?',
    })

    expect(response.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(
      response.value?.question,
    )
  })
})
