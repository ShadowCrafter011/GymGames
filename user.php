<!DOCTYPE php>
<html>
<head>
	<title>Null</title>

	<link rel="shortcut icon" href="img/icon-main.ico">
</head>
<body>

<?php

function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) . 
');';
    if ($with_script_tags) {
        $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

if (isset($_POST['floatingInput']) && isset($_POST['floatingPassword'])){
	echo '<h1>' . htmlspecialchars($_POST['floatingInput']) . '</h1>';
	echo '<h1>' . htmlspecialchars($_POST['floatingPassword']) . '</h1>';
}
?>

</body>
</html>