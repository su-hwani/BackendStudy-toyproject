// index.js

// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'
//import 'dotenv/config' //개인정보 입력하는 .env 파일
import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'

// The GraphQL schema // API DOCS 와 동일
const typeDefs = gql`
  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: BoardReturn => 객체 1개를 의미
    fetchBoards: [BoardReturn] # => 배열 안에 객체 1개를 의미 
  }

  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type Mutation {
    createTokenOfPhone(myphone: String) : String
    createTokenEmail(mail: string): String
  }
`

// A map of functions which return data for the schema.
const resolvers = { // API 와 동일
  Mutation: {
    createTokenOfPhone: (_, args) => {
      const isValid = checkValidationPhone(args.myphone)
      if (isValid){
        const mytoken = getToken()
        sendTokenToSMS(args.myphone, mytoken)
        return '인증완료!!!'
      }
    },

    createTokenEmail: async (_, args) => {
            const isVaild = checkValidationEmail(user.email)

            if(isVaild){
                const mytemplate = getWelcomeTemplate(user)

                sendTemplateToEmail(user.email.mytemplate)
                res.send("가입완료!!!")
            }

            await user.save() // 임시 데이터베이스 쓸거면 user -> user_temporary 변경 
            return "인증 완료 해주세요!"
        },
  },
  Query: {
    fetchBoards: () => {
      const result = [
        {
          number: 1,
          writer: '철수',
          title: '제목입니다',
          contents: '내용이에요11'
        },
        {
          number: 2,
          writer: '짱구',
          title: '제목입니다',
          contents: '내용이에요22'
        },
        {
          number: 1,
          writer: '훈이',
          title: '제목입니다',
          contents: '내용이에요33'
        }
      ]
      return result
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} on port ${3000}`)
})