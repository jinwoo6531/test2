<template>
<div id="introduction">
    <v-container class="pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout wrap class="ma-0">
            <v-flex class="pa-0 persentH" xs12 sm12 md12>
                <v-card xs12 sm12 md12 flat tile>
                    <v-card xs12 sm12 md12 flat tile>
                        <img src="../../assets/introduction-img.png" style="display: inlin-block; width: 100%;">
                    </v-card>
                    <v-card flat tile>
                        <v-card class="text-justify pa-5 intro-wrap" flat tile>
                            TASIO는 스프링클라우드에서 론칭한 자율주행 셔틀 고객 중심 서비스 브랜드입니다. <br>
                            스프링클라우드는 2019년 9월에 민간기업 최초로 국토교통부로부터 운전석이 없는 무인 자율주행 차량의 임시운행 허가를 획득했습니다. <br>
                            스프링클라우드는 자율주행 차량을 많은 사람들이 보다 더 안전하게 이용할 수 있도록 노력할 것입니다.
                        </v-card>

                        <v-card class="text-justify pa-5 intro-wrap" flat tile>
                            <p class="font-weight-bold">추가 정보:</p>
                            <p>자세한 내용은 TASIO 웹사이트를 참고하세요.</p>
                            <a href="http://www.tasio.io/" style="text-decoration: none; color: #0094FF;">www.tasio.io</a>
                        </v-card>

                        <v-card class="text-justify pa-5 intro-wrap" flat tile>
                            <p class="font-weight-bold">Contact</p>
                            <p>자세한 내용은 TASIO 웹사이트를 참고하세요.</p>
                            <a href="http://www.tasio.io/" style="text-decoration: none; color: #0094FF;">www.tasio.io</a>
                        </v-card>
                    </v-card>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {

}
</script>

<style>
.intro-wrap {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 23px;
    color: #555555;
}
</style>
