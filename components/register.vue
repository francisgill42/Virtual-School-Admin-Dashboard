<template>
<v-app>
<v-content>
<v-container class="fill-height">
<v-row justify="center">
<v-col cols="12" sm="8" md="6">
<v-card class="elevation-12">
     
<v-toolbar dark flat>
<v-toolbar-title>Register form</v-toolbar-title>
</v-toolbar>
<v-card-text>

<v-form ref="form" method="post">
<v-text-field label="Name" required></v-text-field>
<v-text-field label="E-mail" required></v-text-field>
<v-text-field type="password" label="Password" required></v-text-field>
<v-text-field type="password" label="Confirm Password" required></v-text-field>
</v-form>

</v-card-text>
<v-card-actions>
<v-spacer />
<v-btn dark>Login</v-btn>
</v-card-actions>
</v-card>
</v-col>
</v-row>
</v-container>
</v-content>
</v-app>
</template>