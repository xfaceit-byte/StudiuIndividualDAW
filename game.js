const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreElement = document.getElementById('score');
let score = 0;
let canScore = true;
let baseSpeed = 2.5;


function updateSpeed() {
  const newSpeed = Math.max(1, baseSpeed - (score * 0.1));

  obstacle.style.animation = 'none';
  obstacle.offsetHeight;
  obstacle.style.right = '-40px';
  obstacle.style.animation = `moveObstacle ${newSpeed}s linear infinite`;
}

updateSpeed();

obstacle.addEventListener('animationiteration', () => {
  canScore = true;
  updateSpeed();
});

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space' && !dino.classList.contains('jump')) {
    dino.classList.add('jump');
    setTimeout(() => dino.classList.remove('jump'), 600);
  }
});

setInterval(() => {
  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();


  if (obstacleRect.right < dinoRect.left && canScore) {
    score++;
    scoreElement.textContent = score;
    canScore = false;
  }


  if (
    dinoRect.right > obstacleRect.left &&
    dinoRect.left < obstacleRect.right &&
    dinoRect.bottom > obstacleRect.top
  ) {
    alert('Ai pierdut! Scorul tău: ' + score);
    location.reload();
  }
}, 10);