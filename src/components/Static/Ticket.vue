<template>
  <div id="ticket">
    <v-container
      class="pa-0 ma-0 flex-wrap"
      fluid
      justify-center
      grid-list-md
      fill-height
    >
      <v-layout wrap>
        <v-tabs  v-model="tab" centered fixed-tabs  color="#555"
            slider-color="#fff" background-color="#F8F8F8">
          <v-tab class="tab-items2" v-for="item in menus" :key="item">{{
            item
          }}</v-tab>
          <!--1회 승차권  -->
          <v-tab-item class="ma-0">
            <v-card
              class="active-ticket"
              v-for="ticket in ticketList[0]"
              :key="ticket.reservation_seq"
              :v-if="ticket.length > 0"
            >
              <div
                class="ticket-tit"
                v-bind:class="[
                  { 'ticket-tit': ticket.state === 1 },
                  { 'deactive-ticket-tit': ticket.state === 2 },
                ]"
              >
                <p>
                  {{
                    ticket.date.substring(0, 13) +
                      "(" +
                      ticket.date.substring(14, 15) +
                      ")"
                  }}
                </p>
                <p>
                  {{ ticket.adult_num + ticket.child_num + ticket.baby_num }}매
                </p>
              </div>
              <div class="ticket-main">
                <div class="ticket-main-txt">
                  <div class="ticket-main-tit">
                    <img
                      src="../../assets/tasio-logo3.png"
                      alt=""
                      class="tit-img"
                    />
                    <span style="line-height:50%"><br /></span>
                    <qr-code :text="`${ticket.qr}`" size="200" error-level="L">
                    </qr-code>
                    <br />
                    <div class="ticket-main-tit-div">
                      <span
                        >{{ ticket.station_name }}
                        {{ ticket.schedule_time }}</span
                      >
                      <span class="ticket-main-tit-div-span"
                        ><img
                          src="../../assets/arrow-right.png"
                          alt="arrow-right"
                        />
                      </span>
                      <span>{{ ticket.destination }}</span>
                    </div>
                  </div>
                  <div class="count-info">
                    <div class="count-info-div">
                      <span v-if="ticket.adult_num > 0"
                        >일반 {{ ticket.adult_num }}명<span
                          v-if="ticket.child_num > 0"
                          >,</span
                        ></span
                      >
                      <span v-if="ticket.child_num > 0"
                        >청소년 {{ ticket.child_num }}명<span
                          v-if="ticket.baby_num > 0"
                          >,</span
                        ></span
                      >
                      <span v-if="ticket.baby_num > 0"
                        >유아 {{ ticket.baby_num }}명</span
                      >
                    </div>
                    <div>
                      <v-dialog v-model="dialog" width="310">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            @click="modal9(ticket.merchant_uid)"
                            style="background-color:#ffffff; font-size:14px; font-weight:medium; color:#555555; letter-spacing:-1px;"
                          >
                            환불하기
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h3 white lighten-2">
                            환불하기
                          </v-card-title>
                          <hr class="card-hr" />
                          <br />
                          <v-card-text>
                            <span class="cancelPayfontMain">
                              환불시 영업일 기준으로 당일결제/<br />
                              당일환불 건은 당일 취소 처리되며,<br />
                              그외 건은 7일 이내 취소 처리됩니다.<br />
                              일부 승차권의 부분 환불, 일정 변경은<br />
                              불가하오니 전체 환불 신청 후 재결제를<br />
                              부탁드립니다.<br /><br />
                            </span>
                            <span class="cancelPayfontCard"
                              >* 카드사별 결제일, 환불 일자 상이<br /><br
                            /></span>
                            <span class="cancelPayfontFooter"
                              >정말 환불하시겠습니까?</span
                            >
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions class="pa-0">
                            <v-spacer></v-spacer>
                            <div class="modalBtn">
                              <div class="modalBtn1">
                                <v-btn
                                  color="black"
                                  text
                                  @click="dialog = false"
                                >
                                  취소하기
                                </v-btn>
                              </div>
                              <div class="modalBtn2">
                                <v-btn
                                  color="#ffffff"
                                  text
                                  @click=";[modal3(), modal4(), modal5()]"
                                >
                                  환불하기
                                </v-btn>
                              </div>
                            </div>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 2번째 modal -->
              <v-dialog v-model="test" width="300">
                <v-card>
                  <hr />
                  <br />
                  <v-card-text class="cancelPayfontMain2">
                    탑승권이 정상 환불되었습니다.<br />
                    신용(체크)카드의 경우,<br />
                    환불 신청 7일 이후 카드사를 통해<br />
                    확인하시기 바랍니다.<br />
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions class="modalBtn3">
                    <v-spacer></v-spacer>

                    <v-btn
                      class="modalBtn4"
                      color="#FFFFFF"
                      text
                      @click="cancelPay(ticket.merchant_uid)"
                    >
                      최종 환불확인
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
            <!-- no ticket -->
            <div class="no-ticket" v-if="ticketList[0].length === 0">
              <h3>구매하신 승차권이 없어요</h3>
              <img src="../../assets/no_ticket_02.svg" />
              <p class="no-ticket-text" style="font-size:13px">
                구매하신 승차권이 없습니다. <br />이전 페이지나 메인으로
                이동해주세요.
              </p>
            </div>
            <!-- <v-footer style="background-color: #fff">
              <span class="copyrightStyle"
                >결제하신 셔틀 탑승 시 승차권을 제시해주시기 바랍니다</span
              >
            </v-footer> -->
          </v-tab-item>
          <!-- 종일 승차권 -->
          <v-tab-item>
            <v-card
              class="active-ticket"
              v-for="ticket in allDayTicket[0]"
              :key="ticket.reservation_seq"
              :v-if="ticket.length > 0"
            >
              <!-- 상단 -->
              <div
                class="ticket-tit2"
                v-bind:class="[
                  { 'ticket-tit2': ticket.state === 1 },
                  { 'deactive-ticket-tit': ticket.state === 2 },
                ]"
              >
                <p>
                  {{
                    ticket.date.substring(0, 13) +
                      "(" +
                      ticket.date.substring(14, 15) +
                      ")"
                  }}
                </p>
                <p>
                  {{ ticket.adult_num + ticket.child_num + ticket.baby_num }}매
                </p>
              </div>
              <!-- 메인 -->
              <div class="ticket-main">
                <div class="ticket-main-txt">
                  <div class="ticket-main-tit">
                    <img
                      src="../../assets/tasio-logo3.png"
                      alt=""
                      class="tit-img"
                    />
                    <span style="line-height:50%"><br /></span>
                    <qr-code :text="`${ticket.qr}`" size="200" error-level="L">
                    </qr-code>
                    <br />
                    <span>여수 스페이스 M 종일 승차권</span>
                  </div>
                  <div class="count-info">
                    <div class="count-info-div">
                      <span v-if="ticket.adult_num > 0"
                        >일반 {{ ticket.adult_num }}명<span
                          v-if="ticket.child_num > 0"
                          >,</span
                        ></span
                      >
                      <span v-if="ticket.child_num > 0"
                        >청소년 {{ ticket.child_num }}명<span
                          v-if="ticket.baby_num > 0"
                          >,</span
                        ></span
                      >
                      <span v-if="ticket.baby_num > 0"
                        >유아 {{ ticket.baby_num }}명</span
                      >
                    </div>
                    <div>
                      <v-dialog v-model="dialog" width="310">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            style="background-color:#ffffff; font-size:14px; font-weight:medium; color:#555555; letter-spacing:-1px;"
                          >
                            환불하기
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h3 white lighten-2">
                            환불하기
                          </v-card-title>
                          <hr class="card-hr" />
                          <br />
                          <v-card-text>
                            <span class="cancelPayfontMain">
                              환불시 영업일 기준으로 당일결제/<br />
                              당일환불 건은 당일 취소 처리되며,<br />
                              그외 건은 7일 이내 취소 처리됩니다.<br />
                              일부 승차권의 부분 환불, 일정 변경은<br />
                              불가하오니 전체 환불 신청 후 재결제를<br />
                              부탁드립니다.<br /><br />
                            </span>
                            <span class="cancelPayfontCard"
                              >* 카드사별 결제일, 환불 일자 상이<br /><br
                            /></span>
                            <span class="cancelPayfontFooter"
                              >정말 환불하시겠습니까?</span
                            >
                          </v-card-text>

                          <div class="modalBtn">
                            <div class="modalBtn1">
                              <v-btn
                                color="black"
                                tile
                                text
                                @click="dialog = false"
                              >
                                취소하기
                              </v-btn>
                            </div>

                            <div class="modalBtn2">
                              <v-btn
                                color="#ffffff"
                                text
                                @click=";[modal1(), modal2()]"
                              >
                                환불하기
                              </v-btn>
                            </div>
                          </div>
                        </v-card>
                      </v-dialog>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 2번째 modal -->
              <v-dialog v-model="test" width="300" v-if="test == true">
                <v-card>
                  <hr />
                  <br />
                  <v-card-text class="cancelPayfontMain2">
                    탑승권이 정상 환불되었습니다.<br />
                    신용(체크)카드의 경우,<br />
                    환불 신청 7일 이후 카드사를 통해<br />
                    확인하시기 바랍니다.<br />
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions class="modalBtn3">
                    <v-spacer></v-spacer>

                    <v-btn
                      class="modalBtn4"
                      color="#FFFFFF"
                      text
                      @click="cancelPay(ticket.merchant_uid)"
                    >
                      최종 환불확인
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
            <!-- refund success -->
                <!-- <v-alert
                    dense
                    text
                    type="success"
                    v-if="refund"
                    style="position:relative; top: 0; left: 0"
                  >
                    <strong>환불이 완료되었습니다</strong>
                  </v-alert> -->
            <!-- refund fail -->
                <!-- <v-alert
                       dense
                        outlined
                        type="error"
                        v-else-if="refund===false"
                        style="position:relative; top: 0; left: 0"
                      >
                        <strong>환불에 실패하였습니다</strong>
                      </v-alert> -->
            <!-- no ticket -->
            <div class="no-ticket" v-if="allDayTicket[0].length === 0">
              <h3>구매하신 승차권이 없어요</h3>
              <img src="../../assets/no_ticket_02.svg" />
              <p class="no-ticket-text" style="font-size:13px">
                구매하신 승차권이 없습니다. <br />이전 페이지나 메인으로
                이동해주세요.
              </p>
            </div>
            <!-- <v-footer style="background-color: #fff">
              <span class="copyrightStyle"
                >결제하신 셔틀 탑승 시 승차권을 제시해주시기 바랍니다</span
              >
            </v-footer> -->
            <v-alert
              tile
              dense
              type="info"
              color="#E61773 "
              style="position: fixed; bottom:0; left:0; z-index: index 9;"
            >
              <strong
                style="font-weight: 500;letter-spacing:-0.5px; font-size:0.813rem; margin-left:-10px; "
                >1일 승차권의 경우 해당 결제일이 지나면 자동 삭제됩니다.</strong
              >
            </v-alert>
          </v-tab-item>
        </v-tabs>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import Vue from "vue"
import { mapGetters, mapState } from "vuex"
import axios from "axios"
import VueQRCodeComponent from "vue-qrcode-component"
Vue.component("qr-code", VueQRCodeComponent)
export default {
  name: "ticket",
  data: () => ({
    date: "",
    ticketCount: 0,
    reservation_seq: 0,
    state: 0,
    ordinalNo: 0,
    stationNo: 0,
    station_name: "",
    schedule_time: "",
    adult_num: "",
    child_num: "",
    baby_num: "",
    ticketList: [],
    allDayTicket: [],
    isrefund: "",
    merchant_uid: "",
    amount: 0,
    showModal: false,
    menus: ["1회 승차권", "종일 승차권"],
    tab: null,
    dialog: false,
    test: false,
    m_id: "",
    refund: null,
  }),
  computed: {
    ...mapGetters({
      user: "user",
    }),
    ...mapState(["uid"]),
  },
  created() {
    this.getTicketInfo()
    this.getAllDayTicketInfo()
  },
  methods: {
    //1회 승차권 불러오기
    getTicketInfo() {
      console.log("uid", this.uid)
      axios
        .get(
          `https://tasioapi.springgo.io/api/reservations/user-reservation/`,
          {
            params: {
              userid: this.uid,
              ticket_type: 0,
            },
          }
        )
        .then((res) => {
          console.log("예약정보 :", res.data)
          this.ticketList.push(res.data)
          this.merchant_uid = res.data[0].merchant_uid
          this.amount = res.data[0].amount
          this.data = res.data[0].date
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAllDayTicketInfo() {
      console.log("uid", this.uid)
      axios
        .get(
          `https://tasioapi.springgo.io/api/reservations/user-reservation/`,
          {
            params: {
              userid: this.uid,
              ticket_type: 1,
            },
          }
        )
        .then((res) => {
          this.allDayTicket.push(res.data)
          console.log("this ticket", this.allDayTicket)
          this.merchant_uid = res.data[0].merchant_uid
          this.amount = res.data[0].amount
          this.data = res.data[0].date
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //티켓 정보 받아오는 api
    stampClicked(ticketId) {
      console.log("ticketId", ticketId)
      axios
        .put(`https://tasioapi.springgo.io/api/reservations/${ticketId}/`, {
          id: ticketId,
          state: 2,
        })
        .then((res) => {
          this.ticketList.push(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
      let findItem = this.ticketList[0].find(
        (ticket) => ticket.reservation_seq === ticketId
      )
      findItem.state = 2
    },
    //탑승권 승차 확인 클릭 시
    cancelPay() {
      console.log("고유ID :", this.uid)
      console.log("주문번호 :", this.merchant_uid)
      console.log("환불금액 :", this.amount)
      console.log(this.m_id);
      axios({
        url:
          "https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/payment/cancel",
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          userid: this.uid,
        },
        data: {
          //merchant_uid: this.merchant_uid,
          merchant_uid: this.m_id,
          reason: "승차권 예약취소",
          cancel_request_amount: this.amount,
        },
        
      })
        .then((response) => {
          Vue.toasted.show("환불이 완료되었습니다.", {
              type:"success",
              theme: "bubble",
              position: "top-center"
            }).goAway(3000);
          //alert("환불이 완료되었습니다.", response)
          // setTimeout(()=>{
          //   this.refund===true
          // }, 1000)
          console.log(response)
        })
        .catch((error) => {
            Vue.toasted.show("환불에 실패했습니다.", {
              type:"error",
              theme: "bubble",
              position: "top-center"
            }).goAway(3000);
          // setTimeout(()=>{
          //   this.refund===false
          // }, 1000)
          console.log("error : ", error)
        })
      this.$router.push("/")
    },
    modal1() {
      this.dialog = false
    },
    modal2() {
      this.test = true
    },
    modal3() {
      this.dialog = false
    },
    modal4() {
      this.test = true
    },
    modal5(item) {
      console.log(item)
    },
    modal9(item) {
      this.m_id = item
    },
  },
}
</script>
<style scoped>
.tab-items2 {
  font-size: 16px;
  font-family: Noto Sans KR;
  letter-spacing: -1px;
  line-height: 26px;
}
/* 수정 */
 .v-tab:before {background-color: #ffffff } 
.v-tab--active {
  background-color: #fff;
}

.payment-date {
  font-size: x-small;
  color: gray;
}
.cancel {
  margin-top: 70px;
  color: #e61773;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  text-align: center;
}
#ticket {
  font-family: Noto Sans KR;
  width: 100vw;
  /* height: 100%; */
  position: relative;
  background-color: #fff;
}
.no-ticket-text {
  color: #828282;
  margin-top: 100px;
  text-align: center;
}
.no-ticket {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  height: 80vh;
}
.no-ticket > h3 {
  margin-bottom: 50px;
}
.active-ticket {
  width: 340px;
  height: 472px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  margin: 0 auto 20px;
  margin-top: 23px;
}
.ticket-tit2 {
  font-size: 14px;
  display: inline-flex;
  justify-content: space-between;
  width: 340px;
  height: 42px;
  background-color: #12abbf;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
}
.ticket-tit {
  font-size: 14px;
  display: inline-flex;
  justify-content: space-between;
  width: 340px;
  height: 42px;
  background-color: #e61773;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
}
.tit-img {
  padding-bottom: 10px;
}
.tit-img {
  padding-bottom: 10px;
}
.deactive-ticket-tit {
  background-color: #999;
}
.ticket-main {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px;
  height: 64px;
  width: 304px;
}
.ticket-main-txt p {
  margin-bottom: -5px;
  font-size: 14px;
}
.ticket-main-tit {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: black;
  padding-bottom: 20px;
}
.ticket-main-tit-div {
  display: flex;
  justify-content: space-between;
}
.ticket-main-tit-div-span {
  margin-left: 5px;
  padding-top: 2px;
}
.arrow-right {
  padding-top: 10px;
}
.deactive-ticket-main-tit {
  color: #555;
  font-weight: 500;
}
.count-info {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 304px;
  height: 64px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #dbdbdb;
  background-color: #f9f9f9;
}
.count-info-div {
  padding: 11px;
}

.copyrightStyle {
  width: 100%;
  text-align: center;
  font-size: 0.813rem;
  position: absolute;
  left: 0%;
  bottom: 0%;
}

.v-alert {
  width: 100%;
  height: 2.75rem;
  box-sizing: border-box;
  margin: 0;
  border-radius: 0;
}

.onChangeBtn1 {
  width: 50% !important;

  height: 100% !important;

  font-style: normal !important;

  font-weight: 500 !important;

  font-size: 1rem !important;

  letter-spacing: 0 !important;

  border-top: 0.5px solid #e61773 !important;
}

.onCancelBtn1 {
  width: 50% !important;

  height: 100% !important;

  color: #e61773 !important;

  font-style: normal !important;

  font-weight: 500 !important;

  font-size: 1rem !important;

  border-top: 0.5px solid #e61773 !important;

  box-sizing: border-box !important;

  letter-spacing: 0 !important;
}

.tttt {
  padding: 0;
  background-color: #e61773;
}

.modalBtn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 3.125rem;
  font-size: 16px;
  font-weight: medium;
}
.modalBtn1 {
  width: 100%;
  text-align: center;
  padding: 6px;
  font-size: 16px;
  height: 3.125rem;
  background-color: #fafafa;
  font-family: Noto Sans KR;
  font-weight: medium;
}
.modalBtn2 {
  width: 100%;
  text-align: center;
  background-color: #e61773;
  padding: 6px;
  font-family: Noto Sans KR;
}

.cancelPayfontMain {
  color: #262626;
  font-size: 16px;
}

.cancelPayfontCard {
  color: #555555;
  font-size: 14px;
}
.cancelPayfontFooter {
  color: #e61773;
  font-size: 16px;
}
.cancelPayfontMain2 {
  text-align: center;
  color: #262626;
  font-size: 16px;
}
.modalBtn3 {
  background-color: #e61773 !important;
}
.modalBtn4 {
  text-align: center;
  width: 100%;
}
.card-hr {
  margin: 0 auto;
  width: 85%;
}
</style>
