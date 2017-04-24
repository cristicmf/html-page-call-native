<template>
  <div class="sticky sticky-download">
    <div class="sticky-main">
      <p class="name">callapp demo</p>
      <p>Hi</p>
    </div>
    <div class="sticky-oth">
      <span class="btn-openapp">立即打开</span>
    </div>
    <a blockid='bottom' clickid='download_foot' class="down-lnk"  @click.prevent="openApp"></a>
  </div>
</template>

<script>
import { callApp } from '../util'
export default {
  name: 'bottom-bar',
  methods: {
    openApp () {
      callApp({})
    }
  }
}
</script>
