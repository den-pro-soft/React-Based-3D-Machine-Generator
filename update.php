<?php
	
	$output = shell_exec ('/usr/bin/git pull');

//	if ($_SERVER ['SERVER_NAME'] == 'domain.com')
//	{
		$output = "Setting branch to master\n";
		$output = $output . shell_exec ('/usr/bin/git checkout master');
//	}

	echo ("<pre>$output</pre>");
