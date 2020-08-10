<template>
<div id="main">
    <v-container class="pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0 mt-12 mb-12 main-title" xs12 sm12 md12 lg12 xl12 style="width: 100%; height: 100%;">
                온리원 고군산
            </v-flex>
            <v-flex>
                <v-container fluid>
                    <v-row dense no-gutters align="center" justify="center">
                        <v-col v-for="card in cards" :key="card.title" cols="6" class="mb-5" align="center" justify="center">
                            <v-card :ripple="false" link :to="card.to" flat width="128px" height="128px" :disabled="card.disabled" :color="card.color" style="margin: 0; text-align: center; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); border-radius: 20px;">
                                <v-img :src="card.src" :gradient="card.gradient" class="align-center">
                                    <v-card-text v-html="card.title" class="site-btn pa-0 mb-9" style="padding: 3px;"></v-card-text>
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
            to: '/map/site',
            disabled: false,
            gradient: undefined,
            color: 'transparent'
        }]
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
    font-size: 15px;
    line-height: 23px;
    text-align: center;
    color: #262626;
}
</style>
