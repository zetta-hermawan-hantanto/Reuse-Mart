const userTypedef = `#graphql
    enum Role {
        buyer
        seller
        quality_control
        customer_service
        depositor
    }

    type User {
        _id: ID!
        first_name: String
        last_name: String
        email: String!
        password: String!
        role: Role!
        balance: Int!
        address: [String!]
        phone_number: String
    }

    type Query {
        GetUserById(userId: ID!): User
    }

    type Mutation {
        Register(firstName: String, lastName: String, email: String, password: String): User!
        Login(email: String, password: String): String!
    }
`;

export default userTypedef;
