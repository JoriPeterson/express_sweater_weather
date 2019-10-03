class DarkSky {
  constructor(location) {
    this.location = location
    // this.lat
    // this.long
  }

  getCoordinates() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?${this.location}&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => response.json())
    .then(result => console.log(result))
  }
}

var test = new DarkSky("Denver,CO")

module.exports = {
  DarkSky: DarkSky
};
