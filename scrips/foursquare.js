let foursquare = async (city,lat,lon,id) => {

    let hotels_url = `https://api.foursquare.com/v2/venues/search?near=${city.toLowerCase()}&lat=${lat}&lng=${lon}&radius=20000&distance=7000&query=hotels&v=20150214&m=foursquare&limit=8&llAcc=1000&client_secret=THX2DWMAVSJSL2C44WNDSE0C3ME0DLLJFUNYAZ1XQRFFOM5D&client_id=2XR4OH2AHEX3HOW0PPBNBY0V42YYKI5SYK3IE2AVBQ5UDQQK
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

      let venue_url = `https://api.foursquare.com/v2/venues/${hotel_id}?client_secret=THX2DWMAVSJSL2C44WNDSE0C3ME0DLLJFUNYAZ1XQRFFOM5D&client_id=2XR4OH2AHEX3HOW0PPBNBY0V42YYKI5SYK3IE2AVBQ5UDQQK&v=20180602&contact&url&rating`;

      let fetch_photo = await fetch(venue_url);
      let venue_json = await fetch_photo.json();
      let venues_obj = venue_json.response.venue;
       
      let hotel_url = venues_obj.url;
      let phone_number = venues_obj.contact.phone;
      let address_street = venues_obj.location.formattedAddress[0];
      let address_city = venues_obj.location.formattedAddress[1];
      let description = venues_obj.description;

      console.log(venues_obj);


  

if(venues_obj.photos.count > 0) {
        let photo_prefix = venues_obj.bestPhoto.prefix;
        let photo_suffix = venues_obj.bestPhoto.suffix;
        let photo_width = venues_obj.bestPhoto.width;
        let photo_height = venues_obj.bestPhoto.height;

     hotel_container.innerHTML += `

        <div class="container">
          <div class="row">
            <div class="col s12">
            
            <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${photo_prefix}${photo_width}x${photo_height}${photo_suffix}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4"> ${hotel_name} <i class="material-icons right">more_vert</i></span>
              <p><a href="${hotel_url}" target="_blank">Hotel Website Link</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"> ${hotel_name} <i class="material-icons right">close</i></span>
              <br/><br/><br/>
              <a href="https://www.google.ca/maps/place/${address_street},+${address_city}/" target="_blank" >Hotel Address</a>
              <br/><br/><br/>
              <a href="tel://+1${phone_number}">
              <i class="fa fa-phone fa-2x"></i>
              </a>
              <br/><br/><br/>
              <p>${description}</p>
              
            </div>
          </div>
  
            </div>
          </div>
        </div>
         
        `;
};    

    }  
    /* <img src="${photo_prefix}300x300${photo_suffix}" /> */
    
};

