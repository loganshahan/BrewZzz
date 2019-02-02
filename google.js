let google = (lat, lon, name, id, website) => {

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
    
            //google url
            https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyDn7dkJJ7QZJ3FZ7AhvoIjTvN9OceO8VuA
    
          </div>
        </div>

        <div id="website-${id}" class="modal" style="height:90%; width: 90%;">
          <div class="modal-content" style="height:90%; width: 90%; margin: 0 auto;">
            <h4>Website</h4>
    
            <iframe width="100%" height="100%" frameborder="0" allowtransparency="true" src="${website}"></iframe>
    
          </div>
        </div>
        `;
};