import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase


describe('Create Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to create a question', async () => {
        const result = await sut.execute({
            authorId: '1',
            title: 'Nova pergunta',
            content: 'Conteúdo da nova pergunta',
            attachmentsIds: ['1', '2']
        })


        if (result.isRight()) {
            expect(result.isRight()).toBe(true)
            expect(inMemoryQuestionsRepository.items[0]?.id).toEqual(result.value.question.id)
            expect(inMemoryQuestionsRepository.items[0]?.attachments).toEqual([
                expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
                expect.objectContaining({ attachmentId: new UniqueEntityId('2') })
            ])
        }
    })
})
