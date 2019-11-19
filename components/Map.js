import React, {useEffect} from 'react'

const Map = ({ stores }) => {
    useEffect(() => {
        var container = document.getElementById('map');
        var mapOptions = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3, //지도의 레벨(확대, 축소 정도)
            clickable: true,
        }
        var map = new kakao.maps.Map(container, mapOptions); //지도 생성 및 객체 리턴

        stores.map((store) => {
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(store.lat, store.lng),
            title: store.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          });
        })
    }, [stores]);

    return (
      <div>
        <div id="map">Map</div>

        <style jsx>
          {`
            #map {
              float: left;
              width: 70%;
              height: 100vh;
              padding: 3px;
            }
          `}
        </style>
      </div>
    );
    
}

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