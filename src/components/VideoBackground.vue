<template>
  <div class="video-background">
    <video autoplay muted loop id="background-video">
      <source src="@/assets/video/video2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  name: "VideoBackground",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.video-background {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

#background-video {
  object-fit: cover; 
  width: 100%;
  height: 100%;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 50px;
}

h1 {
  font-size: 3rem;
}

p {
  font-size: 1.5rem;
}
</style>
