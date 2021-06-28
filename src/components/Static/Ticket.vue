<template>
  <div id="ticket">
    <div class="active-ticket" v-for="ticket in ticketList[0]" :key="ticket.reservation_seq">
      <div class="ticket-tit" v-bind:class="[{'ticket-tit':ticket.state===1}, {'deactive-ticket-tit':ticket.state===2}]">
        <p>{{ticket.date}}</p>
        <p>{{ticket.ticketCount}}매</p>
      </div>
      <div class="ticket-main">
        <div class="ticket-main-txt">
          <div class="ticket-main-tit" >
            <p v-bind:class="{'deactive-ticket-main-tit':ticket.state===2}"><span>{{ticket.station_name}}</span> &#9;<span>{{ticket.schedule_time}}</span></p>
          </div>
          {{ticket.adultCount}}<br>
          {{ticket.childCount}}
        </div>
        <p class="stamp" @click="stampClicked(ticket.reservation_seq)">
          <img v-if="ticket.state===1" src="../../assets/ticket_active_stamp.png" alt="Tasio Stamp" />
          <img v-else-if="ticket.state===2" src='../../assets/deactive_stamp.png' alt="Tasio Stamp" />
        </p>
      </div>
    </div>
    <v-footer class="copyrightStyle nav-footer justify-left pa-0">
      <span>결제하신 셔틀 탑승 시 승차권을 제시해주시기 바랍니다<br />
        승차권은 탑승일 일주일 이후 삭제됩니다.</span>    
    </v-footer>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ticket",

  data: () => ({
    date:'',
    ticketCount:0,
    reservation_seq:0,
    state:0,
    ordinalNo:0,
    stationNo:0,
    station_name:"",
    schedule_time:"",
    adultCount:'',
    childCount:'',
    babyCount:'',
    ticketList: [],
      
  }),
  created(){
    this.getTicketInfo();
  },
  methods:{
    getTicketInfo(){
      axios.get(`https://sgapi.springgo.io/api/reservations/reservations/user-reservation/?userid=O3VtOx2eIXMxkUNgezAvyWBgoMg2`)
      .then(res=>
       { 
         this.ticketList.push(res.data)
         console.log('this ticket', this.ticketList)
        }
      )
      .catch(error => {
                    console.log(error);
                })
    },
      stampClicked(ticketId){
        const findItem=this.ticketList.find(ticket=>ticket.reservation_seq===ticketId)
        findItem.state=2;   
      }
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
  height:35px ;
  background-color: #E61773;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    color: #fff;
    padding: 5px 20px;
    box-sizing: border-box;
}
.deactive-ticket-tit{
    background-color: #999;
}
.ticket-main {
  display: flex;
  justify-content: space-between;
  position:relative;
  margin: 20px;
  
}
.ticket-main-txt p{
    margin-bottom: -5px;
    font-size: 13px;
}
.ticket-main-tit {  
  display: flex;
  color:  #E61773;
  font-weight: 500;
  padding-bottom: 20px;
}
.deactive-ticket-main-tit{
    color: #555;
    font-weight: 500;
}

.stamp {
  display: flex;
  flex-direction: column;
  position:absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.stamp span{
    color:  #E61773;
    font-size: 14px;
    font-weight: 500;
}

.copyrightStyle{   
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%, 0%);
}

</style>
