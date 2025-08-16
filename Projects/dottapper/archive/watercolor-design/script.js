// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initSmoothScroll();
    initFloatingShapes();
    initParticles();
    initIntersectionObserver();
    initModal();
    initNavigation();
    createSprayParticles();
}

// ===== スムーズスクロール =====
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // アクティブナビゲーション更新
                updateActiveNav(targetId);
            }
        });
    });
}

function updateActiveNav(targetId) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ===== 3D浮遊シェイプのマウス追従 =====
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        shapes.forEach((shape, index) => {
            const speed = 0.02 * (index + 1);
            const xOffset = (mouseX - 50) * speed;
            const yOffset = (mouseY - 50) * speed;
            
            shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
    
    // デバイスの傾きでも動かす（モバイル対応）
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(e) {
            const beta = e.beta; // 前後の傾き
            const gamma = e.gamma; // 左右の傾き
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 * (index + 1);
                const xOffset = gamma * speed;
                const yOffset = beta * speed;
                
                shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }
}

// ===== パーティクルエフェクト =====
function initParticles() {
    const particleContainer = document.querySelector('.particle-container');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // ランダムな位置と色
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 4 + 1;
    const colors = [
        'var(--watercolor-blue)',
        'var(--watercolor-purple)',
        'var(--watercolor-pink)',
        'var(--watercolor-green)',
        'var(--digital-cyan)',
        'var(--digital-magenta)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: 0.6;
        animation: particleFloat ${Math.random() * 10 + 10}s infinite linear;
        transform: translateZ(0);
    `;
    
    container.appendChild(particle);
    
    // アニメーション定義
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // パーティクルを再生成
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (Math.random() * 10 + 10) * 1000);
}

// ===== スプレーパーティクル（ヒーロー用） =====
function createSprayParticles() {
    const sprayEffect = document.querySelector('.spray-effect');
    if (!sprayEffect) return;
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'spray-particle';
        
        const angle = Math.random() * 360;
        const distance = Math.random() * 100 + 50;
        const size = Math.random() * 3 + 1;
        const colors = [
            'var(--watercolor-blue)',
            'var(--watercolor-purple)',
            'var(--watercolor-pink)',
            'var(--digital-cyan)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            animation: sprayParticle 2s ease-out forwards;
        `;
        
        // アニメーション定義
        if (!document.querySelector('#spray-styles')) {
            const style = document.createElement('style');
            style.id = 'spray-styles';
            style.textContent = `
                @keyframes sprayParticle {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(
                            calc(-50% + ${Math.cos(angle * Math.PI / 180) * distance}px),
                            calc(-50% + ${Math.sin(angle * Math.PI / 180) * distance}px)
                        ) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        sprayEffect.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 2000);
    }, 100);
}

// ===== インターセクションオブザーバー =====
function initIntersectionObserver() {
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // セクションがビューに入った時のアニメーション
                if (entry.target.classList.contains('gallery-item')) {
                    animateGalleryItem(entry.target);
                }
            }
        });
    }, options);
    
    // 観察対象を設定
    const sections = document.querySelectorAll('.content-section');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    sections.forEach(section => observer.observe(section));
    galleryItems.forEach(item => observer.observe(item));
}

function animateGalleryItem(item) {
    setTimeout(() => {
        item.style.animation = 'slideInUp 0.6s ease-out forwards';
    }, Math.random() * 300);
    
    // アニメーション定義
    if (!document.querySelector('#gallery-styles')) {
        const style = document.createElement('style');
        style.id = 'gallery-styles';
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
        `;
        document.head.appendChild(style);
    }
}

// ===== モーダル機能 =====
function initModal() {
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    const closeBtn = document.querySelector('.modal-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // ギャラリーアイテムクリック
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const type = this.dataset.type;
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            openModal(type, title, description);
        });
    });
    
    // モーダルを閉じる
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function openModal(type, title, description) {
        modalBody.innerHTML = generateModalContent(type, title, description);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function generateModalContent(type, title, description) {
        if (type === '3d') {
            return `
                <h2>${title}</h2>
                <div style="height: 400px; background: linear-gradient(135deg, var(--watercolor-blue), var(--digital-cyan)); border-radius: 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin: 2rem 0;">
                    3D Model Viewer<br><small>(要実装)</small>
                </div>
                <p>${description}</p>
                <p>このセクションには3Dモデルビューアーを実装できます。Three.jsやBabylon.jsを使用して、インタラクティブな3Dモデル表示が可能です。</p>
            `;
        } else if (type === 'watercolor') {
            return `
                <h2>${title}</h2>
                <div style="height: 400px; background: linear-gradient(135deg, var(--watercolor-pink), var(--watercolor-green)); border-radius: 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; margin: 2rem 0;">
                    水彩ギャラリー<br><small>(要実装)</small>
                </div>
                <p>${description}</p>
                <p>水彩作品のギャラリーを表示します。画像のローディング効果や、水彩風のトランジションエフェクトを追加できます。</p>
            `;
        }
        return `<h2>${title}</h2><p>${description}</p>`;
    }
}

// ===== ナビゲーション機能 =====
function initNavigation() {
    // スクロール位置に基づくナビゲーション更新
    let ticking = false;
    
    function updateNavOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('section[id]');
                const scrollPosition = window.scrollY + 100;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        updateActiveNav(`#${sectionId}`);
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateNavOnScroll);
    
    // WebARボタンの機能
    const arButtons = document.querySelectorAll('.ar-btn');
    arButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('primary')) {
                alert('WebAR体験を開始します。\n（実際のWebARサイトにリダイレクトする予定）');
            } else {
                alert('WebARについて詳しく説明するページに移動します。\n（詳細ページを実装予定）');
            }
        });
    });
    
    // ブログリンクのホバーエフェクト
    const blogLinks = document.querySelectorAll('.blog-link');
    blogLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== パフォーマンス最適化 =====
// リサイズ時の処理を最適化
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // パーティクルの位置を再計算
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            particle.style.left = x + '%';
            particle.style.top = y + '%';
        });
    }, 100);
});

// ===== 追加のインタラクション =====
// ギャラリーアイテムのホバーエフェクト強化
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // 他のアイテムを少し薄くする
            galleryItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.opacity = '0.7';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            // 全てのアイテムの透明度を戻す
            galleryItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
});

// ===== アクセシビリティ対応 =====
// フォーカス管理
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// フォーカス可能要素のスタイル
if (!document.querySelector('#accessibility-styles')) {
    const style = document.createElement('style');
    style.id = 'accessibility-styles';
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--watercolor-blue);
            outline-offset: 2px;
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(style);
}

// ===== プリローダー（オプション） =====
window.addEventListener('load', function() {
    // ページ読み込み完了後の処理
    document.body.classList.add('loaded');
    
    // 初期アニメーション
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.animation = 'titleAppear 1s ease-out forwards';
        }
    }, 100);
    
    // タイトルアニメーション定義
    if (!document.querySelector('#title-styles')) {
        const style = document.createElement('style');
        style.id = 'title-styles';
        style.textContent = `
            @keyframes titleAppear {
                0% {
                    transform: translateY(50px);
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