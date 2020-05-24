<template>
<v-app>
<v-navigation-drawer 
v-model="drawer"  :mini-variant="miniVariant" :clipped="clipped" fixed app class="teal">
<v-list>
<v-list-item v-for="(item, i) in menus" :key="i" :to="item.to" router exact>
<v-list-item-action>
<v-icon class="white--text">{{ item.icon }}</v-icon>
</v-list-item-action>
<v-list-item-content>
<v-list-item-title class="white--text"  v-text="item.title"/>
</v-list-item-content>
</v-list-item>
</v-list>
</v-navigation-drawer>

<v-app-bar :clipped-left="clipped" fixed app class="primary">
<v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text"/>
<!-- {{title}} -->
<span class="white--text" v-if="this.$auth.user" > Welcome, <b>{{this.$auth.user.name}}</b></span>
<v-spacer />
<!-- <span v-if="this.$auth.user" > Welcome, <b>{{this.$auth.user.name}}</b> -->
<!-- <v-btn text> -->
<!-- {{logout_btn.label}} -->
<v-icon class="white--text" @click="logout">{{ logout_btn.icon }}</v-icon>
<!-- </v-btn> -->
<!-- </span> -->
</v-app-bar>
<v-content>

<v-container>
<nuxt />
</v-container>

</v-content>

<v-footer :fixed="fixed" app class="primary white--text">
<span>&copy; {{year}}</span>
</v-footer>
</v-app>
</template>

<script>
export default {

data () {
return {
year: new Date().getFullYear(),
clipped: false,
fixed:false,
drawer: true,
menus : [
  { icon: 'mdi-apps', title: 'Home',to: '/' },
  { icon: 'mdi-apps', title: 'Level',to: '/levels' },
  { icon: 'mdi-apps', title: 'Subject',to: '/subjects' },
],      

miniVariant: false,
right: true,
rightDrawer: false,
title: 'Virtual School',
logout_btn:{
icon:'mdi-logout',
label:'Logout'
}
}
},

methods:{
async logout() {
  await this.$auth.logout();
},
}
}
</script>
