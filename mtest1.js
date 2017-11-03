
// Expanded Click Action Functions
function openSite(url)
{
	mraid.open(url);
}

function sendSMS(number)
{
	if (!mraid.supports("sms"))
	{
		alert("MRAID says SMS is not supported on this device.");
	}
	else
	{
		mraid.open("sms://" + number);
	}
}

function callNumber(number)
{
	if (!mraid.supports("tel"))
	{
		alert("MRAID says calling is not supported on this device.");
	}
	else
	{
		mraid.open("tel://" + number);
	}
}

function playVideo(url)
{
	mraid.playVideo(url);
}

function storePicture(url)
{
	if (!mraid.supports("storePicture"))
	{
		alert("MRAID says storePicture is not supported on this device.");
	}
	else
	{
		mraid.storePicture(url);
	}
}

function createCalendarEvent()
{
	if (!mraid.supports("calendar"))
	{
		alert("MRAID says calendar is not supported on this device.");
	}
	else
	{
		var calendarObject = {description:"Mayan Apocalypse/End of World", location:"everywhere", start:"2013-12-21T00:00-05:00", end:"2013-12-22T00:00-05:00"};
	
		mraid.createCalendarEvent(calendarObject);
	}
}

// Core Ad Functions
function toggleLayer( fromLayer, toLayer )
{
  var fromElem, toElem, fromElemStyle, toElemStyle;

  fromElem = document.getElementById( fromLayer );
  fromElem.style.display = 'none';

  toElem = document.getElementById( toLayer );
  toElem.style.display = '';
}

function updateAd(state)
{	
	if (state == "expanded")
	{
    	toggleLayer('normal', 'expanded');
	}
	else if (state == "default")
	{
		toggleLayer('expanded', 'normal');
	}
}

function centerAd(width, height)
{
	var sideMargins = 0;
	var topBottomMargins = 0;

	if (mraid.getState() == "expanded")
	{
		sideMargins = (width - 320)/2;
		topBottomMargins = (height - 250)/2;
		
		document.getElementById("adContainer").style.margin = topBottomMargins + "px " + sideMargins + "px " + topBottomMargins + "px " + sideMargins + "px";
	}
	
	document.getElementById("adContainer").style.margin = topBottomMargins + "px " + sideMargins + "px " + topBottomMargins + "px " + sideMargins + "px";	
}

function expand()
{	
	mraid.expand();
}

function collapse()
{			
	mraid.close();
}

function setupViewport(width)
{
	var element = document.querySelector("meta[name=viewport]");
	if (!element)
	{
		element = document.createElement("meta");
		element.name = "viewport";
		element.content = "width=" + width + ", user-scalable=no";
		document.getElementsByTagName('head')[0].appendChild(element);
	}
	else
	{
		element.content = "width=" + width + ", user-scalable=no";
	}
}
setupViewport(320);

function mraidIsReady()
{
	mraid.removeEventListener("ready", mraidIsReady);
	
	showMyAd();
}

function showMyAd()
{
	var el = document.getElementById("normal");
    el.style.display = '';

	mraid.addEventListener("stateChange", updateAd); 
	mraid.addEventListener("sizeChange", centerAd);
}

function doReadyCheck()
{	
	if (mraid.getState() == 'loading') 
	{	
		mraid.addEventListener("ready", mraidIsReady);  
	} 
	else
	{ 	
		showMyAd();      
	}
}

doReadyCheck();
