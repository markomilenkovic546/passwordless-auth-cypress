import { faker } from '@faker-js/faker';

export const createRandomUserData = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName}@mailsac.com`;
    const password = faker.internet.password();
    return {
        email: email,
        password: password,
        confirmPassword: password,
        firstName: firstName,
        lastName: lastName
    };
};