var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

// obtain cookieconsent plugin
var cc = initCookieConsent();

// run plugin with config object
cc.run({
    current_lang: 'it',
    autoclear_cookies: true,                    // default: false
    cookie_name: 'cc_cookie_demo2',             // default: 'cc_cookie'
    cookie_expiration: 365,                     // default: 182
    page_scripts: true,                         // default: false
    force_consent: true,                        // default: false

    // auto_language: null,                     // default: null; could also be 'browser' or 'document'
    // autorun: true,                           // default: true
    // delay: 0,                                // default: 0
    // hide_from_bots: false,                   // default: false
    // remove_cookie_tables: false              // default: false
    // cookie_domain: location.hostname,        // default: current domain
    // cookie_path: '/',                        // default: root
    // cookie_same_site: 'Lax',
    // use_rfc_cookie: false,                   // default: false
    // revision: 0,                             // default: 0

    gui_options: {
        consent_modal: {
            layout: 'cloud',                    // box,cloud,bar
            position: 'bottom center',          // bottom,middle,top + left,right,center
            transition: 'slide'                 // zoom,slide
        },
        settings_modal: {
            layout: 'bar',                      // box,bar
            position: 'left',                   // right,left (available only if bar layout selected)
            transition: 'slide'                 // zoom,slide
        }
    },

    onFirstAction: function(){
        console.log('onFirstAction fired');
    },

    onAccept: function (cookie) {
		console.log('onAccept fired!');
		
        if (cc.allowedCategory('analytics')) {
		gtag('consent', 'update', {
			'analytics_storage': 'granted'
		});
		}
		if (cc.allowedCategory('advertising')) {
			gtag('consent', 'update', {
				'ad_storage': 'granted'
			});
		}
		if (cc.allowedCategory('personalization')) {
			gtag('consent', 'update', {
				'personalization_storage': 'granted',
			});
		}
		if (cc.allowedCategory('security')) {
			gtag('consent', 'update', {
				'security_storage': 'granted'
			});
		}
    },

    onChange: function (cookie, changed_preferences) {
        console.log('onChange fired!');

        if (cc.allowedCategory('analytics')) {
		gtag('consent', 'update', {
			'analytics_storage': 'granted'
		});
		}
		if (!cc.allowedCategory('analytics')) {
			gtag('consent', 'update', {
				'analytics_storage': 'denied'
			});
		}
		if (cc.allowedCategory('advertising')) {
			gtag('consent', 'update', {
				'ad_storage': 'granted'
			});
		}
		if (!cc.allowedCategory('advertising')) {
			gtag('consent', 'update', {
				'ad_storage': 'denied'
			});
		}
		if (cc.allowedCategory('personalization')) {
			gtag('consent', 'update', {
				'personalization_storage': 'granted',
			});
		}
		if (!cc.allowedCategory('personalization')) {
			gtag('consent', 'update', {
				'personalization_storage': 'denied',
			});
		}
		if (cc.allowedCategory('security')) {
			gtag('consent', 'update', {
				'security_storage': 'granted'
			});
		}
		if (!cc.allowedCategory('security')) {
			gtag('consent', 'update', {
				'security_storage': 'denied'
			});
		}
    },

    languages: {
        'en': {
            consent_modal: {
                title: 'Hello traveller, it\'s cookie time!',
                description: 'Our website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <a href="#privacy-policy" class="cc-link">Privacy policy</a>',
                primary_btn: {
                    text: 'Accept all',
                    role: 'accept_all'      //'accept_selected' or 'accept_all'
                },
                secondary_btn: {
                    text: 'Preferences',
                    role: 'settings'       //'settings' or 'accept_necessary'
                },
                revision_message: '<br><br> Dear user, terms and conditions have changed since the last time you visisted!'
            },
            settings_modal: {
                title: 'Cookie settings',
                save_settings_btn: 'Save current selection',
                accept_all_btn: 'Accept all',
                reject_all_btn: 'Reject all',
                close_btn_label: 'Close',
                cookie_table_headers: [
                    {col1: 'Name'},
                    {col2: 'Domain'},
                    {col3: 'Expiration'}
                ],
                blocks: [
                    {
                        title: 'Cookie usage',
                        description: LOREM_IPSUM + ' <a href="#" class="cc-link">Privacy Policy</a>.'
                    }, {
                        title: 'Strictly necessary cookies',
                        description: LOREM_IPSUM + LOREM_IPSUM + "<br><br>" + LOREM_IPSUM + LOREM_IPSUM,
                        toggle: {
                            value: 'necessary',
                            enabled: true,
                            readonly: true  //cookie categories with readonly=true are all treated as "necessary cookies"
                        }
                    }, {
                        title: 'Analytics & Performance cookies',
                        description: LOREM_IPSUM,
                        toggle: {
                            value: 'analytics',
                            enabled: false,
                            readonly: false
                        },
                        cookie_table: [
                            {
                                col1: '^_ga',
                                col2: 'yourdomain.com',
                                col3: 'description ...',
                                is_regex: true
                            },
                            {
                                col1: '_gid',
                                col2: 'yourdomain.com',
                                col3: 'description ...',
                            },
                            {
                                col1: '_my_cookie',
                                col2: 'yourdomain.com',
                                col3: 'test cookie with custom path ...',
                                path: '/demo'       // needed for autoclear cookies
                            }
                        ]
                    }, {
                        title: 'Targeting & Advertising cookies',
                        description: 'If this category is deselected, <b>the page will reload when preferences are saved</b>... <br><br>(demo example with reload option enabled, for scripts like microsoft clarity which will re-set cookies and send beacons even after the cookies have been cleared by the cookieconsent\'s autoclear function)',
                        toggle: {
                            value: 'targeting',
                            enabled: false,
                            readonly: false,
                            reload: 'on_disable'            // New option in v2.4, check readme.md
                        },
                        cookie_table: [
                            {
                                col1: '^_cl',               // New option in v2.4: regex (microsoft clarity cookies)
                                col2: 'yourdomain.com',
                                col3: 'These cookies are set by microsoft clarity',
                                // path: '/',               // New option in v2.4
                                is_regex: true              // New option in v2.4
                            }
                        ]
                    }, {
                        title: 'More information',
                        description: LOREM_IPSUM + ' <a class="cc-link" href="https://orestbida.com/contact/">Contact me</a>.',
                    }
                ]
            }
        },
		'it': {
			consent_modal: {
				title: 'Questo sito utilizza i cookies',
				description: 'Ciao, questo sito web utilizza i cookie essenziali per garantirne il corretto funzionamento e i cookie di tracciamento per capire come interagisci con esso. Questi ultimi verranno impostati solo dopo il consenso. <button type="button" data-cc="c-settings" class="cc-link">Fammi scegliere</button>',
				primary_btn: {
					text: 'Accetta tutti',
					role: 'accept_all'              // 'accept_selected' or 'accept_all'
				},
				secondary_btn: {
					text: 'Rifiuta tutti',
					role: 'accept_necessary'        // 'settings' or 'accept_necessary'
				}
			},
			settings_modal: {
				title: 'Preferenze dei cookie',
				save_settings_btn: 'Salva impostazioni',
				accept_all_btn: 'Accetta tutti',
				reject_all_btn: 'Rifiuta tutti',
				close_btn_label: 'Chiudi',
				cookie_table_headers: [
					{ col1: 'Nome' },
					{ col2: 'Dominio' },
					{ col3: 'Scadenza' },
					{ col4: 'Descrizione' }
				],
				blocks: [
					{
						title: 'Utilizzo dei cookie 📢',
						description: 'Utilizzo i cookie per garantire le funzionalità base del sito web e per migliorare la tua esperienza online. Puoi scegliere per ogni categoria di optare per l\'inclusione/esclusione in qualsiasi momento. Per maggiori dettagli relativi ai cookie e ad altri dati sensibili, leggi la <a href="#" class="cc-link">policy sulla privacy</a>.'
					}, {
						title: 'Cookie strettamente necessari',
						description: 'Questi cookie sono essenziali per il corretto funzionamento del mio sito web. Senza questi cookie, il sito web non funzionerebbe correttamente',
						toggle: {
							value: 'functionality',
							enabled: true,
							readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
						}
					}, {
						title: 'Cookie statistici',
						description: 'These cookies allow the website to remember the choices you have made in the past',
						toggle: {
							value: 'analytics',     // your cookie category
							enabled: false,
							readonly: false
						},
						cookie_table: [             // list of all expected cookies
							{
								col1: '^_ga',       // match all cookies starting with "_ga"
								col2: 'google.com',
								col3: '2 years',
								col4: 'description ...',
								is_regex: true
							},
							{
								col1: '_gid',
								col2: 'google.com',
								col3: '1 day',
								col4: 'description ...',
							}
						]
					}, {
						title: 'Cookies di marketing e pubblicità',
						description: 'Questi cookie consentono al sito web di ricordare le scelte che hai effettuato in passato',
						toggle: {
							value: 'advertising',
							enabled: false,
							readonly: false
						}
					}, {
						title: 'Cookies di personalizzazione',
						description: 'Questi cookie raccolgono informazioni su come utilizzi il sito web, quali pagine hai visitato e quali link hai cliccato. Tutti i dati sono resi anonimi e non possono essere utilizzati per identificarti',
						toggle: {
							value: 'personalization',
							enabled: false,
							readonly: false
						}
					}, {
						title: 'Cookies di sicurezza',
						description: 'Questi cookie raccolgono informazioni su come utilizzi il sito web, quali pagine hai visitato e quali link hai cliccato. Tutti i dati sono resi anonimi e non possono essere utilizzati per identificarti',
						toggle: {
							value: 'security',
							enabled: false,
							readonly: false
						}
					}, {
						title: 'Maggiori informazioni',
						description: 'Per qualsiasi domanda in relazione alla nostra politica sui cookie e alle tue scelte, per favore <a class="cc-link" href="#yourcontactpage">contattaci</a>.',
					}
				]
			}
		}	
	}
    
});
