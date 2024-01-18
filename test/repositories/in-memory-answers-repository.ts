import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(id: string) {
    const answer = this.items.find((item) => id === item.id.toString())
    if (!answer) {
      return null
    }
    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(answerIndex, 1)
  }

  async save(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[answerIndex] = answer
  }
}
