import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} from 'graphql';

import { createHandler } from 'graphql-http/lib/use/express';

import pkg from 'join-monster';
const joinMonster = pkg.default;

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './test.db'
  }
});

const express = require("express")
  
const Tag = new GraphQLObjectType({
  name: 'Tags',
  extensions: {
    joinMonster: {
      sqlTable: 'tags',
      uniqueKey: 'id',
    },
  },
  fields: {
    id: {
      type: GraphQLInt
    },
    body: {
      type: GraphQLString
    },
  }
})

const UserTag = new GraphQLObjectType({
  name: 'UserTags',
  extensions: {
    joinMonster: {
      sqlTable: 'user_tags',
      uniqueKey: 'user_id',
    },
  },
  fields: {
    a_tags: {
      type: new GraphQLList(Tag),
      extensions: {
        joinMonster: {
          sqlJoin: (ut, t) => `${ut}.tag_id = ${t}.id and ${ut}.type = 'a'`
        }
      }
    },
    b_tags: {
      type: new GraphQLList(Tag),
      extensions: {
        joinMonster: {
          sqlJoin: (ut, t) => `${ut}.tag_id = ${t}.id and ${ut}.type = 'b'`
        }
      }
    },
    c_tags: {
      type: new GraphQLList(Tag),
      extensions: {
        joinMonster: {
          sqlJoin: (ut, t) => `${ut}.tag_id = ${t}.id and ${ut}.type = 'c'`
        }
      }
    },
  }
})

const User = new GraphQLObjectType({
  name: 'Users',
  extensions: {
    joinMonster: {
      sqlTable: 'users',
      uniqueKey: 'id',
    },
  },
  fields: {
    id: {
      type: GraphQLInt
    },
    tags: {
      type: UserTag,
      extensions: {
        joinMonster: {
          sqlJoin: (u, ut) => `${u}.id = ${ut}.user_id`
        },
      },
    }
  }
})

const QueryRoot = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          // knex is a SQL query library for NodeJS. This method returns a `Promise` of the data
          console.info(sql.replaceAll('\n', ' '))
          return knex.raw(sql)
        })
      }
    }
  })
})

const schema = new GraphQLSchema({
  description: 'a test schema',
  query: QueryRoot
})

const app = express()
 
// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema
  })
)
  
// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")
