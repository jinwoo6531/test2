<template>
  <div id="schedule">
    <v-container
      class="pa-0 ma-0 flex-wrap"
      fluid
      justify-center
      grid-list-md
      fill-height
    >
      <v-layout wrap class="ma-0">
        <v-flex class="pa-0 persentH" xs12 sm12 md12>
          <v-card xs12 sm12 md12 lg12 xl12 flat tile>
            <v-card xs12 sm12 md12 lg12 xl12 flat tile>
              <img
                src="../../assets/schedule-img.png"
                style="display: inlin-block; width: 100%"
              />
            </v-card>
            <v-card xs12 sm12 md12 lg12 xl12 flat tile>
              <v-card
                class="text-justify pa-5 schedule-wrap"
                xs12
                sm12
                md12
                flat
                tile
              >
                TASIO에서 운영중인 자율주행 셔틀 노선의 운행 시간표입니다.
              </v-card>

              <v-card
                class="text-justify pa-5 schedule-wrap"
                xs12
                sm6
                md6
                flat
                tile
              >
                <p class="site-title">대구 수성 알파시티</p>
                <p>
                  <v-simple-table style="text-align: center">
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <td class="th-title" rowspan="2">평일</td>
                          <td>오전 10:00 ~ 오전 11:30</td>
                        </tr>
                        <tr>
                          <td>오후 2:00 ~ 오후 5:00</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </p>
                <p class="schedule-info">
                  ※ 동절기에도 운행 마감 시간이 오후 5시로 동일합니다.
                </p>
                <p class="schedule-info">
                  ※ 비나 눈이 올 때는 안전상 운행 하지 않습니다.
                </p>
              </v-card>
              <v-card
                class="text-justify pa-5 schedule-wrap"
                xs12
                sm6
                md6
                flat
                tile
              >
                <p class="site-title">세종 산학연클러스터 4-2</p>
                <p>
                  <v-simple-table style="text-align: center">
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <td class="th-title" rowspan="2">목요일, 금요일</td>
                          <td>오전 10:30 ~ 오후 12:00</td>
                        </tr>
                        <tr>
                          <td>오후 2:00 ~ 오후 4:00</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </p>
                <p class="schedule-info">
                  ※ 비나 눈이 올 때는 안전상 운행 하지 않습니다.
                </p>
              </v-card>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.schedule-wrap {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 23px;
  color: #555555;
}

.site-title {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #333333;
}

table {
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #555555;
}

table .th-title {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #555555;
  width: 43%;
  background: #f2f2f2;
}

.schedule-info {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #888888;
  margin-bottom: 0 !important;
}
</style>
