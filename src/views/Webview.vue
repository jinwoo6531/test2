<template>
<div>
    <v-card flat tile>
        <p>JS and Android interactive</p>

        <v-btn @click="invokeAppMethod">JS call App Method(Without parameters)</v-btn>
        <br />
        <br />
        <v-btn @click="sendInfoToJava">JS call App Method(Band parameters)</v-btn>
    </v-card>
</div>
</template>

<script>
export default {
    methods: {
        // Send message to Android client
        sendInfoToJava() {
            //Call methods in android program and pass parameters
            var name = 'I am TASIO'
            window.AndroidWebView.showInfoFromJs(name)
        },

        // Call the showInfoFromJs method in the Android client directly
        invokeAppMethod() {
            window.AndroidWebView.showInfoFromJs()
        },

        //Call this method in Android code.
        showInfoFromApp(msg) {
            alert("Come from App Information:" + msg)
        }
    }
}
</script>

<style>

</style>
