const userRole = localStorage.getItem("userRole");
const userToken = localStorage.getItem("userToken");
const userID = localStorage.getItem("userID");

if (userRole == "admin") {
  const section = document.querySelector(".section");
  const getUsersButton = document.createElement("button");
  getUsersButton.innerText = "Get All Users";
  getUsersButton.className = "button";
  section.append(getUsersButton);
  getUsersButton.addEventListener("click", (event) => {
    const getAllUsers = async () => {
      const adminResponse = await fetch(
        "http://localhost:8000/api/users/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      document.querySelectorAll(".user__list").forEach((el) => el.remove());
      const adminData = await adminResponse.json();
      const userList = document.createElement("div");
      userList.className = "user__list";
      document.querySelector(".section").append(userList);
      adminData.forEach((el) => {
        if (el.role != "admin") {
          const userCard = document.createElement("div");
          userCard.className = "user__card";
          const userName = document.createElement("div");
          userName.innerText = el.firstname;
          const userEmail = document.createElement("div");
          userEmail.innerText = el.email;
          const userAccounts = document.createElement("div");
          userAccounts.className = "account__info";
          const userId = el._id;
          const removeButton = document.createElement("button");
          removeButton.innerText = "Remove";
          removeButton.className = "remove__button";
          removeButton.addEventListener("click", (event) => {
            const deleteUser = async () => {
              const deleteUserById = await fetch(
                `http://localhost:8000/api/users/${userId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                  },
                }
              );
            };
            deleteUser();
            userCard.remove();
          });
          userCard.append(userName, userEmail, userAccounts, removeButton);
          userList.append(userCard);
        }
      });
    };
    getAllUsers();
  });
} else {
  const section = document.querySelector(".section");
  const showIncome = document.createElement("button");
  showIncome.innerText = "Show Income";
  showIncome.className = "button_income button";
  const showOutcome = document.createElement("button");
  showOutcome.innerText = "Show Outcome";
  showOutcome.className = "button_outcome button";
  const cardHolder = document.createElement("div");
  section.append(showIncome, showOutcome, cardHolder);
  const incomeCatagories = ["1", "2", "3", "4", "5"];
  const outcomeCatagories = ["6", "7", "8", "9", "10"];
  showIncome.addEventListener("click", (event) => {
    document.querySelectorAll(".card").forEach((el) => el.remove());
    const incomeCard = document.createElement("div");
    incomeCard.className = "card";
    const dropdownSelect = document.createElement("select");
    incomeCatagories.forEach((el) => {
      const dropdownOption = document.createElement("option");
      dropdownOption.setAttribute("value", el);
      dropdownOption.innerText = el;
      dropdownSelect.append(dropdownOption);
    });
    const incomeField = document.createElement("input");
    incomeField.placeholder = "Enter Income";
    incomeField.setAttribute("type", "number");
    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.addEventListener("click", (event) => {
      const addIncome = async () => {
        const sendIncome = fetch("http://localhost:8000/api/incomes", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: `${dropdownSelect.value}`,
            amount: `${Math.abs(incomeField.value)}`,
          }),
        });
      };
      addIncome();
      console.log(dropdownSelect.value, incomeField.value);
      alert("Income Added");
      getIncomes();
      incomeField.value = "";
    });
    incomeCard.append(dropdownSelect, incomeField, submitButton);
    const getIncomes = async () => {
      const allIncomes = await fetch(
        `http://localhost:8000/api/incomes/${userID}/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      document.querySelectorAll(".income__info").forEach((el) => el.remove());
      let total = 0;
      const incomeInfo = document.createElement("div");
      incomeInfo.className = "income__info";
      const incomeData = await allIncomes.json();
      incomeObject = {};
      incomeData.data.forEach((el) => {
        if (incomeObject[el.category] == null) {
          incomeObject[el.category] = el.amount;
        } else {
          incomeObject[el.category] += el.amount;
        }
      });
      for (el in incomeObject) {
        const infoLine = document.createElement("div");
        const category = document.createElement("div");
        category.innerText = `${el}:`;
        category.className = "category__info";
        const amount = document.createElement("div");
        total += Math.abs(incomeObject[el]);
        amount.innerText = `+${incomeObject[el]}€`;
        amount.className = "amount__info";
        amount.className += " income";
        infoLine.append(category, amount);
        incomeInfo.append(infoLine);
      }
      const totalIncome = document.createElement("div");
      const totalCategory = document.createElement("div");
      totalCategory.innerText = "Total:";
      const totalValue = document.createElement("div");
      totalValue.innerText = `+${total}€`;
      totalValue.className = "amount__info income";
      totalIncome.append(totalCategory, totalValue);
      incomeInfo.append(totalIncome);
      incomeCard.append(incomeInfo);
    };
    getIncomes();
    cardHolder.append(incomeCard);
  });
  showOutcome.addEventListener("click", (event) => {
    document.querySelectorAll(".card").forEach((el) => el.remove());
    const outcomeCard = document.createElement("div");
    outcomeCard.className = "card";
    const dropdownSelect = document.createElement("select");
    outcomeCatagories.forEach((el) => {
      const dropdownOption = document.createElement("option");
      dropdownOption.setAttribute("value", el);
      dropdownOption.innerText = el;
      dropdownSelect.append(dropdownOption);
    });
    const outcomeField = document.createElement("input");
    outcomeField.placeholder = "Enter Outcome";
    outcomeField.setAttribute("type", "number");
    const submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.addEventListener("click", (event) => {
      const addOutcome = async () => {
        const sendOutcome = fetch("http://localhost:8000/api/outcomes", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: `${dropdownSelect.value}`,
            amount: `${Math.abs(outcomeField.value)}`,
          }),
        });
      };
      addOutcome();
      console.log(dropdownSelect.value, outcomeField.value);
      alert("Outcome Added");
      getOutcomes();
      outcomeField.value = "";
    });
    outcomeCard.append(dropdownSelect, outcomeField, submitButton);
    const getOutcomes = async () => {
      const allOutcomes = await fetch(
        `http://localhost:8000/api/outcomes/${userID}/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      document.querySelectorAll(".outcome__info").forEach((el) => el.remove());
      let total = 0;
      const outcomeInfo = document.createElement("div");
      outcomeInfo.className = "outcome__info";
      const outcomeData = await allOutcomes.json();
      outcomeObject = {};
      outcomeData.data.forEach((el) => {
        if (outcomeObject[el.category] == null) {
          outcomeObject[el.category] = el.amount;
        } else {
          outcomeObject[el.category] += el.amount;
        }
      });
      for (el in outcomeObject) {
        const infoLine = document.createElement("div");
        const category = document.createElement("div");
        category.innerText = `${el}:`;
        category.className = "category__info";
        const amount = document.createElement("div");
        total += Math.abs(outcomeObject[el]);
        amount.innerText = `-${outcomeObject[el]}€`;
        amount.className = "amount__info";
        amount.className += " outcome";
        infoLine.append(category, amount);
        outcomeInfo.append(infoLine);
      }
      const totalOutcome = document.createElement("div");
      const totalCategory = document.createElement("div");
      totalCategory.innerText = "Total:";
      const totalValue = document.createElement("div");
      totalValue.innerText = `-${total}€`;
      totalValue.className = "amount__info outcome";
      totalOutcome.append(totalCategory, totalValue);
      outcomeInfo.append(totalOutcome);
      outcomeCard.append(outcomeInfo);
    };
    getOutcomes();
    cardHolder.append(outcomeCard);
  });
}
