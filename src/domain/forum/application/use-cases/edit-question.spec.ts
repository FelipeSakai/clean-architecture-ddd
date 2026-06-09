import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase


describe('Edit Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
    })
    it('should be able to edit a question', async () => {
        const newQuestion = await makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))
        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({
            questionId: 'question-1',
            authorId: 'author-1',
            title: 'Título editado',
            content: 'Conteúdo editado'
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'Título editado',
            content: 'Conteúdo editado'
        })
    })

    it('should not be able to edit a question from another author', async () => {
        const newQuestion = await makeQuestion({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('question-1'))
        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
            questionId: 'question-1',
            authorId: 'author-2',
            title: 'Título editado',
            content: 'Conteúdo editado'
        })

        expect(result.isLeft()).toBe(true)

        expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    })
})
