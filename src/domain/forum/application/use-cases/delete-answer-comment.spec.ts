import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to delete a comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  it('should be able to delete a comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryAnswerCommentRepository.create(answerComment)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerCommentId: answerComment.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
