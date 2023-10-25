<?php

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $isPost = true;

    if (isset($_FILES['images'])) {
        $images = $_FILES['images'];
        $filetype = "img";
        foreach ($images['tmp_name'] as $key => $tmpName) {
            $imageExtension = pathinfo($images['name'][$key], PATHINFO_EXTENSION);
            $uniqueID = uniqid();
            $imageName = $filetype . '_' . $uniqueID . '.' . $imageExtension;
            move_uploaded_file($tmpName, '../../document/img/' . $imageName);
        }
    }else{
        $imageName = "no-image.png";
    }

}else{
    $isPost = false;
    $imageName = "no-image.png";
}

//JASON
$data = array(
    "isPost" => $isPost,
    "imageName" => $imageName,
);
echo  json_encode($data);


?>