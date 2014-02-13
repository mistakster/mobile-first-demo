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

			var i, result = true;
			for (i = 0; i < files.length; i++) {
				result = result && /\.css(\?.*)?$/.test(files[i]);
			}
			if (result) {
				for (i = 0; i < files.length; i++) {
					yepnope.injectCss(files[i]);
				}
				App.loader[name] = 2;
				return;
			}

			App.loader[name] = 1;
			yepnope({
				load: files,
				complete: function () {
					App.loader[name] = 2;
					mql.removeListener(loader);
				}
			});
		}
	};

	// increase error timeout to 30 sec
	yepnope.errorTimeout = 30000;

}());
