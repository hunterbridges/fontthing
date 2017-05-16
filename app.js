function resizeCanvas() {
  var canvs = document.getElementById("canvasId");
  canvs.width = window.innerWidth;
  canvs.height = window.innerHeight - $("canvas").offset().top - 12;
}

$(document).ready(function() {
  resizeCanvas();

  var $canvas = $("canvas");

  var canvas = document.getElementById('canvasId');
  var context = canvas.getContext('2d');

  var $input = $("#input");
  var $scale = $("#scale");
  var $shadow = $("#shadow");
  $("input, select").bind('keyup change', function(e) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);

    pxxl("mplus_j12b_utf8-12.bdf", $input.val(), function (pixels) {
        var ctx = context;

        var scale = parseInt($scale.val(), 10);

        if ($shadow.prop("checked")) {
          for (var p=0,hue=0 ; p<pixels.length ; p++,hue++) {
            var pixel = pixels[p],
            x = scale + pixel.x * scale,
            y = scale + pixel.y * scale;

            ctx.fillStyle = "black";
            ctx.fillRect(x,y + scale,scale,scale);
            ctx.fillRect(x + scale,y,scale,scale);
            ctx.fillRect(x + scale,y + scale,scale,scale);
          }
        }

        for (var p=0,hue=0 ; p<pixels.length ; p++,hue++) {
          var pixel = pixels[p],
          x = scale + pixel.x * scale,
          y = scale + pixel.y * scale;

          ctx.fillStyle = "white";
          ctx.fillRect(x,y,scale,scale);
        }
      });
  });
});
