// FourSquare api fetch for hotels

let foursquare = async (city,lat,lon,id) => {

    let hotels_url = `https://api.foursquare.com/v2/venues/search?near=${city.toLowerCase()}&lat=${lat}&lng=${lon}&radius=20000&distance=15000&query=hotels&v=20150214&m=foursquare&limit=6&llAcc=5000&client_secret=ZEGNGR3DCMUU4JMCXAXYBJEMTUDFORCGZMUCBG2FBF25QH0R&client_id=V2I5EWQWMB3UKZEESIWIF1ZFZRLIRJ5DFYKP5BBMZRIYDL5U
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

      let venue_url = `https://api.foursquare.com/v2/venues/${hotel_id}?client_secret=ZEGNGR3DCMUU4JMCXAXYBJEMTUDFORCGZMUCBG2FBF25QH0R&client_id=V2I5EWQWMB3UKZEESIWIF1ZFZRLIRJ5DFYKP5BBMZRIYDL5U&v=20180602&contact&url&rating`;

      let fetch_hotel = await fetch(venue_url);
      let venue_json = await fetch_hotel.json();
      let venues_obj = venue_json.response.venue;
       
      let hotel_url = venues_obj.url;
      let phone_number = venues_obj.contact.phone;
      let address_street = venues_obj.location.formattedAddress[0];
      let address_city = venues_obj.location.formattedAddress[1];
      let description = venues_obj.description;

      // console.log(venues_obj);

if(venues_obj.photos.count > 0) {
        let photo_prefix = venues_obj.bestPhoto.prefix;
        let photo_suffix = venues_obj.bestPhoto.suffix;
        let photo_width = venues_obj.bestPhoto.width;
        let photo_height = venues_obj.bestPhoto.height;

     hotel_container.innerHTML += `

        <div class="container">
          <div class="row">
            <div class="col s12">
            
            <div class="card hotel_card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${photo_prefix}${photo_width}x${photo_height}${photo_suffix}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4"> ${hotel_name} <i class="material-icons right">more_vert</i></span>
              <p><a href="${hotel_url}" target="_blank">Hotel Website</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"> ${hotel_name} <i class="material-icons right">close</i></span>
              
              <a href="https://www.google.ca/maps/place/${address_street},+${address_city}/" target="_blank" >Hotel Address</a>
              
              <a href="tel://+1${phone_number}">
                <i class="fa fa-phone fa-2x"></i>
              </a>
              
              <p class="hotel_description" >${description}</p>
              
            </div>
          </div>
  
            </div>
          </div>
        </div>
         
        `;

      document.querySelectorAll('.hotel_description').forEach(each_desc => {
          if(each_desc.textContent === 'undefined') {
            each_desc.innerHTML = ` ${hotel_name} `;
            }
      });
           
};   

};
    
};

