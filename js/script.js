document.addEventListener('DOMContentLoaded', () => {
    let catalogItems = []; // Initialize an empty array

// Fetch the JSON file from the specified path
    fetch('/data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
        })
        .then(data => {
            catalogItems = data; // Assign the parsed data to catalogItems
            console.log('Catalog Items:', catalogItems); // Log to verify
            // You can now use catalogItems for rendering or other purposes
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    const catalogContainer = document.querySelector('.catalog-items');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderCatalogItems(items) {
        catalogContainer.innerHTML = '';
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('catalog-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
            `;
            catalogContainer.appendChild(itemElement);
        });
    }

    function filterItems(category) {
        if (category === 'all') {
            renderCatalogItems(catalogItems);
        } else {
            const filteredItems = catalogItems.filter(item => item.category === category);
            renderCatalogItems(filteredItems);
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-filter');
            filterItems(category);
        });
    });

    // Initial render
    renderCatalogItems(catalogItems);
});