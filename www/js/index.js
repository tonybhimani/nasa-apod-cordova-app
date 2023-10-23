// TODO: create a React version of this project

// deviceready event listener
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	// write cordova info to the console
	console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

	// make api call to nasa for their astronomy picture of the day
	cordovaFetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {
			method: "GET",
			headers: {
				"User-Agent": "CordovaFetch 1.0.0"
			},
		})
		.then(function(response) {
			return response.json();
		}).then(function(response) {
			try {
				// outer container
				const container = document.getElementById("container");

				// create card apod title, content, and copyright
				const cardTitle = document.createElement("h5");
				cardTitle.className = "card-title";
				cardTitle.innerText = DOMPurify.sanitize(response.title);
				const cardSubTitle = document.createElement("h6");
				cardSubTitle.className = "card-subtitle mb-2 text-muted";
				cardSubTitle.innerHTML = "Copyright &copy; " + DOMPurify.sanitize(response.copyright);
				const cardExplanation = document.createElement("p");
				cardExplanation.className = "card-text";
				cardExplanation.innerText = DOMPurify.sanitize(response.explanation);

				// create card body and add the elements
				const cardBody = document.createElement("div");
				cardBody.className = "card-body";
				cardBody.appendChild(cardTitle);
				if (response.copyright) {
					cardBody.appendChild(cardSubTitle);
				}
				cardBody.appendChild(cardExplanation);

				// app title and heading
				const appTitle = document.createElement("h1");
				appTitle.appendChild(document.createTextNode("NASA: APOD"));
				const appHeading = document.createElement("h2");
				appHeading.appendChild(document.createTextNode("Astronomy Picture of the Day"));

				// media (image or video)
				const cardImage = document.createElement("img");
				cardImage.src = response.url;
				cardImage.alt = DOMPurify.sanitize(response.title);
				cardImage.className = "card-img-top";

				// create card element
				const cardElement = document.createElement("div");
				cardElement.className = "card";
				cardElement.appendChild(cardImage);
				cardElement.appendChild(cardBody);

				// create row for container and insert the content
				const rowElement = document.createElement("div");
				rowElement.className = "row justify-content-center";
				rowElement.appendChild(appTitle);
				rowElement.appendChild(appHeading);
				rowElement.appendChild(cardElement);
				container.innerHTML = "";
				container.appendChild(rowElement);
			} catch (err) {
				// show render/parse error message
				const content = document.getElementById("content");
				content.innerHTML = "";
				content.appendChild(document.createTextNode(err));
			}
		})
		.catch (function(err) {
			// show fetch error message
			const content = document.getElementById("content");
			content.innerHTML = "";
			content.appendChild(document.createTextNode(err));			
		});
}

// convert to html entites
String.prototype.htmlEntities = function() {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}