let lockGUI = false;

const users = [
    {
        Name: 'Avi Cohen',
        pin: 1234,
        balance: 1000,
    },
    {
        Name: 'Sam Levi',
        pin: 3040,
        balance: 5000,
    },
    {
        Name: 'x',
        pin: 10,
        balance: 7000,
    },
];

let atmMenuLeft = document.querySelector(".group1")
let atmMenuRight = document.querySelector(".group2")
let userInput = document.querySelector("#userInput");
let content = document.querySelector("#contentText")
const depositButton = document.querySelector('#opbut1');
const withrawalButton = document.querySelector('#opbut2');
const checkBalaceButton = document.querySelector('#opbut3');
const pinCodeButton = document.querySelector('#opbut4');
const receiptButton = document.querySelector('#opbut5');
const exitButton = document.querySelector('#opbut6');
// const cardButton = document.querySelector('#cardButton');
const cashButton = document.querySelector('.cash');
const cardImage = document.querySelector('#card');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');
const button5 = document.querySelector('#button5');
const button6 = document.querySelector('#button6');
const button7 = document.querySelector('#button7');
const button8 = document.querySelector('#button8');
const button9 = document.querySelector('#button9');
const button0 = document.querySelector('#button0');
const deleteButton = document.querySelector('#delete');
const spaceButton = document.querySelector('#space');
const cancelButton = document.querySelector('#cancel');
const clearButton = document.querySelector('#clear');
const enterButton = document.querySelector('#enter');
const receiptpaper = document.querySelector('#receiptpaper');



function handleButtonClick(event) {
    // Get the button's value
    const buttonValue = event.target.value;

    if (buttonValue === 'clear') {
        userInput.value = userInput.value.slice(0, -1);
    } else if (buttonValue === ' ') {
        userInput.value += ' ';
    } else {
        userInput.value += buttonValue;
    }
}

cashButton.addEventListener('click', handleButtonClick);
button1.addEventListener('click', handleButtonClick);
button2.addEventListener('click', handleButtonClick);
button3.addEventListener('click', handleButtonClick);
button4.addEventListener('click', handleButtonClick);
button5.addEventListener('click', handleButtonClick);
button6.addEventListener('click', handleButtonClick);
button7.addEventListener('click', handleButtonClick);
button8.addEventListener('click', handleButtonClick);
button9.addEventListener('click', handleButtonClick);
button0.addEventListener('click', handleButtonClick);
deleteButton.addEventListener('click', handleButtonClick);
spaceButton.addEventListener('click', handleButtonClick);
clearButton.addEventListener("click", clearInput);




function clearInput() {
    userInput.value = "";
}

const welcomeApp = () => {
    activeUser = null;
    clearInput()
    content.innerHTML = "PLEASE ENTER YOUR FULL NAME:";
    userInput.style.display = "block";
    atmMenuLeft.style.display = "none";
    atmMenuRight.style.display = "none";


    //enterButton.removeEventListener("click", handleDeposit);

};


enterButton.addEventListener("click", handleLogin);
let activeUser = {};

function handleLogin() {
    let nameOnCard = userInput.value;
    for (let i = 0; i < users.length; i++) {
        if (nameOnCard === users[i].Name) {
            content.innerHTML = "PLEASE ENTER YOUR PIN CODE: "
            clearInput()
            activeUser = users[i];
            enterButton.addEventListener("click", enterPin);
            return;
        }
    } content.innerHTML = "NAME NOT FOUND, PLEASE TRY AGAIN "




}


function enterPin() {
    if (Number(userInput.value) === activeUser.pin) {
        content.innerHTML = "ATM MENU"
        userInput.style.display = "none";
        atmMenuLeft.style.display = "block";
        atmMenuRight.style.display = "block";
        enterButton.removeEventListener("click", enterPin);
        lockGUI = true;
        console.log(lockGUI)
    }
    else {
        content.innerHTML = `WRONG PIN CODE<br>PLEASE TRY AGAIN:`
        clearInput()
    }
}


cancelButton.addEventListener("click", resetPage);

function resetPage() {
    if (!lockGUI) {
        return;
    }
    clearInput();
    content.innerHTML = "ATM MENU"
    userInput.style.display = "none";
    atmMenuLeft.style.display = "block";
    atmMenuRight.style.display = "block";
}


depositButton.addEventListener("click", deposit);

function deposit() {
    if (!lockGUI) {
        return;
    }
    content.innerHTML = "How much would you like to Deposit? ";
    clearInput();
    userInput.style.display = "block";
    atmMenuLeft.style.display = "none";
    atmMenuRight.style.display = "none";
    enterButton.addEventListener("click", handleDeposit);
}

function handleDeposit() {
    let depositSum = Number(userInput.value);
    clearInput();
    userInput.style.display = "block";
    atmMenuLeft.style.display = "none";
    atmMenuRight.style.display = "none";

    if (isNaN(depositSum)) {
        content.innerHTML = "Please enter a valid number";
        return;
    }

    if (depositSum % 20 === 0 || depositSum % 50 === 0) {
        activeUser.balance += depositSum;
        content.innerHTML = "Deposit successful. Your new balance is: " + activeUser.balance;
        userInput.style.display = "none";
        enterButton.removeEventListener("click", handleDeposit);
        setTimeout(function () {
            resetPage();
        }, 3500);
    } else {
        content.innerHTML = "Please enter a multiplier of 20 or 50";
    }
}



withrawalButton.addEventListener("click", withrawal);

function withrawal() {
    if (!lockGUI) {
        return;
    }
    content.innerHTML = "How much would you like to withdraw? ";
    clearInput();
    userInput.style.display = "block";
    atmMenuLeft.style.display = "none";
    atmMenuRight.style.display = "none";

    enterButton.addEventListener("click", handleWithdrawal);
}

function handleWithdrawal() {
    let withdrawalSum = parseInt(userInput.value);
    clearInput();
    userInput.style.display = "block";
    atmMenuLeft.style.display = "none";
    atmMenuRight.style.display = "none";

    if (isNaN(withdrawalSum)) {
        content.innerHTML = "Please enter a valid number";
        return;
    }

    if (withdrawalSum % 20 === 0 || withdrawalSum % 50 === 0) {
        activeUser.balance -= withdrawalSum;
        content.innerHTML = "Withdrawal successful. Your new balance is: " + activeUser.balance;
        enterButton.removeEventListener("click", handleWithdrawal);
        setTimeout(function () {
            resetPage();
        }, 3500);


    } else {
        content.innerHTML = "Please enter a multiplier of 20 or 50";
    }
}


checkBalaceButton.addEventListener('click', checkBalance)

function checkBalance() {
    if (!lockGUI) {
        return;
    }

    content.innerHTML = " Your current balance is: " + activeUser.balance + " NIS";
    userInput.style.display = "none";
    atmMenuLeft.style.display = "none";
    atmMenuRight.style.display = "none";
    setTimeout(function () {
        resetPage();
    }, 3500);

}


pinCodeButton.addEventListener('click', changePin);

function changePin() {
    if (!lockGUI){
        return;
    }

    content.innerHTML = "PLEASE CHOOSE A 4 DIGIT NUMBER AS YOUR NEW PIN CODE:";
    userInput.style.display = "block";
    atmMenuLeft.style.display = "none";
    atmMenuRight.style.display = "none";

    enterButton.addEventListener("click", handleChangePin);

    clearInput();
}

function handleChangePin() {
    let newPin = userInput.value;

    if (isNaN(newPin)) {
        content.innerHTML = "Please enter a valid number";
        return;
    }

    if (/^\d{4}$/.test(newPin)) {
        activeUser.pin = newPin;
        enterButton.removeEventListener("click", handleChangePin);
        content.innerHTML = "PIN changed successfully!";
        console.log(activeUser)
        userInput.style.display = "none";
        setTimeout(function () {
            resetPage();
        }, 3500);

    } else {
        content.innerHTML = "Please enter a 4-digit number";
    }

    clearInput();
}

exitButton.addEventListener('click', exit);

function exit() {
    if (!lockGUI) {
        return;
    }
    //lockGUI = true;
    content.innerHTML = "THANK YOU AND GOODBYE!";
    userInput.style.display = "none";
    atmMenuLeft.style.display = "none";
    atmMenuRight.style.display = "none";
    exitButton.removeEventListener('click', exit);
    lockGUI = false;
    console.log(lockGUI)
    setTimeout(function () {
        window.location.reload();
    }, 3500);
}


const today = new Date();
const month = today.getMonth() + 1; // Adding 1 to get the real month value
const day = today.getDate();
const year = today.getFullYear();

// If the month or day is a single digit, add a leading zero
const monthStr = month < 10 ? `0${month}` : `${month}`;
const dayStr = day < 10 ? `0${day}` : `${day}`;
const todayTime = `${today.getHours()}:${today.getMinutes()}`


const todayDate = `${year}-${monthStr}-${dayStr}`;

const receipt = document.querySelector("#receipt")


function printReceipt(){
    if (!lockGUI){
        return;
    }
    receipt.innerHTML += `  
    <div class="note">
        <div id="user_name">
            hello: ${activeUser.Name}
        </div>
        <div id="date">
        as of today: ${todayDate}
        ${todayTime}
        </div>
        <div id="date">
            your current balance is: ${activeUser.balance}
        </div>
        <p id="text">
            thank you for using the ATM!
        </p>
    </div>
    `
    receipt.style.display = "block"
    console.log("hello")

}


receiptButton.addEventListener("click", printReceipt)

//הכפתור אנטר וביטול תמיד זמינים ללחיצה
// לעשות חשבונית
//אנימציה לכרטיס או לפחות להרגיש את הלחיצה




// Select the card image

// Add an event listener to the card image
cardImage.addEventListener('click', moveCardIntoSlot);

function moveCardIntoSlot() {
    content.innerHTML= "PLEASE ENTER YOUR FULL NAME:"
    card.style.animationName='example';
    userInput.style.display = "block";
}