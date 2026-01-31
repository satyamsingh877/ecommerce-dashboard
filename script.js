// Sample data for orders
const orders = [
    { id: "#ORD-001", customer: "John Smith", date: "2024-01-15", amount: "$249.99", status: "delivered" },
    { id: "#ORD-002", customer: "Emma Johnson", date: "2024-01-14", amount: "$129.50", status: "pending" },
    { id: "#ORD-003", customer: "Michael Brown", date: "2024-01-14", amount: "$89.99", status: "processing" },
    { id: "#ORD-004", customer: "Sarah Davis", date: "2024-01-13", amount: "$459.00", status: "delivered" },
    { id: "#ORD-005", customer: "Robert Wilson", date: "2024-01-12", amount: "$199.99", status: "delivered" },
    { id: "#ORD-006", customer: "Lisa Anderson", date: "2024-01-11", amount: "$79.99", status: "pending" }
];

// Sample data for products
const products = [
    { name: "Wireless Headphones", category: "Electronics", sales: 234, icon: "fas fa-headphones" },
    { name: "Running Shoes", category: "Sports", sales: 189, icon: "fas fa-shoe-prints" },
    { name: "Smart Watch", category: "Electronics", sales: 156, icon: "fas fa-clock" },
    { name: "Coffee Maker", category: "Home", sales: 142, icon: "fas fa-coffee" },
    { name: "Backpack", category: "Fashion", sales: 128, icon: "fas fa-briefcase" }
];

// Populate orders table
function populateOrdersTable() {
    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.date}</td>
            <td><strong>${order.amount}</strong></td>
            <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Populate products list
function populateProductsList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'product-item';
        li.innerHTML = `
            <div class="product-image">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.category}</p>
            </div>
            <div class="product-sales">
                ${product.sales} sold
            </div>
        `;
        productList.appendChild(li);
    });
}

// Update stats with animation
function updateStats() {
    const stats = {
        orders: 1254,
        revenue: 24580,
        customers: 3847,
        products: 458
    };
    
    // Animate counting effect
    Object.keys(stats).forEach(stat => {
        const element = document.getElementById(`total-${stat}`);
        if (element) {
            const target = stats[stat];
            const current = parseInt(element.textContent.replace(/[^0-9]/g, '') || '0');
            const increment = target > current ? 1 : -1;
            
            let timer = setInterval(() => {
                current += increment;
                element.textContent = stat === 'revenue' ? `$${current.toLocaleString()}` : current.toLocaleString();
                
                if (current === target) {
                    clearInterval(timer);
                }
            }, 10);
        }
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    populateOrdersTable();
    populateProductsList();
    
    // Simulate loading data
    setTimeout(updateStats, 500);
    
    // Add search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Filter orders
        const filteredOrders = orders.filter(order => 
            order.customer.toLowerCase().includes(searchTerm) || 
            order.id.toLowerCase().includes(searchTerm)
        );
        
        // Update table with filtered orders
        const tbody = document.getElementById('orders-table-body');
        tbody.innerHTML = '';
        
        filteredOrders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td><strong>${order.amount}</strong></td>
                <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            `;
            tbody.appendChild(row);
        });
        
        // If no results found
        if (filteredOrders.length === 0 && searchTerm) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 30px;">
                        No orders found for "${searchTerm}"
                    </td>
                </tr>
            `;
        }
    });
    
    // Add click event to sidebar links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you would load different content here
            const pageName = this.textContent.trim();
            document.querySelector('.header h1').textContent = `${pageName} Overview`;
        });
    });
    
    // Add hover effect to user profile
    const userProfile = document.querySelector('.user-profile');
    userProfile.addEventListener('click', function() {
        alert('User profile clicked! In a real application, this would open user settings.');
    });
});
