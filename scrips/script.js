window.addEventListener('DOMContentLoaded', () => {

    let city_input = document.querySelector('#full_city');
    let name_input = document.querySelector('#full_name');
    let pageNum = 1;
    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');
    let selection = document.querySelector('.selection');
    let class_weather = document.querySelector('.weather');

    
const fetch_brew = async (full_google_name,name) => {
        
        let url = `https://api.openbrewerydb.org/breweries${full_google_name}&page=${pageNum}&per_page=1&sort=name&by_name=${name}`;        
        // console.log(url);
        
        let res = await fetch(url);
        let breweries = await res.json();
        
        
        if(breweries.length == 0) {
            selection.classList.add('disabled');
            document.querySelector("#information").textContent = 'No breweries found!'
        } else {
            selection.classList.remove('disabled');  
        }
        
    
    for(let i in breweries) {
        let json = breweries[i];
    
            // console.log(json)
    
           let info =  document.querySelector("#information");
           let id = json.id;
           let name = json.name;
           let brewery_type = json.brewery_type;
           let street = json.street;
           let city = json.city;
           let state = json.state;
           let postal = json.postal_code;
           let phone = json.phone;
           let website = json.website_url;
           let address = `${street}, ${city}, ${state}, ${postal}`;
           let lat = parseFloat(json.latitude);
           let lon = parseFloat(json.longitude);

        //    console.log(lat, lon)
    
           info.innerHTML += `
        <div class="card hoverable z-depth-1">
            <div class="card-title">
                <h5> ${name} </h5> 
                <p>Type: ${brewery_type} </p>
                <p>City: ${city} </p>
            </div>
            <div class="card-content">
                <div class="card-action">
                <p>
                  <a target="_blank" href="https://www.google.ca/maps/place/${street},+${state},+${postal}/" class="btn indigo"> Address </a>
                </p>
                </div>
    
                <div class="mt-2 card-action">
                <p> <span><a class="btn indigo modal-trigger" href="${website}" data-target="website-${id}"> Website </a>
                </p>
                </div>
    
                <div class="text-right call">
                <h5>
                    <a href="tel://+1${phone}">
                        <i class="fa fa-phone fa-2x"></i>
                    </a>
                </h5> 
                </div>
            </div>
    
            <!-- Modals -->
            <div id="${id}"></div>
           
    </div>
           `;

        let custom_modals = document.getElementById(`${id}`);

        custom_modals.innerHTML += `
        
        <!-- Modal Trigger -->
        <button class="modal-trigger indigo search" data-target="bar-${id}">
            <i class="material-icons small indigo white-text"> hotel </i>
        </button>
    
            <!-- Modal Structure -->
            <div id="bar-${id}" class="modal" style="height:90%; width: 90%; max-height: 85% !important;">
              <div class="modal-content" style="height:90%; width: 100%; margin: 0 auto;">
                <h3>Hotels near ${name}</h3>
                    <hr />
                <div id="hotel-${id}" class="hotel-flex"></div>
        
              </div>
            </div>

        <!-- Website modal -->
        <div id="website-${id}" class="modal" style="height:90%; width: 90%; max-height: 85% !important;">
          <div class="modal-content" style="height:90%; width: 100%; margin: 0 auto;">
            <h4> ${name} - Website</h4>
                <hr />
            <iframe width="100%" height="100%" frameborder="0" allowtransparency="true" src="${website}"></iframe>
    
          </div>
        </div>
        `;
        
    if(website === '') {
        document.getElementById(`website-${id}`).textContent = 'No Website found!';
    };

    document.querySelector(`[data-target="bar-${id}"]`).addEventListener('click', () => {

        foursquare(city,lon,lat,id);

    });

    };

      // setup materialize components
      let modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);

    };
    
    city_input.addEventListener('keyup', () => {
        name_input.value = '';
        pageNum = 1;
        if(city_input.value == '') {
            document.querySelector("#information").innerHTML = '';
            name_input.setAttribute('disabled', '');
            class_weather.innerHTML = '';
            

        } else {
            name_input.removeAttribute('disabled');
        }

    });

    name_input.addEventListener('keyup', () => {

        pageNum = 1;

        get_location_data()

    });


// Pagination functionality
let page_up = () => {
    pageNum = pageNum + 1;
};

let page_down = () => {
    pageNum = pageNum - 1;
};


next.addEventListener('click', () => {
    if(document.querySelector("#information").childElementCount === 0 ) {
        selection.classList.add('disabled');
    } else {

        page_up();

        get_location_data()

    }
});

prev.addEventListener('click', () => {
    if(pageNum !== 1) {
        page_down();

        get_location_data()

        selection.classList.remove('disabled');
    }
});

// google autocomplete api
let options = {
        types: ['(cities)'],
        componentRestrictions: { country: 'us' }
};
autocomplete = new google.maps.places.Autocomplete(city_input, options);

const get_map_data = () => {
    google.maps.event.addListener(autocomplete, 'place_changed', function() {

        get_location_data()

});
};

const get_location_data = () => {
    let location_info = document.getElementById("full_city").value.split(",");
    let cityName = location_info[0].toLowerCase().trim();
    let stateName = location_info[1].toLowerCase().trim();
    stateName = abbrState(stateName, 'name').toLowerCase();
    let full_google_name = `?by_city=${cityName}&by_state=${stateName}`;
    submitHandle(full_google_name,name_input.value);
    fetch_weather(stateName);
    // console.log(full_google_name);
};

const submitHandle = (full_google_name,name) => {
        fetch_brew(full_google_name, name);
        document.querySelector("#information").innerHTML = '';
    
};
    get_map_data();

    
      // setup materialize components
      let modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);

        
    });
    