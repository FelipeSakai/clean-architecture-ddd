import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'


interface FetchRecentQuestionUseCaseRequest {
    page: number
}

interface FetchRecentQuestionUseCaseResponse {
    questions: Question[]
}

export class FetchRecentQuestionUseCase {
    private questionsRepository: QuestionsRepository

    constructor(questionsRepository: QuestionsRepository) {
        this.questionsRepository = questionsRepository
    }

    async execute({
        page
    }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent({ page })

        return {
            questions: questions
        }
    }
}
