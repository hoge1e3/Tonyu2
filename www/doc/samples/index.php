<?php

 if ($dh = opendir(".")) {
        while (($file = readdir($dh)) !== false) {
            if ($file == "." || $file==".." || $file=="index.php") continue;
            echo "<A href='$file'>$file</a><BR>";// : filetype: " . filetype($dir . $file) . "\n";
        }
        closedir($dh);
    }
