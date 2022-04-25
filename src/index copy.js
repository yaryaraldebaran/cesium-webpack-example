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

var scene = viewer.scene;
if (!scene.pickPositionSupported) {
  window.alert("This browser does not support pickPosition.");
}

var handler;

    var entity = viewer.entities.add({
      label: {
        show: false,
        showBackground: true,
        font: "14px monospace",
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.Cartesian2(15, 0),
      },
    });
    var modelEntity = viewer.entities.add({
      name: "milktruck",
      position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706),
      model: {
        uri:
          "../src/kotak_ifc_gltf.glb",
      },
    });
    

    // Mouse over the globe to see the cartographic position
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (movement) {
      var cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        scene.globe.ellipsoid
      );
      if (cartesian) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var longitudeString = Cesium.Math.toDegrees(
          cartographic.longitude
        ).toFixed(2);
        var latitudeString = Cesium.Math.toDegrees(
          cartographic.latitude
        ).toFixed(2);

        entity.position = cartesian;
        entity.label.show = true;
        entity.label.text =
          "Lon: " +
          ("   " + longitudeString).slice(-7) +
          "\u00B0" +
          "\nLat: " +
          ("   " + latitudeString).slice(-7) +
          "\u00B0";
      } else {
        entity.label.show = false;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

viewer.zoomTo(modelEntity)