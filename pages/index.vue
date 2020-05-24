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
    :items="videos"
    :search="search"
    class="elevation-1"
  >
<template  v-slot:item.album_image="{ item }">
<br>
<img  height="50" width="50" :src="item.album_image" alt=""/>
</template>
 
    <template v-slot:top>
      <v-toolbar flat color="">
        <v-toolbar-title>Collections</v-toolbar-title>
        <v-spacer></v-spacer>
       <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
            <v-btn color="primary"  class="mb-2" v-on="on">New Item</v-btn>
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
                  @change="get_data"
                  :items="levels"
                  item-value="id"
                  item-text="level" 
                  label="Level"
                  ></v-select>
                  </v-col>
                   <v-col>
                  <v-select

                  :rules="Rules"
                  v-model="editedItem.subject_id" 
                  :items="subjects"
                  item-value="id"
                  item-text="subject" 
                  label="Subject"
                  ></v-select>
                  
                  </v-col>
                  </v-row>

                  <v-row>

                 <v-col>
                 <v-text-field
                  :rules="Rules"
                  v-model="editedItem.title" 
                  label="Title"
                  ></v-text-field>
                  
                  </v-col>
                 
                  </v-row>

                   <v-row>

                 <v-col>
                 <v-text-field
                  :rules="Rules"
                  v-model="editedItem.link" 
                  label="Link"
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
          text: 'title',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        {
          text: 'link',
          align: 'left',
          sortable: false,
          value: 'link',
        },
         {
          text: 'subject',
          align: 'left',
          sortable: false,
          value: 'subject.subject',
        },
         {
          text: 'level',
          align: 'left',
          sortable: false,
          value: 'level.level',
        },
       
        { text: 'Actions', value: 'action', sortable: false },
      ],
      editedIndex: -1,
     
      editedItem: {
       level_id:'',
       subject_id:'',
       title:'',
       link:''     
      },
      defaultItem: {
       level_id:'',
       subject_id:'',
       title:'',
       link:''
      },
      response : {
        msg:''
      },
      videos:[],
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

     const videos = await this.$axios.get('videos');
     this.videos = videos.data;
     
     const levels = await this.$axios.get('level');
     this.levels = levels.data;
    },

    methods: {

    
      get_data () {
            this.$axios.get('get_data_for_level/'+this.editedItem.level_id)
                .then((res) =>{
                this.subjects = res.data.subjects 
                });
      },

    
      editItem (item) {
          this.editedIndex = this.videos.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
          
      },

      deleteItem (item) {
        confirm('Are you sure you want to delete this item?') && 
         this.$axios.delete('videos/'+item.id)
            .then((res) => {

              if(res.data.response_status){ 

              const index = this.videos.indexOf(item)
              this.videos.splice(index, 1)
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
                title: this.editedItem.title,
                link: this.editedItem.link,
                subject_id:this.editedItem.subject_id
              }


           if (this.editedIndex > -1) {

            this.$axios.put('videos/' + this.editedItem.id, payload)
            .then(res => {
            if(res.data.response_status){  
              const index = this.videos.findIndex(item => item.id == this.editedItem.id)
              Object.assign(this.videos[index],res.data.updated_record);
              this.snackbar = res.data.response_status;
              this.response.msg = res.data.message;
              this.close()
              }
            })
            .catch(error => console.log(error));
           }
           else{
              
            this.$axios.post('videos',payload)
              .then((res) => {
               
              if(res.data.response_status){ 
            
              this.videos.push(res.data.new_record)
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