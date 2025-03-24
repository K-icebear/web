/**
 * iOS风格动画和交互效果
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有iOS风格动画
    initIosAnimations();
    
    // 初始化平滑滚动
    initSmoothScrolling();
    
    // 初始化视差效果
    initParallaxEffects();
    
    // 初始化图片加载动画
    initImageLoadEffects();
    
    // 初始化导航栏滚动效果
    initNavScrollEffects();
    
    // 初始化微交互
    initMicroInteractions();
    
    // 初始化页面过渡
    initPageTransitions();
    
    // 优化加载动画
    enhanceLoader();
    
    // 优化移动菜单动画
    enhanceMobileMenu();
    
    // 优化主题切换动画
    enhanceThemeToggle();
    
    // 优化AI聊天助手动画
    enhanceAiChatAnimations();
});

/**
 * 初始化iOS风格动画
 */
function initIosAnimations() {
    // 将现有的动画类替换为iOS风格的动画类
    document.querySelectorAll('.animate-fade-in').forEach(el => {
        el.classList.remove('animate-fade-in');
        el.classList.add('ios-fade-in');
    });
    
    document.querySelectorAll('.animate-fade-up').forEach(el => {
        el.classList.remove('animate-fade-up');
        el.classList.add('ios-fade-up');
    });
    
    document.querySelectorAll('.animate-bounce').forEach(el => {
        el.classList.remove('animate-bounce');
        el.classList.add('ios-bounce');
    });
    
    document.querySelectorAll('.animate-pulse-slow').forEach(el => {
        el.classList.remove('animate-pulse-slow');
        el.classList.add('ios-pulse');
    });
    
    // 为卡片添加iOS风格悬停效果
    document.querySelectorAll('.card-hover').forEach(el => {
        el.classList.add('ios-card');
    });
    
    // 为按钮添加iOS风格点击效果
    document.querySelectorAll('a, button').forEach(el => {
        if (!el.classList.contains('ios-button') && 
            !el.closest('.mobile-menu') && 
            !el.closest('#ai-chat-container')) {
            el.classList.add('ios-button');
        }
    });
    
    // 为滚动指示器添加iOS风格动画
    const scrollIndicator = document.querySelector('.absolute.bottom-10.left-1\/2');
    if (scrollIndicator) {
        scrollIndicator.classList.add('ios-scroll-indicator');
    }
}

/**
 * 初始化平滑滚动
 */
function initSmoothScrolling() {
    // 为所有锚点链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // 计算目标位置，考虑固定导航栏的高度
            const navHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            // 使用平滑滚动
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 如果是移动菜单中的链接，关闭菜单
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    });
}

/**
 * 初始化视差效果
 */
function initParallaxEffects() {
    // 添加视差滚动效果
    const parallaxElements = document.querySelectorAll('.bg-pattern, .bg-circle');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = 0.05;
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // 添加鼠标移动视差效果
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        parallaxElements.forEach(el => {
            const speed = 0.01;
            const xPos = (mouseX - window.innerWidth / 2) * speed;
            const yPos = (mouseY - window.innerHeight / 2) * speed;
            el.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

/**
 * 初始化图片加载动画
 */
function initImageLoadEffects() {
    // 为所有图片添加加载动画
    document.querySelectorAll('img').forEach(img => {
        // 跳过已加载的图片
        if (img.complete) return;
        
        // 添加淡入类
        img.classList.add('ios-image-fade');
        
        // 图片加载完成后添加loaded类
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // 图片加载失败处理
        img.addEventListener('error', function() {
            // 如果有错误处理类，不添加loaded类
            if (!this.classList.contains('img-error-fallback')) {
                this.classList.add('loaded');
            }
        });
    });
}

/**
 * 初始化导航栏滚动效果
 */
function initNavScrollEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // 添加iOS导航栏滚动类
    header.classList.add('ios-nav-scroll');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            // 滚动时增加阴影和背景不透明度
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'blur(10px)';
            
            if (document.documentElement.classList.contains('dark')) {
                header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        } else {
            // 恢复初始状态
            header.style.boxShadow = '';
            header.style.backdropFilter = 'blur(5px)';
            
            if (document.documentElement.classList.contains('dark')) {
                header.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            }
        }
    });
}

/**
 * 初始化微交互
 */
function initMicroInteractions() {
    // 为导航菜单项添加微交互
    document.querySelectorAll('.nav-dot').forEach(el => {
        el.classList.add('ios-micro-interaction');
    });
    
    // 为社交媒体图标添加微交互
    document.querySelectorAll('.social-icon').forEach(el => {
        el.classList.add('ios-micro-interaction');
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        el.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * 初始化页面过渡
 */
function initPageTransitions() {
    // 为主要内容区域添加页面过渡效果
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('ios-page-transition');
    });
    
    // 使用Intersection Observer API检测元素进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                // 只有当元素完全离开视口时才重置
                if (entry.boundingClientRect.top > window.innerHeight) {
                    entry.target.style.opacity = '0.5';
                    entry.target.style.transform = 'translateY(20px)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // 观察所有部分
    document.querySelectorAll('section:not(.min-h-screen)').forEach(section => {
        // 设置初始状态
        section.style.opacity = '0.5';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });
}

/**
 * 优化加载动画
 */
function enhanceLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // 添加iOS加载器类
    loader.classList.add('ios-loader');
    
    // 优化加载动画
    window.addEventListener('load', function() {
        // 延迟一点以确保页面完全渲染
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 300);
    });
}

/**
 * 优化移动菜单动画
 */
function enhanceMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    if (!mobileMenu || !menuToggle) return;
    
    // 添加iOS移动菜单类
    mobileMenu.classList.add('ios-mobile-menu');
    
    // 重新绑定菜单切换事件
    const originalToggleEvent = menuToggle.onclick;
    menuToggle.onclick = null;
    
    menuToggle.addEventListener('click', function() {
        if (mobileMenu.classList.contains('hidden')) {
            // 显示菜单
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            document.body.classList.add('overflow-hidden');
            
            // 触发动画
            setTimeout(() => {
                mobileMenu.style.opacity = '1';
                mobileMenu.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // 隐藏菜单
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            
            // 等待动画完成后隐藏
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 300);
        }
    });
    
    // 为移动菜单链接添加点击效果
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }, 300);
        });
    });
}

/**
 * 优化主题切换动画
 */
function enhanceThemeToggle() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (!themeToggle && !mobileThemeToggle) return;
    
    // 添加主题过渡类
    html.classList.add('ios-theme-transition');
    
    // 优化主题切换函数
    const toggleTheme = function() {
        // 添加过渡效果
        document.body.style.opacity = '0.8';
        document.body.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            // 切换主题
            html.classList.toggle('dark');
            
            // 更新图标
            const moonIcon = document.getElementById('moon-icon');
            const sunIcon = document.getElementById('sun-icon');
            const mobileMoonIcon = document.getElementById('mobile-moon-icon');
            const mobileSunIcon = document.getElementById('mobile-sun-icon');
            
            if (moonIcon && sunIcon) {
                moonIcon.classList.toggle('hidden');
                sunIcon.classList.toggle('hidden');
            }
            
            if (mobileMoonIcon && mobileSunIcon) {
                mobileMoonIcon.classList.toggle('hidden');
                mobileSunIcon.classList.toggle('hidden');
            }
            
            // 保存主题设置
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            // 恢复过渡效果
            setTimeout(() => {
                document.body.style.opacity = '1';
                document.body.style.transform = 'scale(1)';
            }, 50);
        }, 150);
    };
    
    // 重新绑定主题切换事件
    if (themeToggle) {
        themeToggle.onclick = null;
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.onclick = null;
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
}

/**
 * 优化AI聊天助手动画
 */
function enhanceAiChatAnimations() {
    const aiChatButton = document.getElementById('ai-chat-button');
    const aiChatContainer = document.getElementById('ai-chat-container');
    const aiChatClose = document.getElementById('ai-chat-close');
    
    if (!aiChatButton || !aiChatContainer || !aiChatClose) return;
    
    // 添加iOS风格类
    aiChatButton.classList.add('ios-pulse');
    aiChatContainer.classList.add('ios-mobile-menu');
    
    // 重新绑定打开聊天窗口事件
    aiChatButton.onclick = null;
    aiChatButton.addEventListener('click', function() {
        aiChatContainer.classList.remove('scale-0');
        aiChatContainer.style.opacity = '0';
        aiChatContainer.style.transform = 'scale(0.9) translateY(20px)';
        
        // 触发动画
        setTimeout(() => {
            aiChatContainer.style.opacity = '1';
            aiChatContainer.style.transform = 'scale(1) translateY(0)';
        }, 10);
        
        // 聚焦输入框
        const aiChatInput = document.getElementById('ai-chat-input');
        if (aiChatInput) {
            setTimeout(() => {
                aiChatInput.focus();
            }, 300);
        }
        
        // 检查是否在GitHub Pages环境下
        const isGitHubPages = window.location.hostname.includes('github.io');
        const aiChatMessages = document.getElementById('ai-chat-messages');
        if (isGitHubPages && aiChatMessages && aiChatMessages.children.length === 0) {
            // 添加欢迎消息
            if (typeof addAiMessage === 'function') {
                addAiMessage('您好！我是AI助手。我可以回答各种问题，包括常识问答等。如果API连接失败，我会使用本地响应模式继续为您服务。');
            }
        }
    });
    
    // 重新绑定关闭聊天窗口事件
    aiChatClose.onclick = null;
    aiChatClose.addEventListener('click', function() {
        aiChatContainer.style.opacity = '0';
        aiChatContainer.style.transform = 'scale(0.9) translateY(20px)';
        
        // 等待动画完成后隐藏
        setTimeout(() => {
            aiChatContainer.classList.add('scale-0');
        }, 300);
    });
    
    // 优化退出按钮
    const aiChatExit = document.getElementById('ai-chat-exit');
    if (aiChatExit) {
        aiChatExit.onclick = null;
        aiChatExit.addEventListener('click', function() {
            aiChatContainer.style.opacity = '0';
            aiChatContainer.style.transform = 'scale(0.9) translateY(20px)';
            
            // 等待动画完成后隐藏
            setTimeout(() => {
                aiChatContainer.classList.add('scale-0');
            }, 300);
        });
    }
    
    // 优化消息动画
    const addMessageAnimation = function() {
        const messages = document.querySelectorAll('#ai-chat-messages > div');
        const lastMessage = messages[messages.length - 1];
        
        if (lastMessage) {
            lastMessage.style.opacity = '0';
            lastMessage.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                lastMessage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                lastMessage.style.opacity = '1';
                lastMessage.style.transform = 'translateY(0)';
            }, 10);
        }
    };
    
    // 监听消息容器变化
    const aiChatMessages = document.getElementById('ai-chat-messages');
    if (aiChatMessages) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    addMessageAnimation();
                }
            });
        });
        
        observer.observe(aiChatMessages, { childList: true });
    }
}