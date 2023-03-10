import { getToday } from "./utils.js";
import nodemailer from 'nodemailer';
import { getToken } from "./token.js";
import { get_token_template } from "../models/token_template.js";
import { get_welcome_template } from "../models/welcome_template.js";

// 이메일 주소가 틀렸는지 확인하기
export async function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    return false;
  } else {
    return true;
  }
}

// 환영 이메일 템플릿 만들기
export async function getWelcomeTemplate(args) {
  const template = get_welcome_template(args)
  return template;
}

// 토큰 인증 이메일 템플릿 만들기 
export async function getTokenTemplate(args) {
  const template = get_token_template(args)
  return template;
}

// 이메일 보내기 
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
}