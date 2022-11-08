import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginModel } from './model/userLogin.input';
import * as bcrypt from 'bcryptjs';

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
      jwtServiceMock.sign.mockImplementation(() => 'Some gibberish token');
      const user = {
        _id: '1',
        name: registrationDetails.name,
        email: registrationDetails.email,
        token: jwtServiceMock.sign({ id: '1' }),
      };
      userServiceMock.createUser.mockImplementation(() =>
        Promise.resolve(user)
      );
      const userDeatils = await resolver.registerUser(registrationDetails);
      expect(userDeatils).toEqual(user);
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

  describe('Testing loginUser', () => {
    it('should throw not found error', async () => {
      const userLogin: UserLoginModel = {
        email: 'test@example.com',
        password: 'test_password',
      };
      userServiceMock.getUser.mockImplementation(() => Promise.resolve(null));
      const compare = jest
        .fn()
        .mockImplementation(() => Promise.resolve(false));
      try {
        await resolver.loginUser(userLogin);
      } catch (error) {
        expect(error.response.message).toBe(
          "User with email:'test@example.com' not found."
        );
      }
    });

    it('should return user', async () => {
      const userLogin: UserLoginModel = {
        email: 'test@example.com',
        password: 'test_password',
      };
      jwtServiceMock.sign.mockImplementation(() => 'Some gibberish token');
      const user = {
        _id: '1',
        name: 'test name',
        email: userLogin.email,
        token: jwtServiceMock.sign({ id: '1' }),
      };
      const compare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = compare;
      userServiceMock.getUser.mockImplementation(() =>
        Promise.resolve(user)
      );
      const userDeatils = await resolver.loginUser(userLogin);
      console.log(userDeatils);

      expect(userDeatils).toEqual(user);
    });
  });
});
