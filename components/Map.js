import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef} from 'react'
import { useAppContext } from "../lib/context";


// class Map extends React.Component {
//   constructor(props, context){
//     super(props, context);

//     console.log(context);
//   }

//   componentDidMount(){
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function (position) {
//         setPosition({ "latitude": position.coords.latitude, "longitude": position.coords.longitude });
//       }, function (error) {
//         console.error(error);
//       }, {
//         enableHighAccuracy: false,
//         maximumAge: 0,
//         timeout: Infinity
//       });
//     } else {
//       alert('GPS를 지원하지 않습니다');
//     }

//     const container = document.getElementById('map');
//     const mapOptions = {
//       center: new kakao.maps.LatLng(position.latitude, position.longitude),
//       level: 9, //지도의 레벨(확대, 축소 정도)
//       clickable: true,
//     }
//     const map = new kakao.maps.Map(container, mapOptions); //지도 생성 및 객체 리턴

//     ratings.map(({ store }) => {
//       const position = new kakao.maps.LatLng(store.latitude, store.longitude);
//       const marker = new kakao.maps.Marker({
//         map: map,
//         position: position,
//         title: store.name,
//       });

//       const displayInfo = () => {
//         overlay.setMap(null);
//         const content = `<div class ="label"><span class="left"></span><span class="center">${store.name}</span><span class="right"></span></div>`;
//         overlay.setPosition(position);
//         overlay.setContent(content);
//         overlay.setMap(map);
//       };

//       kakao.maps.event.addListener(marker, "click", function () {
//         displayInfo();
//       });
//     })

//     setMap(map);
//   }

//   render() {
//     return <div className='layout'>{children}</div>
//   }
// }

// Map.contextType = useAppContext;

const Map = ({ ratings, overlay }) => {
  const [position, setPosition] = useState({ "latitude": 37.435887, "longitude": 126.984063});
  const { setMap } = useAppContext()

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

    const container = document.getElementById('map');
    const mapOptions = {
      center: new kakao.maps.LatLng(position.latitude, position.longitude),
      level: 9, //지도의 레벨(확대, 축소 정도)
      clickable: true,
    }
    const map = new kakao.maps.Map(container, mapOptions); //지도 생성 및 객체 리턴

    ratings.map(({ store }) => {
      const position = new kakao.maps.LatLng(store.latitude, store.longitude);
      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: store.name,
      });

      const displayInfo = () => {
        overlay.setMap(null);
        const content = `<div class ="label"><span class="left"></span><span class="center">${store.name}</span><span class="right"></span></div>`;
        overlay.setPosition(position);
        overlay.setContent(content);
        overlay.setMap(map);
      };

      kakao.maps.event.addListener(marker, "click", function() {
        displayInfo();
      });
    })

    setMap(map);
  }, [ratings]);

  return (
    <div id="map">
      지도 로딩중...
      <style jsx global>
        {`
          #map {
            height: 100%;
          }

          .label {
            margin-bottom: 96px;
          }
          .label * {
            display: inline-block;
            vertical-align: top;
          }
          .label .left {
            background: url("http://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_l.png")
              no-repeat;
            display: inline-block;
            height: 32px;
            overflow: hidden;
            vertical-align: top;
            width: 7px;
          }
          .label .center {
            background: url(http://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_bg.png)
              repeat-x;
            display: inline-block;
            height: 32px;
            font-size: 16px;
            line-height: 24px;
          }
          .label .right {
            background: url("http://t1.daumcdn.net/localimg/localimages/07/2011/map/storeview/tip_r.png") -1px
              0 no-repeat;
            display: inline-block;
            height: 32px;
            overflow: hidden;
            width: 6px;
          }
        `}
      </style>
    </div>
  );
    
}

export default Map;

// class Map extends React.Component {
//   constructor(props) {
//     super(props);
//     const container = document.getElementById("map");
//     const mapOptions = {
//       center: new kakao.maps.LatLng(position.latitude, position.longitude),
//       level: 10, //지도의 레벨(확대, 축소 정도)
//       clickable: true
//     };

//     this.state = {
//       map: new kakao.maps.Map(container, mapOptions),
//     };
//   }

//   componentDidUpdate(prevProps) {
//     if (!prevProps.expanded && this.props.expanded) {
//       setTimeout(() => this.refs.container.focus(), 350);
//     }
//   }

//   render() {
//     const { id, expanded } = this.props;

//     return (
//       <div
//         ref="container"
//         id={id}
//         className="Drawer"
//         aria-expanded={expanded ? "false" : "true"}
//         tabIndex="0"
//       >
//         {this.props.children}

//         <style jsx>
//           {`
//             .Drawer {
//               position: absolute;
//               bottom: 0;
//               left: 0;
//               z-index: 1;
//               width: 100%;
//               height: 70vh;
//               transform: translate(0, 20vh);
//               will-change: transform;
//               background-color: white;
//               color: black;
//             }

//             .Drawer[aria-expanded="false"] {
//               transform: translate(0, 0vh);
//               transition: transform 0.25s linear;
//             }

//             .Drawer[aria-expanded="true"] {
//               transition: transform 0.25s linear;
//             }
//           `}
//         </style>
//       </div>
//     );
//   }
// }

// export default Map;