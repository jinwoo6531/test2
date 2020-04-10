<template>
<v-app>
    <v-container>
        <v-layout column>
            <v-flex>
                <v-sheet>추가 동의가 필요합니다.</v-sheet>
            </v-flex>
            <v-flex>
                <div>
                    <ul>
                        <li>전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택할 수 있습니다.</li>
                        <li>선택항목에 대한 동의를 거부하는 경우에도 서비스 이용이 가능합니다.</li>
                    </ul>
                </div>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <p><input type="checkbox" @click="selectAll" v-model="allSelected">전체 동의</p>
                <div v-for="agree in agreeList" :key="agree.id">
                    <p><input type="checkbox" v-model="selectIds" @click="select" :value="agree.id">{{ agree.name }}</p>
                </div>
                <v-btn cols="12" style="width: 100%;" @click="next">다음</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</v-app>
</template>

<script>
export default {
    data() {
        return {
            agreeList: [
                {
                    "id": "1",
                    "name": "(필수) 개인정보 수집 및 이용에 대한 동의"
                },
                {
                    "id": "2",
                    "name": "(필수) 위치기반서비스 이용약관"
                },
                {
                    "id": "3",
                    "name": "(필수) 위치정보 탑승위치 제공 동의"
                },
                {
                    "id": "4",
                    "name": "(선택) 이벤트 및 마케팅 활용 동의"
                },
                {
                    "id": "5",
                    "name": "(선택) 이벤트 알림 수신 동의"
                }
            ],
            selected: [],
            allSelected: false,
            selectIds: []
        }

    },
    methods: {
        selectAll: function () {
            this.selectIds = [];

            if (!this.allSelected) {
                for (let i = 0; i < this.agreeList.length; i++) {
                    this.selectIds.push(this.agreeList[i].id.toString());
                }
            }
        },
        select: function () {
            this.allSelected = false;
        },
        next() {
            console.log(this.val)
            this.$router.replace('SignUp')
        }
    }

}
</script>

<style>

</style>
