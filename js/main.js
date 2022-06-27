const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const timeDisplay = document.querySelector("#time");
const scoreDisplay = document.querySelector("#score");
const messageDisplay = document.querySelector("#message");

let words = ["banana", "key", "car", "javascript", "cat"];
let score = 0;
let time = 0;
let timeInterval;
let isPlaying = false;
let isReady = false;

// 기본 게임 시간
const GAME_TIME = 7;

const API_URL = "https://random-word-api.herokuapp.com/word?number=100";

init();

// async await 에이싱크 어웨잇 (비동기함수)
async function init() {
  const res = await fetch(API_URL);
  //패치가 실행이 된 후에 값이 api에 담김
  const data = await res.json();
  words = data.filter((i) => i.length < 7);
  isReady = true;
  console.log(words);
}
// function init() {
//   const res = fetch(API_URL)
//     .then((res) => res.json())
//     // json으로 넘겨온 값을 data라는 이름으로 받는다
//     .then((data) => (words = data));
//   //words 변수에 넘겨받은 data를 담아주면 됨
//   console.log(res);
//   //통신을 완료하지않았기 때문에 promise가 나옴
// }

wordInput.addEventListener("input", (e) => {
  const typedText = e.target.value;
  const currentText = currentWord.innerText;
  if (typedText.toUpperCase() === currentText.toUpperCase() && isReady) {
    // input받은 값과 문제의 값이 같으면 score() 점수 +1, setNewWord() 새 단어 출력
    addScore();
    setNewWord();
  }
});
// 게임 종료
function gameover() {
  console.log(gameover);
  isPlaying = false;
  clearInterval(timeInterval);
  timeInterval = null; // 빈값 넣어서 초기화
  messageDisplay.innerText = "GAME OVER~!";
  // game over이기 때무네 score 초기화
  score = 0;
}

// 시간 카운트 다운
function countDown() {
  console.log(time);
  time = time - 1;
  timeDisplay.innerText = time;
  if (time === 0) {
    gameover();
  }
}

function setNewWord() {
  // 새로운 단어가 제시될때마다 게임시간을 5초로 초기화한다
  time = GAME_TIME;
  wordInput.value = "";
  messageDisplay.innerText = "Now Playing!!";
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord.innerText = words[randomIndex];

  if (!isPlaying) {
    //isPlaying 이 false 이면 true로 다시 바꿔줌
    timeInterval = setInterval(countDown, 1000);
    isPlaying = true;
    // 게임오버가 되면 isPlaying을 다시 false로 바꿔준다 ->gameover()함수에 추가
  }
}

function addScore() {
  score = score + 1;
  scoreDisplay.innerText = score;
}
