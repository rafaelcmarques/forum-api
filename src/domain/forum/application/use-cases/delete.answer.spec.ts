import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { Answer } from '../../enterprise/entities/answer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = Answer.create(
      {
        content: 'answer-test',
        authorId: new UniqueEntityID('author-2'),
        questionId: new UniqueEntityID('question-1'),
      },
      new UniqueEntityID('anwser-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({ answerId: 'anwser-1', authorId: 'author-2' })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('should be not able to delete a answer from another user', async () => {
    const newAnswer = Answer.create(
      {
        content: 'answer-test',
        authorId: new UniqueEntityID('author-2'),
        questionId: new UniqueEntityID('question-1'),
      },
      new UniqueEntityID('anwser-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
      return sut.execute({ answerId: 'anwser-1', authorId: 'author-1' })
    }).rejects.toBeInstanceOf(Error)
  })
})
