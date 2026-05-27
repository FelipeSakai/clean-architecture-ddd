import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Question } from '../../enterprise/entities/question.js'
import { QuestionRepository } from '../repositories/question-repository.js'


interface CreateQuestionUseCaseRequest {
    authorId: string
    title: string
    content: string
}

interface CreateQuestionUseCaseResponse {
    question: Question
}

export class CreateQuestionUseCase {
    private questionRepository: QuestionRepository

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository
    }

    async execute({
        authorId,
        title,
        content
    }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {

        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content
        })

        await this.questionRepository.create(question)

        return {
            question
        }

    }
}
