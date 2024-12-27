   // Selectors
   const dashboard = document.getElementById("dashboard");
   const addMoneySection = document.getElementById("add-money");
   const withdrawMoneySection = document.getElementById("withdraw-money");
   const transactionHistorySection = document.getElementById("transaction-history");
   const balanceDisplay = document.getElementById("balance");
   const transactionList = document.getElementById("transaction-list");

   let balance = 0;
   const transactions = [];

   // Event Handlers
   document.getElementById("add-money-btn").addEventListener("click", () => showSection(addMoneySection));
   document.getElementById("withdraw-money-btn").addEventListener("click", () => showSection(withdrawMoneySection));
   document.getElementById("transaction-history-btn").addEventListener("click", () => {
     updateTransactionHistory();
     showSection(transactionHistorySection);
   });

   document.getElementById("confirm-add-money-btn").addEventListener("click", () => {
     const amount = parseFloat(document.getElementById("add-money-input").value);
     if (amount > 0) {
       balance += amount;
       logTransaction("Add", amount);
       updateBalance();
       showSection(dashboard);
     } else {
       alert("Invalid input! Please enter a positive amount.");
     }
   });

   document.getElementById("confirm-withdraw-money-btn").addEventListener("click", () => {
     const amount = parseFloat(document.getElementById("withdraw-money-input").value);
     if (amount > 0 && amount <= balance) {
       balance -= amount;
       logTransaction("Withdraw", amount);
       updateBalance();
       showSection(dashboard);
     } else {
       alert("Invalid input or insufficient balance.");
     }
   });

   document.querySelectorAll("#cancel-add-btn, #cancel-withdraw-btn, #back-btn").forEach(btn =>
     btn.addEventListener("click", () => showSection(dashboard))
   );

   // Helper Functions
   function showSection(section) {
     [dashboard, addMoneySection, withdrawMoneySection, transactionHistorySection].forEach(sec =>
       sec.classList.add("hidden")
     );
     section.classList.remove("hidden");
   }

   function updateBalance() {
     balanceDisplay.textContent = `$${balance.toFixed(2)}`;
   }

   function logTransaction(type, amount) {
     transactions.push({
       date: new Date().toLocaleString(),
       type,
       amount,
       balance,
     });
   }

   function updateTransactionHistory() {
     transactionList.innerHTML = transactions
       .map(
         transaction => `
           <tr>
             <td class="border border-gray-300 py-2 px-4">${transaction.date}</td>
             <td class="border border-gray-300 py-2 px-4">${transaction.type}</td>
             <td class="border border-gray-300 py-2 px-4">$${transaction.amount.toFixed(2)}</td>
             <td class="border border-gray-300 py-2 px-4">$${transaction.balance.toFixed(2)}</td>
           </tr>
         `
       )
       .join("");
   }