import "cesium/Widgets/widgets.css";
import "../src/css/main.css"
var Cesium = require('cesium')
// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNDIwOGFhZC05NGM1LTRmOGItOTVjMS1kZmZlNDFiNjc1MzciLCJpZCI6MzEwMzgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQ3NDAzMjZ9.2VC0njaqUn3Oy4BNOKW06q3qBEWYZlmicucRG5iVgAQ";
var viewer = new Cesium.Viewer("cesiumContainer", {
  selectionIndicator: false,
  infoBox: false,
});

var modelEntity = viewer.entities.add({
      name: "milktruck",
      position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
      model: {
        uri:
          "model3D/kotak_ifc_gltf.glb",
      },
    });

// ini untuk menambahkan dot putih ketika hover mouse tidak terlalu penting
function createPoint(worldPosition) {
  var point = viewer.entities.add({
    position: worldPosition,
    point: {
      color: Cesium.Color.RED,
      pixelSize: 10,
    },
  });
  return point;
}
viewer.zoomTo(modelEntity)

var handler1 = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
handler1.setInputAction(
  function (click) {
    var earthPosition = viewer.camera.pickEllipsoid(click.position);
    console.log(earthPosition);
    createPoint(earthPosition);
    
    if (Cesium.defined(earthPosition)) {
      console.log("sudah terklik");
    }
   },
   Cesium.ScreenSpaceEventType.LEFT_CLICK
);
