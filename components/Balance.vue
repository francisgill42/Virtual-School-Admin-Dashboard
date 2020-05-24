<template>
<div>
<v-row v-if="bal">

<v-col>
<v-card outlined>
<v-list-item>
<v-list-item-content>
<v-list-item-title class="title mb-1">
Current Balance
</v-list-item-title>
<v-list-item-subtitle>{{bal.balance}} PKR</v-list-item-subtitle>
</v-list-item-content>
</v-list-item>
</v-card>
</v-col>

<v-col>
<v-card outlined>
<v-list-item>
<v-list-item-content>
<v-list-item-title class="title mb-1">
Account Status
</v-list-item-title>
<v-list-item-subtitle>{{bal.freeze ? 'deactivated' : 'active'}} </v-list-item-subtitle>
</v-list-item-content>
</v-list-item>
</v-card>
</v-col>

</v-row>


</div>
</template>

<script>
export default {
data: () => ({

bal:{},

}),
async created () {     
let b = await this.$axios.get(`balance/${this.$auth.user.id}`);
this.bal = b.data.record;
},
}
</script>