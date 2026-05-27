import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase


describe('Edit Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    })
    it('should be able to edit a answer', async () => {
        const newAnswer = await makeAnswer({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('answer-1'))
        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({
            answerId: 'answer-1',
            authorId: 'author-1',
            content: 'Conteúdo editado'
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Conteúdo editado'
        })
    })

    it('should not be able to edit a answer from another author', async () => {
        const newAnswer = await makeAnswer({
            authorId: new UniqueEntityId('author-1')
        }, new UniqueEntityId('answer-1'))
        await inMemoryAnswersRepository.create(newAnswer)

        await expect(sut.execute({
            answerId: 'answer-1',
            authorId: 'author-2',
            content: 'Conteúdo editado'
        })).rejects.toBeInstanceOf(Error)

        expect(inMemoryAnswersRepository.items).toHaveLength(1)
    })
})
