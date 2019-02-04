let foursquare = async (city,lat,lon,id) => {

    let hotels_url = `https://api.foursquare.com/v2/venues/search?near=${city.toLowerCase()}&lat=${lat}&lng=${lon}&radius=10000&distance=5000&query=hotels&v=20150214&m=foursquare&limit=2&llAcc=1000&client_secret=QUT2FTOFXV2JMK0PX413XWOVTQRGS1041Y2LTFNP12J5TKAO&client_id=AJYZ2GDAGNCCTXMLSRULFN34AEMLMEWGBMRBJJDOAS2WTALY
    `;
    // console.log(hotels_url)
  
    let res = await fetch(hotels_url);
    let hotels = await res.json();
    let venues = hotels.response.venues;
    let hotel_container = document.getElementById(`hotel-${id}`);
    
    for(let i in venues) {
      let hotels_json = venues[i];
      var hotel_name = hotels_json.name;
      let hotel_id = hotels_json.id;

      // let photo_url = `https://api.foursquare.com/v2/venues/${hotel_id}/hours?client_secret=QUT2FTOFXV2JMK0PX413XWOVTQRGS1041Y2LTFNP12J5TKAO&client_id=AJYZ2GDAGNCCTXMLSRULFN34AEMLMEWGBMRBJJDOAS2WTALY&v=20180602`;

      let venue_url = `https://api.foursquare.com/v2/venues/${hotel_id}?client_secret=QUT2FTOFXV2JMK0PX413XWOVTQRGS1041Y2LTFNP12J5TKAO&client_id=AJYZ2GDAGNCCTXMLSRULFN34AEMLMEWGBMRBJJDOAS2WTALY&v=20180602&contact&url&rating`;

      let fetch_photo = await fetch(venue_url);
      let venue_json = await fetch_photo.json();
      let venues_obj = venue_json.response.venue;
      // let photo_prefix = photo_hotel.prefix;
      // let photo_suffix = photo_hotel.suffix;
      // console.log(photo_prefix)
      // console.log(photo_suffix)
      console.log(venues_obj)
      
      
      hotel_container.innerHTML += `

      <div class="container">
        <div class="row">
          <div class="col s12">
          
          <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4"> ${hotel_name} <i class="material-icons right">more_vert</i></span>
            <p><a href="#">This is a link</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4"> ${hotel_name} <i class="material-icons right">close</i></span>
            <p>Here is some more information about this product that is only revealed once clicked on.</p>
          </div>
        </div>

          </div>
        </div>
      </div>
      
      
      `

    }  
    /* <img src="${photo_prefix}300x300${photo_suffix}" /> */
    
};