import { getToday } from "./utils.js";
import nodemailer from 'nodemailer';
import { getToken } from "./token.js";
import { get_token_template } from "../models/token_template.js";
import { get_welcome_template } from "../models/welcome_template.js";
//import 'dotenv/config'

//라이브러리 설치 : yarn add nodemailer

export async function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    return false;
  } else {
    return true;
  }
}

export async function getWelcomeTemplate(args) {
  const template = get_welcome_template()
  return template;
}

export async function getTokenTemplate(args) {
  const template = get_token_template()
  return template;
}

//사용시 .env 파일 만들어서 EMAIL_USER, EMIAL_PASS, EMAIL_SENDER 입력하기
export async function sendTemplateToEmail(email, mytemplate) {
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
      }
  })

  const result = await transporter.sendMail({
      from: EMAIL_SENDER,
      to: email,
      subject: "[Koss] 이메일 인증 해주세요!!",
      html: mytemplate
  })
      console.log(result);
}