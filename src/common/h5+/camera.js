/* eslint-disable no-undef */

  var _self = this;
  var cmr = plus.camera.getCamera();
  var fmt = cmr.supportedImageFormats[0];
  cmr.captureImage(function (path) {
    plus.io.resolveLocalFileSystemURL(path, function (entry) {
      var tmpPath = entry.toLocalURL();
      var fileAry = [];
      fileAry.push(tmpPath);
      _self.compressImg(fileAry);
    })
  },
    function (error) { alert(error) },
    { format: fmt });