import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { AnswerQuestionUseCase } from './answer-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase



describe('Get Question by Slug', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to get a question by its slug', async () => {
        const newQuestion = Question.create({
            authorId: new UniqueEntityId(),
            title: 'Nova pergunta',
            slug: Slug.create('nova-pergunta'),
            content: 'Conteúdo da nova pergunta',
        })
        await inMemoryQuestionsRepository.create(newQuestion)

        const { question } = await sut.execute({
            slug: 'nova-pergunta'
        })

        expect(question.id).toBeTruthy()
        expect(inMemoryQuestionsRepository.items[0]?.id).toEqual(question.id)
    })
})
