/*
// api used: https://www.openbrewerydb.org
*/


window.addEventListener('DOMContentLoaded', () => {

    let name_input = document.querySelector('#full_name');
    let pageNum = 1;
    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');
    let selection = document.querySelector('.selection');
    

    
    const fetch_brew = async (city) => {
    
        let states = document.getElementById("states");
        let state = `&by_state=${states.options[states.selectedIndex].text}`;
    
        let url = `https://api.openbrewerydb.org/breweries?by_city=${city.toLowerCase().trim()}${state}&page=${pageNum}&per_page=1&sort=name`;    
    
        // console.log(url);
        
        let res = await fetch(url);
        let breweries = await res.json();
        
        
        if(breweries.length == 0) {
            selection.classList.add('disabled');
            document.querySelector("#information").textContent = 'No bars found'
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
    
           let custom_modals = document.getElementById(`${id}`);

        custom_modals.innerHTML += `
    <!-- Modal Trigger -->
    <button class="modal-trigger indigo search" data-target="bar-${id}">
        <i class="material-icons small indigo white-text"> gps_fixed </i>
    </button>

        <!-- Modal Structure -->
        <div id="bar-${id}" class="modal">
          <div class="modal-content">
            <h4>${name}</h4>
    
            <p>info about hotels and stuff</p>
    
          </div>
        </div>

        <!-- Website modal -->
        <div id="website-${id}" class="modal" style="height:90%; width: 90%;">
          <div class="modal-content" style="height:90%; width: 90%; margin: 0 auto;">
            <h4> ${name} - Website</h4>
    
            <iframe width="100%" height="100%" frameborder="0" allowtransparency="true" src="${website}"></iframe>
    
          </div>
        </div>
        `;

    };
      // setup materialize components
      let modals = document.querySelectorAll('.modal');
      M.Modal.init(modals);

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
        selection.classList.remove('disabled');

    };

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
        submitHandle(name_input.value);
    }
});

prev.addEventListener('click', () => {
    if(pageNum !== 1) {
        page_down();
        submitHandle(name_input.value);
        selection.classList.remove('disabled')
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
    