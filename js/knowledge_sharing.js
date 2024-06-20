document.addEventListener('DOMContentLoaded', function () {
    fetch('./data/knowledge_sharing.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            const template = document.getElementById('data-template');

            data.forEach(item => {
                const clone = document.importNode(template.content, true);

                // Set background image
                clone.querySelector('.background-image img').src = `images/${item.image}`;
                // Set name
                clone.querySelector('.topic-name').textContent = item.name;
                // Set fields
                clone.querySelector('.fields').textContent = item.field.join(', ');

                container.appendChild(clone);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});


