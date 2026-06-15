import { makeAnswer } from "../../../../../test/factories/make-answer"
import { InMemoryAnswerAttachmentRepository } from "../../../../../test/repositories/in-memory-answers-attachments-repository"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository"
import { OnAnswerCreated } from "./on-answer-created"

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('On Answer Created', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentRepository)
    })

    it('should send a notification when an answer is created', async () => {
        const onAnswerCreated = new OnAnswerCreated()

        const answer = await makeAnswer()

        inMemoryAnswersRepository.create(answer)
    })
})