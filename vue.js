Vue.component('title-component',{
  template:[
    '<div>',
      '<h1 class="text-center">{{ childtitle }} <button class="btn btn-secondary " type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Edit</button></h1> ',
      '<div class="collapse" id="collapseExample">',
        '<div class="card card-body">',
            '<div class="col-center">',
                '<div class="form-group">',
                  '<p>You can change the title </p><input type="text" v-model="childtitle"/>',
                '</div>',
              '</div>',
        '</div>',
      '</div>',
    '</div>'
  ].join(''),
  props: ['maintitle'],
  data() {
    return {
      childtitle: ''
    }
  },
  created() {
    this.childtitle = this.maintitle
  },
  watch: {
    childtitle() {
      this.$emit('titleUpdated', this.childtitle);
    }
  }
})

Vue.component('authors-component',{
  template:[
    '<div>',
      '<h3>Authors</h3>',
      '<button type="button" class="btn btn-secondary margin-btn" @click="loadingPosts">All Authors</button>',
      '<button type="button" class="btn btn-secondary margin-btn" v-for="author in authors" v-if="author"  @click="loadingUserPosts(author.id)">{{author.username}}</button>',
    '</div>'
  ].join(''),
  props: ['authors'],
  methods: {
    loadingPosts(){
      this.$emit('loadingPosts');
    },
    loadingUserPosts(userID){
      this.$emit('loadingUserPosts',userID);
    }
  }
})


Vue.component('blogItems-component', {
  template:[
    '<div>',
    '<h3 class="margin-item-30">Posts <span class="badge badge-secondary">{{ posts.length }}</span></h3>',
    '<ul class="margin-item-30">',
      '<li v-for="item in posts" v-if="item">',
        '<h4>{{ item.title }}</h4>',
        '<p>{{ item.body }}</p>',
        '<details-component v-bind:post="item"></details-component>',
      '</li>',
    '</ul>',
    '</div>'
  ].join(''),
  props: ['posts']
})

Vue.component('details-component',{
  template:[
    '<div>',
      '<h5>Comments <span class="badge badge-secondary">{{ comments.length }}</span></h5>',
      '<div class="comment" v-for="comment in comments">',
        '<p><span class="comment-user">{{ comment.email }}</span> - {{ comment.name }}</p>',
        '<p class="commentBody">{{ comment.body }}</p>',
      '</div>',
    '</div>'
  ].join(''),
  props:['post'],
  data(){
    return{
      comments: []
    }
  },
  mounted(){
    this.loadComments()
    
  },
  methods:{
    loadComments(){
      fetch('https://jsonplaceholder.typicode.com/posts/'+ this.post.id +'/comments')
        .then((response) => { return response.json() })
        .then((data) => {
          this.comments = data
        }).catch( error => { console.log(error); });
    }
  }
})

var vm = new Vue({
 el:'#root',
 template: [
   '<div>',
    '<title-component v-bind:maintitle="title" @titleUpdated="updateTitle"></title-component>',
    '<div class="offset-md-2 col-md-8 offset-md-2">',
    '<div class="alert alert-dark" role="alert">API Test: The following posts and users are in https://jsonplaceholder.typicode.com/. This test allows to do filters over the authors.</div>',
      '<authors-component v-bind:authors="users" @loadingUserPosts="loadUserPosts" @loadingPosts="loadPosts"></authors-component>',
      '<blogItems-component v-bind:posts="posts"></blogItems-component>',
    '</div>',
  '</div>'
 ].join(''),
 data:{ 
  title: "Bl_itter",
  posts: [],
  users: []
  },
  mounted(){
    this.loadUsers()
    this.loadPosts()
  },
  methods:{
    updateTitle(newTitle){
      this.title = newTitle;
    },
    loadUsers(){
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => { return response.json() })
        .then((data) => {
          this.users = data
        }).catch( error => { console.log(error); });
    },loadPosts(){
      this.posts.splice(0,this.posts.length);
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => { return response.json() })
        .then((data) => {
          this.posts = data
        }).catch( error => { console.log(error); });
    },
    loadUserPosts(userId){
      this.posts.splice(0,this.posts.length);
      fetch('https://jsonplaceholder.typicode.com/users/'+userId+'/posts')
        .then((response) => { return response.json() })
        .then((data) => {
          this.posts = data
        }).catch( error => { console.log(error); });
    }
  }
});

