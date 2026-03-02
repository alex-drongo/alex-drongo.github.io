/* ============================================
   Interactive Landing Page — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTerminal();
    initTypingRole();
    initCountUp();
    initParticles();
    initScrollAnimations();
    initMobileNav();
});

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });

                // Close mobile nav
                document.getElementById('navLinks').classList.remove('active');
            }
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   MOBILE NAVIGATION
   ============================================ */
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !links.contains(e.target)) {
            links.classList.remove('active');
        }
    });
}

/* ============================================
   TYPING ROLE ANIMATION
   ============================================ */
function initTypingRole() {
    const roles = [
        'Senior DevOps Engineer',
        'Site Reliability Engineer',
        'Cloud Infrastructure Architect',
        'Kubernetes Expert',
        'Terraform Specialist',
        'AWS Certified Professional'
    ];

    const element = document.getElementById('heroRole');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

/* ============================================
   TERMINAL ANIMATION
   ============================================ */
function initTerminal() {
    const terminalText = document.getElementById('terminalText');
    const terminalOutput = document.getElementById('terminalOutput');

    const commands = [
        {
            command: 'cat devops-profile.yaml',
            output: [
                { text: '---', class: 'comment' },
                { text: 'apiVersion: career/v1', class: 'key' },
                { text: 'kind: DevOpsEngineer', class: 'key' },
                { text: 'metadata:', class: 'key' },
                { text: '  name: Alexey Ponomarev', class: 'value' },
                { text: '  location: Bishkek, KG', class: 'value' },
                { text: '  experience: "16+ years"', class: 'value' },
                { text: 'spec:', class: 'key' },
                { text: '  cloud: [AWS, GCP, Azure]', class: 'value' },
                { text: '  iac: [Terraform, CloudFormation]', class: 'value' },
                { text: '  containers: [K8s, Docker, EKS]', class: 'value' },
                { text: '  cicd: [GitHub Actions, GitLab CI]', class: 'value' },
                { text: '  monitoring: [Prometheus, Grafana]', class: 'value' },
                { text: '  status: Available ✓', class: 'success' },
            ]
        },
        {
            command: 'kubectl get certifications',
            output: [
                { text: 'NAME                           LEVEL         STATUS', class: 'key' },
                { text: 'aws-devops-engineer            Professional  Active ✓', class: 'success' },
                { text: 'aws-solutions-architect        Professional  Active ✓', class: 'success' },
                { text: 'aws-advanced-networking         Specialty     Active ✓', class: 'success' },
            ]
        },
        {
            command: 'terraform plan -out=career.tfplan',
            output: [
                { text: '# Planning career infrastructure...', class: 'comment' },
                { text: '', class: '' },
                { text: '+ aws_eks_cluster.production', class: 'success' },
                { text: '+ aws_vpc.multi_az_ha', class: 'success' },
                { text: '+ helm_release.prometheus_stack', class: 'success' },
                { text: '+ github_actions_workflow.cicd', class: 'success' },
                { text: '', class: '' },
                { text: 'Plan: 4 to add, 0 to change, 0 to destroy.', class: 'value' },
                { text: '✓ Ready to apply!', class: 'success' },
            ]
        }
    ];

    let currentCommand = 0;

    function typeCommand(cmd, callback) {
        let i = 0;
        terminalText.textContent = '';
        terminalOutput.innerHTML = '';

        function typeChar() {
            if (i < cmd.command.length) {
                terminalText.textContent += cmd.command[i];
                i++;
                setTimeout(typeChar, 30 + Math.random() * 40);
            } else {
                setTimeout(() => showOutput(cmd.output, callback), 400);
            }
        }

        typeChar();
    }

    function showOutput(lines, callback) {
        let i = 0;

        function showLine() {
            if (i < lines.length) {
                const line = document.createElement('div');
                line.className = `terminal-output-line ${lines[i].class}`;
                line.textContent = lines[i].text;
                line.style.animationDelay = `${i * 0.05}s`;
                terminalOutput.appendChild(line);
                i++;
                setTimeout(showLine, 60);
            } else {
                setTimeout(callback, 3000);
            }
        }

        showLine();
    }

    function runNextCommand() {
        typeCommand(commands[currentCommand], () => {
            currentCommand = (currentCommand + 1) % commands.length;
            runNextCommand();
        });
    }

    setTimeout(runNextCommand, 1500);
}

/* ============================================
   COUNT UP ANIMATION
   ============================================ */
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    function countUp() {
        if (counted) return;

        const heroSection = document.querySelector('.hero-stats');
        if (!heroSection) return;

        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counted = true;

            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);

                    num.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        num.textContent = target;
                    }
                }

                requestAnimationFrame(update);
            });
        }
    }

    window.addEventListener('scroll', countUp);
    countUp(); // Check on load
}

/* ============================================
   FLOATING PARTICLES
   ============================================ */
function initParticles() {
    const container = document.getElementById('heroParticles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 6}s`;

        const size = 1 + Math.random() * 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random colors
        const colors = [
            'var(--accent-primary)',
            'var(--accent-secondary)',
            'var(--accent-blue)',
            'rgba(255, 255, 255, 0.3)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for items
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(item => {
        observer.observe(item);
    });

    // Observe about cards
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-card').forEach(card => {
        aboutObserver.observe(card);
    });

    // Cert cards
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease ${index * 0.15}s both`;
            }
        });
    }, observerOptions);

    document.querySelectorAll('.cert-card').forEach(card => {
        certObserver.observe(card);
    });

    // Contact cards
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
            }
        });
    }, observerOptions);

    document.querySelectorAll('.contact-card').forEach(card => {
        contactObserver.observe(card);
    });
}
