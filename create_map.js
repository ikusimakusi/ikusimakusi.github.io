
var mymap = L.map('mapid', {
     zoomControl: false,
     minZoom:13,
     maxZoom:13
}
).setView([43.266, -2.938], 13);
//mymap.dragging.disable();

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
           maxZoom: 13,
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
 L.marker([obj.alt,obj.lat],{icon: myIcon, title: obj.auzoa}).addTo(mymap);
 myLabel[i] = L.marker([obj.alt,obj.lat], {
     icon: L.divIcon({
         className: 'text-label',   // Set class for CSS styling
         html: obj.bolondresak,
         title: obj.auzoa
     }),
     zIndexOffset: 1000     // Make appear above other map features
 }).addTo(mymap);
myLabel[i].bindPopup("<b>"+obj.auzoa+"</b><br>"+obj.bolondresak+" bolondres");

}
