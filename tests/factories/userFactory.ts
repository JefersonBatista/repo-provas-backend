import { faker } from "@faker-js/faker";

export function invalidUserFactory() {
  const invalidUser = {
    email: faker.internet.email(),
    password: faker.datatype.number(),
  };

  return invalidUser;
}

export function userFactory() {
  const user = {
    email: faker.internet.email(),
    password: faker.datatype.string(),
  };

  return user;
}
