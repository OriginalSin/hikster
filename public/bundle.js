var app = (function () {
	'use strict';

	function noop() {}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) tar[k] = 1;
		return tar;
	}

	function run(fn) {
		fn();
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function blankObject() {
		return Object.create(null);
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function get() {
		return this._state;
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	var proto = {
		destroy,
		get,
		fire,
		on,
		set,
		_recompute: noop,
		_set,
		_stage,
		_mount,
		_differs
	};

	/* src\Header.html generated by Svelte v2.16.0 */

	function create_main_fragment(component, ctx) {
		var div_246, current;

		return {
			c() {
				div_246 = createElement("div");
				div_246.innerHTML = `<div class="hk-header__inner"><a href="/"><img id="logo-img" src="/img/logo-Blanc-300.png" alt=""></a>
					<span class="hk-header__nav"><a class="hide-on-small" href="/faq/">Aide</a><a class="hide-on-small" href="/toc/">Responsabilités</a><a class="hide-on-small" href="/about/">Nous connaître</a></span></div>

			<div class="hk-header__search"><div class="ui form search-form--results-page"><div class="field modifiedFieldStyle"><div><div class="react-autosuggest__container"><input type="text" value="" autocomplete="off" role="combobox" aria-autocomplete="list" aria-owns="react-autowhatever-1" aria-expanded="false" class="react-autosuggest__input" placeholder="Cherchez \"Cantons-De-L'Est\""></div></div><button id="search-button" class=""><img class="icon--small" alt="" src="/img/Icons_Hikster_2_colors-18.svg"></button></div><div class="main-search__hike-filters"><div class="field--modified modifiedFieldBg hideOnResults"><div class="Select modifiedSelectStyle Select--single"><div class="Select-control"><span class="Select-multi-value-wrapper" id="react-select-2--value"><div class="Select-placeholder"><span>RÉGION<span class="dropdown-arrow "> ▾</span></span></div><div aria-expanded="false" aria-owns="" aria-activedescendant="react-select-2--value" aria-disabled="false" class="Select-input" role="combobox" tabindex="0" style="border: 0px; width: 1px; display: inline-block;"></div></span><span class="Select-arrow-zone"><span class="Select-arrow"></span></span></div></div></div><div class="mobileBlock"><div class="field--modified modifiedFieldBg"><div class="Select modifiedSelectStyle has-value Select--single"><input type="hidden" name="activity" value="1"><div class="Select-control"><span class="Select-multi-value-wrapper" id="react-select-3--value"><div class="Select-value"><span class="Select-value-label" role="option" aria-selected="true" id="react-select-3--value-item">Randonnée pédestre</span></div><div aria-expanded="false" aria-owns="" aria-activedescendant="react-select-3--value" aria-disabled="false" class="Select-input" role="combobox" tabindex="0" style="border: 0px; width: 1px; display: inline-block;"></div></span><span class="Select-arrow-zone"><span class="Select-arrow"></span></span></div></div></div><div class="field--modified modifiedFieldBg "><div class="Select modifiedSelectStyle Select--single"><div class="Select-control"><span class="Select-multi-value-wrapper" id="react-select-4--value"><div class="Select-placeholder"><span>DIFFICULTÉ<span class="dropdown-arrow "> ▾</span></span></div><div aria-expanded="false" aria-owns="" aria-activedescendant="react-select-4--value" aria-disabled="false" class="Select-input" role="combobox" tabindex="0" style="border: 0px; width: 1px; display: inline-block;"></div></span><span class="Select-arrow-zone"><span class="Select-arrow"></span></span></div></div></div><div class="field--modified modifiedFieldBg "><div class="Select modifiedSelectStyle Select--single"><div class="Select-control"><span class="Select-multi-value-wrapper" id="react-select-5--value"><div class="Select-placeholder"><span>TYPE<span class="dropdown-arrow "> ▾</span></span></div><div aria-expanded="false" aria-owns="" aria-activedescendant="react-select-5--value" aria-disabled="false" class="Select-input" role="combobox" tabindex="0" style="border: 0px; width: 1px; display: inline-block;"></div></span><span class="Select-arrow-zone"><span class="Select-arrow"></span></span></div></div></div><div class="field--modified modifiedFieldBg "><div class="Select modifiedSelectStyle Select--single"><div class="Select-control"><span class="Select-multi-value-wrapper" id="react-select-6--value"><div class="Select-placeholder"><span>LONGUEUR<span class="dropdown-arrow "> ▾</span></span></div><div aria-expanded="false" aria-owns="" aria-activedescendant="react-select-6--value" aria-disabled="false" class="Select-input" role="combobox" tabindex="0" style="border: 0px; width: 1px; display: inline-block;"></div></span><span class="Select-arrow-zone"><span class="Select-arrow"></span></span></div></div></div></div><div class="mobileBlock"><div class="modifiedCheckboxStyle"><div class="ui checkbox checkbox--padding"><input type="checkbox" id="dog-allowed" value="on"><label for="dog-allowed" class="label--black">Chien accepté</label></div></div><div class="poi-modal-toggle "><button class="btn--result">Filtrer POI</button><div class="md-modal md-effect-1"><div class="md-content"><button class="btn--close-modal">×</button><div><div class="legend-content"><div class="sport-categories"><div class="sport-category"><div class="sport-category-title">Sentiers</div><div class="sport-items"><div class="sport-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_100.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="sport-100" value="on"><label for="sport-100">Randonnée pédestre</label></div></div><div class="sport-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_101.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="sport-101" value="on"><label for="sport-101">Raquette</label></div></div></div></div></div><div class="poi-categories"><div class="poi-category" title="Hébergement / restaurant  >"><div class="ui checkbox select-all"><input type="checkbox" id="select-all" value="on"><label for="select-all"> Tout Sélectionner</label></div><div class="poi-items"><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_2.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-2" value="2"><label for="poi-2">Abri chauffé</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_3.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-3" value="3"><label for="poi-3">Abri/relais/halte</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_7.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-7" value="7"><label for="poi-7">Auberge/gîte</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_58.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-58" value="58"><label for="poi-58">Auberge de jeunesse</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_11.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-11" value="11"><label for="poi-11">Camping</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_16.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-16" value="16"><label for="poi-16">Chalet/appartement</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_18.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-18" value="18"><label for="poi-18">Dépanneur/épicerie</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_64.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-64" value="64"><label for="poi-64">Hébergement insolite</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_71.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-71" value="71"><label for="poi-71">Hôtel</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_28.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-28" value="28"><label for="poi-28">Lean to</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_57.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-57" value="57"><label for="poi-57">Pourvoirie</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_42.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-42" value="42"><label for="poi-42">Refuge</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_44.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-44" value="44"><label for="poi-44">Restauration</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_80.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-80" value="80"><label for="poi-80">SPA</label></div></div></div></div><div class="poi-category" title="Stationnement  >"><div class="poi-items"><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_33.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-33" value="33"><label for="poi-33">Stationnement</label></div></div></div></div><div class="poi-category" title="Activité  >"><div class="ui checkbox select-all"><input type="checkbox" id="select-all" value="on"><label for="select-all"> Tout Sélectionner</label></div><div class="poi-items"><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_14.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-14" value="14"><label for="poi-14">Canot-camping</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_21.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-21" value="21"><label for="poi-21">Équitation</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_20.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-20" value="20"><label for="poi-20">Embarcation/canot/kayak</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_22.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-22" value="22"><label for="poi-22">Escalade</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_29.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-29" value="29"><label for="poi-29">Location d'équipements</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_30.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-30" value="30"><label for="poi-30">Minigolf</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_31.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-31" value="31"><label for="poi-31">Natation/plage</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_41.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-41" value="41"><label for="poi-41">Rampe de mise à l'eau</label></div></div></div></div><div class="poi-category" title="Autre  >"><div class="ui checkbox select-all"><input type="checkbox" id="select-all" value="on"><label for="select-all"> Tout Sélectionner</label></div><div class="poi-items"><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_4.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-4" value="4"><label for="poi-4">Aire de pique-nique</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_8.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-8" value="8"><label for="poi-8">Autobus/navette</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_9.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-9" value="9"><label for="poi-9">Belvédère/point de vue</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_68.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-68" value="68"><label for="poi-68">Boutique</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_69.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-69" value="69"><label for="poi-69">Cascade/Chute</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_19.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-19" value="19"><label for="poi-19">Eau potable</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_67.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-67" value="67"><label for="poi-67">Douche</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_25.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-25" value="25"><label for="poi-25">Guichet</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_27.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-27" value="27"><label for="poi-27">Information/poste d'accueil</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_70.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-70" value="70"><label for="poi-70">Monument</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_32.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-32" value="32"><label for="poi-32">Panneau d'interprétation</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_40.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-40" value="40"><label for="poi-40">Premier soin</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_39.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-39" value="39"><label for="poi-39">Poste ou borne de perception</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_74.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-74" value="74"><label for="poi-74">Secours</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_46.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-46" value="46"><label for="poi-46">Sommet</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_75.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-75" value="75"><label for="poi-75">Table d'orientation</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_47.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-47" value="47"><label for="poi-47">Téléphone</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_48.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-48" value="48"><label for="poi-48">Téléphone urgence</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_50.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-50" value="50"><label for="poi-50">Toilettes</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_51.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-51" value="51"><label for="poi-51">Toilettes sèches</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_77.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-77" value="77"><label for="poi-77">Wi-Fi</label></div></div><div class="poi-item"><div class="icon"><div class="icon-inner" style="background-image: url(\"/img/markers/Icones_Hikster_78.svg\");"></div></div><div class="ui checkbox"><input type="checkbox" id="poi-78" value="78"><label for="poi-78">Wi-Fi gratuit</label></div></div></div></div></div></div></div></div></div></div></div></div><span class="hideOnResults"><div><button class="search-form__button ui button">Recherche <span>▸</span></button></div></span></div></div>`;
				div_246.className = "hk-header hk-header--results";
			},

			m(target, anchor) {
				insert(target, div_246, anchor);
				current = true;
			},

			p: noop,

			i(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o: run,

			d(detach) {
				if (detach) {
					detachNode(div_246);
				}
			}
		};
	}

	function Header(options) {
		init(this, options);
		this._state = assign({}, options.data);
		this._intro = !!options.intro;

		this._fragment = create_main_fragment(this, this._state);

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);
		}

		this._intro = true;
	}

	assign(Header.prototype, proto);

	/* src\App.html generated by Svelte v2.16.0 */

	const serverBase = window.serverBase || '//maps.kosmosnimki.ru/';

	function data() {
		return {
			regl: null,
			clasters: false,
			layers: {},
			filter: ''
		}
	}
	var methods = {
		parseJSON(json) {
			// let columns = json.fields.reduce((p, c, i) => {
				// p[c.name] = i;
				// return p;
			// }, {});
			let featureCollection = {
					type: 'FeatureCollection', 
					features: json.features.map(function(pt, i) {
						let it = pt.attributes,
							geo = pt.geometry;

						it.id = it.poi_id;
						it.name = it.category === 5 ? 'Toilettes' : 'Belvédère/point de vue';
						
						return {
							type: 'Feature',
							id: it.id,
							properties: it,
							geometry: { type: 'Point', coordinates: [geo.x, geo.y ] }
						}})
				},
				markers = L.markerClusterGroup({
					showCoverageOnHover: false,
					disableClusteringAtZoom: 16
				});

			let geoJsonLayer = this.geoJsonLayer = L.geoJson(featureCollection, {
				pointToLayer: (geoJsonPoint, latlng) => {
					return L.marker(latlng, { icon: L.divIcon({
						iconSize: [26, 26],
						html: '',
						// html: geoJsonPoint.id || '21',
						className: 'sia-icon-' + geoJsonPoint.properties.category
					}) });
				},

				onEachFeature: (feature, layer) => {
					let props = feature.properties,
						img = props.Images ? '<img src="' + props.Images + '" /><br>' : '',
						html = img +
							'poi_id: <a href="' + props.Website + '" class="Name" target="none"><strong>' + props.poi_id + '</strong></a>\
						<br>name: <b>' + props.name + '</b>';
					// layer.bindPopup(html); //, {autoClose: false, closeOnClick: false, keepInView: true});
					layer.on('click', () => {
						L.popup()
							.setLatLng(layer.getLatLng())
							.setContent(html)
							.openOn(L.leafletMap);
					});
				}
			});

			markers.addLayer(geoJsonLayer);
			return markers;
		},
		createMap(it) {
			let {clasters} = this.get();
				it = it || {};
			let app = it.app || {},
				gmxMap = app.gmxMap || {},
				state = it.state || {},
				calendar = state.calendar || {},
				mapID = gmxMap.mapID || '946GH',
				apiKey = gmxMap.apiKey,
				pos = state.map ? state.map.position : {},
				url = 'https://hiksterarcgis.goazimut.com/arcgis/rest/services/Hikster_New_Schema_Test/MapServer/0/query?returnGeometry=true&where=type_id%20IN%20(2%2C3%2C7%2C58%2C11%2C16%2C18%2C64%2C71%2C28%2C57%2C42%2C44%2C80%2C33%2C4%2C8%2C9%2C68%2C19%2C67%2C25%2C27%2C70%2C32%2C40%2C39%2C74%2C46%2C75%2C47%2C48%2C50%2C51%2C77%2C78)&outSr=4326&outFields=*&inSr=4326&geometry=%7B%22xmin%22%3A-69.79940414428712%2C%22ymin%22%3A47.830328289805784%2C%22xmax%22%3A-69.6467971801758%2C%22ymax%22%3A47.921173915514196%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelContains&f=json';

	// url = './ext/data.json';
			fetch(url).then(function(response) {
					return response.json();
				}).then(function(json) {
					let markers = this.parseJSON(json);
					this.markers = markers;

					if(L.leafletMap) {
						L.leafletMap.remove();
					}

					let MapBox = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xhaXJlZGVndWVsbGUiLCJhIjoiY2ozazVraGkzMDB4NTJ3cXQ2NXd4YjZrYiJ9.aeR6EKn38zvZTvCVMgTdDA', {
							maxZoom: 18,
							attribution: '&copy; Imagery <a href="http://mapbox.com/about/maps/">MapBox</a>'
						}),
						OSM = L.tileLayer('https://tilessputnik.ru/{z}/{x}/{y}.png', {
							maxZoom: 18
							// ,
							// attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
						});
					let node = document.getElementsByClassName('map')[0];
					let map = L.leafletMap = new L.Map(node, {
						srs: 3857,
						layers: [MapBox],
						attributionControl: false,
						center: new L.LatLng(pos.y || 47.643186, pos.x || -69.653320),
						// center: new L.LatLng(pos.y || 69.653320, pos.x || 47.643186),
						// center: new L.LatLng(pos.y || 0, pos.x || 0),
						zoom: pos.z || 7
					});//.on('zoomstart', this.zoomstart.bind(this));
					L.gmxLocale.setLanguage('eng');
					L.leafletMap.gmxControlsManager.init({
						gmxCopyright: {scanexCopyright: ''}
					});
					// heatmap

					L.control.layers({
						MapBox: MapBox,
						OSM: OSM
					}, {
						
						hikster: L.tileLayer('https://hiksterarcgis.goazimut.com/arcgis/rest/services/Hikster_New_Schema_Test_Tiles_Activity100/MapServer/tile/{z}/{y}/{x}', {
							maxZoom: 18,
							attribution: '&copy; <a href="//hikster.com/">hikster.com</a>'
						}).addTo(map),
						poi: markers.addTo(map)

					}, {collapsed: false}).addTo(map);
				}.bind(this));
		},
		zoomstart() {
			console.log('zoomstart', arguments);
		}
	};

	function onstate({ changed, current, previous }) {
		console.log('map onstate', changed, current, previous);
		// if (changed.urlParams && current.urlParams) {
			this.createMap();
		// }
		// if (changed.filter) {
			// this.setFilter(current.filter);
		// }
		// if (changed.clasters && this.markers) {
			// this.markers.options.disableClusteringAtZoom = current.clasters ? 16 : 0;
			// this.markers.clearLayers();
			// this.markers.addLayers(this.geoJsonLayer.getLayers());
		// }
	}
	function create_main_fragment$1(component, ctx) {
		var div5, div4, div0, text0, div3, text1, div1, text2, div2, current;

		var header = new Header({
			root: component.root,
			store: component.store
		});

		return {
			c() {
				div5 = createElement("div");
				div4 = createElement("div");
				div0 = createElement("div");
				div0.innerHTML = `<span></span>`;
				text0 = createText("\n\t\t");
				div3 = createElement("div");
				header._fragment.c();
				text1 = createText("\n\t\t\t");
				div1 = createElement("div");
				text2 = createText("\n\n\t\t\t");
				div2 = createElement("div");
				div0.className = "toasts";
				div1.className = "accordion-wrapper";
				div2.id = "map";
				div2.className = "map fff leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom";
				div3.className = "results-page";
				div4.dataset.reactroot = "";
				div4.className = "wrapper";
				div5.className = "app";
			},

			m(target, anchor) {
				insert(target, div5, anchor);
				append(div5, div4);
				append(div4, div0);
				append(div4, text0);
				append(div4, div3);
				header._mount(div3, null);
				append(div3, text1);
				append(div3, div1);
				append(div3, text2);
				append(div3, div2);
				current = true;
			},

			p: noop,

			i(target, anchor) {
				if (current) return;

				this.m(target, anchor);
			},

			o(outrocallback) {
				if (!current) return;

				if (header) header._fragment.o(outrocallback);
				current = false;
			},

			d(detach) {
				if (detach) {
					detachNode(div5);
				}

				header.destroy();
			}
		};
	}

	function App(options) {
		init(this, options);
		this._state = assign(data(), options.data);
		this._intro = !!options.intro;

		this._handlers.state = [onstate];

		onstate.call(this, { changed: assignTrue({}, this._state), current: this._state });

		this._fragment = create_main_fragment$1(this, this._state);

		this.root._oncreate.push(() => {
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}

		this._intro = true;
	}

	assign(App.prototype, proto);
	assign(App.prototype, methods);

	const app = new App({
		target: document.body,
		data: {
			name: 'world'
		}
	});

	return app;

}());
//# sourceMappingURL=bundle.js.map
