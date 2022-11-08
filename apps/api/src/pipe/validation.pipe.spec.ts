import { ArgumentMetadata } from '@nestjs/common';
import { UserRegisterModel } from '../users/model/userRegister.input';
import { ValidationPipe } from './validation.pipe';

it('Testing Pipe', async () => {
  let target = new ValidationPipe();
  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: UserRegisterModel,
  };

  await target.transform(<UserRegisterModel>{}, metadata).catch((err) => {
    expect(err.response.statusCode).toBe(400);
  });
});
