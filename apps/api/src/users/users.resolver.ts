import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
  @Query(() => String)
  sayUser(): string {
    return 'Hello User!';
  }
}
