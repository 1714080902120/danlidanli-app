<template>
  <div id="loading-2">
    <div class="loading-wrapper">
      <svg viewBox="0 0 50 50" class="circular">
        <circle cx="25" cy="25" r="20" fill="none" class="path" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading2",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
#loading-2 {
  .loading-wrapper {
    position: absolute;
    z-index: 3000;
    margin-top: -21px;
    margin-left: -21px;
    .circular {
      width: 1rem;
      height: 1rem;
      animation: loading-rotate 4s linear infinite;
      .path {
        animation: loading-dash 3s ease-in-out infinite;
        stroke-dasharray: 90 120;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: var(--color-tint);
        stroke-linecap: round;
      }
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90 150;
      stroke-dashoffset: -120px;
    }
  }

  @keyframes loading-rotate {
    to {
      transform: rotate(1turn);
    }
  }
}
</style>