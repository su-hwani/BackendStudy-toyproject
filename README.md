# Toyproject - 회원가입 Part

## MVC 패턴 적용

> controllers : 앱의 사용자로부터의 입력에 대한 응답으로 모델 및/또는 뷰를 업데이트하는 로직

> > index.js : 총괄

> > email.js : email 인증 관련

> > pw_hashing.js : password 암호화, 복호화

> > utils.js : 현재 시간 구하기

> models : 앱이 포함해야할 데이터가 무엇인지를 정의

> > user_permanent.js : 영구회원 Schema

> > user_temporary.js : 임시회원 Schema

> views : 앱의 데이터를 보여주는 방식
