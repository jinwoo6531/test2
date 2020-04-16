<template>
<v-container>
    <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg12 xl2 class="d-flex justify-end">
            <p style="color: #E61773; font-size: 14px; margin-right: 25px; margin-top: 13px;" @click="jump">건너뛰기</p>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <v-carousel v-model="model" :continuous="false" :cycle="cycle" :show-arrows="false" hide-delimiters>
                <v-carousel-item v-for="(content, i) in contents" :key="content">
                    <v-sheet height="70%" tile>
                        <v-row class="fill-height" align="center" justify="center" style="background: #FFF">
                            <img :src="require(`../assets/step${i + 1}.gif`)" />
                        </v-row>
                    </v-sheet>
                    <v-sheet height="30%" tile>
                        <v-row class="fill-height" align="center" justify="center" style="background: #FFF">
                            <p style="color: #000">{{ content }}</p>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-flex>
    </v-layout>

    <v-layout row wrap>
        <v-flex class="d-flex justify-center" xs12 sm12 md12 lg12 xl2>
            <v-btn style="width: 312px; height: 50px; background: #E61773; color: #FFF; font-size: 18px;" @click="model++">다음</v-btn>
        </v-flex>
    </v-layout>
</v-container>
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
