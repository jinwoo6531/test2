<template>
  <div id="ticket">
    <div
      class="active-ticket"
      v-for="ticket in ticketList[0]"
      :key="ticket.reservation_seq"
      :v-if="ticket.length >0"
    >
      <div
        class="ticket-tit"
        v-bind:class="[
          { 'ticket-tit': ticket.state === 1 },
          { 'deactive-ticket-tit': ticket.state === 2 },
        ]"
      >
        <p>{{ ticket.date }}</p>
        <p>{{ ticket.adult_num + ticket.child_num + ticket.baby_num }}매</p>
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
            일반 {{ ticket.adult_num }}명<br />
            청소년/어린이 {{ ticket.child_num }}명<br />
            유아{{ ticket.baby_num }}명
          </div>
        </div>
        <p class="stamp" @click="stampClicked(ticket.reservation_seq)">
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
      </div>
    </div>
    <div class="no-ticket" v-if='ticketList.length===0'>
      <p>
        승차권이 없습니다.<br>다시 한번 확인해주세요.
      </p>
    </div>
    <v-footer class="copyrightStyle">
      <span
        >결제하신 셔틀 탑승 시 승차권을 제시해주시기 바랍니다<br />
        승차권은 탑승일 일주일 이후 삭제됩니다.</span>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import axios from "axios";
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
  }),
  computed: {
    ...mapGetters({
      user: "user",
    }),
    ...mapState(["uid"]),
  },
  created() {
    this.getTicketInfo();
  },
  methods:{
    getTicketInfo(){
      console.log('uid',this.uid)
      axios.get(`https://test.aspringcloud.com/api/reservations/user-reservation/`
       ,{params:{
          userid: this.uid
        }}
      )
    
      .then(res=>
       { 
         this.ticketList.push(res.data)
         console.log('this ticket', this.ticketList)
        },
      )
      .catch(error => {
          console.log(error)
      })
    },
    //티켓 정보 받아오는 api
      stampClicked(ticketId){
        console.log('ticketId',ticketId)
        axios.put(`https://test.aspringcloud.com/api/reservations/${ticketId}/`,{
          id:ticketId,
          state:2
        })
        .then()
         .catch(error => {
          console.log(error)
      })
        let findItem=this.ticketList[0].find(ticket=>ticket.reservation_seq===ticketId)
        findItem.state=2   
      },
      //탑승권 승차 확인 클릭 시

  }
  
};
</script>

<style>
#ticket {
  font-family: Noto Sans KR;
  width: 100%;
  height: 100%;
  position: relative;
}
.no-ticket{
  color: #e61773;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.active-ticket {
  width: 340px;
  height: 150px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  margin: 0 auto 20px;
}
.ticket-tit {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  background-color: #e61773;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  color: #fff;
  padding: 5px 20px;
  box-sizing: border-box;
}
.deactive-ticket-tit {
  background-color: #999;
}
.ticket-main {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 20px;
}
.ticket-main-txt p {
  margin-bottom: -5px;
  font-size: 13px;
}
.ticket-main-tit {
  display: flex;
  color: #e61773;
  font-weight: 500;
  padding-bottom: 20px;
  margin-top: -10px;
}
.deactive-ticket-main-tit {
  color: #555;
  font-weight: 500;
}
.count-info {
  font-size: 14px;
}
.stamp {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.stamp span {
  color: #e61773;
  font-size: 14px;
  font-weight: 500;
}

.copyrightStyle {
  width: 100%;
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0%);
}
</style>
