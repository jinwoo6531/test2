<template>
  <div id="canclepayment" class="canclepayment">
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
                sm6
                md6
                flat
                tile
              >
                <p class="site-title">타시오 환불 및 취소 규정</p>
                
                  <v-simple-table style="text-align: center">
                    <template v-slot:default>
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
                    </template>
                  </v-simple-table>
               
                
              </v-card>              
              <v-card
                class="text-justify pa-5 schedule-info2"
                xs12
                sm12
                md12
                flat
                tile
              >
               
                환불시 영업일 기준으로 당일결제, 당일환불 건은 당일 취소되며, 그 외 건은 7일 이내 취소 처리됩니다.<br/>
                또한 결제하신 승차권 중 부분 취소는 불가하며, 예약<br/>
                변경 필요시 전액 환불 신청 후 탑승권을 재구입하시기<br/>
                바랍니다.
              
              </v-card>
                <p class="schedule-info">
                  ※ 운행이 불가한 천재지변 발생 및 운영사의 사유로 탑승이 불<br/>
                  가한 경우 전액 결제 취소 후 100% 환불하여 드립니다.
                </p>
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
.canclepayment{
background-color: #ffff;
height: 100%;

}
.schedule-wrap {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #555555;
  

  
}
.schedule-info2 {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
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
.table-head{
  background-color:#F2F2F2;
}
.table-head >tr>th, tbody>tr>td{
  border-right: 1px solid #dbdbdb; 
}
.table-head >tr>th:last-child{
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
  margin: 20px;
  /* margin-bottom: 140px !important; */
}
.container{
  margin-bottom: 140px !important;
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
  position:absolute;
     left: 50%;
    bottom: 60px; 
    transform: translate(-50%);
}
</style>


<script>
export default {
    name: "userhistory",
}
</script>

<style scoped></style>
