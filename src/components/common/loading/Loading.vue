<template>
  <div id="loading">
    <div class="load-container load2">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
#loading {
  position: absolute;
  background-color: #fff;
  border-radius: 100%;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 98;
  left: 4.25rem;
  .load-container {
    position: absolute;
    top: -.5rem;
    left: .125rem;
  }
  .load2 .loader,
  .load2 .loader:before,
  .load2 .loader:after {
    border-radius: 50%;
  }
  .load2 .loader:before,
  .load2 .loader:after {
    position: absolute;
    content: "";
  }
  .load2 .loader:before {
    width: .65rem;
    height: 1.275rem;
    background: #fff;
    border-radius: 1.275rem 0 0 1.275rem;
    top: -0.0125rem;
    left: -0.0125rem;
    -webkit-transform-origin: .65rem 0.6375rem;
    transform-origin: .65rem 0.6375rem;
    -webkit-animation: load2 2s infinite ease 1.5s;
    animation: load2 2s infinite ease 1.5s;
  }
  .load2 .loader {
    font-size: 11px;
    text-indent: -99999rem;
    margin: 0.625rem auto;
    position: relative;
    width: 1.25rem;
    height: 1.25rem;
    box-shadow: inset 0 0 0 .125rem var(--color-tint);

  }
  .load2 .loader:after {
    width: .65rem;
    height: 1.275rem;
    background: #fff;
    border-radius: 0 1.275rem 1.275rem 0;
    top: -0.0125rem;
    left: 0.6375rem;
    -webkit-transform-origin: 0px 0.6375rem;
    transform-origin: 0px 0.6375rem;
    -webkit-animation: load2 2s infinite ease;
    animation: load2 2s infinite ease;
  }
}

  @-webkit-keyframes load2 {
    0% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
  @keyframes load2 {
    0% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
</style>