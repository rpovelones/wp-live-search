# WP Live Search

A bare bones WordPress theme to demo live search. Theme is built using a striped down version of [Roots Sage v.8.5.4](https://github.com/roots/sage/tree/8.5.4) and only includes a handful of files to make the demo work.

We are using [Axios](https://github.com/axios/axios) to make AJAX requests to the [WP-REST-API](https://github.com/WP-API/WP-API) to dynamically load posts when searching.

Note: only works with the default `post` post type. Will not search pages or any other custom post types out of the box, however it can be extended to do so.

## Development

From the command line, run the build tools to get setup:

```shell
$ npm install
$ bower install
$ gulp
```

## Requirements

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| PHP >= 5.4.x    | `php -v`     | [php.net](http://php.net/manual/en/install.php) |
| Node.js >= 4.5  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 3.8.10  | `gulp -v`    | `npm install -g gulp` |
| Bower >= 1.3.12 | `bower -v`   | `npm install -g bower` |

For more information on Sage, visit the [repository](https://github.com/roots/sage/tree/8.5.4).