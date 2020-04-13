<template>
<v-container class="map-container" fluid grid-list-md>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <h3>추가 동의가 필요합니다.</h3>
            <div>
                <ul>
                    <li>전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택할 수 있습니다.</li>
                    <li>선택항목에 대한 동의를 거부하는 경우에도 서비스 이용이 가능합니다.</li>
                </ul>
            </div>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <v-form @submit.prevent="handleSubmit">
                <input type="checkbox" @click="selectAll" v-model="allSelected" /> 전체동의
                
                <div v-for="agree1 in agreeList1" :key="agree1.id">
                    <input type="checkbox" id="necessary" name="necessary" v-validate="'required'" v-model="selectIds1" @click="select" :value="agree1.id"> {{ agree1.name }}
                    <span class="help is-danger" v-show="errors.has('necessary')">{{ errors.first('necessary') }}</span>
                </div>

                <div v-for="agree2 in agreeList2" :key="agree2.id">
                    <input type="checkbox" v-model="selectIds2" @click="select" :value="agree2.id">{{ agree2.name }}
                </div>
                <button>동의하고 가입하기</button>
                <!-- <v-btn cols="12" style="width: 100%;" @click="next">다음</v-btn> -->
            </v-form>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            agreeList1: [{
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
                }
            ],
            agreeList2: [{
                    "id": "4",
                    "name": "(선택) 이벤트 및 마케팅 활용 동의"
                },
                {
                    "id": "5",
                    "name": "(선택) 이벤트 알림 수신 동의"
                }
            ],

            allSelected: false,
            selectIds1: [],
            selectIds2: [],
            submitted: false
        }

    },

    methods: {
        handleSubmit() {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
                }
            });
        },

        selectAll() {
            this.selectIds1 = []
            this.selectIds2 = []

            if (!this.allSelected) {
                for (let i = 0; i < this.agreeList1.length; i++) {
                    this.selectIds1.push(this.agreeList1[i].id.toString())
                }
                for (let j = 0; j < this.agreeList2.length; j++) {
                    this.selectIds2.push(this.agreeList2[j].id.toString())
                }
            }
        },

        select() {
            this.allSelected = false
        },

        next() {
            this.$router.replace('SignUp')
        }
    }

}
</script>

<style>

</style>
