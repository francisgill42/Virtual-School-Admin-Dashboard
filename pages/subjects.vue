<template>
<v-app>
  <div class="text-center ma-2">

    <v-snackbar
      v-model="snackbar"
      :top="'top'"
    >
      {{response.msg}}
      <v-btn      
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
  <v-data-table
    :headers="headers"
    :items="subjects"
    :search="search"
    class="elevation-1"
  >

  <template v-slot:item.subs="{ item }">
     
     <span v-for="(i,index) in item.subs" :key="index">
       <v-chip small class="primary ma-1">
         {{i.subject}}
       </v-chip>
     </span>
    </template>
 
    <template v-slot:top>
      <v-toolbar flat color="">
        <v-toolbar-title>Subjects</v-toolbar-title>
        <v-spacer></v-spacer>
       <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
            <v-btn color="primary" small class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-form ref="form">
          
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                  <v-row>

                  <v-col>
                  <v-select
                  :rules="Rules"
                  v-model="editedItem.level_id" 
                  :items="levels"
                  item-value="id"
                  item-text="level" 
                  label="Level"
                  ></v-select>
                  </v-col>
                  </v-row>

                  <v-row>

                 <v-col>
                 <v-text-field
                  :rules="Rules"
                  v-model="editedItem.subject" 
                  label="Title"
                  ></v-text-field>
                  
                  </v-col>
                 
                  </v-row>

                  
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
          </v-form>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.product="{ item }">
      <v-icon
        small
         @click="product_by_album(item)"
      >
        mdi-eye
      </v-icon>
    </template>



    <template v-slot:item.action="{ item }">
       <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
    </template>
  </v-data-table>
  </v-app>
</template>
<script>
  export default {
   
    data: () => ({
      search:'',
      snackbar:false,
      dialog: false,
      headers: [
        {
        text: 'level',
        align: 'left',
        sortable: false,
        value: 'x',
        },
        {
        text: 'subjects',
        align: 'left',
        sortable: false,
        value: 'subs',
        },       
        { text: 'Actions', value: 'action', sortable: false },
      ],
      editedIndex: -1,
     
      editedItem: {
       level_id:'',
       subject:'',
       },
      defaultItem: {
       level_id:'',
       subject:'',
       },
      response : {
        msg:''
      },
      levels:[],
      subjects:[],
      Rules : [
        v => !!v || 'This field is required',
      ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    async created () {

      const subjects = await this.$axios.get('subjects');
      var subs = subjects.data;

      var arr = [];

      for (var x in subs) {
        arr.push({x:x,subs:subs[x]});
      }

      console.log(arr);
      
    this.subjects = arr;
     
     const levels = await this.$axios.get('levels');
     this.levels = levels.data;
    },

    methods: {

    
      editItem (item) {
          this.editedIndex = this.subjects.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
          
      },

      deleteItem (item) {
        confirm('Are you sure you want to delete this item?') && 
         this.$axios.delete('subjects/'+item.id)
            .then((res) => {

              if(res.data.response_status){ 

              const index = this.subjects.indexOf(item)
              this.subjects.splice(index, 1)
              this.snackbar = res.data.response_status;             
              this.response.msg = res.data.message;

              }
            });
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if(this.$refs.form.validate()){
         
              const payload = {
                level_id: this.editedItem.level_id,
                subject:this.editedItem.subject
              }


           if (this.editedIndex > -1) {

            this.$axios.put('subjects/' + this.editedItem.id, payload)
            .then(res => {
            if(res.data.response_status){  
              const index = this.subjects.findIndex(item => item.id == this.editedItem.id)
              Object.assign(this.subjects[index],res.data.updated_record);
              this.snackbar = res.data.response_status;
              this.response.msg = res.data.message;
              this.close()
              }
            })
            .catch(error => console.log(error));
           }
           else{
              
            this.$axios.post('subjects',payload)
              .then((res) => {
               
              if(res.data.response_status){ 
            
              this.subjects.push(res.data.new_record)
              this.snackbar = res.data.response_status;
              this.response.msg = res.data.message;

              this.close()
              
              }

            });
         
           }

        }
      },
    },
  }
</script>