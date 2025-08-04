// DOM要素の取得
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.plottron-comic-glitch');
    const gridItems = document.querySelectorAll('.grid-item');
    const navigationLinks = document.querySelectorAll('.navigation a');
    
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
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#1a1a1a';
            header.style.backdropFilter = 'none';
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