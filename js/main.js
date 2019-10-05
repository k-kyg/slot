const first = document.getElementById("num1"),
	second = document.getElementById("num2"),
	third = document.getElementById("num3");
let status = [],
	playing = false;
function* slotnum() {
	yield* [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}
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
	let fir = slotnum(),
		snd = slotnum(),
		tir = slotnum();
	playing = true;
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
			playing = false;
		}
	}
}