import React, { useState, useEffect } from "react";
import { useAppContext } from "../lib/context";

const SearchMap = ({stores, overlay}) => {
  const [position, setPosition] = useState({ "latitude": 37.435887, "longitude": 126.984063 });
  const { setMap } = useAppContext();

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

    const container = document.getElementById("searchmap");
    const mapOptions = {
      center: new kakao.maps.LatLng(position.latitude, position.longitude),
      level: 10, //지도의 레벨(확대, 축소 정도)
      clickable: true
    };
    const map = new kakao.maps.Map(container, mapOptions); //지도 생성 및 객체 리턴

    stores.map((store) => {
      const position = new kakao.maps.LatLng(store.y, store.x);
      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: store.place_name // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });

      const displayInfo = () => {
        overlay.setMap(null);
        const content = `<div class ="label"><span class="left"></span><span class="center">${store.place_name}</span><span class="right"></span></div>`;
        overlay.setPosition(position);
        overlay.setContent(content);
        overlay.setMap(map);
      };

      kakao.maps.event.addListener(marker, "click", function () {
        displayInfo();
      });
    });
    
    setMap(map);
  }, [stores]);

  return (
    <div id="searchmap">
      지도 로딩중...

      <style jsx global>
        {`
          #searchmap {
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
};

export default SearchMap;
