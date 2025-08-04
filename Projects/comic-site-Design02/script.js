// DOM要素の取得
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.plottron-comic-glitch');
    const gridItems = document.querySelectorAll('.grid-item');
    const navigationLinks = document.querySelectorAll('.navigation a');
    const storyPanels = document.querySelectorAll('.story-panel');
    
    // パーティクルエフェクトの初期化
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#a855f7', '#06d6a0', '#fbbf24']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#a855f7',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // ロゴクリック時のホームページへの移動
    logo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ナビゲーションリンクのスムーズスクロール
    navigationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ストーリーパネルのインタラクティブ機能
    storyPanels.forEach(panel => {
        const storyCharge = panel.querySelector('.story-charge');
        const storySpark = panel.querySelector('.story-spark');
        
        // ホバー時の荷電エフェクト
        panel.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.zIndex = '20';
            
            // 荷電エフェクトの強化
            if (storyCharge) {
                storyCharge.style.animation = 'charge-spin 0.5s linear infinite';
            }
            if (storySpark) {
                storySpark.style.animation = 'spark-flash 0.3s ease-in-out infinite';
            }
            
            // パーティクルエフェクトの追加
            createParticleBurst(this);
        });
        
        panel.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
            
            // 荷電エフェクトの通常化
            if (storyCharge) {
                storyCharge.style.animation = 'charge-spin 2s linear infinite';
            }
            if (storySpark) {
                storySpark.style.animation = 'spark-flash 1s ease-in-out infinite';
            }
        });
        
        // クリック時のストーリーアクセラレーション
        panel.addEventListener('click', function() {
            const storyType = this.closest('.grid-item').dataset.story;
            accelerateStory(storyType);
        });
    });
    
    // グリッドアイテムのホバーエフェクト強化
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
    
    // 画像の遅延読み込み
    const images = document.querySelectorAll('.comic-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in';
                
                // 画像が読み込まれたらフェードイン
                img.onload = function() {
                    img.style.opacity = '1';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // スクロール時のヘッダー背景変更
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(20px)';
        }
    });
    
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'Home':
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                break;
            case 'End':
                e.preventDefault();
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
                break;
        }
    });
    
    // タッチデバイス用のタップエフェクト
    if ('ontouchstart' in window) {
        gridItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // パフォーマンス最適化：リサイズ時のデバウンス
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // グリッドの再計算が必要な場合の処理
            const gridContainer = document.querySelector('.grid-container');
            if (gridContainer) {
                gridContainer.style.display = 'none';
                setTimeout(() => {
                    gridContainer.style.display = 'grid';
                }, 10);
            }
        }, 250);
    });
    
    // アクセシビリティ向上：フォーカス管理
    gridItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('focus', function() {
            this.style.outline = '2px solid #a855f7';
            this.style.outlineOffset = '2px';
        });
        
        item.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // ローディング状態の管理
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // ローディング完了後のアニメーション
        setTimeout(() => {
            gridItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        }, 100);
    });
    
    // エラーハンドリング
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const errorDiv = document.createElement('div');
            errorDiv.className = 'image-error';
            errorDiv.innerHTML = '<p>画像を読み込めませんでした</p>';
            errorDiv.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                background-color: #f0f0f0;
                color: #666;
                font-size: 0.9rem;
            `;
            this.parentNode.appendChild(errorDiv);
        });
    });
});

// パーティクルバーストエフェクト
function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #a855f7;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 10) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// ストーリーアクセラレーション機能
function accelerateStory(storyType) {
    console.log(`Accelerating story: ${storyType}`);
    
    // ストーリーアクセラレーターのアニメーション強化
    const accelerator = document.querySelector('.story-accelerator');
    if (accelerator) {
        accelerator.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            accelerator.style.animation = '';
        }, 500);
    }
    
    // 荷電エフェクトの強化
    const chargeOverlay = document.querySelector('.charge-overlay');
    if (chargeOverlay) {
        chargeOverlay.style.animation = 'charge-pulse 0.3s ease-in-out';
        setTimeout(() => {
            chargeOverlay.style.animation = 'charge-pulse 4s ease-in-out infinite';
        }, 300);
    }
    
    // ストーリータイプに応じたエフェクト
    switch(storyType) {
        case 'glitch-girl':
            createGlitchEffect();
            break;
        case 'color-dream':
            createColorDreamEffect();
            break;
        case 'gothic-lolita':
            createGothicEffect();
            break;
        case 'manga-life':
            createMangaEffect();
            break;
        case 'classroom-tales':
            createClassroomEffect();
            break;
        case 'mystery-book':
            createMysteryEffect();
            break;
        case 'morning-tales':
            createMorningEffect();
            break;
    }
}

// ストーリータイプ別エフェクト
function createGlitchEffect() {
    const body = document.body;
    body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
        body.style.filter = '';
    }, 500);
}

function createColorDreamEffect() {
    const particles = document.querySelectorAll('#particles-js canvas');
    particles.forEach(particle => {
        particle.style.filter = 'saturate(2) brightness(1.2)';
    });
    setTimeout(() => {
        particles.forEach(particle => {
            particle.style.filter = '';
        });
    }, 1000);
}

function createGothicEffect() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1000;
        animation: fadeInOut 1s ease-in-out;
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1000);
}

function createMangaEffect() {
    const panels = document.querySelectorAll('.story-panel');
    panels.forEach((panel, index) => {
        setTimeout(() => {
            panel.style.transform = 'scale(1.1)';
            setTimeout(() => {
                panel.style.transform = '';
            }, 200);
        }, index * 100);
    });
}

function createClassroomEffect() {
    const speechBubbles = document.querySelectorAll('.speech-bubble, .bubble');
    speechBubbles.forEach((bubble, index) => {
        setTimeout(() => {
            bubble.style.animation = 'bounce 0.5s ease-in-out';
            setTimeout(() => {
                bubble.style.animation = '';
            }, 500);
        }, index * 200);
    });
}

function createMysteryEffect() {
    const bookInfo = document.querySelector('.book-info');
    if (bookInfo) {
        bookInfo.style.animation = 'glow 1s ease-in-out';
        setTimeout(() => {
            bookInfo.style.animation = '';
        }, 1000);
    }
}

function createMorningEffect() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1000;
        animation: fadeInOut 1s ease-in-out;
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1000);
}

// 追加のCSSアニメーション
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
        50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
    }
`;
document.head.appendChild(style);

// ユーティリティ関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// パフォーマンス監視
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('ページ読み込み時間:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
} 