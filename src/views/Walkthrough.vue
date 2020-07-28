<template>
<v-container class="pa-0 ma-0 flex-wrap text-center" style="background-color: #FFF;" fluid grid-list-md fill-height>
    <v-layout wrap class="pa-6 ma-0">
        <v-flex xs12 sm12 md12 lg12 xl2 class="d-flex justify-end">
            <v-card class="jump-btn" flat @click="jump" v-if="change == 1">건너뛰기</v-card>
            <v-card class="jump-btn" flat @click="jump" v-else></v-card>
        </v-flex>

        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end text-center">
            <v-card color="transparent" width="100%" flat tile>
                <v-carousel v-model="model" :continuous="false" :cycle="cycle" :show-arrows="false" hide-delimiters>
                    <v-carousel-item v-for="(content, i) in contents" :key="i">
                        <v-sheet height="70%" tile>
                            <v-row class="fill-height" align="center" justify="center" style="background: #FFF">
                                <img :src="require(`../assets/step${i + 1}.gif`)" />
                            </v-row>
                        </v-sheet>
                        <v-sheet height="20%" tile>
                            <v-row class="fill-height" align="center" justify="center" style="background: #FFF">
                                <v-card class="text-center carousel-content-title" color="transparent" flat tile v-html="content.title"></v-card>
                            </v-row>
                        </v-sheet>
                        <v-sheet height="10%" tile>
                            <v-row class="fill-height pt-10" align="end" justify="center" style="background: #FFF">
                                <img :src="require(`../assets/walk-dot${i + 1}.svg`)" />
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-center text-center" style="display: none !important;">
            <v-card class="text-center" color="transparent" flat tile style="display: none;">
                <v-card-text style="display: none;">{{ isLargerThanTen }}</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 sm12 md12 class="d-flex justify-center align-end pb-0 pt-0">
            <v-btn block depressed tile color="#E61773" height="50px" class="next-btn" @click="model++" v-if="change == 1">다음</v-btn>
            <v-btn block depressed tile color="#E61773" height="50px" class="next-btn" @click="model++" v-else>시작하기</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'Walkthrough',

    data: () => ({
        contents: [{
                title: '<span style="width: 100%; text-align: center;">안녕하세요. 타시오 입니다.</span>'
            },
            {
                title: '<span style="width: 100%; text-align: center;">출발지, 목적지를 선택하고<br>도착 예정 시간을 확인하세요.</span>'
            },
            {
                title: '<span style="width: 100%; text-align: center;">자율주행셔틀, 시작할까요?</span>'
            }
        ],
        model: 0,
        cycle: false,
        change: 1
    }),

    created() {
        // 페이지 진입시history.pushState 인터페이스를 통해 새로운 history state를 추가하여 바로 이전 페이지로 갈 수 없도록 한다.
        // history.pushState(state, title, url);
        // history.pushState(null, null, location.href);

        // // 이후 페이지가 뒤로가면서 생기는 history의 변경을 popstate 이벤트로 캐치하여 처리한다.
        // window.onpopstate = function (event) {
        //     console.log('event: ', event)
        //     history.go(event.currentTarget.length);
        // };
    },

    mounted() {
        // window.callJsFunction = this.callJsFunction
    },

    watch: {
        model() {
            if (this.model == 2) {
                this.change = 2;

            } else {
                this.change = 1;
            }
        }
    },

    computed: {
        isLargerThanTen: function () {
            return this.model > 2 ? this.$router.replace('/auth/accessphone') : `${this.model}번째 페이지 입니다.`
        }
    },

    methods: {
        jump() {
            this.$router.replace('/auth/accessphone')
            // window.androidinfo.showInfoFromJs("name0")
            // this.$toasted.show(gh)
        },

        // callJsFunction(str) {
        //     this.$toasted.show(str)
        //     return "tasio call succeeded"
        // },
    }
}
</script>

<style scoped>
.jump-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: #E61773;
    height: min-content;
}

.carousel-content-title {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    line-height: 20px;
    color: #262626 !important;
}

.next-btn {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 16px !important;
    color: #FFFFFF !important;
    border-radius: 2px;
}
</style>
