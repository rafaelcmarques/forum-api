import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnwserProps } from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<AnwserProps> = {},
  id?: UniqueEntityID,
) {
  const anwser = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return anwser
}
