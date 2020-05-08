<template>
<div id="calling-shuttle">
    <v-container class="calling-container pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0" xs12 sm12 md12 lg12 xl12 style="width: 100%; height: 100%;">
                <v-card id="map-container" class="pa-0 ma-0" style="width: 100% height: 100%" outlined tile></v-card>
            </v-flex>

            <v-flex class="pa-0 call-infomation" xs12 sm12 md12 lg12 xl12>
                <v-flex class="pa-4 desination" xs12 sm12 md12 lg12 xl12>
                    <v-row no-gutters>
                        <v-col cols="5">자율주행 테마파크</v-col>
                        <v-col cols="2">
                            <img src="../../assets/arrow-icon2.svg" class="display: inline-block;">
                        </v-col>
                        <v-col cols="5">선착장행</v-col>
                    </v-row>
                </v-flex>

                <v-divider class="ml-5 mr-5"></v-divider>

                <v-flex class="desination" xs12 sm12 md12 lg12 xl12>
                    <v-list class="pa-0">
                        <v-list-item>
                            <v-list-item-content style="text-align: right;">
                                <v-list-item-title class="desination-info-title">셔틀 번호</v-list-item-title>
                                <v-list-item-subtitle class="desination-info-subtitle">SCN004</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-avatar class="ma-4">
                                <v-img src="../../assets/profile.png"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content style="text-align: left;">
                                <v-list-item-title class="desination-info-title">담당자</v-list-item-title>
                                <v-list-item-subtitle class="desination-info-subtitle">주장혁</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                    <p class="arrive-wrap">
                        <span class="arrive-time">약 3분 후</span>
                        셔틀이 출발지에 도착합니다.
                    </p>
                </v-flex>

                <v-flex class="pa-0 call-cancel-btn">
                    <v-btn style="height: 50px;" color="#E61773" class="callShuttle">호출 취소하기</v-btn>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
    name: 'CallingShuttle',

    data: () => ({

    }),
}
</script>

<style scoped>
.call-infomation {
    position: fixed;
    width: 100%;
    height: 230px;
    background: #FFF;
    box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 35px 35px 0px 0px;
    z-index: 9;
    bottom: 0;
}

.desination {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: #262626;
    width: 100%;
}

.desination-info-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #828282;
}

.desination-info-subtitle {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #262626 !important;
}

.arrive-wrap {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #828282;
}

.arrive-time {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #E61773;
}

.call-cancel-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
