const first = document.getElementById("num1"),
	second = document.getElementById("num2"),
	third = document.getElementById("num3"),
	cointag = document.getElementById("coin"),
	rat = document.getElementsByClassName("rating")[0],
	stb = document.getElementsByTagName("start-button")[0];
	random = (max, min) => Math.floor(Math.random() * (max - min)) + min,
	gameclear = random(100000, 10000000);
function* slotnum() {
	yield* [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}
let status = [],
	playing = false,
	coin = 1000,
	fir = slotnum(),
	snd = slotnum(),
	tir = slotnum(),
	bet;
window.onkeydown = () => {
	switch (event.keyCode) {
		case 13: start(); break;
		case 74: stop(1); break;
		case 75: stop(2); break;
		case 76: stop(3); break;
		default: break;
	}
}
const start = () => {
	if (playing) return void (0);
	playing = true;
	bet = parseInt(document.getElementById("bet").value),
	window.f = setInterval(() => {
		let num = fir.next();
		if (num.done) {
			fir = slotnum();
			num = fir.next();
		}
		first.textContent = num.value;
	}, 32);
	window.s = setInterval(() => {
		let num = snd.next();
		if (num.done) {
			snd = slotnum();
			num = tir.next();
		}
		second.textContent = num.value;
	}, 64);
	window.t = setInterval(() => {
		let num = tir.next();
		if (num.done) {
			tir = slotnum();
			num = tir.next();
		}
		third.textContent = num.value;
	}, 16);
}
const stop = x => {
	if (playing) {
		switch (x) {
			case 1: clearInterval(f); status.push(1); break;
			case 2: clearInterval(s); status.push(2); break;
			case 3: clearInterval(t); status.push(3); break;
		}
		status = Array.from(new Set(status));
		if (status.length === 3) {
			status = [];
			check(...[first.textContent, second.textContent, third.textContent].map(x => parseInt(x)));
			playing = false;
		}
	}
}
const changecoin = x => void(cointag.textContent = coin += bet * x);
const check = (x, y, z) => {
	const subarr = [Math.abs(x - y), Math.abs(y - z)].sort((a, b) => a - b);
	if (x === y && y === z) {
		switch (x) {
			case 7:
			case 8:
				rat.textContent = "Perfect!";
				changecoin(10);
				break;
			default:
				rat.textContent = "Amazing!";
				changecoin(9);
		}
	} else if ((x > y && y > z) || (x < y && y < z)) {
		if ((x > z && x === y * (y / z)) || (x < z && z === y * (y / x))) {
			rat.textContent = "Fantastic!";
			changecoin(8);
		} else if (subarr[0] === subarr[1]) {
			rat.textContent = "Excelent!";
			changecoin(6);
		} else if (Math.abs(subarr[0] - subarr[1]) === 1) {
			rat.textContent = "Good!";
			changecoin(4);
		}
	} else if (x === z) {
		rat.textContent = "Great!";
		changecoin(7);
	} else if (x === y || y === z) {
		rat.textContent = "OK";
		changecoin(3);
	}
	setTimeout(() => rat.textContent = "", 2500);
	if (coin >= gameclear) {
		rat.textContent = "Game Clear!";
		stb.textContent = "もう一度";
		stb.addEventListener("click", () => location.href = location.href);
	}
}