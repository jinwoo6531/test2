<template>
    <div id="ticket">
        <v-tabs v-model="tab" centered fixed-tabs>
                <v-tab v-for="item in menus" :key="item">{{item}}</v-tab>

                 <!--1회 승차권  -->
                <v-tab-item>
                    <div
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
                <p>{{ ticket.date }}</p>
                <p>
                    {{
                        ticket.adult_num + ticket.child_num + ticket.baby_num
                    }}매
                </p>
            </div>
  
            <div class="ticket-main">
                <div class="ticket-main-txt">
                    <div class="ticket-main-tit">
                        <img src="../../assets/tasio-logo3.png" alt="" />
                            <!-- <img src="../../assets/qrqr.png" alt="" class="tit-img" /> -->
                            <qrcode-stream v-if="isShowingCamera" @init="onInit" @decode="onDecode"></qrcode-stream>
                            <div class="ticket-main-tit-div">
                            <span>{{ticket.station_name}} {{ticket.schedule_time}}</span> 
                            <span class="ticket-main-tit-div-span"><img src="../../assets/arrow-right.png" alt="arrow-right"/> </span>
                            <span>{{ticket.destination}}</span>                
                            </div>  
                    </div>
                     <div class="count-info">
                        <div class="count-info-div">
                        일반 {{ ticket.adult_num }}명,
                        청소년 {{ ticket.child_num }}명,
                        유아 {{ ticket.baby_num }}명
                        </div>
                        
                        <div>
                         <v-btn @click="cancelPay()" small color="white">
                            환불하기
                        </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- no ticket -->
        <div class="no-ticket" v-if="ticketList[0].length === 0">
            <h3>구매하신 승차권이 없어요</h3>
            <img src="../../assets/no_ticket_02.svg" />
            <p class="no-ticket-text" style="font-size:13px">
                구매하신 승차권이 없습니다. <br />이전 페이지나 메인으로
                이동해주세요.
            </p>
        </div>
                </v-tab-item>

                <!-- 종일 승차권 -->
                <v-tab-item>
                    <div
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
                <p>{{ ticket.date }}</p>
                <p>
                    {{
                        ticket.adult_num + ticket.child_num + ticket.baby_num
                    }}매
                </p>
            </div>
            <!-- 메인 -->
            <div class="ticket-main">
                <div class="ticket-main-txt">
                    <div class="ticket-main-tit">
                            <img src="../../assets/tasio-logo3.png" alt="" />
                            <img src="../../assets/qrqr.png" alt="" class="tit-img" />       
                            <span>여수 스페이스 M 종일 승차권</span>                        
                    </div>
                </div>
                <div class="count-info">
                    <div class="count-info-div">
                      일반 {{ ticket.adult_num }}명,
                      청소년 {{ ticket.child_num }}명,
                      유아 {{ ticket.baby_num }}명
                    </div>
                        
                    <div>
                      <v-btn @click="cancelPay()" small color="white">
                        환불하기
                      </v-btn>
                    </div>
                </div>
            </div>
        </div>


        <!-- no ticket -->
        <div class="no-ticket" v-if="allDayTicket[0].length === 0">
            <h3>구매하신 승차권이 없어요</h3>
            <img src="../../assets/no_ticket_02.svg" />
            <p class="no-ticket-text" style="font-size:13px">
                구매하신 승차권이 없습니다. <br />이전 페이지나 메인으로
                이동해주세요.
            </p>
        </div>

            </v-tab-item>
        </v-tabs>


        <v-footer class="copyrightStyle">
            <span
                >결제하신 셔틀 탑승 시 승차권을 제시해주시기 바랍니다<br />
                승차권은 탑승일 일주일 이후 삭제됩니다.</span
            >
        </v-footer>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import axios from "axios"


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
        menus: ['1회 승차권', '종일 승차권'],
        tab: null,
        isShowingCamera: true,
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
          test(dataUrl,id){
            console.log(dataUrl, id)
        },

        //1회 승차권 불러오기
        getTicketInfo() {
            console.log("uid", this.uid)
            axios
                .get(
                    `https://tasioapi.springgo.io/api/reservations/user-reservation/`,
                    {
                        params: {
                            userid: this.uid,
                            ticket_type:0
                        },
                    }
                )

                .then((res) => {
                    console.log(123,res);
                    this.ticketList.push(res.data)
                    console.log("this ticket", this.ticketList)
                    console.log("예약정보 :", res.data)
                    this.merchant_uid = res.data[0].merchant_uid
                    this.amount = res.data[0].amount
                    this.data = res.data[0].date
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        getAllDayTicketInfo() {
            axios
                .get(
                    `https://tasioapi.springgo.io/api/reservations/user-reservation/`,
                    {
                        params: {
                            userid: this.uid,
                            ticket_type:1
                        },
                    }
                )

                .then((res) => {
                    console.log(456,res);
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
                .put(
                    `https://tasioapi.springgo.io/api/reservations/${ticketId}/`,
                    {
                        id: ticketId,
                        state: 2,
                    }
                )
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
            axios({
                url:
                    "https://ondemand.springgo.io:100/tasio-288c5/us-central1/app/api/payment/cancel",
                method: "post",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    userid: this.uid,
                },
                data: {
                    merchant_uid: this.merchant_uid,
                    reason: "승차권 예약취소",
                    cancel_request_amount: this.amount,
                },
            })
                .then((response) => {
                    alert("환불이 완료되었습니다.", response)
                    console.log(response)
                })
                .catch((error) => {
                    alert("환불을 실패하였습니다.", error)
                })

            this.$router.push("/")
        },
    },
}
</script>

<style>

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
    width: 100%;
    height: 100%;
    position: relative;
    
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
}
.no-ticket > h3 {
    margin-bottom: 50px;
}
.active-ticket {
    width: 340px;
    height: 376px;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    margin: 0 auto 20px;
    margin-top:23px;
}
.ticket-tit2 {
    font-size: 14px;
    display: inline-flex;
    justify-content: space-between;
    width: 340px;
    height: 42px;
    background-color: #12ABBF;
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
.deactive-ticket-tit {
    background-color: #999;
}
.ticket-main {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 20px;
    height: 64px;
    width:304px;
}
.ticket-main-txt p {
    margin-bottom: -5px;
    font-size: 14px;
}
.ticket-main-tit { 
    display: flex;
    align-items: center;
    flex-direction: column;
    color:black;
    padding-bottom: 20px;
}
.ticket-main-tit-div {
    display: flex;
    justify-content: space-between;
}
.ticket-main-tit-div-span {
   margin-left: 5px;
   padding-top:2px; 
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
    border:1px solid #DBDBDB;
    background-color: #F9F9F9;
}
.count-info-div {
    padding:7px;
}

.copyrightStyle {
    width: 100%;
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%, 0%);
}
</style>