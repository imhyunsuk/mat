import React, {useState, useEffect} from 'react'

const Map = ({ ratings, mobile }) => {
  const [position, setPosition] = useState({ "latitude": 33.450701, "longitude": 126.570667});

  useEffect(() => {
    if (navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({"latitude": position.coords.latitude, "longitude": position.coords.longitude});
      }, function (error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }

    var container = document.getElementById('map');
    var mapOptions = {
        center: new kakao.maps.LatLng(position.latitude, position.longitude),
        level: 10, //지도의 레벨(확대, 축소 정도)
        clickable: true,
    }
    var map = new kakao.maps.Map(container, mapOptions); //지도 생성 및 객체 리턴

    ratings.map(({ store }) => {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(store.latitude, store.longitude),
        title: store.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
    })
  }, [ratings]);
  


  return (
    <div>
      <div id="map">지도 로딩중...</div>

      <style jsx>
        {`
          #map {
            height: 100vh;
          }
        `}
      </style>
    </div>
  );
    
}


export default Map;