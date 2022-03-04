///////BUGSSS I FOUND
///////when I press enter atfer I log in and log off user or
///////something like that app dissplay screenwhich it shouldnt at this point need to
///////fullly disadle enter button whic is atually good name for a function disableEnterButton
var widtdrawController = (function () {
  /////empty array to use for comparing stored pin
  var pinCompare = [];
  ///// other amount to withdraw
  var otherAmount = [];
  ///// user index for user array////
  var user = -1;
  //// is a user  selected equivlent to puting a card in cashpoint///
  var selected = false;
  ///calling user by using user variable/////
  var previousBalance = 1000;

  //check if useris loged in
  var isLoged = false;
  /////////////////////////////////////////////////////
  //////data with users
  ///////
  var d = [
    {
      name: "Adrian",
      balance: 400,
      pin: [1, 2, 3, 4],
      transactionsHistory: [],
    },
    {
      name: "Bernadett",
      balance: 800,
      pin: [3, 3, 3, 3],
      transactionsHistory: [],
    },
    {
      name: "John",
      balance: 1500,
      pin: [2, 2, 2, 2],
      transactionsHistory: [],
    },
  ];
  ////////////////MAKE OTHER AMOUNTS POSSIBLE

  ////////////////MAKE TRANSACTIONS OBJECTS WITH DATES

  function Withdrowal(amount, date) {
    this.amount = amount;
    this.date = date;
  }
  var newWithdrowal = function (amount, date) {
    var obj = new Withdrowal(amount, date);
    return obj;
  };

  /////////////////////////////////////////////
  return {
    //push value to variable user (and select an user)
    //which is later used to get user data

    enterOtherAmount: function (number) {
      if (otherAmount.length <= 3) otherAmount.push(number);
      console.log(otherAmount);
    },
    getOtherAmount: function () {
      return otherAmount;
    },
    cancelOtherNumber: function () {
      otherAmount.pop();
      console.log(otherAmount + " am here now");
    },
    initOtherAmount: function () {
      otherAmount = [];
    },

    logInUser: function () {
      isLoged = true;
    },
    logOutUser: function () {
      isLoged = false;
    },
    isUserLoggedIn: function () {
      return isLoged;
    },

    setUserIndex: function (index) {
      if (selected === false) {
        user = index;
        console.log("user is " + index);
        selected = true;
      } else {
      }
    },
    ///clearing array for storing value to compare user pin wit entered pin
    clearPinCompare: function () {
      pinCompare = [];
    },
    ///seting previous balance for string control
    setPreviousBalance: function () {
      previousBalance = 1000;
    },
    ///geting user name
    getUserName: function (index) {
      return d[index].name;
    },
    ///returns index for na array wit data
    getUserIndex: function () {
      return user;
    },
    isSelected: function () {
      return selected;
    },
    unSelect: function () {
      selected = false;
    },
    enterNumber: function (number) {
      pinCompare.push(number);
      console.log(pinCompare);
    },
    cancelNumber: function () {
      pinCompare.pop();

      console.log(pinCompare);
    },
    getPinCompare: function () {
      return pinCompare;
    },

    getUser: function (userIndex) {
      return d[userIndex];
    },
    withTest: function () {
      console.log("with test");
    },
    withdrowMoney: function (amount, userIndex, date) {
      previousBalance = d[userIndex].balance;
      if (d[userIndex].balance >= amount) {
        d[userIndex].balance = d[userIndex].balance - amount;
        console.log(d[userIndex].balance);
        d[userIndex].transactionsHistory.unshift(newWithdrowal(amount, date));
        console.log(d);
        console.log(date + "am here");
      } else {
        console.log("Sorry you dont have enough £££");
      }
    },
    getBalance: function (index) {
      return d[index].balance;
    },
    getPreviousBalance: function () {
      return previousBalance;
    },
    getTransactionHistory: function (index) {
      return d[index].transactionsHistory;
    },
    getOtherAmountNumber: function () {
      var amount = otherAmount;
      amount = amount.join("");
      amount = Number(amount);
      console.log(amount);
      return amount;
    },
  };
})();

var UIController = (function () {
  ////UPDATE UI WITH TRANSACTION DATA

  var DOMStrings = {
    balanceValue: document.querySelector(".balance-value"),
    ejectCard: document.querySelector(".eject-card"),
    screenWelcome: document.querySelector(".screen-welcome"),
    screenWeatherContainer: document.querySelector(".screen-welcome__weather"),
    screenCity: document.querySelector(".screen-welcome__weather-location"),
    screenTemperature: document.querySelector(
      ".screen-welcome__weather-degree"
    ),
    screenError: document.querySelector(".screen-error"),

    screenPin: document.querySelector(".screen-pin"),
    screenEnterPin: document.querySelector(".screen-enter-pin"),
    screenAction: document.querySelector(".screen-actions"),
    screenWithError: document.querySelector(".screen-with-error"),
    screenWithError2: document.querySelector(".screen-with-error-2"),

    screenHistory: document.querySelector(".screen-history"),
    screenHistoryEntries: document.querySelector(".screen-history-entries"),
    // screenHistoryEntry: document.querySelector(".screen-history-entry"),
    screenHistoryBalance: document.querySelector(".screen-history-balance"),
    screenHistoryEntry: document.querySelectorAll(".screen-history-entry"),
    screenProcesing: document.querySelector(".screen-processing"),
    screenSuccessWithAmount: document.querySelector(".succes-with__amount"),
    screenOther: document.querySelector(".screen-other-amount"),
    screeOtherValue: document.querySelector(".screen-other__value"),
    screenOtherConfirm: document.querySelector(".screen-other__confirm"),

    screenGoodbye: document.querySelector(".screen-goodbye"),
    screenWithdrow: document.querySelector(".screen-withdrowal"),
    name: document.querySelector(".name"),

    eject: document.querySelector(".eject"),
    withdrowalValues: {
      _10: document.querySelector("._10"),
      _20: document.querySelector("._20"),
      _50: document.querySelector("._50"),
      _100: document.querySelector("._100"),
      _150: document.querySelector("._150"),
      _Other: document.querySelector("._Other"),
    },
    users: {
      _0: document.querySelector(".user-1"),
      _1: document.querySelector(".user-2"),
      _2: document.querySelector(".user-3"),
    },
    /////GO BACK BUTTONS
    screenGoBack1: document.querySelector(".screen-go-back-1"),
    screenGoBackWithdrowal: document.querySelector(".withdrowalGoBack"),
    screenGoBackOther: document.querySelector(".screen-go-back-2"),
    /////END OF GO BACK BUTTONS
  };
  var counterForIndex = 0;
  var currentSection = DOMStrings.screenWelcome;
  var previousSection;
  ////formating date to be displayed on ui/////
  var formatDate = function (obj) {
    var month, dateToDisplay;
    var hours = obj.getHours();
    var minutes = obj.getMinutes();
    if (obj.getMinutes() < 10) {
      minutes = "0" + obj.getMinutes();
    }
    var year = obj.getFullYear();
    var day = obj.getDate();
    if (obj.getMonth() === 0) {
      month = "January";
    } else if (obj.getMonth() === 1) {
      month = "February";
    } else if (obj.getMonth() === 2) {
      month = "March";
    } else if (obj.getMonth() === 3) {
      month = "April";
    } else if (obj.getMonth() === 4) {
      month = "May";
    } else if (obj.getMonth() === 5) {
      month = "June";
    } else if (obj.getMonth() === 6) {
      month = "July";
    } else if (obj.getMonth() === 7) {
      month = "August";
    } else if (obj.getMonth() === 8) {
      month = "September";
    } else if (obj.getMonth() === 9) {
      month = "October";
    } else if (obj.getMonth() === 10) {
      month = "November";
    } else if (obj.getMonth() === 11) {
      month = "December";
    }

    dateToDisplay =
      day + " " + month + " " + year + " " + hours + ":" + minutes;
    return dateToDisplay;
  };
  return {
    getDOMStrings: function () {
      return DOMStrings;
    },

    ///only shows last 3 entries from transaction history
    displayTransactionHistory: function (arr) {
      if (arr.length > 0) {
        // console.log(obj.amount + " yoyoyo here");
        console.log(arr.length + " this is length when called");
        var html = `<div class="screen-history-entry">
      <div class="screen-history-entry-1__date">22 July1 2021 17:59</div>
      <div class="screen-history-entry-1__amount">£ %20%</div>
  </div>`;
        var newHtml, month;

        for (var i = 0; i < arr.length && i < 3; i++) {
          console.log(arr);
          // console.log("this is " + arr[i]);

          newHtml = html.replace("%20%", arr[i].amount);

          newHtml = newHtml.replace(
            "22 July1 2021 17:59",
            formatDate(arr[i].date)
          );

          console.log(arr[i].date.getDay() + " " + arr[i].date.getMinutes());
          DOMStrings.screenHistoryEntries.insertAdjacentHTML(
            "beforeend",
            newHtml
          );
        }
      }
    },
    ///Similar to updatePinOnUI but shows numbers need to make it one somehow
    /// IDEALLY THIS FUNCTION WOULD ALSO CANCEL NUMBER
    updateOtherAmount: function (arrOtherAmount) {
      ///write here
      // var string = DOMStrings.screeOtherValue.textContent;
      var string = "----";
      var arr = arrOtherAmount;
      console.log(arr + " yoyo");
      var newString;
      newString = string.slice(0, 4 - arr.length);
      var tempString = arr.join("");
      DOMStrings.screeOtherValue.textContent = newString + tempString;
      console.log(newString + tempString);
    },
    initOtherAmount: function () {
      DOMStrings.screeOtherValue.textContent = "----";
    },
    updateUIotherNumber: function () {},
    updatePinOnUI: function (i) {
      //   console.log(number);
      console.log(i);
      var string = DOMStrings.screenPin.textContent;
      var stringArray = [];
      var newString;

      if (i <= 3) {
        for (var j = 0; j < string.length; j++) {
          stringArray.push(string[j]);
        }
        if (stringArray[i] !== "*") {
          stringArray[i] = "*";
        } else {
          stringArray[i] = "-";
        }

        newString =
          stringArray[0] + stringArray[1] + stringArray[2] + stringArray[3];
        console.log(stringArray);
        DOMStrings.screenPin.textContent = newString;
      }
    },
    clearPinEntry: function () {
      DOMStrings.screenPin.textContent = "----";
    },
    selectSectionOnUI: function (currSection, nextSection) {
      currSection.classList.toggle("collapse");
      nextSection.classList.toggle("collapse");
      currentSection = nextSection;
      previousSection = currSection;
    },
    getCurrentSection: function () {
      return currentSection;
    },
    getPreviousSection: function () {
      return previousSection;
    },
    getCounter: function () {
      return counterForIndex;
    },
    updateCounter: function (arr) {
      counterForIndex = arr.length - 1;
      console.log(counterForIndex + " hej");
    },
    test: function () {
      console.log("yo success");
    },
    replaceName: function (name) {
      var string = DOMStrings.name.textContent;
      var newString;
      newString = string.replace("%name%", name);
      DOMStrings.name.textContent = newString;
    },
    replaceStringOnUI: function (valueOrginal, valueNew, el) {
      var string = el.textContent;
      var newString;
      newString = string.replace(valueOrginal, valueNew);
      el.textContent = newString;
    },
    removeHTMLElement: function (nodeList) {
      var arr = Array.from(nodeList);
      console.log(arr);
      console.log(arr.length + "here");
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          arr[i].remove();
          console.log("i worked");
        }
      }
    },
    displaySuccesWithdrowalMsg: function (amount) {
      console.log(currentSection);
      DOMStrings.screenSuccessWithAmount.textContent = amount;
      UIController.selectSectionOnUI(
        currentSection,
        DOMStrings.screenProcesing
      );
    },
  };
})();

var appController = (function (withdrowCtrl, UICtrl) {
  ///Make event listeners on numbers in UI keyboard return actual

  var other = false;

  // var pin = withdrowCtrl.getData();
  var DOM = UICtrl.getDOMStrings();

  var enterPin = function (number) {
    var arr = withdrowCtrl.getPinCompare();
    if (arr.length < 4) {
      //// get number to array
      withdrowCtrl.enterNumber(number);
      /// update counter
      UICtrl.updateCounter(withdrowCtrl.getPinCompare());
      /// compare entered pin with user pin
      UICtrl.updatePinOnUI(UICtrl.getCounter());
    }
    console.log("still workin");
  };
  var cancelNumber = function () {
    withdrowCtrl.cancelNumber();

    UICtrl.updatePinOnUI(UICtrl.getCounter());
    UICtrl.updateCounter(withdrowCtrl.getPinCompare());
    cancelOtherNumber();
  };

  var cancelOtherNumber = function () {
    if (other === true) {
      withdrowCtrl.cancelOtherNumber();
      UICtrl.updateOtherAmount(withdrowCtrl.getOtherAmount());
    }
  };

  var pinComparing = function () {
    if (withdrowCtrl.getUserIndex() >= 0) {
      ////get pin from database

      var pin = withdrowCtrl.getUser(withdrowCtrl.getUserIndex()).pin;
      var pinCompare = withdrowCtrl.getPinCompare();
      if (
        pin[0] === pinCompare[0] &&
        pin[1] === pinCompare[1] &&
        pin[2] === pinCompare[2] &&
        pin[3] === pinCompare[3]
      ) {
        withdrowCtrl.logInUser();
        goTo(DOM.screenAction);
        changeName(withdrowCtrl.getUserIndex(), DOM.name);
      } else {
        return false;
      }
    } else {
      alert("enter card first");
    }
  };

  var withdrowMoney = function (amount, userIndex, date) {
    if (amount % 10 !== 0) {
      UICtrl.selectSectionOnUI(UICtrl.getCurrentSection(), DOM.screenWithError);
      setTimeout(function () {
        UICtrl.selectSectionOnUI(UICtrl.getCurrentSection(), DOM.screenOther);
      }, 3000);
      console.log(UICtrl.getCurrentSection());
    } else if (amount > withdrowCtrl.getBalance(withdrowCtrl.getUserIndex())) {
      UICtrl.selectSectionOnUI(
        UICtrl.getCurrentSection(),
        DOM.screenWithError2
      );
      setTimeout(function () {
        UICtrl.selectSectionOnUI(UICtrl.getCurrentSection(), DOM.screenAction);
      }, 3000);

      console.log("no money");
    } else if (amount > 0) {
      withdrowCtrl.withdrowMoney(amount, userIndex, date);
      updateBalance();
      console.log(withdrowCtrl.getBalance(withdrowCtrl.getUserIndex()));
      updateHistory();
      UICtrl.displaySuccesWithdrowalMsg(amount);
      setTimeout(function () {
        UICtrl.selectSectionOnUI(UICtrl.getCurrentSection(), DOM.screenAction);
      }, 3000);
      // setTimeout(function () {
      //   console.log("time out");
      // }, 2000);
    }
  };

  var changeName = function (index, el) {
    var name = withdrowCtrl.getUser(index).name;
    console.log(name + " am here");
    // UICtrl.replaceName(name);
    UICtrl.replaceStringOnUI("%name%", name, el);
  };
  ////Goes back to previous section
  var goBack = function () {
    UICtrl.selectSectionOnUI(
      UICtrl.getCurrentSection(),
      UICtrl.getPreviousSection()
    );
  };
  var goTo = function (destination) {
    UICtrl.selectSectionOnUI(UICtrl.getCurrentSection(), destination);
  };
  ///End of go back section
  ///update ui with new balance

  var updateBalance = function () {
    UICtrl.replaceStringOnUI(
      withdrowCtrl.getPreviousBalance(),
      withdrowCtrl.getBalance(withdrowCtrl.getUserIndex()),
      DOM.balanceValue
    );
    console.log(
      "this should be " + withdrowCtrl.getBalance(withdrowCtrl.getUserIndex())
    );
  };

  ////end of update ui with balance

  ///enter card
  var enterCard = function (index) {
    if (!withdrowCtrl.isSelected()) {
      withdrowCtrl.setUserIndex(index);
      updateBalance();

      changeName(withdrowCtrl.getUserIndex(), DOM.name);
      changeName(withdrowCtrl.getUserIndex(), DOM.screenGoodbye);
      UICtrl.clearPinEntry();
      withdrowCtrl.clearPinCompare();
      goTo(DOM.screenEnterPin);
      updateHistory();
    } else if (withdrowCtrl.isSelected()) {
      goTo(DOM.screenError);
      console.log("should work");
    }
  };
  /////end of enter card

  ////remove element

  /////eject card

  var ejectCard = function () {
    UICtrl.replaceStringOnUI(
      withdrowCtrl.getUserName(withdrowCtrl.getUserIndex()),
      "%name%",
      DOM.name
    );
    UICtrl.replaceStringOnUI(
      withdrowCtrl.getUserName(withdrowCtrl.getUserIndex()),
      "%name%",
      DOM.screenGoodbye
    );
    //// sets previous balance to 1000 becouse function changeBalance uses 1000 is initial htl value
    withdrowCtrl.setPreviousBalance();
    UICtrl.replaceStringOnUI(
      withdrowCtrl.getBalance(withdrowCtrl.getUserIndex()),
      withdrowCtrl.getPreviousBalance(),
      DOM.balanceValue
    );
    UICtrl.removeHTMLElement(
      document.querySelectorAll(".screen-history-entry")
    );
    withdrowCtrl.logOutUser();
  };

  /////
  var getDate = function () {
    var date = new Date();
    console.log(date + " gere");
    return date;
  };

  var updateHistory = function () {
    var arrLength = withdrowCtrl.getTransactionHistory(
      withdrowCtrl.getUserIndex()
    ).length;
    UICtrl.removeHTMLElement(
      document.querySelectorAll(".screen-history-entry")
    );
    if (arrLength > 0) {
      UICtrl.displayTransactionHistory(
        withdrowCtrl.getTransactionHistory(withdrowCtrl.getUserIndex())
      );
    }
  };

  var enterNumberOtherAmount = function (number) {
    if (other === true) {
      withdrowCtrl.enterOtherAmount(number);
      UICtrl.updateOtherAmount(withdrowCtrl.getOtherAmount());
    }
  };

  var setUpEventListeners = function () {
    ////weather app ES6////

    window.addEventListener("load", () => {
      let long;
      let lat;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          long = position.coords.longitude;
          lat = position.coords.latitude;

          const proxy = "http://cors-anywhere.herokuapp.com/";
          const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5082ab453718dffbf6b935db4ec43500&units=metric`;

          fetch(api)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              DOM.screenCity.textContent = data.name;
              DOM.screenTemperature.textContent =
                parseInt(data.main.temp) + "°";
              DOM.screenWeatherContainer.insertAdjacentHTML(
                "beforeend",
                `<div class="screen-welcome__weather-item screen-welcome__weather-icon">
              <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
          </div>`
              );
            });
        });
      } else {
        /////
        //this is not working//
        ///////
      }
    });

    ////end of weather app////

    document.querySelector(".btn-1").addEventListener("click", function () {
      enterPin(1);
      enterNumberOtherAmount(1);
    });
    document.querySelector(".btn-2").addEventListener("click", function () {
      enterPin(2);
      enterNumberOtherAmount(2);
    });
    document.querySelector(".btn-3").addEventListener("click", function () {
      enterPin(3);
      enterNumberOtherAmount(3);
    });
    document.querySelector(".btn-4").addEventListener("click", function () {
      enterPin(4);
      enterNumberOtherAmount(4);
    });
    document.querySelector(".btn-5").addEventListener("click", function () {
      enterPin(5);
      enterNumberOtherAmount(5);
    });
    document.querySelector(".btn-6").addEventListener("click", function () {
      enterPin(6);
      enterNumberOtherAmount(6);
    });
    document.querySelector(".btn-7").addEventListener("click", function () {
      enterPin(7);
      enterNumberOtherAmount(7);
    });
    document.querySelector(".btn-8").addEventListener("click", function () {
      enterPin(8);
      enterNumberOtherAmount(8);
    });
    document.querySelector(".btn-9").addEventListener("click", function () {
      enterPin(9);
      enterNumberOtherAmount(9);
    });
    document.querySelector(".btn-0").addEventListener("click", function () {
      enterPin(0);
      enterNumberOtherAmount(0);
    });

    document
      .querySelector(".btn-cancel")
      .addEventListener("click", function () {
        cancelNumber();

        // counter--;
        // UICtrl.updatePinOnUI(counter);
      });
    document.querySelector(".btn-enter").addEventListener("click", function () {
      //prevent enter from doing wired stuff
      if (!withdrowCtrl.isUserLoggedIn()) {
        pinComparing();
      }
    });
    document
      .querySelector(".screen-actions-btn-w")
      .addEventListener("click", function () {
        UICtrl.selectSectionOnUI(DOM.screenAction, DOM.screenWithdrow);
      });
    document
      .querySelector(".screen-actions-btn-b")
      .addEventListener("click", function () {
        //getting balancetodisplay it on ui need to make it return balance
        // UICtrl.replaceStringOnUI(
        //   "1000",
        //   withdrowCtrl.getUser(withdrowCtrl.getUserIndex()).balance,
        //   DOM.balanceValue
        // );

        ///////GO TO HISTORY/BALANCE
        UICtrl.selectSectionOnUI(DOM.screenAction, DOM.screenHistory);
      });
    document
      .querySelector(".screen-go-back")
      .addEventListener("click", function () {
        ////WRAP IT IN FUNCTION GOBACK
        goBack();
        /////////////////////////
      });
    ///Eject card button
    DOM.ejectCard.addEventListener("click", function () {
      if (withdrowCtrl.isSelected() === true) {
        goTo(DOM.screenGoodbye);
        setTimeout(function () {
          UICtrl.selectSectionOnUI(
            UICtrl.getCurrentSection(),
            DOM.screenWelcome
          );
          ejectCard();
          withdrowCtrl.unSelect();
        }, 3000);
      }
    });
    ////GO BACK Button on balance section
    DOM.screenGoBack1.addEventListener("click", function () {
      ////WRAP IT IN FUNCTION GOTO
      goTo(DOM.screenAction);
      /////////////////////////
    });

    //Go back other
    DOM.screenGoBackOther.addEventListener("click", function () {
      ////WRAP IT IN FUNCTION GOTO
      goTo(DOM.screenWithdrow);
      UICtrl.initOtherAmount();
      withdrowCtrl.initOtherAmount();
      /////////////////////////
    });
    ////GO BACK BUTTON ON WITHDROWAL
    DOM.screenGoBackWithdrowal.addEventListener("click", function () {
      ////WRAP IT IN FUNCTION GOBACK
      console.log("wtf");
      goTo(DOM.screenAction);

      /////////////////////////
    });
    DOM.withdrowalValues._10.addEventListener("click", function () {
      withdrowMoney(10, withdrowCtrl.getUserIndex(), getDate());
    });
    DOM.withdrowalValues._20.addEventListener("click", function () {
      withdrowMoney(20, withdrowCtrl.getUserIndex(), getDate());
    });
    DOM.withdrowalValues._50.addEventListener("click", function () {
      withdrowMoney(50, withdrowCtrl.getUserIndex(), getDate());
    });
    DOM.withdrowalValues._100.addEventListener("click", function () {
      withdrowMoney(100, withdrowCtrl.getUserIndex(), getDate());
    });
    DOM.withdrowalValues._150.addEventListener("click", function () {
      withdrowMoney(150, withdrowCtrl.getUserIndex(), getDate());
    });
    DOM.withdrowalValues._Other.addEventListener("click", function () {
      goTo(DOM.screenOther);
      other = true;
    });
    ////wrap it up to function
    DOM.users._0.addEventListener("click", function () {
      enterCard(0);
    });
    DOM.users._1.addEventListener("click", function () {
      enterCard(1);
    });
    DOM.users._2.addEventListener("click", function () {
      enterCard(2);
    });
    DOM.eject.addEventListener("click", function () {
      UICtrl.selectSectionOnUI(UICtrl.getCurrentSection(), DOM.screenWelcome);
      ejectCard();
      withdrowCtrl.unSelect();
    });
    DOM.screenOtherConfirm.addEventListener("click", function () {
      withdrowMoney(
        withdrowCtrl.getOtherAmountNumber(),
        withdrowCtrl.getUserIndex(),
        getDate()
      );
      UICtrl.initOtherAmount();
      withdrowCtrl.initOtherAmount();
    });
  };

  /// numbers and get pin from them
  ///compare this pin to userPin
  ///if correct display action page

  ////let user choose diffrent actions
  /// make withrawal possible
  ///update balance and display balance on UI
  ///make proccesing page and goodbye page

  UICtrl.test();
  withdrowCtrl.withTest();
  return {
    init: function () {
      setUpEventListeners();
    },
  };
})(widtdrawController, UIController);

// console.log("ddfdfdf");

appController.init();
