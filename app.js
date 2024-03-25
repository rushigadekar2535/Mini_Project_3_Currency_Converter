// let BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy";
// let BASE_URL = "https://v6.exchangerate-api.com/v6/e25f5b3e9ee67274990e7928/latest";


const API_Key = "e25f5b3e9ee67274990e7928";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");



// console.log(fromCurrency.value);
// console.log(toCurrency);

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        // console.log( newOption.value)
        newOption.value = currCode;
        select.append(newOption);

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })


}

const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input")
    let amountVal = amount.value;
    
    // console.log(amtvalue);

    if(amountVal === "" || amountVal < 1){
        amountVal = 1;
        amount.value = 1;
    }
 
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    // let response = await fetch(URL);
    // let data = await response.json();
    // // console.log(response);
    // let rate = data[tocurr.value.toLowerCase()];
    // let finalAmount = amtval * rate; 
    // msg.innerText = `${amtVal}${fromCurr} to ${finalAmount}${tocurr}`;

  const URL = `https://v6.exchangerate-api.com/v6/${API_Key}/latest/${fromCurrency.value}`;

     let response = await fetch(URL);
     let data = await response.json();
    //  console.log(data.conversion_rates); 
     let exchangerate = data.conversion_rates[toCurrency.value];
    //  console.log(exchangerate);
    let totalExchangeRate = amountVal * exchangerate;
    // console.log(totalExchangeRate);
    const msg = document.querySelector(".msg");
    
    msg.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;


    // msg.innerText = `${amountVal}${fromCurrency} to ${totalExchangeRate}${toCurrency}`;
}




btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});

window.addEventListener("load", ()=>{
updateExchangeRate();
});