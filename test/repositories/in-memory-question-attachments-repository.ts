import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => questionId === item.questionId.toString(),
    )

    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => questionId !== item.questionId.toString(),
    )

    this.items = questionAttachments
  }
}