document.addEventListener('DOMContentLoaded', () => {
    // Navigation active state toggling
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Animate circular chart on load to add visual flair
    const circle = document.querySelector('.circle');
    if (circle) {
        // Force reflow before setting final value for CSS transiton
        const finalDashArray = circle.getAttribute('stroke-dasharray');
        circle.setAttribute('stroke-dasharray', '0, 100');
        
        setTimeout(() => {
            circle.setAttribute('stroke-dasharray', finalDashArray);
        }, 150);
    }

    // New message button interaction simulate
    const newMsgBtn = document.getElementById('btn-new-message');
    if (newMsgBtn) {
        newMsgBtn.addEventListener('click', () => {
            // For showcase, a simple alert. Real app would open a modal/dialog.
            alert('Opening new message compose dialog...');
        });
    }

    // Notifications button simulate
    const notifBtn = document.getElementById('btn-notifications');
    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            alert('Displaying latest notifications...');
        });
    }
});
