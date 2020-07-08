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
  width: 1rem;
  height: 1rem;
  z-index: 98;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .load-container {

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
    width: 0.325rem;
    height: 0.6375rem;
    background: #fff;
    border-radius: 0.6375rem 0 0 0.6375rem;
    top: -0.00625rem;
    left: -0.00625rem;
    -webkit-transform-origin: 0.325rem 0.31875rem;
    transform-origin: 0.325rem 0.31875rem;
    -webkit-animation: load2 2s infinite ease 1.5s;
    animation: load2 2s infinite ease 1.5s;
  }
  .load2 .loader {
    font-size: 11px;
    text-indent: -99999rem;
    margin: 0.3125rem auto;
    position: relative;
    width: 0.625rem;
    height: 0.625rem;
    box-shadow: inset 0 0 0 0.0625rem var(--color-tint);

  }
  .load2 .loader:after {
    width: 0.325rem;
    height: 0.6375rem;
    background: #fff;
    border-radius: 0 0.6375rem 0.6375rem 0;
    top: -0.00625rem;
    left: 0.31875rem;
    -webkit-transform-origin: 0px 0.31875rem;
    transform-origin: 0px 0.31875rem;
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