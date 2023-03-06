// index.js

// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from "apollo-server";

//import 'dotenv/config' //개인정보 입력하는 .env 파일
import { checkEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
import { User_temporary } from './models/user_temporary.js'
import { User_permanent } from './models/user_permanent.js'
import { getToday, getToday_Float } from "./utils.js"
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// The GraphQL schema // API DOCS 와 동일
const typeDefs = gql`
  type UserDB {
    name: String
    mail: String
    phone: String
    department: String
    studentID: String
    _ID: String
    _PW: String
  }

  type Query {
    UserReturn: [UserDB] # => 배열 안에 객체 1개를 의미
  }

  type Mutation {
    changeState(mail: String): String
    insertUser(name: String, mail: String, phone: String, department: String, studentID: String, _ID: String, _PW: String): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  // API 와 동일
  Mutation: {
    changeState: async (_, args) => {
      const user = await User_temporary.findOne({mail: args.mail}).then(async item => {
        if (item){
          const user_permanent = new User_permanent({
            name: item.name,
            mail: item.mail,
            phone: item.phone,
            department: item.department,
            studentID: item.studentID,
            _ID: item._ID,
            _PW: item._PW
          })
          await user_permanent.save()
        }
      })
      return "인증되었습니다."
    },

    insertUser: async (_, args) => {
      const user= new User_temporary({ // 새로운 user 데이터 생성 
        name: args.name,
        mail: args.mail,
        phone: args.phone,
        department: args.department,
        studentID: args.studentID,
        _ID: args._ID,
        _PW: args._PW,
      })
      
      await user.save() // 임시 데이터베이스 쓸거면 user -> user_temporary 변경 
      return "인증 완료 해주세요!"
    },
  },
  Query: {
    UserReturn: async () => {
      const user = await User_temporary.find()
      return user
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect("mongodb://127.0.0.1:27017/mydocker_mini_project")

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} on port ${3000}`);
});
