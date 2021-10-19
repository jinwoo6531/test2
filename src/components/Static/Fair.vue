<template>
  <div id="fair">
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
                src="../../assets/timetable.png"
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
                TASIO에서 운영중인 자율주행 셔틀 노선의 운임 안내입니다.
              </v-card>
              <v-card
                class="text-justify pa-5 schedule-wrap"
                xs12
                sm6
                md6
                flat
                tile
              >
                <p class="site-title">여수 엑스포 공원</p>
                <p>
                  <v-simple-table style="text-align: center">
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <td class="th-title">구분</td>
                          <td>일일권</td>
                          <td>종일권</td>
                        </tr>
                        <tr>
                          <td class="th-title">일반</td>
                          <td>6,000원</td>
                          <td>9,000원</td>
                          
                        </tr>
                        <tr>
                          <td class="th-title">청소년</td>
                          <td>4,000원</td>
                          <td>6,000원</td>
                        </tr>
                        <tr>
                          <td class="th-title">유아(만 6세 미만)</td>
                          <td>무료</td>
                          <td>무료</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </p>
                <!-- <p class="schedule-info">
                  ※ 1회권 결제시 1회 이용 가능합니다.
                </p> -->
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
                          <td class="th-title">구분</td>
                          <td>1회권</td>
                        </tr>
                        <tr>
                          <td class="th-title">일반</td>
                          <td>1,500원</td>
                        </tr>
                        <tr>
                          <td class="th-title">청소년</td>
                          <td>1,050원</td>
                        </tr>
                        <tr>
                          <td class="th-title">유아(만 6세 미만)</td>
                          <td>무료</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </p>
                <p class="schedule-info">
                  ※ 1회권 결제시 1회 이용 가능합니다.
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
                          <td class="th-title">구분</td>
                          <td>1회권</td>
                        </tr>
                        <tr>
                          <td class="th-title">일반</td>
                          <td>시범 운행</td>
                        </tr>
                        <tr>
                          <td class="th-title">청소년</td>
                          <td>시범 운행</td>
                        </tr>
                        <tr>
                          <td class="th-title">유아(만 6세 미만)</td>
                          <td>무료</td>
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
export default {}
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
  border-collapse: collapse;
}
.table-head {
  background-color: #f2f2f2;
}
.table-head > tr > th,
tbody > tr > td {
  border-right: 1px solid #dbdbdb;
}
.table-head > tr > th:last-child {
  border-right: none;
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
  /* margin-bottom: 140px !important; */
}
.container {
  margin-bottom: 140px !important;
}
.copyrightStyle {
  border-top: 1px solid #3333;
  height: 107px;
  font-family: Roboto !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 10px !important;
  line-height: 14px;
  /* color: #bdbdbd !important; */
  background: transparent !important;
  position: relative;
}
.copyrightStyle span {
  position: absolute;
  left: 50%;
  bottom: 60px;
  transform: translate(-50%);
}
</style>
