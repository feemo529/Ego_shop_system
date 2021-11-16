<template>
  <div>
    <p>
      <span>W</span>
      <span>e</span>
      <span>l</span>
      <span>c</span>
      <span>o</span>
      <span>m</span>
      <span>e</span>
      <span>&nbsp;</span>
      <span>t</span>
      <span>o</span>
      <span>&nbsp;</span>
      <span>V</span>
      <span>u</span>
      <span>e</span>
      <span>&nbsp;</span>
      <span>s</span>
      <span>h</span>
      <span>o</span>
      <span>p</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'Welcome',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
div {
  height: 100%;
  display: grid;
  background-color: #e4fff7;
}

@text: #5362f6;
@shadow: #e485f8;

p {
  margin: auto;
  font-weight: 600;
  font-size: 7vw;
  color: @text;
  text-shadow: 6px 6px @shadow, 5.75px 5.75px @shadow, 5.5px 5.5px @shadow, 5.25px 5.25px @shadow,
    5px 5px @shadow, 4.75px 4.75px @shadow, 4.5px 4.5px @shadow, 4.25px 4.25px @shadow,
    4px 4px @shadow, 3.75px 3.75px @shadow, 3.5px 3.5px @shadow, 3.25px 3.25px @shadow,
    3px 3px @shadow, 2.75px 2.75px @shadow, 2.5px 2.5px @shadow, 2.25px 2.25px @shadow,
    2px 2px @shadow, 1.75px 1.75px @shadow, 1.5px 1.5px @shadow, 1.25px 1.25px @shadow,
    1px 1px @shadow, 0.75px 0.75px @shadow, 0.5px 0.5px @shadow, 0.25px 0.25px @shadow;
  span:nth-child(2n) {
    color: #ed625c;
    text-shadow: 6px 6px #f2a063, 5.75px 5.75px #f2a063, 5.5px 5.5px #f2a063, 5.25px 5.25px #f2a063,
      5px 5px #f2a063, 4.75px 4.75px #f2a063, 4.5px 4.5px #f2a063, 4.25px 4.25px #f2a063,
      4px 4px #f2a063, 3.75px 3.75px #f2a063, 3.5px 3.5px #f2a063, 3.25px 3.25px #f2a063,
      3px 3px #f2a063, 2.75px 2.75px #f2a063, 2.5px 2.5px #f2a063, 2.25px 2.25px #f2a063,
      2px 2px #f2a063, 1.75px 1.75px #f2a063, 1.5px 1.5px #f2a063, 1.25px 1.25px #f2a063,
      1px 1px #f2a063, 0.75px 0.75px #f2a063, 0.5px 0.5px #f2a063, 0.25px 0.25px #f2a063;
    animation-delay: 0.3s;
  }
  span:nth-child(3n) {
    color: #ffd913;
    text-shadow: 6px 6px #6ec0a9, 5.75px 5.75px #6ec0a9, 5.5px 5.5px #6ec0a9, 5.25px 5.25px #6ec0a9,
      5px 5px #6ec0a9, 4.75px 4.75px #6ec0a9, 4.5px 4.5px #6ec0a9, 4.25px 4.25px #6ec0a9,
      4px 4px #6ec0a9, 3.75px 3.75px #6ec0a9, 3.5px 3.5px #6ec0a9, 3.25px 3.25px #6ec0a9,
      3px 3px #6ec0a9, 2.75px 2.75px #6ec0a9, 2.5px 2.5px #6ec0a9, 2.25px 2.25px #6ec0a9,
      2px 2px #6ec0a9, 1.75px 1.75px #6ec0a9, 1.5px 1.5px #6ec0a9, 1.25px 1.25px #6ec0a9,
      1px 1px #6ec0a9, 0.75px 0.75px #6ec0a9, 0.5px 0.5px #6ec0a9, 0.25px 0.25px #6ec0a9;
    animation-delay: 0.15s;
  }
  span:nth-child(4n) {
    color: #f2a063;
    text-shadow: 6px 6px #e485f8, 5.75px 5.75px #e485f8, 5.5px 5.5px #e485f8, 5.25px 5.25px #e485f8,
      5px 5px #e485f8, 4.75px 4.75px #e485f8, 4.5px 4.5px #e485f8, 4.25px 4.25px #e485f8,
      4px 4px #e485f8, 3.75px 3.75px #e485f8, 3.5px 3.5px #e485f8, 3.25px 3.25px #e485f8,
      3px 3px #e485f8, 2.75px 2.75px #e485f8, 2.5px 2.5px #e485f8, 2.25px 2.25px #e485f8,
      2px 2px #e485f8, 1.75px 1.75px #e485f8, 1.5px 1.5px #e485f8, 1.25px 1.25px #e485f8,
      1px 1px #e485f8, 0.75px 0.75px #e485f8, 0.5px 0.5px #e485f8, 0.25px 0.25px #e485f8;
    animation-delay: 0.4s;
  }
  span:nth-child(7n),
  span:nth-child(11n) {
    animation-delay: 0.25s;
  }
  span {
    position: relative;
    animation: scatter 1.75s infinite;
  }
}

@keyframes scatter {
  0% {
    top: 0;
  }
  50% {
    top: -15px;
  }
  100% {
    top: 0;
  }
}
</style>
