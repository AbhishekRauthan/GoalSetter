import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  const userServiceMock: MockType<UsersService> = {
    createUser: jest.fn(),
    getUser: jest.fn(),
  };
  const jwtServiceMock: MockType<JwtService> = {
    sign: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });
  describe('Testing registerUser', () => {
    it('should throw CONFLICT Exception', async () => {
      const registrationDetails = {
        email: 'test@example.com',
        name: 'test name',
        password: 'test_password',
      };
      try {
        userServiceMock.getUser.mockImplementation(() =>
          Promise.resolve(registrationDetails)
        );
        await resolver.registerUser(registrationDetails);
      } catch (error) {
        expect(error.response.message).toBe('User already exists');
      }
    });

    it('should create and return user details', async () => {
      const registrationDetails = {
        email: 'test@example.com',
        name: 'test name',
        password: 'test_password',
      };
      userServiceMock.getUser.mockImplementation(() => Promise.resolve(null));

      userServiceMock.createUser.mockImplementation(() =>
        Promise.resolve({
          id: '1',
          ...registrationDetails,
        })
      );
      jwtServiceMock.sign.mockImplementation(() => 'Some gibberish token');
      const userDeatils = await resolver.registerUser(registrationDetails);
      expect(userDeatils).toEqual({ id: '1', ...registrationDetails });
    });

    it('should fail to create user and throw NotImplemented Exception', async () => {
      const registrationDetails = {
        email: 'test@example.com',
        name: 'test name',
        password: 'test_password',
      };
      userServiceMock.getUser.mockImplementation(() => Promise.resolve(null));

      userServiceMock.createUser.mockImplementation(() => Promise.reject(null));
      try {
        await resolver.registerUser(registrationDetails);
      } catch (error) {
        expect(error.response.message).toBe('Unable to create user');
      }
    });
  });
});
