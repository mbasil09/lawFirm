// Disclaimer overlay logic
function acceptDisclaimer() {
    localStorage.setItem('disclaimerAccepted', 'true');
    document.getElementById('disclaimerOverlay').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');
    if (disclaimerAccepted === 'true') {
        const overlay = document.getElementById('disclaimerOverlay');
        if (overlay) overlay.classList.add('hidden');
    }

    // Hover text logic for practice areas (if present)
    const hoverItems = document.querySelectorAll('.hover-text-list li');
    const hoverTextContainer = document.getElementById('hover-text');
    function setDefaultHoverText() {
        hoverTextContainer.innerHTML = '<span>Our Practice</span>';
    }
    if (hoverItems.length) {
        setDefaultHoverText();
        hoverItems.forEach(item => {
            item.addEventListener('mouseover', function() {
                const listItem = document.createElement('ul');
                const items = this.getAttribute('data-text').split(',');
                items.forEach(text => {
                    const listElement = document.createElement('li');
                    listElement.textContent = text;
                    listItem.appendChild(listElement);
                });
                hoverTextContainer.innerHTML = '';
                hoverTextContainer.appendChild(listItem);
            });
            item.addEventListener('mouseleave', function() {
                setDefaultHoverText();
            });
        });
    }
}); 