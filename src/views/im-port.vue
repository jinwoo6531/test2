<template>
<div>
    <button @click="requestPay">결제하기</button>
    <button @click="cancelPay">결제취소하기</button>
</div>
</template>

<script>
import axios from 'axios'
import {
    mapGetters
} from 'vuex'
var qs = require('qs')

export default {
    data: () => ({

    }),

    computed: {
        ...mapGetters({
            user: "user"
        })
    },

    methods: {
        requestPay() {
            // 아임포트 객체
            const IMP = window.IMP

            // 가맹점 식별코드
            IMP.init("imp19092456")

            // 결제창 호출 코드
            IMP.request_pay({ // param
                pg: 'inicis', // PG사명
                pay_method: 'card', // 결제수단
                merchant_uid: 'mid_' + new Date().getTime() + this.user.data.uid, // 가맹점에서 생성/관리하는 고유 주문번호
                name: '타시오 결제', // 주문명
                amount: 100, // 결제할 금액 (필수 항목)
                buyer_email: '', // 주문자 ID (선택 항목)
                buyer_name: '', // 주문자명 (선택항목)
                buyer_tel: '010-8433-9772', // 주문자 연락처 (필수 항목) 누락되거나 blank일 때 일부 PG사에서 오류 발생
                buyer_addr: '', // 주문자 주소 (선택 항목)
                buyer_postcode: '', // 주문자 우편 번호 (선택 항목)
                custom_data: this.user.data.uid, // import에서 제공하는 커스텀 데이터 변수에 useruid 를 담아서 보냄
            }, rsp => { // callback
                if (rsp.success) {
                    console.log('결제 성공 success!!: ', rsp.success)
                    axios({
                        url: 'http://34.64.137.217:5000/tasio-288c5/us-central1/app/api/payment/put', // 가맹점 서버
                        method: "post",
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: qs.stringify({
                            imp_uid: rsp.imp_uid,
                            merchant_uid: rsp.merchant_uid,
                            amount: rsp.paid_amount,
                            userid: this.user.data.uid
                        })
                    }).then(data => {
                        // 가맹점 서버 결제 API 성공시 로직
                        console.log('가맹점 서버 결제 API 성공!', data)
                        switch (data.status) {
                            case 'success':
                                break;
                            case 'forgery':
                                break;
                        }
                    }).catch(error => {
                        // 가맹점 서버 결제 API 실패시 로직
                        console.log('가맹점 서버 결제 API 실패ㅠㅠ: ', error)
                    })
                } else {
                    // 결제 실패 시 로직
                    // 돈이 안맞을 때?
                    console.log('rsp.error_msg: ', rsp.error_msg)
                }
            });

        },

        cancelPay() {
            // Firestore에서 회원정보를 조회하고 isRefund가 0이면 환불을 진행할 수 있게 1이면 이미 환불이 된 상태라 불가능하게하기
            // merchant_uid에 last_merchant 담아서 보내주고 reason 담아서 보내주기
            if (this.isrefund == '0') {
                axios({
                    url: "http://34.64.137.217:5000/tasio-288c5/us-central1/app/api/payment/cancel",
                    method: "post",
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        merchant_uid: this.last_mid, // 주문번호 *
                        reason: "타시오 호출 취소", // 환불 사유 *
                        cancel_request_amount: 500
                    }
                }).then(response => {
                    alert('환불이 완료되었습니다.', response)
                }).catch(error => {
                    alert('환불을 실패하였습니다.', error)
                })

                this.$router.push('/')
            } else {
                alert('결제하신 내역이 없습니다.')
            }
        }
    }
}
</script>

<style>

</style>
