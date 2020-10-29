<template>
<div id="faq">
    <v-container class="pa-0 ma-0 flex-wrap" style="background: #FFF;" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0" xs12 style="width: 100%; height: 100%;">
                <v-expansion-panels accordion flat>
                    <v-expansion-panel style="border-bottom: 0.5px solid #BDBDBD;" v-for="(listItem, index) of visiblePages" :key="index">
                        <v-expansion-panel-header>Q{{ listItem.id }}. {{ listItem.subject }}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            {{ listItem.desc }}
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <div class="pagination">
                    <v-pagination v-model="page" :length="Math.ceil(items.length / perPage)" color="#2E3990"></v-pagination>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
    name: 'faq',

    data: () => ({
        page: 1,
        perPage: 10,
        items: [{
                "id": 1,
                "subject": "최대 몇 명까지 탑승 가능한가요?",
                "desc": "좌석 11명, 입석 4명으로 최대 15명까지 탑승 가능하지만 오퍼레이터 및 안전을 위해 9명까지 권장합니다."
            },
            {
                "id": 2,
                "subject": "최대 속도는 몇 km인가요?",
                "desc": "최대 25km/h 까지 주행 가능하지만 국내 자율주행법의 영향을 받기 때문에 18km/h로 설정하여 주행합니다."
            },
            {
                "id": 3,
                "subject": "히터 및 에어컨이 있나요?",
                "desc": "둘 다 작동 가능하나 전기로 주행하다 보니 배터리가 더 빠르게 소모됩니다."
            },
            {
                "id": 4,
                "subject": "차선 변경이 가능한가요?",
                "desc": "기능을 추가할 경우 가능합니다."
            },
            {
                "id": 5,
                "subject": "안전요원은 운영이 되나요?",
                "desc": "네. 현재 국내 자율주행법에 의거하여 차량에 무조건 1명 이상의 안전요원이 있어야 합니다."
            },
            {
                "id": 6,
                "subject": "수동 운전이 가능한가요?",
                "desc": "네. 가능하며, 조이스틱으로 운전 할 수 있습니다."
            },
            {
                "id": 7,
                "subject": "승차하고 싶을 때는 어떻게 하나요?",
                "desc": "지정된 정거장에서만 승차 가능합니다."
            },
            {
                "id": 8,
                "subject": "하차하고 싶을 때는 어떻게 하나요?",
                "desc": "지정된 정거장에서만 하차 가능합니다."
            },
            {
                "id": 9,
                "subject": "최대 몇 m까지 장애물을 감지할 수 있나요?",
                "desc": "3D 라이다 기준 100m 이며, 2D 라이다 기준으로 전후방 50m, 2D 라이다 측면 25m 감지 가능합니다."
            }
        ]
    }),

    computed: {
        visiblePages() {
            return this.items.slice((this.page - 1) * this.perPage, this.page * this.perPage); // 0부터 10까지 자르기, 10부터 20까지 자르기
        }
    }
}
</script> 

<style>
#faq {
    font-family: Noto Sans KR;
    width: 100%;
    height: 100%;
}

.faq-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #262626 !important;
    padding: 12px 0 30px 0;
}

.mdi-chevron-down::before {
    display: none;
}

.v-expansion-panel-content__wrap {
    background: #F2F2F2;
    padding: 15px 40px !important;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #888;
}

button:focus {
    outline: 0;
}

.pagination {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
