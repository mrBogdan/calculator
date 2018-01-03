"use strict";

(function(){

	var buttons = document.querySelectorAll('.buttons .button');
	var input = document.getElementById("input");
	var stack = document.getElementById("stack");

	input.disabled = true;
	input.value = 0;

	let size = 24;
	let ENTER_FLAG = true;
	//Event click by buttons
	on("click", buttons, function(){

		if(input.value.length >= 10) {
			input.style.fontSize = (size - 4) + 'px';
		}
		if(input.value.length >= 15) {
			ENTER_FLAG = false;
		}
		if(this.innerHTML === "CE") {
			input.value = 0;
			stack.innerHTML = "";
			ENTER_FLAG = true;
			return;
		}
		if(this.innerHTML === "C") {
			return;
		}
		if(this.innerHTML === "←") {
			input.value = backRemove(input.value);
			if(input.value === "") {
				input.value = 0;
			}
			if(input.value.length < 15) {
				ENTER_FLAG = true;
			}
			return;
		}
		if(this.innerHTML === "±") {
			input.value = parseFloat(input.value) * (-1);
			return;
		}
		if(this.innerHTML === "=") {
			stack.innerHTML = operation(input.value, false);
			input.value = toCount(input.value);
		}
		else {
			if(!ENTER_FLAG) {
				if(!parseInt(input.value))
					stack.innerHTML = input.value;
			}
			if(parseFloat(input.value) === 0 && ENTER_FLAG) {
				input.value = this.innerHTML;
			} else if(ENTER_FLAG) {
				input.value += this.innerHTML;
			}
			
		}

	});
	function toCount(string) {

		try {
			string = operation(string, true);
			var result = eval(string);
		} catch(err) {
			input.value += err.name;
		}
		
		return result;
	}
	function on(event, elem, func) {
		let callback = func || function (){alert('Empty')};
		for (let i = 0; i < elem.length; ++ i) {
			elem[i].addEventListener("click", callback);
		}
	}
	function backRemove(str) {
		return str.substring(0, str.length - 1);
	}
	function operation(str, flag) {
		if(flag === true) {
			str = str.replace('×', '*');
			str = str.replace('÷', '/');
			str = str.replace(/(\.{2,})/, '.');
		} else {
			str = str.replace(/(\.{2,})/, '.');
		}
		return str;
	}
})();
