<?php
    header("Content-Type: text/plain");
    echo substr(shell_exec("git log -1 --pretty=format:'%ci' --abbrev-commit"),0,10);