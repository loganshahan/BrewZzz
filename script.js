/*
// api used: https://www.openbrewerydb.org
*/

window.addEventListener('DOMContentLoaded', () => {

    let name_input = document.querySelector('#full_name');
    let pageNum = 1;
    let next = document.querySelector('.next')
    let prev = document.querySelector('.prev');
    
    const fetch_brew = async (name) => {
    
        let states = document.getElementById("states");
        let state = `&by_state=${states.options[states.selectedIndex].text}`;
    
        let url = `https://api.openbrewerydb.org/breweries?by_name=${name.toLowerCase()}${state}&page=${pageNum}&per_page=1&sort=name`;
    
    
        // console.log(url);
        
        let res = await fetch(url);
        let breweries = await res.json();
    
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
                <p> <span><a class="btn indigo modal-trigger" href="${website}" data-target="website-${id}"> Visit Website </a>
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
    
    
           google(lat, lon, name, id, website);
    
    };
      // setup materialize components
      let modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);
    
      console.clear()
      
    };
    
    name_input.addEventListener('keyup', () => {
        
        pageNum = 1;
        submitHandle(name_input.value);
        
    });
    
    
    let states = document.getElementById("states");
    
    states.onchange = function() {
        let single_state = states.options[states.selectedIndex].text;
    
        pageNum = 1;
        submitHandle(name_input.value);
        fetch_weather(single_state);
    
    };
    
    // Pagination functionality
    let page_up = () => {
        pageNum = pageNum + 1;
    };
    
    let page_down = () => {
        pageNum = pageNum - 1;
    };
    
    next.addEventListener('click', () => {
        page_up();
        submitHandle(name_input.value);
    
    });
    
    prev.addEventListener('click', () => {
        if(pageNum !== 1) {
            page_down();
            submitHandle(name_input.value);
        }
    });
    
    let submitHandle = (value) => {
        fetch_brew(value);
        document.querySelector("#information").innerHTML = '';
    
    };
    
      // setup materialize components
      let modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);
        
    });
    