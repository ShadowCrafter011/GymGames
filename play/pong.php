<!DOCTYPE html>

<!DOCTYPE html>
<html>
<head>

	<script>
		var x = 0;
		function checkScreenSize(){
			if (x > 1){
				return;
			}
			var w = window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;
			var h = window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight;
				if (w < 1265){
					alert("This page has not been optimized for this screen size yet. You may experience visual bugs");
				}
			x += 1;
			}
			checkScreenSize();
			window.addEventListener("resize", checkScreenSize);
	</script>

	<link rel="stylesheet" href="pong_source/pong_singleplayer/style.css">

	<meta charset="utf-8"/>

	<title>Pong</title>
	<link rel="shortcut icon" type="image/x-icon" href="pong_source/pong_singleplayer/icon-main.ico">
</head>
<body>

	<canvas id="pong_singleplayer_canvas" height="640" width="960"></canvas>
	<script type="text/javascript" src="pong_source/pong_singleplayer/js/pong.singleplayer.v2.js"></script>

	<h1 id="pong_singleplayer_interact" class="red_hover" onclick="startGame()" style="text-align: center; cursor: pointer; background-color: rgba(255, 254, 238, 0.9); border: 6px solid #34ebb7; border-radius: 10px; padding: 10px; margin-top: 15px;">Click on this text or press enter to start pong</h1>

	<script>

		var w = window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;

		document.getElementById("pong_singleplayer_interact").style.marginLeft = (w - 680)/2 + "px";
		document.getElementById("pong_singleplayer_interact").style.marginRight = (w - 680)/2 + "px";
	</script>

</body>
</html>