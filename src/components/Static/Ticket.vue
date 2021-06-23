<template>
<div id="ticket">
   <div class="active-ticket">
       <div class="ticket-tit">
           <p>2021년 6월 8일 (화)</p><span>1매</span>
       </div>
       <div class="ticket-main">
           <div class="ticekt-main-txt">
                <p class="ticket-main-tit">
                    <span>대구 수성 알파시티</span><span>15 : 00</span>
                </p>
                <br>
                <p>
                    일반 2명
                </p>
                 <p>
                    청소년/어린이 2명
                </p>
           </div>
           <p>
               <span>승차 확인</span>
           </p>
       </div>
   </div>
   <div class="deactivated-ticket">

   </div>

      <v-footer class="copyrightStyle nav-footer justify-left pa-0">
            <span>COPYRIGHT@SPRINGCLOUD INC. <br />
                    ALL RIGHTS RESERVED.</span>
        </v-footer>
</div>

</template>

<script>
export default {
    name: 'ticket',

    data: () => ({
       
    }),

    

}
</script>

<style scoped>

#ticket {
    font-family: Noto Sans KR;
    width: 100%;
    height: 100%;
}

.faq-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 40px;
    color: #262626 !important;
    padding: 12px 0 30px 0;
}

.mdi-chevron-down::before {
    display: none;
}

.v-expansion-panel-content__wrap {
    background: #F2F2F2;
    padding: 15px 40px !important;
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #888;
}

button:focus {
    outline: 0;
}

.pagination {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
}
.copyrightStyle {
    font-family: Roboto !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 10px !important;
    line-height: 14px;
    color: #bdbdbd !important;
    background: transparent !important;
    position: absolute;
    bottom: 0;
}
</style>
