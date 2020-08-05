<template>
<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
        <span style="display: inline-block; width: 70%;">
            <v-btn class="pa-0 person-modal" color="#fff" v-on="on" :ripple="false">
                <img src="../../assets/person-count.svg">
                <span v-if="temp >= 1" style="padding-left: 12px;" @click="selectPerson">탑승인원 {{ temp }}명</span>
                <span v-else @click="beforeSelectPerson" style="color: #262626; padding-left: 12px; letter-spacing: 0.5px;">탑승인원 선택</span>
            </v-btn>
        </span>
    </template>

    <v-card style="position: absolute; width: 100%; height: 100%;">
        <v-toolbar color="transparent" style="position: fixed; width: 100%; top: 0; z-index: 3;" flat>
            <v-btn icon @click="closePersonDialog">
                <v-icon color="#262626">mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-container class="pa-0 ma-0 flex-wrap" fluid fill-height style="position: absolute; background: transparent;">
            <v-row align="center" justify="center" class="ma-0">
                <v-card-text style="position: absolute; top: 158px; text-align: center; font-family: Noto Sans KR; font-style: normal; font-weight: 500; font-size: 16px; color: #262626;">탑승인원 선택</v-card-text>
                <v-card class="d-flex justify-space-around" flat>
                    <v-card :ripple="false" flat tile>
                        <v-btn :class="{ 'is-disabled1': isDisabled1 }" :ripple="false" @click="decrement" outlined color="#E61773" fab>
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </v-card>
                    <v-card flat tile>
                        <v-card-text class="count">{{ count }}</v-card-text>
                    </v-card>
                    <v-card flat tile :ripple="false">
                        <v-btn :class="{ 'is-disabled2': isDisabled2 }" :ripple="false" @click="increment" outlined color="#E61773" fab>
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-card>
                </v-card>
                <v-card-text class="select-max mt-9">탑승인원은 최대 14명까지 선택 가능합니다.</v-card-text>
            </v-row>
        </v-container>

        <v-btn class="select-person-btn" @click="rideCount" depressed tile>선택완료</v-btn>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        temp: 0,
        count: 1,
        isDisabled1: true,
        isDisabled2: false
    }),

    methods: {
        selectPerson() {
            if (this.count < 2) {
                this.isDisabled1 = true;
            } else {
                this.isDisabled1 = false;
            }

            if (this.count >= 14) {
                this.isDisabled2 = true;
            } else {
                this.isDisabled2 = false;
            }
        },

        async beforeSelectPerson() {
            if (this.count == 0) {
                this.count = 1;
                this.isDisabled1 = true;
                this.isDisabled2 = false;
            }
        },

        closePersonDialog() {
            console.log('count: ', this.count);
            this.dialog = false;
            if (this.temp != 0) {
                this.count = this.temp;
            } else {
                this.count = 1;
                this.isDisabled1 = true;
                this.isDisabled2 = false;
            }
            console.log('이게 진짜지롱!', this.temp);
        },

        decrement() {
            console.log('decrement: ', this.count);
            this.count -= 1;

            if (this.count < 2) {
                this.isDisabled1 = true;
                this.count = 1;
            } else {
                this.isDisabled1 = false;
            }

            if (this.count >= 14) {
                this.isDisabled2 = true;
                this.count = 14;
            } else {
                this.isDisabled2 = false;
            }
        },

        increment() {
            console.log('increment: ', this.count);
            this.count += 1;

            if (this.count >= 14) {
                this.isDisabled2 = true;
                this.count = 14;
            } else {
                this.isDisabled2 = false;
            }

            if (this.count <= 1) {
                this.isDisabled1 = true;
                this.count = 1;
            } else {
                this.isDisabled1 = false;
            }
        },

        rideCount() {
            this.temp = this.count;
            this.dialog = false;
        },
    }
}
</script>

<style scoped>
.is-disabled1 {
    color: #BDBDBD !important;
}

.is-disabled2 {
    color: #BDBDBD !important;
}

.v-dialog {
    border-radius: 0 !important;
    box-shadow: none !important;
}

.dialog-background {
    width: 2801px;
    background-image: url('~@/assets/call-dialog.png');
}

.person-modal {
    font-family: Noto Sans KR !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 13px !important;
    line-height: 19px;
    padding-left: 12px !important;
    padding-right: 14px !important;
}

.select-max {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    color: #BDBDBD;
}

.select-person-btn {
    height: 50px !important;
}
</style>
