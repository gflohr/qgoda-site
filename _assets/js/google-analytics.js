window.dataLayer = window.dataLayer || [];

function gtag() {
	dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', document.getElementById('ga-config').dataset.measurementId);

function loadAnalyticsScript() {
	const scriptElementExists = document.querySelector("[data-scriptid='ga']");
	if (scriptElementExists || window?.ga) return;

	const firstScriptElement = document.getElementsByTagName('script')[0];

	const scriptElement = document.createElement('script');
	scriptElement.type = 'text/javascript';
	scriptElement.setAttribute('async', 'true');
	id = document.getElementById('ga-config').dataset.measurementId;
	scriptElement.setAttribute(
		'src',
		'https://www.googletagmanager.com/gtag/js?id=' + id,
	);
	scriptElement.setAttribute('data-scriptid', 'ga');

	firstScriptElement.parentNode.insertBefore(
		scriptElement,
		firstScriptElement
	);
}

function loadScript(event) {
	const acceptedCategories = event?.detail?.acceptedCategories;

	if (document.location.hostname !== 'localhost'
	    && acceptedCategories.includes('analytics')) {
		loadAnalyticsScript();
	}
}

window.addEventListener('cookie_consent_preferences_restored', loadScript);
window.addEventListener('cookie_consent_preferences_updated', loadScript);
