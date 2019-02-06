let foursquare = async (city,lat,lon,id) => {

    let hotels_url = `https://api.foursquare.com/v2/venues/search?near=${city.toLowerCase()}&lat=${lat}&lng=${lon}&radius=100000&distance=20000&query=hotels&v=20150214&m=foursquare&limit=2&llAcc=1000&client_secret=LQEPPCQUW24OMRYDNMB5V1BZCMKIXM0TQ3CIGT40KD5FR13P&client_id=TB3SAWVD5RDRR1QPAP3KMIPHI5G3520QXM3Y2RX3DS2T0BZK
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

      let venue_url = `https://api.foursquare.com/v2/venues/${hotel_id}?client_secret=LQEPPCQUW24OMRYDNMB5V1BZCMKIXM0TQ3CIGT40KD5FR13P&client_id=TB3SAWVD5RDRR1QPAP3KMIPHI5G3520QXM3Y2RX3DS2T0BZK&v=20180602&contact&url&rating`;

      let fetch_photo = await fetch(venue_url);
      let venue_json = await fetch_photo.json();
      let venues_obj = venue_json.response.venue;
       
      let hotel_url = venues_obj.url;
      let phone_number = venues_obj.contact.phone;
      let address_street = venues_obj.location.formattedAddress[0];
      let address_city = venues_obj.location.formattedAddress[1];
      let description = venues_obj.description;
      var photo_prefix = venues_obj.bestPhoto.prefix;
      var photo_suffix = venues_obj.bestPhoto.suffix;



      console.log(venues_obj);
      console.log(phone_number);
      console.log(hotel_url);
      console.log(address_street);
      console.log(address_city);
      console.log(description)
      console.log(photo_prefix);
      console.log(photo_suffix);
      
      hotel_container.innerHTML += `

      <div class="container">
        <div class="row">
          <div class="col s12">
          
          <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${photo_prefix}300x300${photo_suffix}">
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
       
      `

    }  
    /* <img src="${photo_prefix}300x300${photo_suffix}" /> */
    
};