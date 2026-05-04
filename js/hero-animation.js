// Hero Section Animation
// 背景图片流动 + 主标题字母交互

(function() {
  'use strict';

  window.addEventListener('load', function() {
    initBackgroundFlow();
    initTitleInteraction();
  });

  // ===== 背景图片流动效果 =====
  function initBackgroundFlow() {
    const style = document.createElement('style');
    style.id = 'hero-flow-style';
    style.textContent = `
      /* 背景图片容器 - 整体缓慢漂浮 */
      .hero-shap-img-wrap {
        animation: bgFloat 20s ease-in-out infinite;
      }

      @keyframes bgFloat {
        0%, 100% {
          transform: translate(0, 0) rotate(0deg) scale(1);
        }
        25% {
          transform: translate(15px, -20px) rotate(1deg) scale(1.02);
        }
        50% {
          transform: translate(-10px, 15px) rotate(-0.5deg) scale(1.03);
        }
        75% {
          transform: translate(20px, 10px) rotate(0.5deg) scale(1.01);
        }
      }

      /* 背景图片 - 内部轻微呼吸缩放 */
      .hero-shap-img {
        animation: imgBreathe 8s ease-in-out infinite;
      }

      @keyframes imgBreathe {
        0%, 100% {
          transform: scale(1);
          filter: brightness(1);
        }
        50% {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== 主标题字母交互 =====
  function initTitleInteraction() {
    const h1 = document.querySelector('.hero-bottom-h1');
    if (!h1) return;

    // 添加样式
    const style = document.createElement('style');
    style.id = 'hero-title-interaction';
    style.textContent = `
      .hero-title-char {
        display: inline-block;
        transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),
                    opacity 0.15s ease;
        transition-delay: 0s;
        will-change: transform;
      }

      .hero-title-char:hover {
        transform: translateY(-10px);
      }

      /* 坠落动画 - 使用独立class控制 */
      .hero-title-char.falling {
        transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      /* 保持换行 */
      .hero-title-br {
        display: block;
        content: '';
        width: 100%;
      }
    `;
    document.head.appendChild(style);

    // 拆分文字为单个字符
    const originalHTML = h1.innerHTML;
    const lines = originalHTML.split('<br>');

    const wrappedLines = lines.map(line => {
      const chars = line.trim().split('');
      return chars.map(char => {
        if (char === ' ') {
          return '<span class="hero-title-char hero-title-space">&nbsp;</span>';
        }
        return `<span class="hero-title-char">${char}</span>`;
      }).join('');
    });

    h1.innerHTML = wrappedLines.join('<br>');

    // 添加坠落效果：鼠标离开字符时
    h1.addEventListener('mouseleave', () => {
      const chars = h1.querySelectorAll('.hero-title-char');
      chars.forEach(char => {
        char.classList.add('falling');
      });
    });

    h1.addEventListener('mouseenter', () => {
      const chars = h1.querySelectorAll('.hero-title-char');
      chars.forEach(char => {
        char.classList.remove('falling');
      });
    });
  }

})();
