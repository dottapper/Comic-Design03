// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', function() {
    initializeBrightApp();
    initThreeJSAnimations();
});

function initializeBrightApp() {
    initSmoothScroll();
    initASCIIAnimation();
    initPixelParticles();
    initIntersectionObserver();
    initModal();
    initNavigation();
    initPixelArt();
    createTerminalEffects();
    initWorkInteractions();
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

// ===== ASCII アニメーション =====
function initASCIIAnimation() {
    const asciiElements = document.querySelectorAll('.ascii-element');
    
    setInterval(() => {
        asciiElements.forEach(element => {
            const symbols = ['◉', '◈', '◯', '▲', '●', '◆', '◇', '▼'];
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            element.textContent = randomSymbol;
        });
    }, 3000);
    
    // ASCII アートの動的変更
    const asciiArt = document.querySelector('.ascii-art');
    if (asciiArt) {
        const patterns = [
            ['◉ ◈ ◯', '◈ ◉ ◈', '◯ ◈ ◉'],
            ['● ◆ ○', '◆ ● ◆', '○ ◆ ●'],
            ['▲ ▼ ▲', '▼ ▲ ▼', '▲ ▼ ▲'],
            ['◇ ◈ ◇', '◈ ◇ ◈', '◇ ◈ ◇']
        ];
        
        let currentPattern = 0;
        setInterval(() => {
            const lines = asciiArt.querySelectorAll('.ascii-line');
            const pattern = patterns[currentPattern];
            
            lines.forEach((line, index) => {
                if (pattern[index]) {
                    line.textContent = pattern[index];
                }
            });
            
            currentPattern = (currentPattern + 1) % patterns.length;
        }, 5000);
    }
}

// ===== ピクセルパーティクル =====
function initPixelParticles() {
    const particleContainer = document.querySelector('.pixel-particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createPixelParticle(particleContainer);
    }
}

function createPixelParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'pixel-particle';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 8 + 4;
    const colors = [
        'var(--neon-pink)',
        'var(--neon-blue)', 
        'var(--neon-green)',
        'var(--neon-cyan)',
        'var(--neon-purple)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 2px;
        opacity: 0.8;
        animation: pixelFloat ${Math.random() * 15 + 10}s infinite linear;
        box-shadow: 0 0 10px ${color};
    `;
    
    container.appendChild(particle);
    
    // アニメーション定義
    if (!document.querySelector('#pixel-particle-styles')) {
        const style = document.createElement('style');
        style.id = 'pixel-particle-styles';
        style.textContent = `
            @keyframes pixelFloat {
                0% {
                    transform: translateY(100vh) rotateZ(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100px) rotateZ(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // パーティクルの再生成
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createPixelParticle(container);
        }
    }, (Math.random() * 15 + 10) * 1000);
}

// ===== ピクセルアート インタラクション =====
function initPixelArt() {
    const pixels = document.querySelectorAll('.pixel');
    const pixelGrid = document.querySelector('.pixel-grid');
    
    if (pixelGrid) {
        pixelGrid.addEventListener('mouseover', function() {
            pixels.forEach(pixel => {
                pixel.classList.add('active');
            });
        });
        
        pixelGrid.addEventListener('mouseleave', function() {
            pixels.forEach(pixel => {
                if (!pixel.classList.contains('pink') && 
                    !pixel.classList.contains('blue') && 
                    !pixel.classList.contains('green')) {
                    pixel.classList.remove('active');
                }
            });
        });
    }
    
    // ランダムピクセル点滅
    setInterval(() => {
        const randomPixel = pixels[Math.floor(Math.random() * pixels.length)];
        if (randomPixel && !randomPixel.classList.contains('dark')) {
            randomPixel.style.animation = 'pixelPulse 1s ease-in-out';
            setTimeout(() => {
                randomPixel.style.animation = '';
            }, 1000);
        }
    }, 2000);
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
                
                // プロジェクトカードのアニメーション
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
                
                // ギャラリーアイテムのアニメーション
                if (entry.target.classList.contains('gallery-item')) {
                    animateGalleryItem(entry.target);
                }
            }
        });
    }, options);
    
    // 観察対象を設定
    const sections = document.querySelectorAll('.content-section');
    const projectCards = document.querySelectorAll('.project-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    sections.forEach(section => observer.observe(section));
    projectCards.forEach(card => observer.observe(card));
    galleryItems.forEach(item => observer.observe(item));
}

function animateProjectCard(card) {
    setTimeout(() => {
        card.style.animation = 'slideInUp 0.8s ease-out forwards';
    }, Math.random() * 400);
}

function animateGalleryItem(item) {
    setTimeout(() => {
        item.style.animation = 'fadeInScale 0.8s ease-out forwards';
    }, Math.random() * 300);
}

// アニメーション定義
if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
        @keyframes slideInUp {
            0% {
                transform: translateY(50px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeInScale {
            0% {
                transform: scale(0.8);
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

// ===== モーダル機能 =====
function initModal() {
    const modal = document.querySelector('.modal-overlay');
    const modalBody = document.querySelector('.modal-body');
    const closeBtn = document.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // プロジェクトカードクリック
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.dataset.type;
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const projectId = this.querySelector('.project-id').textContent;
            
            openModal(type, title, description, { projectId });
        });
    });
    
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
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function openModal(type, title, description, extra = {}) {
        if (!modalBody) return;
        
        modalBody.innerHTML = generateModalContent(type, title, description, extra);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // モーダル内のアニメーション
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.animation = 'modalAppear 0.5s ease-out forwards';
        }, 50);
    }
    
    function closeModal() {
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function generateModalContent(type, title, description, extra = {}) {
        const baseContent = `
            <h2 style="color: var(--neon-pink); text-shadow: var(--glow-pink); margin-bottom: 1rem;">
                ${extra.projectId || ''} ${title}
            </h2>
        `;
        
        if (type === '3d') {
            return baseContent + `
                <div style="height: 300px; background: linear-gradient(135deg, var(--neon-blue), var(--neon-cyan)); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; margin: 2rem 0; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                        <div style="font-family: 'Courier New', monospace; font-size: 2rem; margin-bottom: 1rem;">◉ ◈ ◯</div>
                        <div>3D Model Viewer</div>
                        <div style="font-size: 0.8rem; margin-top: 0.5rem;">[WebGL Implementation Required]</div>
                    </div>
                </div>
                <p style="color: var(--text-secondary); line-height: 1.6;">${description}</p>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 1rem;">
                    このセクションでは、Three.jsやBabylon.jsを使用したインタラクティブな3Dモデル表示を実装できます。
                    フォトグラメトリーで作成されたモデルを360度回転可能な形で表示し、ユーザーが詳細を確認できます。
                </p>
                <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-primary); border-radius: 8px; border: 1px solid var(--neon-green);">
                    <h4 style="color: var(--neon-green); margin-bottom: 0.5rem;">技術仕様:</h4>
                    <ul style="color: var(--text-secondary); list-style: none; padding-left: 1rem;">
                        <li>• Three.js / WebGL</li>
                        <li>• GLTF/GLB モデル形式</li>
                        <li>• リアルタイム照明</li>
                        <li>• マウス/タッチ操作対応</li>
                    </ul>
                </div>
            `;
        } else if (type === 'watercolor') {
            return baseContent + `
                <div style="height: 300px; background: linear-gradient(135deg, var(--neon-pink), var(--neon-purple)); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; margin: 2rem 0; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 20%; left: 30%; width: 60px; height: 60px; background: var(--neon-pink); border-radius: 50%; opacity: 0.7; animation: colorFloat 4s infinite ease-in-out;"></div>
                    <div style="position: absolute; top: 60%; left: 60%; width: 80px; height: 80px; background: var(--neon-blue); border-radius: 50%; opacity: 0.7; animation: colorFloat 4s infinite ease-in-out 1s;"></div>
                    <div style="position: absolute; top: 40%; left: 70%; width: 50px; height: 50px; background: var(--neon-green); border-radius: 50%; opacity: 0.7; animation: colorFloat 4s infinite ease-in-out 2s;"></div>
                    <div style="text-align: center; z-index: 10;">
                        <div style="font-family: 'Courier New', monospace; font-size: 2rem; margin-bottom: 1rem;">◈ ◯ ◈</div>
                        <div>Watercolor Gallery</div>
                        <div style="font-size: 0.8rem; margin-top: 0.5rem;">[Image Gallery System]</div>
                    </div>
                </div>
                <p style="color: var(--text-secondary); line-height: 1.6;">${description}</p>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 1rem;">
                    水彩作品のギャラリーシステム。画像の遅延読み込み、拡大表示、スライドショー機能、
                    水彩風のトランジションエフェクトを実装できます。
                </p>
                <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-primary); border-radius: 8px; border: 1px solid var(--neon-pink);">
                    <h4 style="color: var(--neon-pink); margin-bottom: 0.5rem;">ギャラリー機能:</h4>
                    <ul style="color: var(--text-secondary); list-style: none; padding-left: 1rem;">
                        <li>• レスポンシブ画像表示</li>
                        <li>• Lightbox モーダル</li>
                        <li>• 水彩風フィルター効果</li>
                        <li>• 作品詳細情報表示</li>
                    </ul>
                </div>
            `;
        }
        
        return baseContent + `<p style="color: var(--text-secondary);">${description}</p>`;
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
    
    // ARボタンの機能
    const arButtons = document.querySelectorAll('.btn');
    arButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('primary')) {
                showTerminalMessage('LAUNCHING_AR_EXPERIENCE...');
                setTimeout(() => {
                    alert('WebAR体験を開始します。\n実際のWebARサイトにリダイレクトする機能を実装予定です。');
                }, 1000);
            } else if (this.textContent.includes('learn_more')) {
                showTerminalMessage('OPENING_DOCUMENTATION...');
                setTimeout(() => {
                    alert('WebARについて詳しく説明するページに移動します。');
                }, 1000);
            }
        });
    });
    
    // ターミナルリンクの機能
    const terminalLinks = document.querySelectorAll('.terminal-link');
    terminalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const arg = this.querySelector('.command-arg').textContent;
                showTerminalMessage(`OPENING_${arg.toUpperCase()}...`);
            }
        });
    });
}

// ===== ターミナルエフェクト =====
function createTerminalEffects() {
    // タイピングエフェクト
    const terminalTitle = document.querySelector('.terminal-title');
    if (terminalTitle) {
        const originalText = terminalTitle.textContent;
        terminalTitle.textContent = '';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            terminalTitle.textContent += originalText[index];
            index++;
            
            if (index >= originalText.length) {
                clearInterval(typeInterval);
                // カーソル点滅
                terminalTitle.innerHTML += '<span style="animation: cursorBlink 1s infinite;">|</span>';
            }
        }, 100);
    }
    
    // ローディングバーアニメーション
    const loadingProgress = document.querySelector('.loading-progress');
    if (loadingProgress) {
        let width = 0;
        const loadInterval = setInterval(() => {
            width += Math.random() * 20;
            if (width > 100) {
                width = 0;
            }
            loadingProgress.style.width = width + '%';
        }, 200);
    }
}

function showTerminalMessage(message) {
    // 簡易ターミナル表示
    const terminal = document.createElement('div');
    terminal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-primary);
        border: 2px solid var(--neon-green);
        border-radius: 8px;
        padding: 2rem;
        color: var(--neon-green);
        font-family: 'Courier New', monospace;
        z-index: 3000;
        box-shadow: var(--glow-green);
    `;
    terminal.textContent = message;
    
    document.body.appendChild(terminal);
    
    setTimeout(() => {
        terminal.remove();
    }, 2000);
}

// ===== 追加のインタラクション =====
// プロジェクトカードのホバーエフェクト強化
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // 他のカードを少し薄くする
            projectCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.6';
                    otherCard.style.filter = 'blur(2px)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // 全てのカードの透明度を戻す
            projectCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
                otherCard.style.filter = 'none';
            });
        });
    });
    
    // カラースプラッシュアニメーション
    const colorSplashes = document.querySelectorAll('.color-splash');
    colorSplashes.forEach(splash => {
        splash.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.5) rotate(180deg)';
            this.style.opacity = '1';
        });
        
        splash.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.opacity = '';
        });
    });
});

// ===== パフォーマンス最適化 =====
// リサイズ時の処理
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // パーティクルの位置を再計算
        const particles = document.querySelectorAll('.pixel-particle');
        particles.forEach(particle => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            particle.style.left = x + '%';
            particle.style.top = y + '%';
        });
    }, 100);
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

// ===== プリローダー =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 初期アニメーション
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.animation = 'titleGlow 2s ease-out forwards';
        }
        
        const heroStats = document.querySelectorAll('.stat-item');
        heroStats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.animation = 'slideInUp 0.8s ease-out forwards';
            }, index * 200);
        });
    }, 500);
});

// ===== カスタムカーソル（オプション） =====
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--neon-cyan);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // ホバー時のカーソル変化
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .gallery-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'var(--neon-pink)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--neon-cyan)';
        });
    });
}

// カスタムカーソルは選択的に有効化
// initCustomCursor();

// ===== Three.js アニメーション =====
function initThreeJSAnimations() {
    initLeftCanvas();
    initRightCanvas();
}

function initLeftCanvas() {
    const canvas = document.getElementById('leftCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // 繊細な幾何学パターンを作成
    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x666666, 
        wireframe: true,
        opacity: 0.7,
        transparent: true
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // 小さな球体を追加
    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
    
    const spheres = [];
    for (let i = 0; i < 20; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = (Math.random() - 0.5) * 10;
        sphere.position.y = (Math.random() - 0.5) * 10;
        sphere.position.z = (Math.random() - 0.5) * 10;
        spheres.push(sphere);
        scene.add(sphere);
    }

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);

        // トーラスの回転
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;

        // 球体の浮遊アニメーション
        spheres.forEach((sphere, index) => {
            sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
            sphere.rotation.x += 0.02;
        });

        renderer.render(scene, camera);
    }
    animate();

    // リサイズ対応
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

function initRightCanvas() {
    const canvas = document.getElementById('rightCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // 繊細な立方体パターンを作成
    const cubes = [];
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    
    for (let i = 0; i < 27; i++) {
        const material = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color().setHSL((i * 0.1) % 1, 0.3, 0.5),
            opacity: 0.8,
            transparent: true
        });
        
        const cube = new THREE.Mesh(cubeGeometry, material);
        
        // 3x3x3のグリッド配置
        cube.position.x = (i % 3 - 1) * 1.5;
        cube.position.y = (Math.floor(i / 3) % 3 - 1) * 1.5;
        cube.position.z = (Math.floor(i / 9) - 1) * 1.5;
        
        cubes.push(cube);
        scene.add(cube);
    }

    camera.position.z = 8;

    function animate() {
        requestAnimationFrame(animate);

        // 立方体の個別アニメーション
        cubes.forEach((cube, index) => {
            cube.rotation.x += 0.01 + index * 0.001;
            cube.rotation.y += 0.005 + index * 0.0005;
            
            // 波のような動き
            const time = Date.now() * 0.001;
            cube.position.y += Math.sin(time + index * 0.3) * 0.005;
        });

        // カメラの微細な動き
        camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
        camera.position.y = Math.cos(Date.now() * 0.0003) * 0.3;

        renderer.render(scene, camera);
    }
    animate();

    // リサイズ対応
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ===== WORK INTERACTIONS =====
function initWorkInteractions() {
    console.log('Initializing work interactions...');
    const workItems = document.querySelectorAll('.work-item');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    
    console.log('Found work items:', workItems.length);
    console.log('Found view project buttons:', viewProjectBtns.length);
    
    workItems.forEach(item => {
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
        
        // Update tech stack based on project type
        updateTechStack(workType);
        
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

function getDetailedDescription(workType) {
    const descriptions = {
        photogrammetry: "高精度3Dスキャニング技術を用いた文化遺産のデジタル保存プロジェクト。古建築の詳細な3Dモデルを作成し、後世に残すための取り組みです。",
        installation: "人の動きに反応するインタラクティブなアート作品。センサーとプロジェクションマッピングを組み合わせた没入型体験を提供します。",
        webaar: "ブラウザベースの拡張現実体験。WebXR技術を活用し、デバイスを問わずアクセス可能なAR体験を実現しています。"
    };
    return descriptions[workType] || "詳細な説明がここに表示されます。";
}

function updateTechStack(workType) {
    const techStacks = {
        photogrammetry: {
            frontend: ['HTML5', 'CSS3', 'JavaScript', 'Three.js'],
            frameworks: ['WebGL', 'Photogrammetry.js', 'Blender API'],
            tools: ['Blender', 'Agisoft Metashape', 'CloudCompare']
        },
        installation: {
            frontend: ['TouchDesigner', 'Processing', 'JavaScript'],
            frameworks: ['Arduino', 'OpenCV', 'OSC'],
            tools: ['Kinect', 'Projectors', 'Custom Hardware']
        },
        webaar: {
            frontend: ['HTML5', 'CSS3', 'JavaScript', 'WebXR'],
            frameworks: ['Three.js', 'A-Frame', 'AR.js'],
            tools: ['Blender', 'Unity', 'Model Viewer']
        }
    };
    
    const stack = techStacks[workType] || techStacks.photogrammetry;
    
    const frontendTech = document.getElementById('modal-frontend-tech');
    const frameworksTech = document.getElementById('modal-frameworks-tech');
    const toolsTech = document.getElementById('modal-tools-tech');
    
    if (frontendTech) {
        frontendTech.innerHTML = stack.frontend.map(tech => `<span class="tech-item">${tech}</span>`).join('');
    }
    if (frameworksTech) {
        frameworksTech.innerHTML = stack.frameworks.map(tech => `<span class="tech-item">${tech}</span>`).join('');
    }
    if (toolsTech) {
        toolsTech.innerHTML = stack.tools.map(tech => `<span class="tech-item">${tech}</span>`).join('');
    }
}

function showTerminalMessage(message) {
    // Create temporary terminal message (simplified version)
    console.log('Terminal:', message);
}