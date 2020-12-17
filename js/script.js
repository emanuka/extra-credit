jQuery(document).ready(function($) {
	$("#form-group").on("submit", function(e) {
		e.preventDefault();

		// getting zipcode
		const zip = $("#zip-code").val();
		const country = 'us';
		const units = 'imperial';
		const appid = '28eb534c6e03b72b27081af996763542';
		const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&units=${units}&appid=${appid}`;
		$('#weather').html('');
		$('#loading-animation').toggleClass('d-none');

		axios.get(weatherUrl).then(function(response) {
			$('#loading-animation').toggleClass('d-none');
			const {
				weather, main, visibility, wind, sys, name
			} = response.data;
			const {
				description, icon
			} = weather[0];
			const {
				temp, feels_like, temp_min, temp_max, pressure, humidity
			} = main;
			const {
				speed, deg, gust
			} = wind;
			const {
				country
			} = sys;
			const d = new Date();

			// Getting rounded values
			const temp_new = Math.round(temp);
			const feels_like_new = Math.round(feels_like);
			const temp_min_new = Math.round(temp_min);
			const temp_max_new = Math.round(temp_max);
			$('#weather').html(`
                <div class="container card border border-success mt-1">
                    <div class="row align-items-center">                        
                        <div class="col- col-lg-12 text-center">
                                <h3 class="text-danger">${name}, ${country}. Weather</h3>
                                <h7 class="text-success">As of ${d}</h7>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col- col-lg-12 display-3 text-primary text-center">
                            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                            ${temp_new} &#176;
                        </div> 
                    </div>
                    <div class="row">                        
                        <div class="col- col-lg-12 align-items-center text-center">
                                <h5 class="text-center">Feels Like: ${feels_like_new}</h5>
                                <h6 class="text-center">${temp_min_new} min / ${temp_max_new} max</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col- col-lg-12 weather-info-text text-center mt-3">
                            <p><i class="fas fa-tint"></i> Humidity: ${humidity}, <i class="fas fa-compress-arrows-alt"></i> Pressure: ${pressure}, <i class="far fa-eye"></i> Visibility: ${visibility}</p>
                            <p><i class="fas fa-wind"></i> Wind: ${speed} mph, <i class="fas fa-tint"></i>&#176; Degree: ${deg}&#176;, Gust: ${gust}</p>
                        </div>
                    </div>
                 </div>
            `);
		}).catch(function(error) {
			$('#loading-animation').toggleClass('d-none');
			alert('Invalid Zip Code, Please try again!!!');
		});
	});


});