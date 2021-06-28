<template>
  <div id="ticket">
    <div class="active-ticket" v-for="ticket in ticketList" :key="ticket.id">
      <div class="ticket-tit" v-bind:class="[{'ticket-tit':ticket.isActive}, {'deactive-ticket-tit':!ticket.isActive}]">
        <p>{{ticket.date}}</p>
        <p>{{ticket.ticketCount}}매</p>
      </div>
      <div class="ticket-main">
        <div class="ticket-main-txt">
          <div class="ticket-main-tit" >
            <p v-bind:class="{'deactive-ticket-main-tit':!ticket.isActive}"><span>{{ticket.siteName}}</span> &#9;<span>{{ticket.reserveTime}}</span></p>
          </div>
          {{ticket.adultCount}}<br>
          {{ticket.childCount}}
        </div>
        <p class="stamp" @click="stampClicked(ticket.id)">
          <img v-if="ticket.isActive===true" src="../../assets/ticket_active_stamp.png" alt="Tasio Stamp" />
          <img v-else-if="ticket.isActive===false" src='../../assets/deactive_stamp.png' alt="Tasio Stamp" />
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
export default {
  name: "ticket",

  data: () => ({
    date:'',
    ticketCount:0,
    siteName:'',
    reserveTime:'',
    isActive: true,
    adultCount:'',
    childCount:'',
    babyCount:'',
      ticketList: [{
        id:1,
        date:'2021년 6월 8일 (화)',
        ticketCount:1,
        siteName:'대구 수성 알파시티',
        reserveTime: '14:00',
        isActive:true,
        adultCount:'일반 2명',
        childCount: '청소년/어린이 2명'
      },
      {
        id:2,
        date:'2021년 6월 6일 (일)',
        ticketCount:1,
        siteName:'대구 수성 알파시티',
        reserveTime: '14:00',
        isActive:false,
        adultCount:'일반 3명',
        childCount: '청소년/어린이 5명'
      },
      {
        id:3,
        date:'2021년 6월 5일 (토)',
        ticketCount:1,
        siteName:'대구 수성 알파시티',
        reserveTime: '13:00',
        isActive:false,
        adultCount:'일반 1명',
        childCount: '청소년/어린이 1명'
      }
      ],
      
  }),
  methods:{
      stampClicked(ticketId){
        const findItem=this.ticketList.find(ticket=>ticket.id===ticketId)
        findItem.isActive=false;
         console.log(findItem.isActive)        
      }
  }
  //function need to be fixed
};
</script>

<style>

#ticket {
  font-family: Noto Sans KR;
  width: 100%;
  height: 100%;
 
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
    text-align: center;
}

</style>
