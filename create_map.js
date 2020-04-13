
//bilboko mugak
var southWest = L.latLng(43.24, -2.98),
    northEast = L.latLng(43.285, -2.88),
    bounds = L.latLngBounds(southWest, northEast);

var mymap = L.map('mapid', {
     zoomControl: false,
     minZoom:13,
     maxZoom:14
     //static: true,
     //maxBounds:bounds
}
).setView([43.266, -2.938], 13);

//console.log(mymap.getBounds());

//mymap.setMaxBounds(bounds);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
           maxZoom: 14,
           id: 'mapbox/streets-v11',
         //  tileSize: 512,
         //  zoomOffset: -1
       }).addTo(mymap);

var myLabel=[];
var myicon=[];
for (var i = 0; i < datuak.length; i++) {
 var obj = datuak[i];
 console.log(obj.auzoa);
 console.log(obj.koordenadak);

 myIcon = L.icon.pulse({iconSize:[30,30],color:'green'});
 L.marker([obj.lat,obj.lng],{icon: myIcon, title: obj.auzoa}).addTo(mymap);
 myLabel[i] = L.marker([obj.lat,obj.lng], {
     icon: L.divIcon({
         className: 'text-label',   // Set class for CSS styling
         html: obj.bolondresak,
         title: obj.auzoa
     }),
     zIndexOffset: 1000     // Make appear above other map features
 }).addTo(mymap);
myLabel[i].bindPopup("<b>"+obj.auzoa+"</b><br>"+obj.bolondresak+" bolondres");

}
