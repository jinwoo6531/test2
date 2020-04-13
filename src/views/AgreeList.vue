<template>
<v-container>
    <v-layout row wrap>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <p>Agree List</p>
        </v-flex>
    </v-layout>
    <v-layout>
        <v-flex class="pa-0" xs12 sm12 md12 lg12 xl2>
            <v-btn @click="Access">액세스 허용 팝업</v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'AgreeList',

    methods: {
        Access() {
            this.$router.replace('/infostep')
        }
    }

}
</script>

<style>

</style>
