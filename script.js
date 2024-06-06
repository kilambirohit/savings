document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    updateTotalAmount();
});

function addEntry() {
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (!date) {
        alert('Please select a date.');
        return;
    }

    const entry = {
        amount: amount.toFixed(2),
        category,
        date,
        notes
    };

    saveEntry(entry);
    displayEntry(entry);
    updateTotalAmount();

    clearForm();
}

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(entry => displayEntry(entry));
}

function displayEntry(entry) {
    const entryList = document.getElementById('entryList');
    const entryItem = document.createElement('li');

    entryItem.innerHTML = `
        <div class="details">
            <span class="amount">₹${entry.amount}</span> - 
            <span class="category">${entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}</span> - 
            <span class="date">${new Date(entry.date).toLocaleDateString()}</span>
            ${entry.notes ? `<div class="notes">${entry.notes}</div>` : ''}
        </div>
        <button onclick="removeEntry(this, ${entry.amount})">Remove</button>
    `;
    entryList.appendChild(entryItem);
}

function removeEntry(button, amount) {
    const entryItem = button.parentElement;
    entryItem.remove();
    deleteEntry(entryItem);
    updateTotalAmount();
}

function deleteEntry(entryItem) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    const amount = entryItem.querySelector('.amount').textContent.replace('₹', '');
    const date = new Date(entryItem.querySelector('.date').textContent).toISOString().split('T')[0];

    entries = entries.filter(entry => !(entry.amount === amount && entry.date === date));
    localStorage.setItem('entries', JSON.stringify(entries));
}

function updateTotalAmount() {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    const totalAmount = entries.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);
    const totalAmountElement = document.getElementById('totalAmount');
    totalAmountElement.innerText = totalAmount.toFixed(2);
}

function clearForm() {
    document.getElementById('amount').value = '';
    document.getElementById('category').value = 'savings';
    document.getElementById('date').value = '';
    document.getElementById('notes').value = '';
}
