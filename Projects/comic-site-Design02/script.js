// DOM要素の取得
document.addEventListener('DOMContentLoaded', function() {
    // ローディングアニメーション
    initLoadingAnimation();
    
    // 3秒後にメインコンテンツを表示
    setTimeout(() => {
        hideLoadingOverlay();
    }, 3000);
    
    const logo = document.querySelector('.plottron-logo');
    const gridItems = document.querySelectorAll('.grid-item');
    const navigationLinks = document.querySelectorAll('.nav-link');
    const storyPanels = document.querySelectorAll('.story-panel');
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    // パーティクルエフェクトの初期化（エラーハンドリング付き）
    try {
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
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
    
    // ロゴクリック時のホームページへの移動
    if (logo) {
        logo.addEventListener('click', function() {
            // グリッチエフェクトを追加
            this.classList.add('glitch-active');
            setTimeout(() => {
                this.classList.remove('glitch-active');
            }, 200);
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // CTAボタンイベント
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // ボタンアニメーション
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // ボタンの種類に応じたアクション
            if (this.classList.contains('primary')) {
                // Explore Works - グリッドセクションにスクロール
                const gridSection = document.querySelector('.grid-section');
                if (gridSection) {
                    gridSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (this.classList.contains('secondary')) {
                // Join Community - アクセラレーターセクションにスクロール
                const acceleratorSection = document.querySelector('.accelerator-section');
                if (acceleratorSection) {
                    acceleratorSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
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
    
    // グリッドアイテムのインタラクティブ機能
    gridItems.forEach(item => {
        const storyPanel = item.querySelector('.story-panel');
        
        if (storyPanel) {
            // ホバー時のエフェクト
            storyPanel.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.zIndex = '20';
                
                // パーティクルエフェクトの追加
                createParticleBurst(this);
            });
            
            storyPanel.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            });
            
            // クリック時のストーリーアクセラレーション
            storyPanel.addEventListener('click', function() {
                const gridItem = this.closest('.grid-item');
                if (gridItem) {
                    const storyType = gridItem.dataset.story;
                    accelerateStory(storyType);
                }
            });
        }
        
        // グリッドアイテム全体のホバーエフェクト
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
    
    // 画像の遅延読み込み
    const images = document.querySelectorAll('.comic-image');
    if ('IntersectionObserver' in window) {
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
                    
                    // 既に読み込まれている場合
                    if (img.complete) {
                        img.style.opacity = '1';
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ヘッダーのスクロール効果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(30px)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // ESCキーでページトップに戻る
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // タッチデバイス対応
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
    
    // リサイズ対応
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // パーティクルエフェクトの再初期化
            if (typeof particlesJS !== 'undefined') {
                try {
                    particlesJS('particles-js', 'particles-js', {
                        particles: {
                            number: {
                                value: 80,
                                density: {
                                    enable: true,
                                    value_area: 800
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.error('Error reinitializing particles:', error);
                }
            }
        }, 250);
    });
    
    // ページ読み込み完了時の処理
    window.addEventListener('load', function() {
        // メインアニメーションの開始
        initMainAnimations();
    });
});

// パーティクルバーストエフェクト
function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.transition = 'all 0.6s ease-out';
        
        document.body.appendChild(particle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100 + Math.random() * 50;
        const targetX = centerX + Math.cos(angle) * distance;
        const targetY = centerY + Math.sin(angle) * distance;
        
        setTimeout(() => {
            particle.style.left = targetX + 'px';
            particle.style.top = targetY + 'px';
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
        }, 10);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 600);
    }
}

// ストーリーアクセラレーション
function accelerateStory(storyType) {
    // グローバルな荷電エフェクト
    const chargeOverlay = document.querySelector('.charge-overlay');
    if (chargeOverlay) {
        chargeOverlay.style.animation = 'charge-pulse 0.3s ease-in-out';
        setTimeout(() => {
            chargeOverlay.style.animation = 'charge-pulse 4s ease-in-out infinite';
        }, 300);
    }
    
    // ストーリータイプ別のエフェクト
    switch (storyType) {
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

// ストーリー別エフェクト関数
function createGlitchEffect() {
    const body = document.body;
    body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
    setTimeout(() => {
        body.style.filter = '';
    }, 500);
}

function createColorDreamEffect() {
    const particles = document.querySelectorAll('#particles-js canvas');
    particles.forEach(canvas => {
        canvas.style.filter = 'hue-rotate(90deg) brightness(1.2)';
    });
    setTimeout(() => {
        particles.forEach(canvas => {
            canvas.style.filter = '';
        });
    }, 800);
}

function createGothicEffect() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1.05) rotate(1deg)';
            setTimeout(() => {
                item.style.transform = '';
            }, 200);
        }, index * 100);
    });
}

function createMangaEffect() {
    const speechBubbles = document.querySelectorAll('.speech-bubble');
    speechBubbles.forEach(bubble => {
        bubble.style.animation = 'bounce 0.5s ease-in-out';
    });
}

function createClassroomEffect() {
    const panels = document.querySelectorAll('.panel-item');
    panels.forEach((panel, index) => {
        setTimeout(() => {
            panel.style.transform = 'scale(1.1)';
            setTimeout(() => {
                panel.style.transform = '';
            }, 300);
        }, index * 150);
    });
}

function createMysteryEffect() {
    const bookOverlays = document.querySelectorAll('.book-overlay');
    bookOverlays.forEach(overlay => {
        overlay.style.animation = 'fadeInOut 1s ease-in-out';
    });
}

function createMorningEffect() {
    const morningElements = document.querySelectorAll('.morning-stories .comic-image');
    morningElements.forEach((img, index) => {
        setTimeout(() => {
            img.style.filter = 'brightness(1.3) saturate(1.2)';
            setTimeout(() => {
                img.style.filter = '';
            }, 400);
        }, index * 200);
    });
}

// ローディングアニメーション
function initLoadingAnimation() {
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingStatus = document.querySelector('.loading-status');
    
    let progress = 0;
    const statuses = [
        'Initializing Story Particles...',
        'Loading Visual Elements...',
        'Preparing Grid Layout...',
        'Charging Plot Accelerator...',
        'Ready to Accelerate Stories...'
    ];
    
    function updateProgress() {
        if (progress < 100) {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            loadingProgress.style.width = progress + '%';
            loadingPercentage.textContent = Math.floor(progress) + '%';
            
            const statusIndex = Math.floor((progress / 100) * (statuses.length - 1));
            loadingStatus.textContent = statuses[statusIndex];
            
            if (progress < 100) {
                setTimeout(updateProgress, 100 + Math.random() * 200);
            }
        }
    }
    
    updateProgress();
}

// ローディングオーバーレイを非表示
function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }
}

// メインアニメーションの初期化
function initMainAnimations() {
    // グリッドアイテムのフェードインアニメーション
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        }, index * 200);
    });
    
    // ヒーローセクションのアニメーション
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroActions = document.querySelector('.hero-actions');
    
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            heroTitle.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 100);
        }, 500);
    }
    
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(30px)';
            heroSubtitle.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 100);
        }, 700);
    }
    
    if (heroDescription) {
        setTimeout(() => {
            heroDescription.style.opacity = '0';
            heroDescription.style.transform = 'translateY(30px)';
            heroDescription.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }, 100);
        }, 900);
    }
    
    if (heroActions) {
        setTimeout(() => {
            heroActions.style.opacity = '0';
            heroActions.style.transform = 'translateY(30px)';
            heroActions.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                heroActions.style.opacity = '1';
                heroActions.style.transform = 'translateY(0)';
            }, 100);
        }, 1100);
    }
}

// 追加のCSSアニメーション
const additionalStyles = `
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

@keyframes fadeInOut {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes fadeInOut {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

@keyframes glow {
    0%, 100% { text-shadow: 0 0 20px var(--primary-purple); }
    50% { text-shadow: 0 0 30px var(--primary-purple), 0 0 40px var(--primary-purple); }
}
`;

// スタイルをドキュメントヘッドに追加
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);



 