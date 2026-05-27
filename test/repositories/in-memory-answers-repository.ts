import { AnswersRepository } from '../../src/domain/forum/application/repositories/answers-repository'
import { Answer } from '../../src/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
    public items: Answer[] = []

    async create(answer: Answer): Promise<void> {
        this.items.push(answer)
    }

    async findById(id: string): Promise<Answer | null> {
        const answer = this.items.find((item) => item.id.toString() === id)
        return answer || null
    }

    async delete(answer: Answer) {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)

        if (itemIndex !== -1) {
            this.items.splice(itemIndex, 1)
        }
    }

    async save(answer: Answer) {
        const itemIndex = this.items.findIndex((item) => item.id === answer.id)

        if (itemIndex !== -1) {
            this.items[itemIndex] = answer
        }
    }
}
