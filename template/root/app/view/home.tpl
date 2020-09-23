<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="renderer" content="webkit|ie-comp|ie-stand" />
  <meta name="robots" content="noindex,nofollow" />
  <title>SmartCinema</title>
  {% if app.config.env !== "local" %}
  <link type="text/css" rel="stylesheet" href="{{helper.asset('main.css')}}" />
  {% endif %}
</head>
<body>
  <div id="app"></div>

  {# 针对本地环境，注入webpackDevServer的地址，请勿修改 #}
  {% if app.config.env === "local" %}
  <script> window.__webpack_dev_server__ = "{{ app.config.webpack.webpackServerAddress }}"; </script>
  {% endif %}

  {% if app.config.env === "local" %}
  <script src="/react.development.js"></script>
  <script src="/react-dom.development.js"></script>
  {% else %}
  <script src="/react.production.min.js"></script>
  <script src="/react-dom.production.min.js"></script>
  {% endif %}

  <script src="{{helper.asset('manifest.js')}}"></script>
  <script src="{{helper.asset('main.js')}}"></script>
</body>
</html>