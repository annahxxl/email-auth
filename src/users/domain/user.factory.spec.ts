import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { User } from './user';
import { UserFactory } from './user.factory';

describe('UserFactory', () => {
  let userFactory: UserFactory;
  let eventBus: jest.Mocked<EventBus>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserFactory,
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    userFactory = module.get(UserFactory);
    eventBus = module.get(EventBus);
  });

  describe('create', () => {
    it('should create user', () => {
      // Given

      // When
      const user = userFactory.create(
        'user-id',
        'Hanna Lee',
        '8annahxxl@gmail.com',
        'signup-verify-token',
        'pass1234',
      );

      // Then
      const expected = new User(
        'user-id',
        'Hanna Lee',
        '8annahxxl@gmail.com',
        'signup-verify-token',
        'pass1234',
      );
      expect(expected).toEqual(user);
      expect(eventBus.publish).toBeCalledTimes(1);
    });
  });

  describe('reconstitute', () => {
    it('should reconstitute user', () => {
      // Given

      // When
      const user = userFactory.reconstitute(
        'user-id',
        'Hanna Lee',
        '8annahxxl@gmail.com',
        'pass1234',
        'signup-verify-token',
      );

      // Then
      const expected = new User(
        'user-id',
        'Hanna Lee',
        '8annahxxl@gmail.com',
        'pass1234',
        'signup-verify-token',
      );
      expect(expected).toEqual(user);
    });
  });
});
