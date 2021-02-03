<template>
    <v-app class="map">
        <!-- Side Bar -->
        <v-navigation-drawer temporary class="pa-5" style="width: 275px !important; z-index: 999;" v-model="drawer" app>
            <v-list dense>
                <v-list-item class="pl-0">
                    <v-list-item-content>
                        <v-list-item-title>
                            <img src="../assets/side-logo.svg" />
                        </v-list-item-title>
                        <v-list-item-subtitle class="logo-content">스프링클라우드 자율주행 셔틀</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
    
                <template v-if="user.data">
              <v-list-item class="pa-0">
                <v-list-item-content>
                  <v-row class="ma-0" style="height: 30px;">
                    <v-col class="pa-0" cols="10">
                      <v-row class="ma-0">
                        <v-col class="pa-0 sidebar-displayName">{{ user.data.displayName }}님</v-col>
                      </v-row>
                      <v-row class="ma-0">
                        <v-col class="pa-0 pt-1 sidebar-phoneNumber">{{ getPhoneNumber }}</v-col>
                      </v-row>
                    </v-col>
                    <v-col class="pa-0 setting-btn">
                      <router-link to="/userinfo">
                        <img src="../assets/setting.svg" />
                      </router-link>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
</template>

<template v-else>
    <v-list-item link to="/auth/accessphone">
        <v-list-item-content>
            <v-list-item-title>로그인</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

        <v-divider class="mt-3 mb-4"></v-divider>

        <v-list-item link to="/introduction" class="pa-0">
          <v-list-item-content class="pa-0">
            <v-list-item-title class="sidebar-menu-title">타시오 소개</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="boldMenu pa-0 mt-4">
          <v-list-item-content class="pa-0">
            <v-list-item-title class="sidebar-menu-title">
              <v-list-item link to="/" class="pa-0">
                <v-list-item-content class="pa-0">
                  <v-list-item-title class="sidebar-menu-title">전체 지역보기</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-title>

            <v-list-item link :to="{ name: 'Site', params: { siteId: 2 }}" class="ma-0">
              <v-list-item-content>
                <v-list-item-title class="sidebar-submenu-title" style="color: #828282;">
                  <!-- <v-badge
                    color="#E61773"
                    content="준비중"
                    offset-x="-2"
                    offset-y="10px"
                    style="z-index: 15;"
                  > -->
                  대구 수성알파시티
                  <!-- </v-badge> -->
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link :to="{ name: 'Site', params: { siteId: 18 }}" class="ma-0">
              <v-list-item-content>
                <v-list-item-title class="sidebar-submenu-title" style="color: #828282;">
                  세종 산학연클러스터 4-2
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item class="ma-0">
              <v-list-item-content class="pa-0">
                <v-list-item-title class="sidebar-submenu-title" style="color: #BDBDBD;">
                  <v-badge
                    color="#E61773"
                    content="준비중"
                    offset-x="-2"
                    offset-y="10px"
                    style="z-index: 15;"
                  >세종 호수공원</v-badge>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

             <v-list-item class="ma-0">
              <v-list-item-content class="pa-0">
                <v-list-item-title class="sidebar-submenu-title" style="color: #BDBDBD;">
                  <v-badge
                    color="#E61773"
                    content="준비중"
                    offset-x="-2"
                    offset-y="10px"
                    style="z-index: 15;"
                  >고군산 관광벨트</v-badge>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item> 
            
            <v-list-item class="ma-0">
              <v-list-item-content class="pa-0">
                <v-list-item-title class="sidebar-submenu-title" style="color: #BDBDBD;">
                  <v-badge
                    color="#E61773"
                    content="준비중"
                    offset-x="-2"
                    offset-y="10px"
                    style="z-index: 15;"
                  >상암DMC홍보관</v-badge>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="boldMenu pa-0 mt-4" link to="/schedule">
          <v-list-item-content class="pa-0">
            <v-list-item-title class="sidebar-menu-title">운행 시간표</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item class="boldMenu pa-0 mt-2" link to="/faq">
                <v-list-item-content class="pa-0">
                    <v-list-item-title class="sidebar-menu-title">
                        자주 묻는 질문
                    </v-list-item-title>
                </v-list-item-content>
        </v-list-item>-->

        <v-list-item class="boldMenu pa-0 mt-2" link to="/serviceinfo">
          <v-list-item-content class="pa-0">
            <v-list-item-title class="sidebar-menu-title">서비스 정보</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-footer class="copyrightStyle nav-footer pa-0">
        <span>
          COPYRIGHT@SPRINGCLOUD INC.
          <br />ALL RIGHTS RESERVED.
        </span>
      </v-footer>
    </v-navigation-drawer>

    <!-- Main -->
    <v-content>
      <v-card style="background: transparent;" :height="getHeight" class="pa-0" flat>
        <v-row style="height: 100%;" no-gutters justify="start" xs12 sm12 md12>
          <v-col style="height: 100%;" cols="4">
            <div style="height: 100%;" class="nav-icon">
              <img
                src="../assets/nav-icon.svg"
                style="height: 100%; padding: 8px;"
                @click.stop="drawer = !drawer"
              />
            </div>
          </v-col>
          <v-col style="height: 100%;" cols="4">
            <div class="nav-icon" style="height: 100%; text-align: center; line-height: 57px;">
              <img src="../assets/tasio-logo.svg" class="persentH" style="padding: 8px;" />
            </div>
          </v-col>
          <v-col style="height: 100%;" cols="4">
            <div class="nav-icon" style="height: 100%; text-align: center;"></div>
          </v-col>
        </v-row>
      </v-card>

      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data: () => ({
        drawer: null
    }),

    computed: {
        ...mapGetters({
            user: "user"
        }),

        getHeight() {
            return this.$vuetify.breakpoint.xs ? 57 : "70";
        },

        getPhoneNumber() {
            let start = String(this.user.data.phoneNumber).substring(3, 5);
            let mid = String(this.user.data.phoneNumber).substring(5, 9);
            let end = String(this.user.data.phoneNumber).substring(9, 13);
            return "0" + start + "-" + mid + "-" + end;
        }
    }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
.leaflet-control-container .leaflet-routing-container-hide {
    display: none;
}

.v-navigation-drawer__content {
    position: relative !important;
}

.v-navigation-drawer__content::-webkit-scrollbar {
    display: none;
}

.v-badge__badge {
    border-radius: 7px !important;
}

.v-list-item {
    padding-right: 0 !important;
}

.v-list .v-list-item--active {
    color: transparent;
}

.v-ripple__container {
    display: none !important;
}

.theme--light.v-list-item:hover::before {
    opacity: 0 !important;
}

.logo-content {
    font-weight: bold;
    font-size: 12px;
    color: #e61773;
    margin-top: 10px;
}

.nav-icon {
    position: relative;
    z-index: 9;
    width: 100%;
}

.sidebar-displayName {
    font-weight: 500;
    font-size: 16px;
    color: #262626;
}

.sidebar-phoneNumber {
    font-weight: normal;
    font-size: 12px;
    color: #828282;
}

.setting-btn {
    width: 100%;
    height: 100%;
    line-height: 34px;
    text-align: center;
}

.sidebar-menu-title {
    font-style: normal;
    font-weight: 500 !important;
    font-size: 16px !important;
    color: #262626;
}

.sidebar-submenu-title {
    font-style: normal;
    font-weight: normal !important;
    font-size: 14px !important;
}

.copyrightStyle {
    font-family: Roboto !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 10px !important;
    line-height: 14px;
    color: #bdbdbd !important;
    background: transparent !important;
    position: absolute;
    bottom: 0;
}

.map-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

#map-container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 5;
}

.selectBox {
    width: 100%;
    position: fixed;
    z-index: 9;
    bottom: 0;
}

.selectStationWrap {
    width: 100%;
    height: 90px;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    text-align: center;
}

.divide-bar {
    display: inline-block;
    width: 100%;
    border: 0.8px dashed #e0e0e0;
}

.callShuttle {
    width: 100%;
    border-radius: 0;
    color: #fff !important;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
}

.person-modal {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500 !important;
    font-size: 13px !important;
    color: #e61773 !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    margin-bottom: 10px;
}

.count {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    color: #262626 !important;
    margin: 0 29px;
}

.select-person-btn {
    width: 100%;
    height: 50px;
    background: #e61773 !important;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #ffffff !important;
    position: absolute;
    bottom: 0;
}

/* Current Location */

#current_container {
    width: 40px;
    height: 40px;
    top: -20px;
    left: -20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

.current_item {
    border-radius: 50%;
    width: 11px;
    height: 11px;
    background: #f82323;
    z-index: 10;
}

.current_item2 {
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: #ffffff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
    position: absolute;
    z-index: 9;
}

.current_circle {
    border-radius: 50%;
    background-color: #eb5757;
    box-shadow: inset 0px 0px 4px rgba(255, 0, 0, 0.4);
    width: 15px;
    height: 15px;
    position: absolute;
    opacity: 0;
    animation: scaleIn 4s infinite cubic-bezier(0.36, 0.11, 0.89, 0.32);
}

@keyframes scaleIn {
    from {
        transform: scale(0.5, 0.5);
        opacity: 0.5;
    }
    to {
        transform: scale(2.5, 2.5);
        opacity: 0;
    }
}
</style>
