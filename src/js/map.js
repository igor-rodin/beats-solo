$(function(){
  ymaps.ready(init);
  
  function init(){
      let myMap = new ymaps.Map("ya-map", {
          center: [55.749693, 37.600925],
          zoom: 14,
          controls: []
      });
      // myMap.behaviors
      // .disable(['scrollZoom','drag']);
      const markerCoords = [
        [55.758881, 37.582928],
        [55.759081, 37.622228],
        [55.749878, 37.603466],
        [55.743083, 37.580838],
      ]; 

      const markers = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './images/icons/sprite.svg#marker',
        iconImageClipRect: [[0,100], [76, 195]],
        iconImageSize: [58, 73],
        iconImageOffset: [-29, -73]
      });

      markerCoords.forEach(coord => {
        markers.add(new ymaps.Placemark(coord))
      });

      myMap.geoObjects.add(markers);
  }
});