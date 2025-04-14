document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to sections when they come into view
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('fade-in');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Placeholder for visitor counter (replace with actual implementation)
    // This is just for demonstration - GitHub Pages doesn't support server-side code
    function updateVisitorCounter() {
        // In a real implementation, you would use a service like 
        // Firebase or a simple API to track and display visitor counts
        const counterElement = document.getElementById('visitor-counter');
        if (counterElement) {
            // Get from localStorage or use a random number for demo
            let count = localStorage.getItem('visitorCount') || 1000;
            count = parseInt(count) + Math.floor(Math.random() * 5) + 1;
            localStorage.setItem('visitorCount', count);
            counterElement.textContent = `Visitors: ${count.toLocaleString()}`;
        }
    }
    
    updateVisitorCounter();
});