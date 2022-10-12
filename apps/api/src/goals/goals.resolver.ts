import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GoalsResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
