<template>
  <div id="loading">
    <div class="load-container load2">
      <div class="loader">Loading...</div>
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
  width: 1.5em;
  height: 1.5em;
  z-index: 9999;
  left: 340px;
  .load-container {
    position: absolute;
    bottom: -19px;
    left: 9px;
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
    width: 2.6em;
    height: 5.1em;
    background: #fff;
    border-radius: 5.1em 0 0 5.1em;
    top: -0.05em;
    left: -0.05em;
    -webkit-transform-origin: 2.6em 2.55em;
    transform-origin: 2.6em 2.55em;
    -webkit-animation: load2 2s infinite ease 1.5s;
    animation: load2 2s infinite ease 1.5s;
  }
  .load2 .loader {
    font-size: 11px;
    text-indent: -99999em;
    margin: 2.5em auto;
    position: relative;
    width: 5em;
    height: 5em;
    box-shadow: inset 0 0 0 .5em var(--color-tint);

  }
  .load2 .loader:after {
    width: 2.6em;
    height: 5.1em;
    background: #fff;
    border-radius: 0 5.1em 5.1em 0;
    top: -0.05em;
    left: 2.55em;
    -webkit-transform-origin: 0px 2.55em;
    transform-origin: 0px 2.55em;
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