<template>
<div id="userinfo">
    <v-container class="pa-0 ma-0 flex-wrap" fluid justify-center grid-list-md fill-height>
        <v-layout row wrap class="ma-0">
            <v-flex class="pa-0" xs12 sm12 md12 style="width: 100%; height: 100%;">
                <v-list subheader>
                    <v-subheader>Recent chat</v-subheader>

                    <v-list-item v-for="item in items" :key="item.title">
                        <v-list-item-avatar>
                            <v-img :src="item.avatar"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-icon>
                            <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list subheader>
                    <v-list-item v-for="item in items2" :key="item.title">
                        <v-list-item-avatar>
                            <v-img :src="item.avatar"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
