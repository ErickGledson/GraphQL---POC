const { 
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');

const OrderTypeEnum = new GraphQLEnumType({
    name: 'OrderTypeEnum',
    values: {
      HOTEL: {
        value: "hotel",
      },
      PACOTE: {
        value: "pacote",
      },
      ATIVIDADE: {
        value: "atividade",
      },
    },
  })

const OrdersType = new GraphQLObjectType({
    name: 'OrdersObjectType',
    description: 'A Orders Type Definition',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'A order ID'
        },
        type: {
            type: GraphQLString,
            description: 'A type order'
        },
        amount: {
            type: GraphQLInt,
            description: 'A amount order'
        }
    })
});

const UsersType = new GraphQLObjectType({
    name: 'User',
    description: 'A User Type Definition',
    fields: () => ({
        id: {
            type: GraphQLInt,
            description: 'An user ID'
        },
        name: {
            type: GraphQLString,
            description: 'An user name'
        },
        email: {
            type: GraphQLString,
            description: 'An user email address'
        },
        orders: {
            type: new GraphQLList(OrdersType),
            args: {
                type: {
                  type: OrderTypeEnum,
                }
            },
            resolve: (user, { type }) => { return user.orders && user.orders.filter(o => !type || o.type.includes(type)) }
        }
    })
});

const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    description: 'User used for signing up',
    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'An user name'
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'An user email address'
        },
    }),
});

module.exports = { UsersType, UserInputType, OrderTypeEnum };