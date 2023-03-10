import { getToken } from "../controllers/token.js";

export function get_token_template(args){
    const token = getToken()
    const mytemplate = `
        <html>
            <body>
                <h1>${args.name}님 인증 완료 해주세요!!</h1>
                <hr />
                <h2> 인증번호 : ${token} 입니다.</h1>
            </body>
        </html>
    `;
    return mytemplate
}