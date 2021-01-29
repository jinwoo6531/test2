<template>
<div id="faq">
    <v-container class="pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0 persentH" xs12 sm12 md12>

                <v-card flat xs12 sm12 md12 lg12 xl12>
                    <v-card-text class="pa-4 faq-title">자주 묻는 질문</v-card-text>
                </v-card>

                <v-card class="pa-4" flat xs12 sm12 md12 lg12 xl12>
                    <v-tabs v-model="tab" background-color="transparent" dark centered="centered" grow="grow">

                        <v-tab href="#tab-1" class="mr-2" style="background-color: #E4E4E4">일반 질문</v-tab>
                        <v-tab href="#tab-2" class="ml-2" style="background-color: #E4E4E4">기술 질문</v-tab>

                        <v-tab-item value="tab-1">
                            <v-card class="mt-5" flat tile>
                                <v-expansion-panels accordion flat="flat">
                                    <v-expansion-panel style="border-bottom: 0.5px solid #BDBDBD;" v-for="(item, i) in 10" :key="i">
                                        <v-expansion-panel-header>Item</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item value="tab-2">
                            <v-card class="mt-5" flat tile>
                                <v-expansion-panels accordion flat="flat">
                                    <v-expansion-panel style="border-bottom: 0.5px solid #BDBDBD;" v-for="(item, i) in 10" :key="i">
                                        <v-expansion-panel-header>Item</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
    name: 'faq',

    data: () => ({
        tab: null
    })
}
</script>

<style>
#faq {
    font-family: Noto Sans KR;
}

.faq-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #262626 !important;
}

.v-tabs-slider-wrapper,
.v-tabs-slider {
    display: none;
}

.v-tab {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    color: #FFFFFF;
}

.v-tab--active {
    background: #888888 !important;
    color: #FFF !important;
}

.mdi-chevron-down::before {
    display: none;
}

.v-expansion-panel-content__wrap {
    background: #F2F2F2;
    padding: 24px 16px !important;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #888;
}
</style>
