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
            const IMP = window.IMP

            // 가맹점 식별코드
            IMP.init("imp19092456")

            // IMP.request_pay(param, callback) 호출
            IMP.request_pay({ // param
                pg: 'mobilians', // PG사명
                pay_method: 'card', // 결제수단
                merchant_uid: 'merchant_' + new Date().getTime(), // 가맹점에서 생성/관리하는 고유 주문번호
                name: '주문명: 타시오 결제', // 주문명
                amount: 100, // 결제할 금액 (필수 항목)
                buyer_email: 'yjhyeon@aspringcloud.com', // 주문자 ID (선택 항목)
                buyer_name: '현유진', // 주문자명 (선택항목)
                buyer_tel: '010-8433-9772', // 주문자 연락처 (필수 항목) 누락되거나 blank일 때 일부 PG사에서 오류 발생
                buyer_addr: '경기기업성장센터 523~524호', // 주문자 주소 (선택 항목)
                buyer_postcode: '123-456', // 주문자 우편 번호 (선택 항목)
            }, rsp => { // callback
                // 결제 성공 시 로직
                if (rsp.success) {
                    alert('결제 성공 시 로직 ', rsp.success)
                    axios({
                        url: 'http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/payment/put/' + this.user.data.uid, // 가맹점 서버
                        method: "post",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            imp_uid: rsp.imp_uid,
                            merchant_uid: rsp.merchant_uid,
                            amount: rsp.paid_amount,
                            // userid: this.user.data.uid
                        }
                    }).then((data) => {
                        // 가맹점 서버 결제 API 성공시 로직
                        alert('가맹점 서버 결제 API 성공시 로직 ', data)
                    })
                    
                    // axios({
                    //     url: 'http://34.64.137.217:5000/tasio-fcef3/us-central1/app/api/payment/put/' + this.user.data.uid,
                    //     method: "PUT",
                    //     headers: {
                    //         'Content-Type': 'application/x-www-form-urlencoded'
                    //     },
                    //     data: {
                    //         imp_uid: rsp.imp_uid,
                    //         merchant_uid: rsp.merchant_uid,
                    //         amount: rsp.paid_amount,
                    //         userid: this.user.data.uid
                    //     }
                    // }).done(function (data) {
                    //     // 가맹점 서버 결제 API 성공시 로직
                    //     console.log('가맹점 서버 결제 API 성공!', data)
                    // })
                } else {
                    // 결제 실패 시 로직
                    alert('rsp.error_msg: ', rsp.error_msg)
                }
            });

        },

        cancelPay() {
            console.log('cancelPay')
            axios({
                url: "http://www.myservice.com/payments/cancel",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    merchant_uid: "mid_" + new Date().getTime(), // 주문번호 *
                    cancel_request_amount: 2000, // 환불금액 *
                    reason: "타시오 결제 환불", // 환불사유 *
                    // 가상 계좌 환불 시
                    refund_holder: "현유진", // [가상계좌 환불시 필수입력] 환불 가상계좌 예금주
                    refund_bank: "88", // [가상계좌 환불시 필수입력] 환불 가상계좌 은행코드(ex. KG이니시스의 경우 신한은행은 88번)
                    refund_account: "56211105948400" // [가상계좌 환불시 필수입력] 환불 가상계좌 번호
                }
            }).then(response => {
                alert('환불이 완료되었습니다.', response)
            }).catch(error => {
                alert('환불을 실패하였습니다.', error)
            })

        }
    }
}
</script>

<style>

</style>
