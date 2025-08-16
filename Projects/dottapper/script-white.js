// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing White App...');
    initializeWhiteApp();
});

function initializeWhiteApp() {
    console.log('Setting up all features...');
    
    // Core functionality
    initNavigation();
    initSmoothScroll();
    initWorkInteractions();
    initScrollEffects();
    initParallaxEffect();
    initTypewriterEffect();
    initEnhancedInteractions();
    
    // Visual effects
    initASCIIAnimations();
    initPixelParticles();
    initAdvancedPixelEffects();
    initTerminalEffects();
    initAdvancedLoadingEffects();
    
    console.log('All features initialized');
}

// ===== NAVIGATION =====
function initNavigation() {
    console.log('Initializing navigation...');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Map nav links to sections
    const sectionMap = {
        'WORK': '#work',
        'SERVICES': '#about',
        'INFO': '#about',
        'SHOP': '#work',
        'CONTACT': '#about'
    };
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', this.textContent);
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const linkText = this.textContent.trim();
            const targetId = sectionMap[linkText] || '#home';
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav on scroll
    initScrollSpy();
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Reverse section map
    const navMap = {
        'home': 'WORK',
        'work': 'WORK', 
        'about': 'INFO'
    };
    
    let ticking = false;
    
    function updateActiveNav() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollPosition = window.scrollY + 150;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        const targetNavText = navMap[sectionId];
                        
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.textContent.trim() === targetNavText) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    console.log('Initializing smooth scroll...');
    
    // EXPLORE button functionality
    const exploreBtn = document.querySelector('.cta-button');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('EXPLORE button clicked');
            
            // Terminal effect
            this.textContent = 'EXECUTING...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.textContent = 'COMPLETE ✓';
                
                setTimeout(() => {
                    this.textContent = 'EXPLORE';
                    this.style.pointerEvents = 'auto';
                    
                    // Scroll to work section
                    const workSection = document.querySelector('#work');
                    if (workSection) {
                        workSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 500);
            }, 800);
        });
    }
    
    // Smooth scroll for all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== ASCII ANIMATIONS =====
function initASCIIAnimations() {
    console.log('Initializing ASCII animations...');
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#ascii-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'ascii-animation-styles';
        style.textContent = `
            @keyframes asciiFloat {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                }
                50% {
                    transform: translateY(-10px) rotate(1deg);
                }
            }
            
            @keyframes asciiPulse {
                0%, 100% {
                    opacity: 0.3;
                }
                50% {
                    opacity: 0.6;
                }
            }
            
            .ascii-cluster {
                animation: asciiFloat 8s infinite ease-in-out;
            }
            
            .ascii-object {
                animation: asciiPulse 6s infinite ease-in-out;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Apply animations to ASCII elements
    const asciiClusters = document.querySelectorAll('.ascii-cluster');
    const asciiObjects = document.querySelectorAll('.ascii-object');
    
    console.log('Found ASCII clusters:', asciiClusters.length);
    console.log('Found ASCII objects:', asciiObjects.length);
    
    asciiClusters.forEach((cluster, index) => {
        cluster.style.animationDelay = `${index * 0.5}s`;
    });
    
    asciiObjects.forEach((object, index) => {
        object.style.animationDelay = `${index * 0.3}s`;
    });
}

function animateASCIICluster(cluster) {
    const originalOpacity = cluster.style.opacity || '0.3';
    
    cluster.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cluster.style.opacity = '0.6';
    cluster.style.transform = 'translateY(-5px)';
    
    setTimeout(() => {
        cluster.style.opacity = originalOpacity;
        cluster.style.transform = 'translateY(0)';
    }, 1000);
}

function animateASCIIObject(object) {
    const originalTransform = object.style.transform || '';
    
    object.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    object.style.transform = originalTransform + ' scale(1.1) rotate(2deg)';
    object.style.opacity = '0.8';
    
    setTimeout(() => {
        object.style.transform = originalTransform;
        object.style.opacity = '0.4';
    }, 1500);
}

function animateHeroASCII() {
    const heroASCII = document.querySelector('.hero-ascii-art');
    if (!heroASCII) return;
    
    let isAnimating = false;
    
    setInterval(() => {
        if (!isAnimating) {
            isAnimating = true;
            
            heroASCII.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            heroASCII.style.opacity = '0.4';
            heroASCII.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
                heroASCII.style.opacity = '0.8';
                heroASCII.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }, 300);
        }
    }, 8000);
}

// ===== WORK INTERACTIONS =====
function initWorkInteractions() {
    console.log('Initializing work interactions...');
    const workItems = document.querySelectorAll('.work-item');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    
    console.log('Found work items:', workItems.length);
    console.log('Found view project buttons:', viewProjectBtns.length);
    
    workItems.forEach(item => {
        const workImage = item.querySelector('.work-image img');
        const asciiSmall = item.querySelector('.work-ascii-small');
        
        item.addEventListener('mouseenter', function() {
            // Animate ASCII when hovering
            if (asciiSmall) {
                asciiSmall.style.transition = 'all 0.3s ease';
                asciiSmall.style.opacity = '1';
                asciiSmall.style.transform = 'scale(1.2) rotate(5deg)';
            }
            
            // Add subtle animation to the entire item
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            if (asciiSmall) {
                asciiSmall.style.opacity = '0.7';
                asciiSmall.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add click handler for entire work item
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on the button specifically
            if (!e.target.closest('.view-project-btn')) {
                const workData = this.getAttribute('data-work');
                console.log('Work item clicked:', workData);
                showEnhancedModal(workData, this);
            }
        });
    });
    
    // Add click handlers for view project buttons
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const workItem = this.closest('.work-item');
            const workData = workItem.getAttribute('data-work');
            console.log('View project button clicked:', workData);
            showEnhancedModal(workData, workItem);
        });
    });
    
    // Initialize enhanced modal system
    initEnhancedModal();
}

// ===== ENHANCED MODAL SYSTEM =====
function initEnhancedModal() {
    console.log('Initializing enhanced modal...');
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!modal) {
        console.error('Modal element not found!');
        return;
    }
    
    const footerCloseBtn = modal.querySelector('.footer-btn.secondary');
    
    // Close modal handlers
    function closeModal() {
        console.log('Closing modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (footerCloseBtn) {
        footerCloseBtn.addEventListener('click', closeModal);
    }
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Tab navigation
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(tab => tab.classList.remove('active'));
            const targetTabElement = document.getElementById(targetTab + '-tab');
            if (targetTabElement) {
                targetTabElement.classList.add('active');
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Tab') {
            const activeIndex = Array.from(navItems).findIndex(item => item.classList.contains('active'));
            let nextIndex;
            
            if (e.shiftKey) {
                nextIndex = activeIndex > 0 ? activeIndex - 1 : navItems.length - 1;
            } else {
                nextIndex = activeIndex < navItems.length - 1 ? activeIndex + 1 : 0;
            }
            
            e.preventDefault();
            navItems[nextIndex].click();
        }
    });
}

function showEnhancedModal(workType, workItem) {
    console.log('Showing modal for:', workType);
    const modal = document.getElementById('project-modal');
    
    if (!modal) {
        console.error('Modal element not found!');
        return;
    }
    
    // Add terminal loading effect
    showTerminalMessage('LOADING_PROJECT_DATA...');
    
    setTimeout(() => {
        // Get project data from work item
        const projectId = workItem.querySelector('.project-id')?.textContent || '[001]';
        const projectStatus = workItem.querySelector('.project-status')?.textContent || 'ACTIVE';
        const projectTitle = workItem.querySelector('.work-title')?.textContent || 'Project Title';
        const projectDescription = workItem.querySelector('.work-description')?.textContent || 'Project description';
        const projectImage = workItem.querySelector('.work-image img');
        
        console.log('Project data:', { projectId, projectStatus, projectTitle, projectDescription });
        
        // Update modal content
        const modalProjectId = document.getElementById('modal-project-id');
        const modalProjectStatus = document.getElementById('modal-project-status');
        const modalProjectTitle = document.getElementById('modal-project-title');
        const modalProjectDescription = document.getElementById('modal-project-description');
        const modalDetailedDescription = document.getElementById('modal-detailed-description');
        
        if (modalProjectId) modalProjectId.textContent = projectId;
        if (modalProjectStatus) {
            modalProjectStatus.textContent = projectStatus;
            modalProjectStatus.className = `meta-value status ${projectStatus.toLowerCase().replace('complete', 'complete').replace('wip', 'wip').replace('active', 'active')}`;
        }
        if (modalProjectTitle) modalProjectTitle.textContent = projectTitle;
        if (modalProjectDescription) modalProjectDescription.textContent = projectDescription;
        if (modalDetailedDescription) modalDetailedDescription.textContent = getDetailedDescription(workType);
        
        // Update project image if exists
        const modalImage = document.getElementById('modal-project-image');
        if (projectImage && projectImage.src && modalImage) {
            modalImage.src = projectImage.src;
            modalImage.alt = projectTitle;
        }
        
        // Update tech stack based on project type
        updateTechStack(workType);
        
        // Update build log with animation
        updateBuildLogWithAnimation(workType);
        
        // Reset to overview tab
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const overviewTab = document.querySelector('.nav-item[data-tab="overview"]');
        if (overviewTab) overviewTab.classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        const overviewTabContent = document.getElementById('overview-tab');
        if (overviewTabContent) overviewTabContent.classList.add('active');
        
        // Show modal with enhanced animation
        showTerminalMessage('PROJECT_LOADED_SUCCESSFULLY');
        
        setTimeout(() => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Add modal content animation
            const modalContainer = modal.querySelector('.modal-container');
            if (modalContainer) {
                modalContainer.style.animation = 'modalSlideIn 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
            }
        }, 300);
    }, 800);
}

// Enhanced build log with typing animation
function updateBuildLogWithAnimation(workType) {
    const buildLogs = {
        photogrammetry: [
            '> npm run build:3d',
            '> Processing 3D models...',
            '> ✓ Mesh optimization complete',
            '> ✓ Texture compression complete', 
            '> ✓ LOD generation complete',
            '> ✓ Build complete in 45.2s'
        ],
        installation: [
            '> arduino compile',
            '> Compiling sensors.ino...',
            '> ✓ Sketch compiled successfully',
            '> ✓ Uploading to Arduino Uno',
            '> ✓ Upload complete',
            '> ✓ System ready in 3.1s'
        ],
        webaar: [
            '> npm run build:webxr',
            '> Building WebAR application...',
            '> ✓ WebXR polyfills loaded',
            '> ✓ 3D assets optimized',
            '> ✓ AR markers generated',
            '> ✓ Build complete in 12.7s'
        ]
    };
    
    const logContainer = document.getElementById('modal-build-log');
    const lines = buildLogs[workType] || buildLogs.photogrammetry;
    
    logContainer.textContent = '';
    
    lines.forEach((line, index) => {
        setTimeout(() => {
            logContainer.textContent += line + '\n';
        }, index * 300);
    });
}

// Terminal message system
function showTerminalMessage(message) {
    // Create temporary message display
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--text-primary);
        color: var(--bg-primary);
        padding: 0.8rem 1.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.8rem;
        z-index: 3000;
        border-radius: 0;
        animation: terminalMessageSlide 0.3s ease;
    `;
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    // Add animation keyframe
    if (!document.querySelector('#terminal-message-styles')) {
        const style = document.createElement('style');
        style.id = 'terminal-message-styles';
        style.textContent = `
            @keyframes terminalMessageSlide {
                0% {
                    transform: translateX(100%);
                    opacity: 0;
                }
                100% {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes modalSlideIn {
                0% {
                    transform: translateY(100px) scale(0.9);
                    opacity: 0;
                }
                100% {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove message after delay
    setTimeout(() => {
        messageDiv.style.animation = 'terminalMessageSlide 0.3s ease reverse';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 2000);
}

function getDetailedDescription(workType) {
    const descriptions = {
        photogrammetry: '高精度フォトグラメトリー技術を用いて、文化遺産や歴史的建造物のデジタル保存を行うプロジェクトです。3Dスキャニングと画像解析を組み合わせ、ミリメートル単位の精度で立体形状をキャプチャし、永続的なデジタルアーカイブを構築しています。',
        installation: '物理空間とデジタル技術を融合させたインタラクティブインスタレーション。センサー技術とリアルタイム映像処理により、観客の動きや存在に反応する没入型体験を創出しています。',
        webaar: 'ブラウザ上で動作するWebベースの拡張現実アプリケーション。WebXR APIとThree.jsを活用し、スマートフォンやタブレットで手軽にAR体験を提供する次世代ウェブアプリケーションです。'
    };
    
    return descriptions[workType] || 'このプロジェクトの詳細説明です。';
}

function updateTechStack(workType) {
    const techStacks = {
        photogrammetry: {
            frontend: ['HTML5', 'CSS3', 'JavaScript', 'WebGL'],
            frameworks: ['Three.js', 'Babylon.js', 'WebGL2'],
            tools: ['Blender', 'Reality Capture', 'Photoshop', 'CloudCompare']
        },
        installation: {
            frontend: ['Processing', 'TouchDesigner', 'openFrameworks'],
            frameworks: ['Arduino', 'Raspberry Pi', 'OpenCV'],
            tools: ['Kinect', 'Leap Motion', 'OSC Protocol', 'Max/MSP']
        },
        webaar: {
            frontend: ['HTML5', 'CSS3', 'JavaScript ES6+', 'WebXR API'],
            frameworks: ['Three.js', 'A-Frame', 'WebRTC'],
            tools: ['Blender', 'Unity', 'AR.js', 'WASM']
        }
    };
    
    const stack = techStacks[workType] || techStacks.photogrammetry;
    
    document.getElementById('modal-frontend-tech').innerHTML = 
        stack.frontend.map(tech => `<span class="tech-item">${tech}</span>`).join('');
    
    document.getElementById('modal-frameworks-tech').innerHTML = 
        stack.frameworks.map(tech => `<span class="tech-item">${tech}</span>`).join('');
    
    document.getElementById('modal-tools-tech').innerHTML = 
        stack.tools.map(tech => `<span class="tech-item">${tech}</span>`).join('');
}

function updateBuildLog(workType) {
    const buildLogs = {
        photogrammetry: `> npm run build:3d
> Processing 3D models...
> ✓ Mesh optimization complete
> ✓ Texture compression complete
> ✓ LOD generation complete
> ✓ Build complete in 45.2s`,
        installation: `> arduino compile
> Compiling sensors.ino...
> ✓ Sketch compiled successfully
> ✓ Uploading to Arduino Uno
> ✓ Upload complete
> ✓ System ready in 3.1s`,
        webaar: `> npm run build:webxr
> Building WebAR application...
> ✓ WebXR polyfills loaded
> ✓ 3D assets optimized
> ✓ AR markers generated
> ✓ Build complete in 12.7s`
    };
    
    document.getElementById('modal-build-log').textContent = buildLogs[workType] || buildLogs.photogrammetry;
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations
                if (entry.target.classList.contains('work-item')) {
                    animateWorkItem(entry.target);
                }
                
                if (entry.target.classList.contains('section-header')) {
                    animateSectionHeader(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll('.work-item, .section-header, .about-content');
    elementsToObserve.forEach(el => observer.observe(el));
}

function animateWorkItem(item) {
    const delay = Array.from(item.parentElement.children).indexOf(item) * 100;
    
    setTimeout(() => {
        item.style.animation = 'slideInUp 0.6s ease-out forwards';
    }, delay);
    
    // Add simple animation keyframes
    if (!document.querySelector('#work-animations')) {
        const style = document.createElement('style');
        style.id = 'work-animations';
        style.textContent = `
            @keyframes slideInUp {
                0% {
                    transform: translateY(30px);
                    opacity: 0;
                }
                100% {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeInScale {
                0% {
                    transform: scale(0.95);
                    opacity: 0;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function animateSectionHeader(header) {
    header.style.animation = 'fadeInScale 1s ease-out forwards';
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    console.log('Initializing parallax effect...');
    
    let ticking = false;
    
    function updateParallax() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.ascii-cluster, .ascii-object');
                
                parallaxElements.forEach((element, index) => {
                    const speed = 0.2 + (index * 0.1);
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateParallax);
}

// ===== TYPEWRITER EFFECT =====
function initTypewriterEffect() {
    const taglinePrimary = document.querySelector('.tagline-primary');
    const taglineSecondary = document.querySelector('.tagline-secondary');
    
    if (taglinePrimary && taglineSecondary) {
        // Initial setup
        const originalText1 = taglinePrimary.textContent;
        const originalText2 = taglineSecondary.textContent;
        
        taglinePrimary.textContent = '';
        taglineSecondary.textContent = '';
        
        // Type first line
        setTimeout(() => {
            typeText(taglinePrimary, originalText1, 50, () => {
                // Type second line after first is complete
                setTimeout(() => {
                    typeText(taglineSecondary, originalText2, 50);
                }, 200);
            });
        }, 1000);
    }
}

function typeText(element, text, speed, callback) {
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// ===== CONTACT INTERACTIONS =====
function initContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const value = this.querySelector('.contact-value').textContent;
            
            if (value.includes('@')) {
                // Email
                window.location.href = `mailto:${value}`;
            } else if (value.includes('github.com')) {
                // GitHub
                window.open(`https://${value}`, '_blank');
            } else if (value.includes('@')) {
                // Twitter
                window.open(`https://twitter.com/${value.replace('@', '')}`, '_blank');
            }
        });
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any position-dependent elements
        initParallaxEffect();
    }, 100);
});

// ===== INITIALIZATION ON LOAD =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize contact interactions
    initContactInteractions();
    
    // Add loaded state styles
    if (!document.querySelector('#loaded-styles')) {
        const style = document.createElement('style');
        style.id = 'loaded-styles';
        style.textContent = `
            .loaded .hero-content {
                animation: fadeInUp 1s ease-out forwards;
            }
            
            .loaded .hero-ascii {
                animation: fadeInScale 1.2s ease-out 0.3s forwards;
            }
            
            @keyframes fadeInUp {
                0% {
                    transform: translateY(30px);
                    opacity: 0;
                }
                100% {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// ===== PIXEL PARTICLES SYSTEM =====
function initPixelParticles() {
    console.log('Initializing pixel particles...');
    
    // Create pixel particles container if it doesn't exist
    let particleContainer = document.querySelector('.pixel-particles');
    if (!particleContainer) {
        particleContainer = document.createElement('div');
        particleContainer.className = 'pixel-particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);
        console.log('Created pixel particles container');
    }
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createPixelParticle(particleContainer);
    }
    
    console.log('Created', particleCount, 'pixel particles');
}

function createPixelParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'pixel-particle';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 6 + 3;
    const colors = [
        'var(--text-primary)',
        'var(--text-secondary)',
        'var(--ascii-medium)',
        'var(--ascii-dark)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 1px;
        opacity: 0.6;
        animation: whitePixelFloat ${Math.random() * 20 + 15}s infinite linear;
    `;
    
    container.appendChild(particle);
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#white-pixel-particle-styles')) {
        const style = document.createElement('style');
        style.id = 'white-pixel-particle-styles';
        style.textContent = `
            @keyframes whitePixelFloat {
                0% {
                    transform: translateY(100vh) rotateZ(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-100px) rotateZ(180deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Regenerate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createPixelParticle(container);
        }
    }, (Math.random() * 20 + 15) * 1000);
}

// ===== ADVANCED PIXEL EFFECTS =====
function initAdvancedPixelEffects() {
    console.log('Initializing advanced pixel effects...');
    
    // Dynamic ASCII symbol changes
    const asciiElements = document.querySelectorAll('.ascii-cluster .ascii-art');
    
    console.log('Found ASCII elements for effects:', asciiElements.length);
    
    setInterval(() => {
        asciiElements.forEach(element => {
            const symbols = ['◉', '◈', '◯', '▲', '●', '◆', '◇', '▼', '■', '□', '●', '○'];
            const text = element.textContent;
            
            // Randomly replace some characters
            if (Math.random() > 0.8) {
                const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                const lines = text.split('\n');
                
                if (lines.length > 5) {
                    const randomLineIndex = Math.floor(Math.random() * lines.length);
                    const line = lines[randomLineIndex];
                    
                    if (line && line.length > 10) {
                        const randomCharIndex = Math.floor(Math.random() * line.length);
                        lines[randomLineIndex] = line.substring(0, randomCharIndex) + randomSymbol + line.substring(randomCharIndex + 1);
                        element.textContent = lines.join('\n');
                    }
                }
            }
        });
    }, 3000);
}

// ===== TERMINAL LOADING EFFECTS =====
function initTerminalEffects() {
    // Add typewriter effect to hero taglines
    const taglinePrimary = document.querySelector('.tagline-primary');
    const taglineSecondary = document.querySelector('.tagline-secondary');
    
    if (taglinePrimary && taglineSecondary) {
        const originalText1 = taglinePrimary.textContent;
        const originalText2 = taglineSecondary.textContent;
        
        // Clear text initially
        taglinePrimary.textContent = '';
        taglineSecondary.textContent = '';
        
        // Type first line
        setTimeout(() => {
            typeTextWithCursor(taglinePrimary, originalText1, 80, () => {
                // Type second line after delay
                setTimeout(() => {
                    typeTextWithCursor(taglineSecondary, originalText2, 80);
                }, 300);
            });
        }, 1500);
    }
}

function typeTextWithCursor(element, text, speed, callback) {
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent = text.substring(0, index + 1) + '|';
            index++;
            setTimeout(type, speed);
        } else {
            element.textContent = text;
            if (callback) callback();
        }
    }
    
    type();
}

// ===== ADVANCED LOADING EFFECTS =====
function initAdvancedLoadingEffects() {
    // Create loading bar in hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        setTimeout(() => {
            const loadingBar = document.createElement('div');
            loadingBar.style.cssText = `
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                width: 300px;
                height: 4px;
                background: var(--bg-secondary);
                border: 1px solid var(--text-secondary);
                opacity: 0.8;
            `;
            
            const progress = document.createElement('div');
            progress.style.cssText = `
                width: 0%;
                height: 100%;
                background: var(--text-primary);
                transition: width 0.3s ease;
            `;
            
            loadingBar.appendChild(progress);
            heroSection.appendChild(loadingBar);
            
            // Animate loading
            let width = 0;
            const loadInterval = setInterval(() => {
                width += Math.random() * 15 + 5;
                if (width >= 100) {
                    width = 100;
                    clearInterval(loadInterval);
                    
                    setTimeout(() => {
                        loadingBar.style.opacity = '0';
                        setTimeout(() => {
                            loadingBar.remove();
                        }, 500);
                    }, 1000);
                }
                progress.style.width = width + '%';
            }, 200);
        }, 3000);
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
if (!document.querySelector('#accessibility-styles')) {
    const style = document.createElement('style');
    style.id = 'accessibility-styles';
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--text-primary);
            outline-offset: 2px;
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== ENHANCED INTERACTIONS =====
function initEnhancedInteractions() {
    // Terminal-style button effects
    initTerminalButtons();
    
    // Simplified ASCII effects
    initSimpleASCIIEffects();
}

function initTerminalButtons() {
    const buttons = document.querySelectorAll('.view-project-btn, .cta-button, .footer-btn');
    
    buttons.forEach(button => {
        // Store original text
        button.dataset.originalText = button.textContent;
        
        button.addEventListener('mouseenter', function() {
            // Terminal cursor effect
            const text = this.dataset.originalText;
            this.textContent = '> ' + text;
            
            // Add typing effect
            this.style.letterSpacing = '0.1em';
        });
        
        button.addEventListener('mouseleave', function() {
            this.textContent = this.dataset.originalText;
            this.style.letterSpacing = '0.05em';
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Terminal execution effect
            const text = this.dataset.originalText;
            this.textContent = 'EXECUTING...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.textContent = 'COMPLETE ✓';
                
                setTimeout(() => {
                    this.textContent = text;
                    this.style.pointerEvents = 'auto';
                }, 200);
            }, 300);
        });
    });
}

function initSimpleASCIIEffects() {
    // Simple, stable ASCII hover effects
    const asciiElements = document.querySelectorAll('.work-ascii-small');
    
    asciiElements.forEach(element => {
        const workItem = element.closest('.work-item');
        
        if (workItem) {
            workItem.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s ease';
                element.style.opacity = '1';
                element.style.transform = 'scale(1.05)';
            });
            
            workItem.addEventListener('mouseleave', () => {
                element.style.opacity = '0.7';
                element.style.transform = 'scale(1)';
            });
        }
    });
}