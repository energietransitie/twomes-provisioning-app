
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "wifiwizard2.WifiWizard2",
          "file": "plugins/wifiwizard2/www/WifiWizard2.js",
          "pluginId": "wifiwizard2",
        "clobbers": [
          "window.WifiWizard2"
        ]
        },
      {
          "id": "es6-promise-plugin.Promise",
          "file": "plugins/es6-promise-plugin/www/promise.js",
          "pluginId": "es6-promise-plugin",
        "runs": true
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "wifiwizard2": "3.1.1",
      "es6-promise-plugin": "4.2.2"
    };
    // BOTTOM OF METADATA
    });
    