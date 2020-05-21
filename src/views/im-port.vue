<template>
<div>
    <button @click="requestPay">결제하기</button>
</div>
</template>

<script>
export default {
    data: () => ({

    }),

    methods: {
        requestPay() {
            const IMP = window.IMP

            // 가맹점 식별코드
            IMP.init("imp19092456")

            // IMP.request_pay(param, callback) 호출
            IMP.request_pay({ // param
                pg: 'inicis', // PG사명
                pay_method: 'card', // 결제수단
                merchant_uid: 'merchant_' + new Date().getTime(), // 가맹점에서 생성/관리하는 고유 주문번호
                name: '주문명: 타시오 결제', // 주문명
                amount: 1000, // 결제할 금액 (필수 항목)
                buyer_email: 'yjhyeon@aspringcloud.com', // 주문자 ID (선택 항목)
                buyer_name: '현유진', // 주문자명 (선택항목)
                buyer_tel: '010-1234-5678', // 주문자 연락처 (필수 항목) 누락되거나 blank일 때 일부 PG사에서 오류 발생
                buyer_addr: '경기기업성장센터 523~524호', // 주문자 주소 (선택 항목)
                buyer_postcode: '123-456', // 주문자 우편 번호 (선택 항목)
                // m_redirect_url: 'https://www.yourdomain.com/payments/complete' // 모바일 결제시, 결제가 끝나고 랜딩되는 URL을 지정 (카카오페이, 페이코, 다날의 경우는 필요없음. PC와 마찬가지로 callback함수로 결과가 떨어짐)
            }, rsp => { // callback
                console.log('rsp', rsp)
                var msg = '';
                if (rsp.success) {
                    // 결제 성공 시 로직,
                    msg = '결제가 완료되었습니다.'
                    msg += '고유ID : ' + rsp.imp_uid
                    msg += '상점 거래ID : ' + rsp.merchant_uid
                    msg += '결제 금액 : ' + rsp.paid_amount
                    msg += '카드 승인번호 : ' + rsp.apply_num
                    alert(msg)
                } else {
                    // 결제 실패 시 로직,
                    msg = '결제에 실패하였습니다.'
                    msg += '에러내용 : ' + rsp.error_msg
                    alert(msg)
                }
            });

        }
    }
}
</script>

<style>

</style>
