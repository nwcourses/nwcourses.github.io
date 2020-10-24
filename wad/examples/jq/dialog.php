<html>
<head>
<link rel='stylesheet' type='text/css' 
href='/jq/jquery-ui/css/jquery-ui.css' />
<script type='text/javascript' src='/jq/jquery.min.js'></script>
<script type='text/javascript' src='/jq/jquery-ui/js/jquery-ui.min.js'>
</script>
<style type='text/css'>
body { font-family: helvetica, arial, sans-serif; }
</style>
<title>Dialogs</title>
<script type='text/javascript'>

$(startup);

function startup()
{
    $('#signupbtn').click( openSignupDialog );

        $('#confirm').dialog(
        {
                  autoOpen: false,
                modal:true, buttons:
                {
                    Ok: signedUp,
                    Cancel: tryToCancel
                }
        });

        $('#signup').dialog({modal:true,
            autoOpen:false,
                buttons: 
                { Ok: showSecondDialog, 
                 Cancel: firstDialogCancel
                 }
            } );
}

function openSignupDialog()
{
    $('#signup').dialog("open");
}

function firstDialogCancel()
{
    $('#signup').dialog('close'); 
} 

function showSecondDialog()
{
    $('#signup').dialog('close');
    $('#confirm').dialog('open');
    alert('Blood group: ' + $('#bloodgroup').val());
}

function signedUp()
{
    alert('Welcome - all your actions belong to us.');
    $('#confirm').dialog('close');
}

function tryToCancel()
{
    alert('Too late ha ha ha !!');
}
</script>
</head>
<body>
<h1>Global Megacorp</h1>
<p>

<?php
for($i=1; $i<=100; $i++)
{
    echo "Lorem ipsum dolor sit amet. ";
}
?>

</p>
<input id="signupbtn" value="SIGNUP!" type="button" />
<div id="signup">
<h1>Sign your life away to Global Megacorp</h1>
Name:<input id="name" /> <br />
Full address:<input id="address" /> <br />
Place of Birth:<input id="placeofbirth" /> <br />
Blood Group:<input id="bloodgroup" /> <br />
</div>
<div id="confirm">
Confirm you are happy with Global Megacorp using your personal data.
</div>
</body>
</html>
