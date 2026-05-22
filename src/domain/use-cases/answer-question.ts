import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Answer } from '../entities/answer.js'
import { AnswersRepository } from '../repositories/answers-repository.js'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  private answersRepository: AnswersRepository

  constructor(answersRepository: AnswersRepository) {
    this.answersRepository = answersRepository
  }

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answersRepository.create(answer)
    return answer
  }
}
