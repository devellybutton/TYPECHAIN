/* JS 기본 입력 - fs 모듈 */

// fs를 이용해 파일 전체를 불러와서 처리
// /dev/stdin 파일에 적힌 텍스트를 읽어온다고 가정

let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
console.log(input);
