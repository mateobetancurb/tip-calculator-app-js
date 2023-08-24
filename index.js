const priceInput = document.getElementById("price-input");
const tipButtons = document.querySelectorAll(".section01__container button");
const customTipInput = document.querySelector(".section01__container input");
const numberPeopleInput = document.getElementById("people-input");
const resetButton = document.getElementById("reset-button");
const tipAmount = document.getElementById("tip-amount");
const totalPrice = document.getElementById("total-price");

let inputPriceValue = 0;
let buttonPercentValue = 0;
let inputCustomTip = 0;
let inputNumberPeopleValue = 1;
let tipAmountValue = 0;
let totalPriceValue = 0;

priceInput.addEventListener("input", (event) => {
	inputPriceValue = parseFloat(event.target.value);
	calculateTip();
});

tipButtons.forEach((button) => {
	button.addEventListener("click", (event) => {
		buttonPercentValue = parseInt(event.target.value);
		calculateTip();
	});
});

customTipInput.addEventListener("input", (event) => {
	inputCustomTip = parseFloat(event.target.value);
	calculateTip();
});

numberPeopleInput.addEventListener("input", (event) => {
	inputNumberPeopleValue = parseInt(event.target.value);
	calculateTip();
});

function formatCurrency(amount) {
	return `$${Math.round(amount)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function calculateTip() {
	if (inputNumberPeopleValue > 0) {
		if (inputCustomTip) {
			tipAmountValue =
				(inputPriceValue * inputCustomTip) / 100 / inputNumberPeopleValue;
		} else {
			tipAmountValue =
				(inputPriceValue * buttonPercentValue) / 100 / inputNumberPeopleValue;
		}

		const totalWithoutTip = inputPriceValue + inputCustomTip;
		totalPriceValue = totalWithoutTip / inputNumberPeopleValue + tipAmountValue;
	}

	tipAmount.textContent = formatCurrency(
		tipAmountValue ? tipAmountValue : inputCustomTip
	);

	totalPrice.textContent = formatCurrency(totalPriceValue);
}

resetButton.addEventListener("click", () => {
	priceInput.value = "";
	customTipInput.value = "";
	numberPeopleInput.value = "";
	inputPriceValue = 0;
	buttonPercentValue = 0;
	inputCustomTip = 0;
	inputNumberPeopleValue = 1;
	tipAmountValue = 0;
	totalPriceValue = 0;
	calculateTip();
});
