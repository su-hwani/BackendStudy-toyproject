// 임시 토큰 발행하기 
export function getToken() {
    const count = 6
  if (count === undefined) {
    console.log('에러 발생!!! 갯수를 제대로 입력해 주세요!!!');
    return;
  } else if (count <= 0) {
    console.log('에러 발생!!! 갯수가 너무 적습니다!!!');
    return;
  } else if (count > 10) {
    console.log('에러 발생!!! 갯수가 너무 많습니다!!!');
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(
    count,
    '0'
  );
  return result;
  // console.log(result);
}