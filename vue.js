Vue.component('blogcomponent', {
  data(){ 
    return{
    title: "Bl_itter",
    posts: [],
    users: []
    }
  },
  mounted(){
    this.loadPosts()
    this.loadUsers()
  },
  methods:{
    loadPosts(){
      console.log('aaaa');
      this.posts.splice(0,this.posts.length);
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => { return response.json() })
        .then((data) => {
          this.posts = data
        }).catch( error => { console.log(error); });
    },
    loadUsers(){
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => { return response.json() })
        .then((data) => {
          this.users = data
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
})

var vm = new Vue({
 el:'#root'
});

