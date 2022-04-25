var viewer = new Cesium.Viewer("cesiumContainer", {
    selectionIndicator: false,
    infoBox: false,
    terrainProvider: Cesium.createWorldTerrain(),
  });
  
  if (!viewer.scene.pickPositionSupported) {
    window.alert("This browser does not support pickPosition.");
  }
  
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );
  function createPoint(worldPosition) {
    var point = viewer.entities.add({
      position: worldPosition,
      point: {
        color: Cesium.Color.WHITE,
        pixelSize: 5,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
    });
    return point;
  }
  var drawingMode = "line";
  function drawShape(positionData) {
    var shape;
    if (drawingMode === "line") {
      shape = viewer.entities.add({
        polyline: {
          positions: positionData,
          clampToGround: true,
          width: 3,
        },
      });
      return shape;
    }} 
  var activeShapePoints = [];
  var activeShape;
  var floatingPoint;
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction(function (event) {
    var earthPosition = viewer.scene.pickPosition(event.position);
    if (Cesium.defined(earthPosition)) {
        if (activeShapePoints.length === 0) {
          //floatingPoint = createPoint(earthPosition);
          activeShapePoints.push(earthPosition);
          var dynamicPositions = new Cesium.CallbackProperty(function () {
            return activeShapePoints;
          }, false);
          activeShape = drawShape(dynamicPositions);
        }
        activeShapePoints.push(earthPosition);
        createPoint(earthPosition);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  viewer.camera.lookAt(
    Cesium.Cartesian3.fromDegrees(-122.2058, 46.1955, 1000.0),
    new Cesium.Cartesian3(5000.0, 5000.0, 5000.0)
  );
  viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    