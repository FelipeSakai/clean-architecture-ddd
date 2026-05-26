import { expect, test } from 'vitest'
import { QuestionRepository } from '../repositories/question-repository.js'
import { CreateQuestionUseCase } from './create-question.js'
import { Question } from '../../enterprise/entities/question.js'

const fakeQuestionRepository: QuestionRepository = {
    create: async (question: Question) => { },
}
test('create an question', async () => {
    const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

    const { question } = await createQuestion.execute({
        authorId: '1',
        title: 'New question',
        content: 'Content of the new question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('New question')
})
