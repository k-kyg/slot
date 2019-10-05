const first = document.getElementById("num1");
const second = document.getElementById("num2");
const third = document.getElementById("num3");
let playing = false;
function* slotnum() {
	yield 0;
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
	yield 6;
	yield 7;
	yield 8;
	yield 9;
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
	let fir = slotnum();
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
		let num = fir.next();
		if (num.done) {
			fir = slotnum();
			num = fir.next();
		}
		second.textContent = num.value;
	}, 64);
	window.t = setInterval(() => {
		let num = fir.next();
		if (num.done) {
			fir = slotnum();
			num = fir.next();
		}
		third.textContent = num.value;
	}, 16);
}
const stop = x => {
	switch (x) {
		case 1: clearInterval(f); break;
		case 2: clearInterval(s); break;
		case 3: clearInterval(t); break;
	}
}