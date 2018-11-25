function venues() {
  let CLIENT_ID = "1AFXV1IRQN4EEHGVWMRRHBHXW5FRNUVNGVVPMT3ZMVDJ2G5O";
  let CLIENT_SECRET = "XQENZ00BUK5KVM43NRHVFZYPXPOATFKFAVR4VHJLIBJBFTR3";
  let v = "20181125";
  let place = "chennai";
  let query = "food";

  let url = `https://api.foursquare.com/v2/venues/explore?near=${place}&query=${query}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${v}`;

  return fetch(url);
}

export default venues;
