import { getToday_Float } from "../controllers/utils.js";

export function get_welcome_template(args){
    const Today = getToday_Float()
    const mytemplate = `
        <html>
            <body>
                <h1>${args.name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${args.name}</div>
                <div>학부: ${args.department}</div>
                <div>학번: ${args.studentID}</div>
                <div>가입일: ${Today}</div>
            </body>
        </html>
    `;
    return mytemplate
}