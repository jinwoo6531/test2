<template>
  <v-app id="tasio">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap");

#tasio {
  width: 100%;
  height: 100%;
  background: #fafafa !important;
  font-family: "Noto Sans KR", sans-serif;
  position: relative;
}

.theme--light.v-application {
  background: #fafafa !important;
  font-family: "Noto Sans KR", sans-serif;
}

.progress {
  position: absolute;
  top: 50%;
  transform: translateY(-90%);
}

/* Navigation-drawer */
.boldMenu {
  margin-top: 20px;
}

.nav-footer {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;
  display: flex;
  align-items: flex-end;
  color: #bdbdbd;
}

.persentH {
  width: 100%;
  height: 100%;
}

.v-btn:hover:before,
.v-btn:focus:before {
  background-color: transparent;
}

.v-card:hover:before,
.v-card:focus:before {
  background-color: transparent;
}

.v-checkbox:hover:before,
.v-checkbox:focus:before {
  background-color: transparent;
}
</style>
