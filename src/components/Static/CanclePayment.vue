<template>
    <div id="canclepayment">
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
                src="../../assets/cancel.png"
                style="display: inlin-block; width: 100%"
              />
            </v-card>
            <v-card xs12 sm12 md12 lg12 xl12 flat tile>
              <v-card
                class="text-justify pa-5 schedule-wrap"
                xs12
                sm6
                md6
                flat
                tile
              >
                <p class="site-title">타시오 환불 규정</p>

                  <table class="table" style="text-align: center; margin-bottom:1.25rem ">
                      <tbody>
                        <tr>
                          <td class="th-title">출발 전</td>
                          <td>100% 환불</td>
                        </tr>
                          <tr>
                          <td class="th-title">출발 후</td>
                          <td>환불 불가</td>
                        </tr>
                      </tbody>
                  </table>
                        <p style="margin-bottom:2.5rem ">
                          환불시 영업일 기준으로 당일결제, 당일환불 건은 당일
                          취소되며, 그 외 건은 7일 이내 취소 처리 됩니다. 
                          또한 결제하신 승차권 중 부분 취소는 불가하며, 예약
                          변경 필요시 전액 환불 신청 후 탑승권을 재구입하시기 
                          바랍니다.
                      </p>

                <p class="schedule-info">
                  ※ 운행이 불가한 천재지변 발생 및 운영사의 사유로 탑승이 불가한 
                  경우 전액 결제 취소 후 100% 환불하여 드립니다.
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
export default {
    name: "canclepayment",
}
</script>

<style scoped>
*{
  border-collapse: collapse;
  
}

td{
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
  width: 100%;
  margin: 0 auto;
  border: 1px solid #dbdbdb;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #555555;
  border-collapse: collapse;
  border-radius: 0px;
}
.schedule-table{
  margin: 20px;
}
.table tr td{
   border: 1px solid #dbdbdb;
  font-size: 14px;
  height:35px;
  padding: 0 16px;
  box-sizing: border-box;
}
.table-head{
  background-color:#F2F2F2;
}


table .th-title {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #555555;
  width: 43%;
  background: #f2f2f2;
  border-right:  1px solid #dbdbdb;
}

.schedule-info {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #888888;
  margin-bottom: 5.625rem !important;
}
.container{
  width: 100vw;
  height: 100%;
  background-color:#fff
}
.copyrightStyle {
  border-top: 1px solid #3333;
    height:107px;
    font-family: Roboto !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 10px !important;
    line-height: 14px;
    /* color: #bdbdbd !important; */
    background: transparent !important;
    position: relative;
 
}
.copyrightStyle span{
  display: block;
  width: 100%;
  position:absolute;
    left: 50%;
    bottom: 0px; 
    transform: translateX(-50%);
}
</style>
