import { makeQuestion } from '../../../../../test/factories/make-question'
import { InMemoryQuestionCommentRepository } from '../../../../../test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionsCommentsRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
    beforeEach(() => {
        inMemoryQuestionRepository = new InMemoryQuestionsRepository()
        inMemoryQuestionsCommentsRepository = new InMemoryQuestionCommentRepository()

        sut = new CommentOnQuestionUseCase(
            inMemoryQuestionRepository,
            inMemoryQuestionsCommentsRepository
        )
    })

    it('should be able to comment on a question', async () => {
        const question = await makeQuestion()

        await inMemoryQuestionRepository.create(question)

        await sut.execute({
            questionId: question.id.toString(),
            authorId: 'author-1',
            content: 'Comment content'
        })

        expect(inMemoryQuestionsCommentsRepository.items[0]?.content).toEqual('Comment content')
    })
})

