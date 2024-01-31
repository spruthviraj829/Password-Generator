// access of the elements
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const copyBtn = document.querySelector("[data-copy]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const  numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]")
const generateBtn = document.querySelector(".generate-button");
const allCheckBOx =document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*()_+><?|/,~`';


let password="";
let passwordLenght=10;
let checkCount=0;
handleSlider();

setIndicator("#ccc");
//set password length
function handleSlider(){
     inputSlider.value = passwordLenght;
     lengthDisplay.innerText=passwordLenght;
     const min =inputSlider.min;
     const max = inputSlider.max;
     inputSlider.style.backgroundSize = ((passwordLenght-min)*100/(max-min)) +"% 100%";
}

lengthDisplay.innerText=inputSlider.value;

//set indicator
function setIndicator(color){
    indicator.style.backgroundColor= color;
    indicator.style.boxShadow =`0px 0px 12px 1px ${color}`
}

//function for creating random number ,symbol or charater
function getRndIntiger(min,max){  
    return Math.floor(Math.random()*(max-min)+min);
    // return Math.random();
}


//for getting  number for password
function generateNumber(){
    return getRndIntiger(0,9);
}

//for getting lowercase  character got password
function generateLowercase(){
    return String.fromCharCode(getRndIntiger(97,123))
}

//for getting lowercase  character got password
function generateUppercase(){
    return String.fromCharCode(getRndIntiger(65,91))
}

//for grtting symbol
function generateSymbol(){
    const randNum = getRndIntiger(0,symbols.length);
    return symbols.charAt(randNum);
}


//fonction for indicator
function calcStrength(){
 let hasUpper=false;
 let hasLower= false;
 let hasNum =false;
 let hasSym=false;

 if(uppercaseCheck.checked) hasUpper=true;
 if(lowercaseCheck.checked) hasLower=true;
 if(numbersCheck.checked)   hasNum=true;
 if(symbolsCheck.checked)  hasSym=true;

 if(hasUpper && hasLower && (hasNum || hasSym) && passwordLenght>=8 ){
    setIndicator("#0f0");
 }else if( (hasUpper || hasLower) && (hasNum || hasSym) && passwordLenght>=6 ){
    setIndicator("#ff0");
 }else{
    setIndicator("#f00");
 }

}


//function for copy pass to clipboard
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";       
    }
    catch(e){
        copyMsg.innerText="failed";
    }
     copyMsg.classList.add("active");
     setTimeout(() => {
        copyMsg.classList.remove("active");
     }, 2000);

}

//function for shufle the password
function shufflePassword(array){
    //fishers yates method
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp =array[i];
        array[i]=array[j];
        array[j]=temp;
    }

    console.log("inside shuffle function");
    let str="";
    array.forEach((el)=>(str += el))
    return str;
}


//adding event listners

//slider event listner
inputSlider.addEventListener('input', (e)=>{
     passwordLenght= e.target.value;
     handleSlider();
})

//event listner to copy image
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    {
        copyContent();
    }
})

//
function handleCheckboxChange(){
    checkCount=0;
    allCheckBOx.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })
    if(passwordLenght<checkCount){
        passwordLenght=checkCount;
        handleSlider();
    }
}
//event listner on checkboxes
allCheckBOx.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckboxChange);
})


//event listner on generate button
generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) return;

    if(passwordLenght<checkCount){
        passwordLenght= checkCount;
       
        handleSlider();
       
    }

console.log("starting journy");
    //to create an password
    //need to remove old pass
    password="";

    // if(uppercaseCheck.checked){
    //   password+=generateUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generatetLowercase();
    //   }
    //   if(numbersCheck.checked){
    //     password+=generateNumber();
    //   }
    //   if(symbolsCheck.checked){
    //     password+=generateSymbol();
    //   }

    let funArray=[];
    if(uppercaseCheck.checked){
        funArray.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funArray.push(generateLowercase);   
    }
    if(numbersCheck.checked){
        funArray.push(generateNumber);
    }
    if(symbolsCheck.checked){
        funArray.push(generateSymbol);
    }
  console.log(funArray);
    //for compulsary elements required for password
    for(let i=0 ;i<funArray.length;i++){
        password+=funArray[i]();
    }
    console.log("compulsary addition done " +password);

    //for remaining elements
   for(let i=0;i<passwordLenght-funArray.length;i++){
    let randomnum=getRndIntiger(0,funArray.length);
    password+= funArray[randomnum]();
   }
   console.log("remaining addition done "+password);

     password= shufflePassword(Array.from(password));
     console.log("shufel done");

     //displaying password on screen
      passwordDisplay.value=password;
      
      //sterngth 
      calcStrength();
})











