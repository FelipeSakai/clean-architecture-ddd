import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Question } from '../../enterprise/entities/question.js'
import { QuestionRepository } from '../repositories/question-repository.js'


interface GetQuestionBySlugUseCaseRequest {
    slug: string
}

interface GetQuestionBySlugUseCaseResponse {
    question: Question
}

export class GetQuestionBySlugUseCase {
    private questionRepository: QuestionRepository

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository
    }

    async execute({
        slug
    }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
        const question = await this.questionRepository.findBySlug(slug)

        if (!question) {
            throw new Error('Question not found')
        }

        return {
            question
        }
    }
}

