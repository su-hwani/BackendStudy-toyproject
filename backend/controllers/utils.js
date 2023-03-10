// 현재 날짜 얻어오기
export function getToday() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
  
    return `${yyyy}-${mm}-${dd}`;
  }

// 현재 날짜를 실수 타입으로 받아오기 
export function getToday_Float() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  
  const time = parseFloat('yyyy'+'mm'+'dd')
  return time;
}