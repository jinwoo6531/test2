<template>
  <div id="userhistory">
    <v-tabs  v-model="tab" centered fixed-tabs  color="#555"
            slider-color="#fff" background-color="#F8F8F8">
      <v-tab class="tab-items" v-for="item in menus" :key="item">{{
        item
      }}</v-tab>
      <!--1회 승차권  -->
      <v-tab-item>
        <div
          class="active-ticket2"
          v-for="ticket in ticketList[0]"
          :key="ticket.reservation_seq"
          :v-if="ticket.length > 0"
        >
          <div
            class="ticket-tit3"
            v-bind:class="[
              { 'ticket-tit3': ticket.state === 1 },
              { 'deactive-ticket-tit2': ticket.state === 2 },
            ]"
          >
            <p>{{ ticket.date }}</p>
            <p>{{ ticket.adult_num + ticket.child_num + ticket.baby_num }}매</p>
          </div>
          <div class="ticket-main2">
            <div class="ticket-main-txt2">
              <div class="ticket-main-tit2">
                <p
                  v-bind:class="{
                    'deactive-ticket-main-tit2': ticket.state === 2,
                  }"
                >
                  <span>{{ ticket.station_name }}</span>
                  &#9;<span>{{ ticket.schedule_time }}</span>
                </p>
              </div>
              <div class="count-info2">
                일반 {{ ticket.adult_num }}명 청소년 {{ ticket.child_num }}명
                유아 {{ ticket.baby_num }}명
              </div>
              <div class="count-amount2">
                총 결제금액
                <span class="count-amount-one2">{{ ticket.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}원</span>
              </div>
            </div>
          </div>
        </div>
        <div class="no-ticket2" v-if="ticketList[0].length === 0">
          <h3>구매하신 승차권이 없어요</h3>
          <img src="../../assets/no_ticket_02.svg" />
          <p class="no-ticket-text2" style="font-size:13px">
            구매하신 승차권이 없습니다. <br />
            이전 페이지나 메인으로 이동해주세요.
          </p>
        </div>
      </v-tab-item>
      <!-- 종일 승차권 -->
      <v-tab-item>
        <div
          class="active-ticket2"
          v-for="ticket in ttt[0]"
          :key="ticket.reservation_seq"
          :v-if="ticket.length > 0"
        >
          <div
            class="ticket-tit3"
            v-bind:class="[
              { 'ticket-tit3': ticket.state === 1 },
              { 'deactive-ticket-tit2': ticket.state === 2 },
            ]"
          >
            <p>{{ ticket.date }}</p>
            <p>{{ ticket.adult_num + ticket.child_num + ticket.baby_num }}매</p>
          </div>
          <div class="ticket-main2">
            <div class="ticket-main-txt2">
              <div class="ticket-main-tit2">
                <p
                  v-bind:class="{
                    'deactive-ticket-main-tit2': ticket.state === 2,
                  }"
                >
                  <span>{{ ticket.station_name }}</span>
                  &#9;<span>{{ ticket.schedule_time }}</span>
                </p>
              </div>
              <div class="count-info2">
                일반 {{ ticket.adult_num }}명 청소년 {{ ticket.child_num }}명
                유아 {{ ticket.baby_num }}명
              </div>
              <div class="count-amount2">
                <span>총 환불금액</span>
                <!-- <span v-if="ticket.cancel_amount > 0">- {{ ticket.cancel_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}원</span> -->
                <span v-if="ticket.cancel_amount > 0">- {{ ticket.cancel_amount }}원</span>
                <span v-else>{{ ticket.cancel_amount }}원</span>
              </div>
            </div>
          </div>
        </div>
        <div class="no-ticket2" v-if="ttt[0].length === 0">
          <h3>구매하신 승차권이 없어요</h3>
          <img src="../../assets/no_ticket_02.svg" />
          <p class="no-ticket-text2" style="font-size:13px">
            구매하신 승차권이 없습니다. <br />
            이전 페이지나 메인으로 이동해주세요.
          </p>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex"
import axios from "axios"
// import VueQr from "vue-qr"
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
    ttt: [],
    isrefund: "",
    merchant_uid: "",
    amount: 0,
    showModal: false,
    menus: ["탑승내역", "환불내역"],
    test: null,
  }),
  computed: {
    ...mapGetters({
      user: "user",
    }),
    ...mapState(["uid"]),
  },
  created() {
    this.getTicketInfo0()
    this.getTicketInfo1()
  },
  methods: {
    getTicketInfo0() {
      console.log(111, this.uid)
      axios
        .get(`https://tasioapi.springgo.io/api/reservations/user-history/`, {
          params: {
            userid: this.uid,
            state: 2,
          },
        })
        .then((res) => {
          this.ticketList.push(res.data)
          console.log("this ticket", this.ticketList)
          this.merchant_uid = res.data[0].merchant_uid
          this.amount = res.data[0].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.data = res.data[0].date
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTicketInfo1() {
      axios
        .get(`https://tasioapi.springgo.io/api/reservations/user-history/`, {
          params: {
            userid: this.uid,
            state: 4,
          },
        })
        .then((res) => {
          this.ttt.push(res.data)
          console.log("this ticket2", this.ttt)
          this.merchant_uid = res.data[0].merchant_uid
          this.amount =res.data[0].cancle_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          this.data = res.data[0].date
        })
        .catch((error) => {
          console.log(error)
        })
    },
    
  },
}
</script>
<style scoped>
 .v-tab:before {background-color: #ffffff } 
.v-tab--active {
  background-color: #fff;
}
.tab-items {
  font-size: 16px;
  font-family: Noto Sans KR;
  letter-spacing: -1px;
  line-height: 26px;
}
.count-amount2 {
  border-top: 1px solid #dbdbdb;
  display: flex;
  justify-content: space-between;
  width: 290px;
  margin-top: 15px;
  padding-top: 10px;
  font-size: 18px;
}
.payment-date2 {
  font-size: x-small;
  color: gray;
}
.cancel2 {
  margin-top: 70px;
  color: #e61773;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  text-align: center;
}
#userhistory {
  font-family: Noto Sans KR;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
}
.no-ticket-text2 {
  color: #828282;
  margin-top: 100px;
  text-align: center;
}
.no-ticket2 {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
}
.no-ticket2 > h3 {
  margin-bottom: 50px;
}
.active-ticket2 {
  width: 340px;
  height: 180px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  margin: 0 auto 20px;
  margin-top: 20px;
}
.ticket-tit3 {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  height: 42px;
  background-color: #60AFA7;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 14px;
}
.deactive-ticket-tit2 {
  background-color: #5E93C7;
}
.ticket-main2 {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 25px;
}
.ticket-main-txt2 p {
  margin-bottom: -5px;
  font-size: 16px;
}
.ticket-main-tit2 {
  display: flex;
  color: #000000;
  font-weight: 500;
  padding-bottom: 15px;
  margin-top: -7px;
}
.deactive-ticket-main-tit2 {
  color: #555;
  font-weight: 500;
}
.count-info2 {
  font-size: 14px;
  display: flex;
}
.stamp2 {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30%;
  right: 0;
  transform: translateY(-50%);
}
</style>
