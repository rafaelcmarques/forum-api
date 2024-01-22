import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/questions-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((item) => id === item.id.toString())

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComment = this.items
      .filter((item) => questionId === item.questionId.toString())
      .slice((page - 1) * 20, page * 20)

    return questionComment
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
