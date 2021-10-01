<template>
    <div id="userhistory">

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
                        <p
                            v-bind:class="{
                                'deactive-ticket-main-tit': ticket.state === 2,
                            }"
                        >
                            <span>{{ ticket.station_name }}</span> &#9;<span>{{
                                ticket.schedule_time
                            }}</span>
                        </p>
                    </div>
                    <div class="count-info">
                        일반 {{ ticket.adult_num }}명
                        청소년 {{ ticket.child_num }}명
                        유아 {{ ticket.baby_num }}명
                    </div>
                    <div class="count-amount">
                        총 결제금액 <span class="count-amount-one">{{ticket.amount}}원</span>
                    </div>
                </div>
              <!--  <p class="stamp" @click="stampClicked(ticket.reservation_seq)">
                    <img
                        v-if="ticket.state === 1"
                        src="../../assets/ticket_active_stamp.png"
                        alt="Tasio Stamp"
                    />
                    <img
                        v-else-if="ticket.state === 2"
                        src="../../assets/deactive_stamp.png"
                        alt="Tasio Stamp"
                    />
                </p>
                -->
                <!-- <vue-qr text="Hello world!" :callback="test" qid="testid" :size=80></vue-qr> -->
                <!--<button class="cancel" @click="cancelPay()">
                    환불하기
                </button>
                --> 
            </div>
        </div>
        <div class="no-ticket" v-if="ticketList[0].length === 0">
            <h3>구매하신 승차권이 없어요</h3>
            <img src="../../assets/no_ticket_02.svg" />
            <p class="no-ticket-text" style="font-size:13px">
                구매하신 승차권이 없습니다. <br />이전 페이지나 메인으로
                이동해주세요.
            </p>
        </div>
     
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import axios from "axios"
import VueQr from "vue-qr"
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
        isrefund: "",
        merchant_uid: "",
        amount: 0,
        showModal: false,
    }),

    computed: {
        ...mapGetters({
            user: "user",
        }),
        ...mapState(["uid"]),
    },
    created() {
        this.getTicketInfo()
    },
    methods: {
        test(dataUrl, id) {
            console.log(VueQr, id)
        },
        getTicketInfo() {
            console.log("uid", this.uid)
            axios
                .get(
                    `https://tasioapi.springgo.io/api/reservations/user-reservation/`,
                    {
                        params: {
                            userid: this.uid,
                        },
                    }
                )

                .then((res) => {
                    console.log(res)
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
.count-amount-one{
    /* border:1px solid red; */
    margin-top:-30px;
    display: flex;
    justify-content: flex-end;
    
}
.count-amount{
    border-top: 1px solid #dbdbdb;
    width: 83vw;
    margin-top:15px;
    padding-top: 10px;
    font-size: 18px;
   
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
    height: 180px;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    margin: 0 auto 20px;
}
.ticket-tit {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    height: 42px;
    background-color: #999999;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    color: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
    font-size:14px;
    
}
.deactive-ticket-tit {
    background-color: #999;
}
.ticket-main {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 25px;
}
.ticket-main-txt p {
    margin-bottom: -5px;
    font-size: 16px;
}
.ticket-main-tit {
    display: flex;
    color: #000000;
    font-weight: 500;
    padding-bottom: 15px;
    margin-top: -7px;
}
.deactive-ticket-main-tit {
    color: #555;
    font-weight: 500;
}
.count-info {
    font-size: 14px;  
    display: flex; 
    

}
.stamp {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30%;
    right: 0;
    transform: translateY(-50%);
}
.stamp span {
    /* color: #e61773; */
    /* font-size: 12px; */
    /* font-weight: 500; */
}

.copyrightStyle {
    width: 100%;
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%, 0%);
}
</style>



