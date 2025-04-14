document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const itemsTable = document.getElementById('invoiceItems');
    const addItemBtn = document.getElementById('addItemBtn');
    const printBtn = document.getElementById('printBtn');
    const pdfBtn = document.getElementById('pdfBtn');
    const taxRateInput = document.getElementById('taxRate');
    const invoiceDate = document.getElementById('invoiceDate');
    const invoiceNumber = document.getElementById('invoiceNumber');

    // Set default date and random invoice number
    invoiceDate.valueAsDate = new Date();
    invoiceNumber.value = 'INV-' + Math.floor(Math.random() * 10000);

    // Add first item row
    addItemRow();

    // Event Listeners
    addItemBtn.addEventListener('click', addItemRow);
    printBtn.addEventListener('click', printInvoice);
    pdfBtn.addEventListener('click', generatePDF);
    taxRateInput.addEventListener('input', calculateTotals);
    document.addEventListener('input', calculateTotals);

    // Functions
    function addItemRow() {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" class="form-control item-desc" placeholder="Service/Item description" required></td>
            <td><input type="number" class="form-control item-qty" value="1" min="1"></td>
            <td><input type="number" class="form-control item-price" placeholder="0.00" step="0.01" min="0"></td>
            <td class="item-total">$0.00</td>
            <td class="text-center"><button type="button" class="btn btn-sm btn-danger remove-item"><i class="fas fa-trash"></i></button></td>
        `;
        itemsTable.appendChild(row);

        // Add remove event
        row.querySelector('.remove-item').addEventListener('click', function() {
            row.remove();
            calculateTotals();
        });
    }

    function calculateTotals() {
        let subtotal = 0;
        const rows = document.querySelectorAll('#invoiceItems tr');

        // Calculate line items
        rows.forEach(row => {
            const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            const total = qty * price;
            row.querySelector('.item-total').textContent = formatCurrency(total);
            subtotal += total;
        });

        // Calculate tax and total
        const taxRate = parseFloat(taxRateInput.value) || 0;
        const taxAmount = subtotal * (taxRate / 100);
        const total = subtotal + taxAmount;

        // Update UI
        document.getElementById('subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('taxAmount').textContent = formatCurrency(taxAmount);
        document.getElementById('totalAmount').textContent = formatCurrency(total);
    }

    function formatCurrency(amount) {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function printInvoice() {
        window.print();
    }

    function generatePDF() {
        const element = document.getElementById('invoiceForm');
        const opt = {
            margin: 10,
            filename: `invoice_${invoiceNumber.value}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    }
});