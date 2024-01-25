import { FetchRecentQuestionUseCase } from './fetch-recent-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionUseCase

describe('Fetch recent questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fetch recent  questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 1) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 5) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 12) }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 12) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 5) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 1) }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
