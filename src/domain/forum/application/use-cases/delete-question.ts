import { QuestionRepository } from '../repositories/question-repository.js'


interface DeleteQuestionUseCaseRequest {
    authorId: string
    questionId: string
}

interface DeleteQuestionUseCaseResponse { }

export class DeleteQuestionUseCase {
    private questionRepository: QuestionRepository

    constructor(questionRepository: QuestionRepository) {
        this.questionRepository = questionRepository
    }

    async execute({
        authorId,
        questionId
    }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not allowed')
        }

        await this.questionRepository.delete(question)

        return {}

    }
}
