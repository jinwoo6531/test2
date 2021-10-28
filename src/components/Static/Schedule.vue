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
                src="../../assets/timepage.png"
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
                <p class="site-title">여수 엑스포공원</p>
                <p>
                  <v-simple-table class="table" style="text-align: center">
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <td class="th-title" rowspan="2">평일</td>
                          <td>오전 10:00 - 오후 20:00</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </p>
                <p class="schedule-info">
                  ※ 30분 간격으로 운행
                </p>
                <p class="schedule-info">
                  ※ 비나 눈이 올 때는 안전상 운행 하지 않습니다.
                </p>
              </v-card>
              <!-- <v-simple-table class="schedule-table" style="text-align: center">
                    <template v-slot:default>
                      <thead class="table-head">
                        <tr>
                          <th>구분</th>
                           <th>정류장 출발시간</th>
                            <th>내용</th>
                             <th>비고</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="" rowspan="10">오전</td>
                          <td>10:00~</td>
                          <td class="" rowspan="10">정기운행</td>
                          <td class="" rowspan="10">*운행 일정(운행차량, 운행 횟수, 운행 시간 등)은<br>내/외부적 요인, 날씨, 현장상황 등에 따라 변경될 수 있음</td>
                        </tr>
                        <tr>
                          <td>10:30~</td>
                        </tr>
                         <tr>
                          <td>11:00~</td>
                        </tr>
                         <tr>
                          <td>14:00~</td>
                        </tr>
                        <tr>
                          <td>14:30~</td>
                        </tr>
                         <tr>
                          <td>15:00~</td>
                        </tr>
                         <tr>
                          <td>15:30~</td>
                        </tr>
                         <tr>
                          <td>16:00~</td>
                        </tr>
                         <tr>
                          <td>16:30~</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table> -->

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
                  <v-simple-table class="table" style="text-align: center">
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
              <v-simple-table
                class="table schedule-table"
                style="text-align: center"
              >
                <template v-slot:default>
                  <thead class="table-head">
                    <tr>
                      <th>구분</th>
                      <th>정류장 출발시간</th>
                      <th>내용</th>
                      <th>비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="" rowspan="3">오전</td>
                      <td>10:00~</td>
                      <td class="" rowspan="9">정기운행</td>
                      <td class="" rowspan="9">
                        *운행 일정(운행차량, 운행 횟수, 운행 시간 등)은<br />내/외부적
                        요인, 날씨, 현장상황 등에 따라 변경될 수 있음
                      </td>
                    </tr>
                    <tr>
                      <td>10:30~</td>
                    </tr>
                    <tr>
                      <td>11:00~</td>
                    </tr>
                    <tr>
                      <td class="" rowspan="6">오후</td>
                      <td>14:00~</td>
                    </tr>
                    <tr>
                      <td>14:30~</td>
                    </tr>
                    <tr>
                      <td>15:00~</td>
                    </tr>
                    <tr>
                      <td>15:30~</td>
                    </tr>
                    <tr>
                      <td>16:00~</td>
                    </tr>
                    <tr>
                      <td>16:30~</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

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
                  <v-simple-table class="table" style="text-align: center">
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
    <!-- <v-footer class="copyrightStyle nav-footer pa-0">
            <span>COPYRIGHT@SPRINGCLOUD INC. <br />
                    ALL RIGHTS RESERVED.</span>
        </v-footer> -->
  </div>
</template>

<script>
export default {
  name: "schedule",
}
</script>

<style scoped>
* {
  border-collapse: collapse;
}

td {
  background-color: #fff;
}
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

.table {
  border: 1px solid #dbdbdb;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #555555;
  border-collapse: collapse;
  border-radius: 0px;
}
.schedule-table {
  margin: 20px;
  border-collapse: collapse;
}
.schedule-table tr td {
  font-size: 14px;
  height: 35px;
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

.table > .th-title {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #555555;
  width: 43%;
  background: #f2f2f2;
  border-bottom: 0%;
}

.schedule-info {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #888888;
  /* margin-bottom: 140px !important; */
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
  display: block;
  width: 100%;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
}
</style>
