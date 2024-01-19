import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { Slug } from '../../enterprise/entities/values-objects/slug'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to find a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-slug'),
    })

    inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-slug',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].title).toEqual(newQuestion.title)
  })
})
