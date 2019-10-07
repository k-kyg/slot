const first = document.getElementById("num1"),
	second = document.getElementById("num2"),
	third = document.getElementById("num3"),
	cointag = document.getElementById("coin"),
	bettag = document.getElementById("bet"),
	rat = document.getElementsByClassName("rating")[0],
	stb = document.getElementsByTagName("start-button")[0],
	stob = document.querySelectorAll("stop-button"),
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
	bet,
	f,
	s,
	t;
window.onkeydown = () => {
	switch (event.keyCode) {
		case 13: start(); break;
		case 74: stop(1); break;
		case 75: stop(2); break;
		case 76: stop(3); break;
		default: break;
	}
}
stob.forEach((x, y) => {
	x.addEventListener("click", () => stop(y + 1));
});
stb.addEventListener("click", () => start());
const start = () => {
	if (playing) return void (0);
	bet = parseInt(bettag.value);
	try {
		if (bet > coin) throw new Error("賭け値を所持コインより多くすることはできません");
		if (bet <= 0) throw new Error("賭け値を0以下にすることはできません");
		if (!bet) throw new Error("賭け値を入力してください");
	} catch (e) {
		alert(e);
		return void (0);
	}
	playing = true;
	bettag.readOnly = true;
	rat.textContent = "";
	cointag.textContent = coin -= bet;
	f = setInterval(() => {
		let num = fir.next();
		if (num.done) {
			fir = slotnum();
			num = fir.next();
		}
		first.textContent = num.value;
	}, 32);
	s = setInterval(() => {
		let num = snd.next();
		if (num.done) {
			snd = slotnum();
			num = tir.next();
		}
		second.textContent = num.value;
	}, 64);
	t = setInterval(() => {
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
			setTimeout(() => bettag.readOnly = false, 100);
		}
	}
}
const changecoin = x => void (cointag.textContent = coin += bet * x);
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
	if (coin >= gameclear) {
		rat.textContent = "Game Clear!";
		stb.textContent = "もう一度";
		stb.addEventListener("click", () => location.reload());
	} else if (coin <= 0) {
		rat.textContent = "Game Over...";
		stb.textContent = "もう一度";
		stb.addEventListener("click", () => location.reload());
	}
}
