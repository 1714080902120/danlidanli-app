import 'assets/css/waves/waves.css';

const vueWaves = {};
vueWaves.install = (Vue, options = {}) => {
  Vue.directive('waves', {
    bind(el, binding) {
      el.addEventListener('touchstart', e => {
        const customOpts = Object.assign(options, binding.value);
        const opts = Object.assign({
          ele: el, // 波纹作用元素
          color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
        }, customOpts),
          target = opts.ele;
        if (target) {
          target.style.position = 'relative';
          target.style.overflow = 'hidden';
          const rect = target.getBoundingClientRect();
          let ripple = target.querySelector('.waves-ripple');
          if (!ripple) {
            ripple = document.createElement('span');
            ripple.className = 'waves-ripple';
            ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
            target.appendChild(ripple);
          } else {
            ripple.className = 'waves-ripple';
          }
          ripple.style.top = ((e.touches[0].pageY - rect.top - rect.height / 2) / 2 - window.pageYOffset - document.documentElement.clientTop) + 'px';
          ripple.style.left = ((e.touches[0].pageX - rect.left - rect.width / 2) / 2 - window.pageXOffset - document.documentElement.clientLeft) + 'px';
          ripple.style.backgroundColor = opts.color;
          ripple.className = 'waves-ripple z-active';
          return false;
        }
      }, false);
    }
  })
};

export default vueWaves;