const { GraphQLScalarType } = require('graphql')

module.exports = {
  // Custom date/time value that our schema will use
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value.',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value,
  }),
}
