<template>
  <v-dialog v-model="show" scrollable max-width="320px">
    <v-card flat tile color="#FFF">
      <v-card-title class="pa-0" style="height: 30px">
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click.native="$emit('update:marketingDialog', false)"
          width="16px"
          height="16px"
          style="padding-right: 20px; padding-top: 5px"
        >
          <v-img src="@/assets/closing-btn.svg"></v-img>
        </v-btn>
      </v-card-title>

      <v-card-text class="pa-3 pt-0 terms_content">
        <span class="terms_title">마케팅 정보 수신 동의</span><br />
        <br />
        <b>제1조 (마케팅 정보 수신 동의)</b><br />
        ㈜스프링클라우드(이하 “회사”라 한다)는 개인정보보호법 및
        정보통신망이용촉진및정보보호등에관한법률 등 관계법령에 따라 광고성정보를
        전송하기 위해 수신자의 사전 수신동의를 받고 있으며, 광고성정보 수신자의
        수신동의여부를 정기적으로 확인합니다.<br />
        <br />
        <b>제2조 (전송방법)</b><br />
        이용자의 모바일 App Push, 핸드폰 문자메시지(SMS), Email 등을 통해 전달될
        수 있습니다.<br />

        <b>제3조 (전송내용)</b><br />
        발송되는 마케팅 정보는 수신자에게 회사와 관련하여 제공하는 혜택(포인트,
        쿠폰 등) 정보, 각종 이벤트 정보 등 광고성 정보로 관련 법의 규정을
        준수하여 발송됩니다. 단, 광고성 정보 이외 의무적으로 안내되어야 하는
        정보성 내용은 수신동의 여부와 무관하게 제공됩니다.<br />
        <br />
        <b>제4조 (철회안내)</b><br />
        이용자는 수신 동의 이후에라도 의사에 따라 동의를 철회할 수 있습니다.<br />
        <br />
        <b>제5조 (수신동의 변경)</b><br />
        회사의 고객센터(031-778-8346)을 통해 수신동의를 변경(동의/철회)할 수
        있습니다.<br />
        <br />
        <b>제6조 (개인정보 이용 상세내용)</b><br />
        이용하는 개인정보 - 보유 이용 목적<br />
        휴대전화번호,이메일주소 - 혜택 정보,각종 이벤트 정보 등 광고성 정보
        제공<br />

        <br />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Marketing",
  props: ["marketingDialog"],
  data: () => ({
    show: false,
  }),
  created() {
    this.show = this.marketingDialog;
  },
  watch: {
    marketingDialog() {
      this.show = this.marketingDialog;
    },
    show() {
      //   this.show = this.marketingDialog;
      if (!this.show) this.$emit("update:marketingDialog", this.show);
      else this.$emit("update:marketingDialog", this.show);
    },
  },
};
</script>

<style scoped>
.terms_title {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #e61773;
}

.terms_content {
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: normal;
  line-height: 17px;
  font-size: 12px !important;
  color: #4f4f4f;
}
</style>