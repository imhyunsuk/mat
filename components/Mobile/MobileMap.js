import React, { useState, useEffect } from "react";

const Map = ({ ratings }) => {
  const [position, setPosition] = useState({
    latitude: 33.450701,
    longitude: 126.570667
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        function(error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }

    var container = document.getElementById("map");
    var mapOptions = {
      center: new kakao.maps.LatLng(position.latitude, position.longitude),
      level: 10, //지도의 레벨(확대, 축소 정도)
      clickable: true
    };
    var map = new kakao.maps.Map(container, mapOptions); //지도 생성 및 객체 리턴

    ratings.map(({ store }) => {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(store.latitude, store.longitude),
        title: store.name // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
    });
  }, [ratings]);

  return (
    <div className='container'>
      <div id="map">Map</div>

      <style jsx>
        {`
          #map {
            float: left;
            width: 100%;
            height: 100vh;
            padding: 3px;
          }
        `}
      </style>
    </div>
  );
};

// class Map extends React.Component {
//     componentDidMount() {
//         var container = document.getElementById('map');
//         var mapOptions = {
//             center: new kakao.maps.LatLng(33.450701, 126.570667),
//             level: 3, //지도의 레벨(확대, 축소 정도)
//             clickable: true,
//         }
//         var map = new kakao.maps.Map(container, mapOptions); //지도 생성 및 객체 리턴
//     }

//     useEffect(() => {
//         console.log('렌더링이 완료되었습니다!');
//         console.log({
//         name,
//         nickname
//         });
//     });

//     render() {
//         const { Component, pageProps } = this.props;
//         return (
//         <div>
//             <div id='map'>Map</div>
//         </div>
//         );
//     }
// }

export default Map;
