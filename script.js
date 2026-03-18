// State Management Object
const AppState = {
    expenses: [],
    total: 0,

    addExpense(item) {
        this.expenses.push(item);
        this.total += item.amount;
        this.updateUI();
    },

    removeExpense(id, amount) {
        this.expenses = this.expenses.filter(e => e.id !== id);
        this.total -= amount;
        this.updateUI();
    },

    updateUI() {
        renderTable();
        document.getElementById('total-amount').textContent = `₹${this.total.toLocaleString()}`;
    }
};

// Form Logic
document.getElementById('add-btn').addEventListener('click', () => {
    const category = document.getElementById('category-select').value;
    const amount = parseFloat(document.getElementById('amount-input').value);
    const date = document.getElementById('date-input').value;

    if (!category || !amount || !date) {
        alert("⚠️ Please fill in all fields correctly.");
        return;
    }

    const newEntry = {
        id: Date.now(), // Unique ID for deleting
        category,
        amount,
        date
    };

    AppState.addExpense(newEntry);
    resetForm();
});

// Render Function
function renderTable() {
    const tbody = document.getElementById('expense-table-body');
    tbody.innerHTML = ''; // Clear current table

    AppState.expenses.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${item.category}</strong></td>
            <td>₹${item.amount.toLocaleString()}</td>
            <td style="color: #64748b">${item.date}</td>
            <td style="text-align: center;">
                <button class="delete-btn" onclick="AppState.removeExpense(${item.id}, ${item.amount})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function resetForm() {
    document.getElementById('amount-input').value = '';
    document.getElementById('date-input').value = '';
}