import { Test, TestingModule } from '@nestjs/testing';
import { NotificatoinController } from './notificatoin.controller';
import { NotificatoinService } from './notificatoin.service';

describe('NotificatoinController', () => {
  let notificatoinController: NotificatoinController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificatoinController],
      providers: [NotificatoinService],
    }).compile();

    notificatoinController = app.get<NotificatoinController>(NotificatoinController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(notificatoinController.getHello()).toBe('Hello World!');
    });
  });
});
