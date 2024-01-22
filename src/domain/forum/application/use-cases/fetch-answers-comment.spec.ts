import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments'
import { FetchAnswerCommentsUseCase } from './fetch-answers-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch recent answers', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch comments of a answers', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answerComment-1'),
      }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answerComment-1'),
      }),
    )

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answerComment-1'),
      }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: 'answerComment-1',
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answerComment-1'),
        }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: 'answerComment-1',
    })

    expect(answerComments).toHaveLength(2)
  })
})
