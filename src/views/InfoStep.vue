<template>
<v-app>
    <v-container>
        <v-layout row wrap>
            <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
                <v-btn @click="jump">건너뛰기</v-btn>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
                <v-carousel v-model="model" :continuous="false" :cycle="cycle" :show-arrows="false" hide-delimiters>
                    <v-carousel-item v-for="(content, i) in contents" :key="content">
                        <v-sheet height="70%" tile>
                            <v-row class="fill-height" align="center" justify="center">
                                <div class="display-3">Tasio {{ i + 1 }}</div>
                            </v-row>
                        </v-sheet>
                        <v-sheet height="30%" tile>
                            <v-row class="fill-height" align="center" justify="center">
                                {{ content }}
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
                <v-btn style="width: 100%;" @click="model++">다음</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</v-app>
</template>

<script>
export default {
    name: 'InfoStep',

    data() {
        return {
            contents: [
                '안녕하세요. 타시오 입니다.',
                '출발지, 목적지를 선택하고 도착 예정 시간을 확인하세요.',
                '자율주행셔틀, 시작할까요?'
            ],
            colors: [
                'primary',
                'E61773  ',
                'yellow darken-2'
            ],
            model: 0,
            cycle: false,
        }
    },

    methods: {
        jump() {
            this.$router.replace('/')
        }
    }
}
</script>

<style>

</style>
