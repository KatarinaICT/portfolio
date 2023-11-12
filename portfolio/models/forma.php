<?php
    header("Content-type: application/json");
    define("BASE_URL", $_SERVER["DOCUMENT_ROOT"]."/");

    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $ime = $_POST['ime'];
        $prezime = $_POST['prezime'];
        $godina = $_POST['godina'];
        $pol = $_POST['pol'];
        $adresa = $_POST['adresa'];
        $grad = $_POST['grad'];

        $podaci = "Ime:". $ime.", Prezime:". $prezime.", Godina:". $godina.", Pol:". $pol. ", Adresa:" .$adresa. ", Grad:" .$grad;

        $fajl = fopen(BASE_URL."portfolio/data/form.text", "a");
        $upis = fwrite($fajl,",\n". $podaci);

        if($upis){
            fclose($fajl);
            echo json_encode(["odgovor" => "uspeh"]);
        }
    }

?>