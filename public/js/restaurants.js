var app = new Vue({
  el: "#app",

  data: {
    id: "",
    name: "",
    link:"detail.html",
    currentRestaurant: null,
    restaurants: []
  },
  created() {
    getRestaurants();
  },
  methods: {
    rechercher: function () {
      findByName(this.name)
    },
    update: function (restaurant) {
      this.currentRestaurant = restaurant
    },
    supprimer: function (id) {
      DeleteResto(id)
    },
    onUpdateRestaurant:function(){
      update();
    },
    onfindRestaurant:function(id){
      findRestaurantById(id);
    }
  }
});

function getRestaurants() {
  fetch("/api/restaurants")
    .then(response => response.json())
    .then(json => {
      app.restaurants = json.data;
    });
}

function findByName(name) {
  fetch("/api/findbyname/" + name)
    .then(response => response.json())
    .then(json => {
      app.restaurants = json;
    });
}



function update() {
  let url = "/api/restaurants/" + app.currentRestaurant._id;
  delete app.currentRestaurant._id;
  fetch(url, {
    method: "PUT",
    body: JSON.stringify(app.currentRestaurant),
    headers: {
      'Accept' : 'application/json',
      'Content-type' : 'application/json'
    }
  })
    .then(function (responseJSON) {
      responseJSON.json()
        .then(function (res) {
          console.log(JSON.stringify(app.currentRestaurant));
          
        });
    })
    .catch(function (err) {
      console.log(err);
    });

}

function DeleteResto(id) {
  fetch("/api/restaurants/" + id,
    {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(json => {
      getRestaurants()
    });
}

function findRestaurantById(id) {
  fetch("/api/findbyname/" + name,
  {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => {
      app.restaurants = json;
    });
}