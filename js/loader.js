(function () {

	/**
	 * Conditional loader
	 * @param {String} name of the assets package
	 * @param {String} mq (e.g. "all and (min-width: 720px)")
	 * @param {String|Array} files to load
	 */
	App.loader = function (name, mq, files) {
		var mql = window.matchMedia(mq);
		if (mql.matches) {
			loader();
		} else {
			mql.addListener(loader);
		}
		function loader() {
			if (App.loader[name]) return;

			if (typeof files == "string") {
				files = [files];
			}

			// It’s essential to load set of styles as soon as possible
			// to prevent flickering and extra repainting
			var i, result = true;
			for (i = 0; i < files.length; i++) {
				result = result && /\.css(\?.*)?$/.test(files[i]);
			}
			if (result) {
				for (i = 0; i < files.length; i++) {
					yepnope.injectCss(files[i]);
				}
				complete();
				return;
			}

			// If we get a mixed list of CSS and JS then load them lazily
			App.loader[name] = 1;
			yepnope({
				load: files,
				complete: complete
			});
		}
		function complete() {
			App.loader[name] = 2;
			mql.removeListener(loader);
			// remove all references to objects
			mql = files = null;
		}
	};

	// increase error timeout to 30 sec
	yepnope.errorTimeout = 30000;

}());
