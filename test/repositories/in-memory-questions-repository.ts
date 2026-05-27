import { QuestionRepository } from "../../src/domain/forum/application/repositories/question-repository.js";
import { Question } from "../../src/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionsRepository implements QuestionRepository {
    public items: Question[] = []

    async create(question: Question): Promise<void> {
        this.items.push(question)
    }

    async findBySlug(slug: string) {
        const question = this.items.find(item => item.slug.value === slug)
        return question || null
    }
}
