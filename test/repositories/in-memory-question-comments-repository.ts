import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentRepository implements QuestionCommentsRepository {
    public items: QuestionComment[] = []

    async create(questionComment: QuestionComment) {
        this.items.push(questionComment)
    }
    async findById(id: string) {
        const answer = this.items.find((item) => item.id.toString() === id)
        return answer || null
    }
    async delete(questionComment: QuestionComment) {
        const itemIndex = this.items.findIndex((item) => item.id === questionComment.id)

        if (itemIndex !== -1) {
            this.items.splice(itemIndex, 1)
        }
    }
}
