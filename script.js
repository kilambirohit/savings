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
        id: Date.now(),
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
    entryItem.dataset.id = entry.id;

    entryItem.innerHTML = `
        <div class="details">
            <span class="amount">₹${entry.amount}</span> - 
            <span class="category">${entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}</span> - 
            <span class="date">${new Date(entry.date).toLocaleDateString()}</span>
            ${entry.notes ? `<div class="notes">${entry.notes}</div>` : ''}
        </div>
        <button onclick="removeEntry(${entry.id})">Remove</button>
    `;
    entryList.appendChild(entryItem);
}

function removeEntry(id) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem('entries', JSON.stringify(entries));
    document.querySelector(`li[data-id='${id}']`).remove();
    updateTotalAmount();
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
