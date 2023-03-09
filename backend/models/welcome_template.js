export function get_welcome_template(args){
    const mytemplate = `
        <html>
            <body>
                <h1>${args.name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${args.name}</div>
                <div>학부: ${args.department}</div>
                <div>학번: ${args.studentID}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `;
    return mytemplate
}