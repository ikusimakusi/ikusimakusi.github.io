
/////////////////
/// CREATE MAP
/////////////////

//bilboko mugak
var southWest = L.latLng(43.24, -2.98),
    northEast = L.latLng(43.285, -2.88),
    bounds = L.latLngBounds(southWest, northEast);

var mymap = L.map('mapid', {
     zoomControl: false,
     minZoom:13,
     maxZoom:14
     //static: true,
  //   maxBounds:bounds
}
).setView([43.266, -2.938], 13);

//console.log(mymap.getBounds());

mymap.setMaxBounds(bounds);


L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
           maxZoom: 14,
           id: 'mapbox/streets-v11',
         //  tileSize: 512,
         //  zoomOffset: -1
       }).addTo(mymap);

///////////////
/// LOAD DATA
///////////////

   var bolondres_kopurua=[];
   var url = "https://spreadsheets.google.com/feeds/list/1BPInwo5jnVwuMJ87cMZbnE6GKrMAD2uGfD64vpbChk8/od6/public/basic?alt=json";
   $.ajax({
       url:url,
       dataType:"jsonp",
       success:function(data) {
           // data.feed.entry is an array of objects that represent each cell
           //console.log(data.feed.entry);
           for (id in data.feed.entry)
           {
              thisarray=data.feed.entry[id].content.$t.split(',');
              for ( i in thisarray)
              {
                //console.log(ourId);
                keyvalue=thisarray[i].split(':');
                key=keyvalue[0].trim();
                value=keyvalue[1].trim();
                if (key == 'bolondresak')
                  bolondres_kopurua[id]=value;
                }
                if ( key== 'errekaduak' && id == 14) {
                  errekaduak=value;
                }

                //console.log(ourId+' '+key+' : '+value);


           }
           //for (key in )


           ////////////////
           /// SET MARKERS
           ////////////////
           var myLabel=[];
           var myicon=[];
           for (var i = 0; i < datuak.length; i++) {
            var obj = datuak[i];
            obj.bolondresak=bolondres_kopurua[i];

            var shift=0; // we use it to center label when more than 2 digits
            if (obj.bolondresak>=100){
              shift=0.0006
            }
            myIcon = L.icon.pulse({iconSize:[30,30],color:'green'});
            L.marker([obj.lat,obj.lng],{icon: myIcon, title: obj.auzoa}).addTo(mymap);
            myLabel[i] = L.marker([obj.lat,obj.lng-shift], {
                icon: L.divIcon({
                    className: 'text-label',   // Set class for CSS styling
                    html: obj.bolondresak,
                    title: obj.auzoa
                }),
                zIndexOffset: 1000     // Make appear above other map features
            }).addTo(mymap);
           myLabel[i].bindPopup("<b>"+obj.auzoa+"</b><br>"+obj.bolondresak+" bolondres");

           }
           /////////////////
           /// START counter
           ////////////////
           var inv = setInterval(function() {
               if(i < errekaduak)
                   document.getElementById("myTargetElement").innerHTML = ++i;
               else
                   clearInterval(inv);
           }, 2000 / errekaduak);

       }
   });

///////////////////
// PULSE iconS
//////////////////

   L.Icon.Pulse = L.DivIcon.extend({

          options: {
              className: '',
              iconSize: [12,12],
              fillColor: 'green',
              color: 'green',
              animate: true,
              heartbeat: 2,
             fillOpacity: 0.5
          },

          initialize: function (options) {
              L.setOptions(this,options);

              // css

              var uniqueClassName = 'lpi-'+ new Date().getTime()+'-'+Math.round(Math.random()*100000);

              var before = ['background-color: '+this.options.fillColor];
              var after = [

                  'box-shadow: 0 0 6px 2px '+this.options.color,

                  'animation: pulsate ' + this.options.heartbeat + 's ease-out',
                  'animation-iteration-count: infinite',
                  'animation-delay: '+ (this.options.heartbeat + .1) + 's',
                  'position:absolute',
                  'left:0',
              ];

              if (!this.options.animate){
                  after.push('animation: none');
                  after.push('box-shadow:none');
              }

              var css = [
                  '.'+uniqueClassName+'{'+before.join(';')+';}',
                  '.'+uniqueClassName+':after{'+after.join(';')+';}',
              ].join('');

              var el = document.createElement('style');
              if (el.styleSheet){
                  el.styleSheet.cssText = css;
              } else {
                  el.appendChild(document.createTextNode(css));
              }

              document.getElementsByTagName('head')[0].appendChild(el);

              // apply css class

              this.options.className = this.options.className+' leaflet-pulsing-icon '+uniqueClassName;

              // initialize icon

              L.DivIcon.prototype.initialize.call(this, options);

          }
      });

      L.icon.pulse = function (options) {
          return new L.Icon.Pulse(options);
      };


      L.Marker.Pulse = L.Marker.extend({
          initialize: function (latlng,options) {
              options.icon = L.icon.pulse(options);
              L.Marker.prototype.initialize.call(this, latlng, options);
          }
      });

      L.marker.pulse = function (latlng,options) {
          return new L.Marker.Pulse(latlng,options);
      };
