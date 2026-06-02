import { makeAnswer } from '../../../../../test/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentRepository } from '../../../../../test/repositories/in-memory-answers-comments-repository'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswersCommentsRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
    beforeEach(() => {
        inMemoryAnswerRepository = new InMemoryAnswersRepository()
        inMemoryAnswersCommentsRepository = new InMemoryAnswerCommentRepository()

        sut = new CommentOnAnswerUseCase(
            inMemoryAnswerRepository,
            inMemoryAnswersCommentsRepository
        )
    })

    it('should be able to comment on a answer', async () => {
        const answer = await makeAnswer()

        await inMemoryAnswerRepository.create(answer)

        await sut.execute({
            answerId: answer.id.toString(),
            authorId: 'author-1',
            content: 'Comment content'
        })

        expect(inMemoryAnswersCommentsRepository.items[0]?.content).toEqual('Comment content')
    })
})

