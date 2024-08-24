const url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const resultPublish = document.querySelector("#result");
const btnCalculate = document.querySelector("#calculate");
const btnClear = document.querySelector("#clear");
const btnReset = document.querySelector("#reset");
let result = null;
let a = null;

// function message
const fnMessage = (a,textMessage) => {
  if (a === "") {
    resultPublish.textContent = `${textMessage}`;
  }
};
// reset button
btnReset.addEventListener("click", () => {
  const selectFrom = document.querySelector("#select-from");
  const selectTo = document.querySelector("#select-to");
  a = selectFrom.value;
  selectFrom.value = selectTo.value;
  selectTo.value= a;
});

const getData = () => {
// calculate button
  btnCalculate.addEventListener("click", () => {
    const inptFrom = document.querySelector(".inp-from").value;  
    const selectFrom = document.querySelector("#select-from").value;
    const selectTo = document.querySelector("#select-to").value;
    fnMessage(selectTo, "Please select currency to");
    fnMessage(selectFrom, "Please select currency from");
    fnMessage(inptFrom, "Please write amount");

    if (selectFrom !=="" && selectTo !==""){
// get data
    fetch(url + "/" + selectFrom + ".json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data[selectFrom]);
        result= inptFrom * data[selectFrom][selectTo];
        resultPublish.textContent = `${result.toFixed(2)} ${selectTo}`;
        result = null;
      })
      .catch((error) => console.log(error));
  }});
// clear button
  btnClear.addEventListener("click", () => {
    document.querySelector("#select-from").value = "";
    document.querySelector("#select-to").value = "";
    document.querySelector(".inp-from").value = "";
    document.querySelector("#result").textContent = "Result";
  });
};

getData();
