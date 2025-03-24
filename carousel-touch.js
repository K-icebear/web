/**
 * iOS风格轮播触摸交互功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有轮播的触摸交互
    initCarouselTouchInteraction();
});

/**
 * 初始化轮播触摸交互
 */
function initCarouselTouchInteraction() {
    // 获取所有轮播容器
    const carouselContainers = document.querySelectorAll('.ios-carousel-container');
    
    carouselContainers.forEach(container => {
        // 为每个轮播容器添加触摸交互
        setupTouchInteraction(container);
    });
}

/**
 * 设置触摸交互
 * @param {HTMLElement} container - 轮播容器元素
 */
function setupTouchInteraction(container) {
    let startX, moveX, threshold = 50;
    let isMoving = false;
    let containerWidth = container.offsetWidth;
    
    // 获取当前容器的幻灯片和指示点
    const slides = container.classList.contains('project-carousel-container') 
        ? container.querySelectorAll('.project-carousel-slide')
        : container.querySelectorAll('.carousel-slide');
    
    const dots = container.classList.contains('project-carousel-container')
        ? container.querySelectorAll('.project-carousel-dot')
        : container.querySelectorAll('.carousel-dot');
    
    // 如果没有足够的幻灯片，不添加触摸交互
    if (slides.length <= 1) return;
    
    // 获取当前活动幻灯片索引
    function getCurrentIndex() {
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('active')) {
                return i;
            }
        }
        return 0;
    }
    
    // 切换到指定幻灯片
    function goToSlide(index) {
        // 确保索引在有效范围内
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // 获取当前索引
        const currentIndex = getCurrentIndex();
        
        // 如果索引相同，不执行切换
        if (currentIndex === index) return;
        
        // 标记当前幻灯片为前一个活动状态，用于退出动画
        slides[currentIndex].classList.add('prev-active');
        
        // 移除当前活动状态
        slides[currentIndex].classList.remove('active');
        if (dots.length > 0) {
            dots[currentIndex].classList.remove('active');
        }
        
        // 添加新的活动状态
        setTimeout(() => {
            // 移除所有幻灯片的prev-active类
            slides.forEach(slide => {
                slide.classList.remove('prev-active');
            });
            
            // 添加当前幻灯片的active类
            slides[index].classList.add('active');
            if (dots.length > 0) {
                dots[index].classList.add('active');
            }
        }, 50);
    }
    
    // 触摸开始事件
    container.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isMoving = true;
        containerWidth = container.offsetWidth; // 更新容器宽度
        
        // 添加滑动指示器
        if (!container.querySelector('.ios-carousel-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'ios-carousel-indicator';
            container.appendChild(indicator);
        }
    }, { passive: true });
    
    // 触摸移动事件
    container.addEventListener('touchmove', function(e) {
        if (!isMoving) return;
        
        moveX = e.touches[0].clientX;
        const diffX = moveX - startX;
        const percent = Math.abs(diffX) / containerWidth;
        
        // 更新滑动指示器
        const indicator = container.querySelector('.ios-carousel-indicator');
        if (indicator) {
            indicator.style.width = `${Math.min(percent * 100, 30)}%`;
            indicator.style.transform = `translateX(${diffX > 0 ? '0' : '100%'})`;
            indicator.style.left = diffX > 0 ? '10px' : 'auto';
            indicator.style.right = diffX > 0 ? 'auto' : '10px';
        }
        
        // 添加轻微的拖动效果
        if (Math.abs(diffX) > 10) {
            container.style.transform = `translateZ(0) scale(${0.99 - Math.min(percent * 0.05, 0.03)})`;
        }
    }, { passive: true });
    
    // 触摸结束事件
    container.addEventListener('touchend', function(e) {
        if (!isMoving) return;
        isMoving = false;
        
        // 恢复容器样式
        container.style.transform = '';
        
        // 移除滑动指示器
        const indicator = container.querySelector('.ios-carousel-indicator');
        if (indicator) {
            indicator.style.width = '0';
            setTimeout(() => {
                if (indicator && indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }
        
        // 如果没有移动，不执行切换
        if (!moveX) return;
        
        const diffX = moveX - startX;
        
        // 如果滑动距离超过阈值，切换幻灯片
        if (Math.abs(diffX) > threshold) {
            const currentIndex = getCurrentIndex();
            if (diffX > 0) {
                // 向右滑动，显示上一张
                goToSlide(currentIndex - 1);
            } else {
                // 向左滑动，显示下一张
                goToSlide(currentIndex + 1);
            }
        }
        
        // 重置触摸变量
        startX = null;
        moveX = null;
    }, { passive: true });
    
    // 鼠标事件（用于桌面端）
    let isMouseDown = false;
    
    container.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        isMouseDown = true;
        isMoving = true;
        containerWidth = container.offsetWidth;
        container.style.cursor = 'grabbing';
        
        // 添加滑动指示器
        if (!container.querySelector('.ios-carousel-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'ios-carousel-indicator';
            container.appendChild(indicator);
        }
        
        e.preventDefault();
    });
    
    container.addEventListener('mousemove', function(e) {
        if (!isMouseDown) return;
        
        moveX = e.clientX;
        const diffX = moveX - startX;
        const percent = Math.abs(diffX) / containerWidth;
        
        // 更新滑动指示器
        const indicator = container.querySelector('.ios-carousel-indicator');
        if (indicator) {
            indicator.style.width = `${Math.min(percent * 100, 30)}%`;
            indicator.style.transform = `translateX(${diffX > 0 ? '0' : '100%'})`;
            indicator.style.left = diffX > 0 ? '10px' : 'auto';
            indicator.style.right = diffX > 0 ? 'auto' : '10px';
        }
        
        // 添加轻微的拖动效果
        if (Math.abs(diffX) > 10) {
            container.style.transform = `translateZ(0) scale(${0.99 - Math.min(percent * 0.05, 0.03)})`;
        }
        
        e.preventDefault();
    });
    
    container.addEventListener('mouseup', function(e) {
        if (!isMouseDown) return;
        isMouseDown = false;
        isMoving = false;
        container.style.cursor = '';
        
        // 恢复容器样式
        container.style.transform = '';
        
        // 移除滑动指示器
        const indicator = container.querySelector('.ios-carousel-indicator');
        if (indicator) {
            indicator.style.width = '0';
            setTimeout(() => {
                if (indicator && indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }
        
        // 如果没有移动，不执行切换
        if (!moveX) return;
        
        const diffX = moveX - startX;
        
        // 如果滑动距离超过阈值，切换幻灯片
        if (Math.abs(diffX) > threshold) {
            const currentIndex = getCurrentIndex();
            if (diffX > 0) {
                // 向右滑动，显示上一张
                goToSlide(currentIndex - 1);
            } else {
                // 向左滑动，显示下一张
                goToSlide(currentIndex + 1);
            }
        }
        
        // 重置触摸变量
        startX = null;
        moveX = null;
        
        e.preventDefault();
    });
    
    container.addEventListener('mouseleave', function(e) {
        if (isMouseDown) {
            isMouseDown = false;
            isMoving = false;
            container.style.cursor = '';
            container.style.transform = '';
            
            // 移除滑动指示器
            const indicator = container.querySelector('.ios-carousel-indicator');
            if (indicator) {
                indicator.style.width = '0';
                setTimeout(() => {
                    if (indicator && indicator.parentNode) {
                        indicator.parentNode.removeChild(indicator);
                    }
                }, 300);
            }
        }
    });
}