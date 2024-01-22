import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to delete a comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(questionComment)

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('should be able to delete a comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryQuestionCommentRepository.create(questionComment)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionCommentId: questionComment.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
