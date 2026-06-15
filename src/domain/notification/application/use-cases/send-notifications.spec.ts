import { SendNotificationUseCase } from './send-notifications'
import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notification-repository'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase


describe('Send Notification', () => {
    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
    })

    it('should be able to create a notification', async () => {
        const result = await sut.execute({
            recipientId: '1',
            title: 'Nova notificacao',
            content: 'Conteúdo da nova notificacao',
        })


        if (result.isRight()) {
            expect(result.isRight()).toBe(true)
            expect(inMemoryNotificationsRepository.items[0]?.id).toEqual(result.value.notification.id)
        }
    })
})
