import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        addProfile(firstName: $name, lastName: $name, email: $email, password: $password) {
        token
        User {
            _id
            firstName
            lastName
            email
        }
    }
}
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            User {
                _id
                firstName
                lastName
                email
            }
        }
    }
`;
