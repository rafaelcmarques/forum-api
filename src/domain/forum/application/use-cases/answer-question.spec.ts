import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('shoul be able to create a new anwser', async () => {
    const answer = await sut.execute({
      content: 'Nova resposta',
      instructorId: '1',
      questionId: '2',
    })

    expect(answer.content).toEqual('Nova resposta')
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})
