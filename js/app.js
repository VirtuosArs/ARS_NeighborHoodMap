// Main Class that serves as Blueprint for each Location Marker
var MarkerInfo = function(title, lng, lat, marker) {
    var self = this;
    this.title = title;
    this.lng = lng;
    this.lat = lat;
    //this.wikiID = wikiID;
    //this.pageID = pageID;
    this.marker = marker;

};

var viewModel = {
    locations: [
        new MarkerInfo('Hotel City Pride', 19.0169884, 72.8475258),
        new MarkerInfo('Bawa Residency', 19.0137553, 72.8437213),
        new MarkerInfo('Pritam Group Of Hotels', 19.016924, 72.8459731),
        new MarkerInfo('Hotel Parklane', 19.0159105, 72.8428462),
        new MarkerInfo('Hotel New Shree Niwas', 19.0293736, 72.8467218),
        new MarkerInfo('5 Spice Bandra', 19.0624504, 72.8292845),
        new MarkerInfo('Taj Hotel', 19.0759837, 72.8776559),
        new MarkerInfo('Hotel Kohinoor Park', 19.0167286, 72.8291876),
        new MarkerInfo('5 Spice Matunga', 19.0261231, 72.8553046)
    ],
    //Observable for Menu | Navigation Bar Toggle Button
    visibleMenu: ko.observable(false),
    //observable used for running a search against locations array
    searchBox: ko.observable(''),
    //observable used for opening infowindow when <li> item clicked from search
    clickEventHandlerFunction: function() {
        openInfowindow(this.marker);
    },
    //observable to determine if error div should be shown
    mapUnavailable: ko.observable(false)

};

//Toggle Button / Side Menu Function when Clicked
    viewModel.clickMe = function() {
        var self = this;
        this.visibleMenu(!this.visibleMenu());
    };

// Search function for filtering through the list of locations based on the name of the location.
// Show or hide the associated markers on the map when searched.
    viewModel.search = ko.computed(function() {
        var self = this;
        var searchResult = this.searchBox().toLowerCase();
        var searchCompare = ko.utils.compareArrays(self.locations, self.search);

        return ko.utils.arrayFilter(self.locations, function(markerLocation) {
            var title = markerLocation.title.toLowerCase();
            var matched = title.indexOf(searchResult) >= 0;
            var marker = markerLocation.marker;
            if (marker) {
                marker.setVisible(matched);
            }
            // console.log(markerLocation.marker);
            return matched;
        });
    }, viewModel);

ko.applyBindings(viewModel);
