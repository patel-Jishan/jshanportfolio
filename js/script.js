// pointer
$(window).mousemove(function (e) {
	$(".ring").css(
		"transform",
		`translateX(calc(${e.clientX}px - 1.25rem)) translateY(calc(${e.clientY}px - 1.25rem))`
	);
});


document.addEventListener('DOMContentLoaded', function() {
            // Theme toggle functionality
            const themeToggle = document.getElementById('theme-toggle');
            const themeIcon = document.getElementById('theme-icon');
            const body = document.body;
            
            // Check for saved theme preference or use default
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                body.className = savedTheme;
                updateThemeIcon(savedTheme === 'light-mode');
            }
            
            themeToggle.addEventListener('click', function() {
                const isLightMode = body.classList.contains('light-mode');
                body.className = isLightMode ? 'dark-mode' : 'light-mode';
                localStorage.setItem('theme', body.className);
                updateThemeIcon(!isLightMode);
            });
            
            function updateThemeIcon(isLightMode) {
                themeIcon.className = isLightMode ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Account for fixed navbar height
                        const offsetTop = targetElement.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu after clicking (Bootstrap handles this automatically)
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse.classList.contains('show')) {
                            bootstrap.Collapse.getInstance(navbarCollapse).hide();
                        }
                    }
                });
            });
            
            // Form validation
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Basic validation
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const subject = document.getElementById('subject').value;
                    const message = document.getElementById('message').value;
                    
                    if (!name || !email || !subject || !message) {
                        alert('Please fill in all fields.');
                        return;
                    }
                    
                    if (!isValidEmail(email)) {
                        alert('Please enter a valid email address.');
                        return;
                    }
                    
                    // Show success message (in a real app, this would send data to server)
                    alert('Thank you for your message! This is a prototype, so no data was sent.');
                    contactForm.reset();
                });
            }
            
            function isValidEmail(email) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            }
            
            // Resume link handling
            document.getElementById('resume-link').addEventListener('click', function(e) {
                e.preventDefault();
                alert('This is a prototype. In a real app, this would download a resume PDF.');
            });
            
            // Three.js background
            initThreeBackground();
            
            // Add scroll reveal animations
            window.addEventListener('scroll', revealElements);
            revealElements();
            
            // Navbar background on scroll
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.style.backgroundColor = 'rgba(5, 10, 20, 0.95)';
                } else {
                    navbar.style.backgroundColor = 'rgba(5, 10, 20, 0.9)';
                }
            });
        });
        
        function initThreeBackground() {
            const canvas = document.getElementById('background-canvas');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Create grid
            const size = 50;
            const divisions = 50;
            const gridHelper = new THREE.GridHelper(size, divisions, 0x00ffff, 0x00ffff);
            scene.add(gridHelper);
            
            // Particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 2000;
            
            const posArray = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 50;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.1,
                color: 0x00ffff
            });
            
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            // Camera position
            camera.position.z = 30;
            camera.position.y = 5;
            camera.rotation.x = -Math.PI / 16;
            
            // Animation
            function animate() {
                requestAnimationFrame(animate);
                
                gridHelper.position.z += 0.05;
                if (gridHelper.position.z > 1) {
                    gridHelper.position.z = 0;
                }
                
                particlesMesh.rotation.y += 0.001;
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Handle resize
            window.addEventListener('resize', function() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
        
        function revealElements() {
            const revealElements = document.querySelectorAll('.project-card, .skill-bar, h2, h3');
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                // Element is in viewport
                if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                    element.classList.add('opacity-100');
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                } else {
                    if (!element.classList.contains('opacity-100')) {
                        element.style.transform = 'translateY(20px)';
                        element.style.opacity = '0';
                    }
                }
            });
        }


      
