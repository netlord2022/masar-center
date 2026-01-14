<script setup></script>

<template>
  <div class="overflow-hidden">
    <div
      class="w-auto md:overflow-hidden h-auto flex mx-auto lg:mx-0 sm:p-2 z-10 lg:pr-7 xl:pr-8"
    >
      <div
        class="loading-anim h-48 md:w-64 w-48 lg:h-72 lg:w-72 xl:h-80 xl:w-80 md:h-64"
      >
        <div
          class="ball ball-l relative h-full w-full flex items-center justify-center"
        >
          <svg
            width="32"
            height="32"
            viewBox="25.094999313354492 26.966995239257812 149.8090057373047 146.06700134277344"
            class="relative z-10 mx-auto h-3/4 w-3/4 my-auto flex self-center"
          >
            <path
              d="M38.74 91.034h136.164l-55.432-64.067v36.777H38.74c-7.536 0-13.645 6.109-13.645 13.645 0 7.535 6.109 13.645 13.645 13.645z"
              class="fill-secondary"
            />
            <path
              d="M161.26 108.967H25.095l55.432 64.067v-36.777h80.732c7.536 0 13.645-6.109 13.645-13.645s-6.108-13.645-13.644-13.645z"
              class="fill-primary"
            />
          </svg>
          <div class="absolute bottom-0 left-0 w-full h-full">
            <svg viewBox="0 0 512 512">
              <circle
                class="path-16 stroke-primary dark:stroke-white"
                cx="256"
                cy="256"
                fill="none"
                r="248"
                stroke-dasharray="3, 6"
              />
              <circle
                class="ball-0-dashed-cover ball-fx path-18 fx stroke-white dark:stroke-dark"
                stroke-width="4"
                cx="256"
                cy="256"
                fill="none"
                r="248"
                stroke-dashoffset="0"
                transform="translate(512,0) scale(-1,1) rotate(-90 256 256)"
              />
              <circle
                class="ball-0-stroke ball-fx path-17 fx stroke-primary dark:stroke-white"
                fill="none"
                stroke-width="1.5"
                cx="256"
                cy="256"
                r="248"
                transform="rotate(-90 256 256)"
              />
            </svg>
          </div>
          <div
            class="ball-0-disk ball-fx fx absolute bottom-0 left-0 w-full h-full"
          >
            <svg viewBox="0 0 512 512">
              <path
                class="path-14 fill-secondary"
                d="M262.941,504c0,3.9-3.1,7-7,7s-7-3.1-7-7s3.1-7,7-7S262.941,500.1,262.941,504z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/*** Circle Animation ***/

.ball-0-disk {
  animation-name: r360;
  animation-iteration-count: infinite;
}

.ball-l .ball-0-dashed-cover {
  animation-name: dashedAnim;
  stroke-dasharray: 1558.23;
  animation-delay: 2s;
}
@keyframes dashedAnim {
  0% {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 1558.23;
  }
}

.ball-l .ball-0-stroke {
  animation-name: strokAnim;
  stroke-dasharray: 1558.23;
  stroke-dashoffset: 1558.23;
  animation-delay: 6s;
}
@keyframes strokAnim {
  0% {
    stroke-dashoffset: 1558.23;
  }

  to {
    stroke-dashoffset: 0;
  }
}

.ball-fx {
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-play-state: paused;
  animation-duration: 4s;
}

.ball-fx.fx {
  animation-play-state: running;
}

@keyframes r360 {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
