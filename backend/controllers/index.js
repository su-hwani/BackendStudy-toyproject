
import { User_temporary } from '../models/user_temporary.js'
import { User_permanent } from '../models/user_permanent.js'
import { getToday, getToday_Float } from "./utils.js"
import { encryption, decryption} from "./pw_hashing.js"

import { ApolloServer, gql } from "apollo-server";
import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

const typeDefs = gql`
  type UserDB { # => User Schema
    name: String
    mail: String
    phone: String
    department: String
    studentID: String
    _ID: String
    _PW: String
  }

  type Query {
    UserReturn: [UserDB] # => 객체들의 배열 
  }

  type Mutation {
    changeState(mail: String): String # => 임시회원DB(User_temporary) -> 영구회원DB(User_permanent)
    insertUser(name: String, mail: String, phone: String, department: String, studentID: String, _ID: String, _PW: String): String
  } # => 임시회원DB에 User Data 저장 
`;

const resolvers = {
  Mutation: {
    // 임시회원DB(User_temporary) -> 영구회원DB(User_permanent)
    changeState: async (_, args) => { 
      await User_temporary.findOne({mail: args.mail}).then(async item => {
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

    // 새로운 User -> 임시회원DB(User_temporary) 저장
    insertUser: async (_, args) => {
      // PassWord 암호화 
      const encryption_PW = await encryption(args._PW)
      
      const user_temporary = new User_temporary({ 
        name: args.name,
        mail: args.mail,
        phone: args.phone,
        department: args.department,
        studentID: args.studentID,
        _ID: args._ID,
        _PW: encryption_PW,
      })
      
      await user_temporary.save() 
      return "인증 완료 해주세요!"
    },
  },
  Query: {
    // 영구회원DB에 있는 전체 User Data 반환
    UserReturn: async () => {
      const user = await User_permanent.find()
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
