<template>
<div id="main">
    <v-container class="pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0 mt-12 mb-12 main-title" xs12 sm12 md12 lg12 xl12 style="width: 100%; height: 100%;">
                탑승하실 지역을 선택하세요
            </v-flex>
            <v-flex>
                <v-container fluid>
                    <v-row dense>
                        <v-col v-for="card in cards" :key="card.title" cols="6" class="mb-5">
                            <v-card link :to="card.to" flat width="128px" height="128px" :disabled="card.disabled" :color="card.color" style="margin: 0 auto; text-align: center; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); border-radius: 20px;">
                                <v-img :src="card.src" :gradient="card.gradient" class="align-center">
                                    <v-card-title v-html="card.title" class="site-btn"></v-card-title>
                                </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
    data: () => ({
        cards: [{
                title: '<span style="width: 100%; text-align: center;">고군산<br>관광벨트</span>',
                src: require('../../assets/gunsan-btn.png'),
                to: '/map/gunsan',
                disabled: false,
                gradient: undefined,
                color: 'transparent'
            },
            {
                title: '<span style="width: 100%; text-align: center;">대구<br>수성알파시티</span>',
                src: require('../../assets/daegu-btn.png'),
                to: '/map/daegu',
                disabled: false,
                gradient: undefined,
                color: 'transparent'
            },
            {
                title: '<span style="width: 100%; text-align: center;">세종<br>호수공원</span>',
                src: require('../../assets/sejong1-btn.png'),
                to: '/map/sejong',
                disabled: true,
                gradient: "to top right, rgba(242, 242, 242, .8), rgba(242, 242, 242, .75)",
                color: '#F2F2F2'
            },
            {
                title: '<span style="width: 100%; text-align: center;">세종<br>산학연클러스터4-2</span>',
                src: require('../../assets/sejong2-btn.png'),
                to: '/map/sejong',
                disabled: true,
                gradient: "to top right, rgba(242, 242, 242, .8), rgba(242, 242, 242, .75)",
                color: '#F2F2F2'
            },
            {
                title: '<span style="width: 100%; text-align: center;">상암<br>DMC홍보관</span>',
                src: require('../../assets/sangam-btn.png'),
                to: '/map/sangam',
                disabled: true,
                gradient: "to top right, rgba(242, 242, 242, .8), rgba(242, 242, 242, .75)",
                color: '#F2F2F2'
            },
        ],
    })
}
</script>

<style scoped>
.main-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    text-align: center;

    color: #262626;
}

.site-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    text-align: center;
    color: #262626;
}
</style>
