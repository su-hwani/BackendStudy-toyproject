export function getToday() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
  
    return `${yyyy}-${mm}-${dd}`;
  }
  
export function getToday_Float() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  
  const time = parseFloat('yyyy'+'mm'+'dd')
  return time;
}