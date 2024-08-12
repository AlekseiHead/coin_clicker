const $circle = document.querySelector("#circle");
const $score = document.querySelector("#score");
/*const $footer_level = document.querySelector("#footer-level");*/
const text = document.getElementById('footer_level').textContent;
const textCoins = document.getElementById('coins').textContent;

function start() {
	setScore(getScore());
	setImage();
}

function setScore(score) {
  localStorage.setItem("score", score);  
	$score.textContent = score;
}

function setImage() {
	
	if (getScore() >= 450) {
		$circle.setAttribute('src', './assets/cat2.png')
		document.getElementById('footer_level').textContent = "Intermediate";
		document.getElementById('coins').textContent = "2000";
	}
	if (getScore() >= 2000) {
		$circle.setAttribute('src', './assets/cat3.png')
		document.getElementById('footer_level').textContent = "Advanced";
		document.getElementById('coins').textContent = "5000";
	}
	if (getScore() >= 5000) {
		$circle.setAttribute('src', './assets/cat4.png')
		document.getElementById('footer_level').textContent = "Proficiency";
		document.getElementById('coins').textContent = "∞";
	}
}

function getScore() {
	return Number(localStorage.getItem("score")) ?? 0;
}

function addOne() {
	setScore(getScore() + 10);
	setImage();
}

$circle.addEventListener("click", (event) => {
  const rect = $circle.getBoundingClientRect();

  const offsetX = event.clientX - rect.left - rect.width / 2;
  const offsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 45;

  const tiltX = (offsetY / rect.height) * DEG;
  const tiltY = (offsetX / rect.width) * -DEG;

  $circle.style.setProperty("--tiltX", `${tiltX}deg`);
  $circle.style.setProperty("--tiltY", `${tiltY}deg`);

  setTimeout(() => {
    $circle.style.setProperty("--tiltX", `0deg`);
    $circle.style.setProperty("--tiltY", `0deg`);
  }, 300);

  const plusOne = document.createElement("div");
  plusOne.classList.add("plus-one");
  plusOne.textContent = "+10";
  plusOne.style.left = `${event.clientX - rect.left}px`;
  plusOne.style.top = `${event.clientY - rect.top}px`;

  $circle.parentElement.appendChild(plusOne);

  addOne();

  setTimeout(() => {
    plusOne.remove();
  }, 2000);
});

start();
