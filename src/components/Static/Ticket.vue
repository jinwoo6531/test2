<template>
  <div id="ticket">
    <div class="active-ticket">
    <!-- <div class="active-ticket" v-for="ticket in ticketList" :key="ticket.id"> -->
      <div class="ticket-tit">
        <p>2021년 6월 8일 (화)</p>
        <p>1매</p>
      </div>
      <div class="ticket-main">
        <div class="ticket-main-txt">
          <p class="ticket-main-tit">
            <span>대구 수성 알파시티</span><span>15 : 00</span>
          </p>
          <p>일반 2명</p>
          <p>청소년/어린이 2명</p>
        </div>
        <p class="stamp">
          <img src="../../assets/TASIO_stamp_color.png" alt="Tasio Stamp" />
          <span>승차 확인</span>
        </p>
      </div>
    </div>
    <div class="deactivated-ticket"></div>

    <v-footer class="copyrightStyle nav-footer justify-left pa-0">
      <span
        >결제하신 셔틀 탑승 시 승차권을 제시해주시기 바랍니다<br />
        승차권은 탑승일 일주일 이후 삭제됩니다.</span
      >
    
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "ticket",

  data: () => ({
      ticketList: [],
      isActive: true,
  }),
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
  margin: 0 auto;

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
</style>
