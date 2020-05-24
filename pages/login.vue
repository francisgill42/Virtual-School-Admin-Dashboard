<template>
<v-app id="login" class="primary">
<v-snackbar v-model="snackbar" :top="'top'">
{{msg}}
<v-btn text @click="snackbar = false">
Close
</v-btn>
</v-snackbar>
<v-content>
<v-container fluid fill-height>
<v-layout align-center justify-center>
<v-flex xs12 sm8 md4 lg4>
<v-card class="elevation-1 pa-3">
<v-card-text>
<div class="layout column align-center">
<!-- <img src="logo-connect.png" alt="Vue Material Admin" width="150" height="150"> -->
<h1 class="flex my-2 primary--text">Virtual School</h1>
</div>
<v-form>
<v-text-field label="Email / User" type="text"
v-model="email"></v-text-field>
<v-text-field autocomplete name="password" label="Password" id="password" type="password"
v-model="password"></v-text-field>
</v-form>
</v-card-text>
<v-card-actions>
<v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
</v-card-actions>

</v-card>
</v-flex>
</v-layout>
</v-container>
</v-content>
</v-app>
</template>

<script>


export default {
layout:'login',
data:() => ({
loading:false,    
snackbar:false,    
email:'',
password:'',          
msg:''
}),
methods:{

login () {
this.loading = true

let credentials = {
email: this.email,
password: this.password
};
try {
this.$auth.loginWith('local',{ data:credentials })
.catch((e) => {
this.snackbar = true
this.msg = e.response.data.error 
setTimeout(() => {
this.loading = false
// location.reload();
},3000);
})
}
catch{
this.snackbar = true
this.msg = 'test'
}

}



}

}
</script>
<style scoped lang="css">
#login {
height: 50%;
width: 100%;
position: absolute;
top: 0;
left: 0;
content: "";
z-index: 0;
}
</style>
