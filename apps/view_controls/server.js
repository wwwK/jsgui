

var jsgui = require('../../../web/jsgui-server');
var Window = require('../../../web/controls/advanced/window');
var Server_Page_Context = require("../../../web/server-page-context");

var Data_Object = jsgui.Data_Object;
var Collection = jsgui.Collection;


//var Simple_Authentication_Provider = Resource_Authentication.Simple_Provider;

var j = jsgui;
var Class = j.Class;
var each = j.each;
var is_array = j.is_array;
var is_dom_node = j.is_dom_node;
var is_ctrl = j.is_ctrl;
var extend = j.extend;
var x_clones = j.x_clones;
var get_truth_map_from_arr = j.get_truth_map_from_arr;
var get_map_from_arr = j.get_map_from_arr;
var arr_like_to_arr = j.arr_like_to_arr;
var tof = j.tof;
var is_defined = j.is_defined;
var stringify = j.stringify;
var functional_polymorphism = j.functional_polymorphism;
var fp = j.fp;
var arrayify = j.arrayify;
var mapify = j.mapify;
var are_equal = j.are_equal;
var get_item_sig = j.get_item_sig;
var set_vals = j.set_vals;
var truth = j.truth;
var trim_sig_brackets = j.trim_sig_brackets;
var ll_set = j.ll_set;
var ll_get = j.ll_get;
var is_constructor_fn = j.is_constructor_fn;
var is_arr_of_arrs = j.is_arr_of_arrs;
var is_arr_of_strs = j.is_arr_of_strs;
var is_arr_of_t = j.is_arr_of_t;
var fromObject = j.fromObject;

var port = 80;

var server = new jsgui.Server.JSGUI_Server({
    '*': {
        'name': 'window'
    }
});


var rp = server.get('resource_pool');
var Control = jsgui.Control;

//console.log('rp ' + rp);
var rp = server.get('resource_pool');
var ar = rp.get_resource('Server Router');
var rt = ar.get('routing_tree');

server.start(port, function(ree, res_started) {

	// Maybe it's best to use je-suis-xml for setting up the page.

	// Set up jsgui-html-client-stylish within the js serving resource.
	//  It gets served as if it's within /js/web


	rt.set('/', function(req, res) {
		// Better to make a proper JSGUI client document.

		var server_page_context = new Server_Page_Context({
			'req': req,
			'res': res
		});

		var hd = new jsgui.Client_HTML_Document({
			'context': server_page_context
		});

		hd.include_client_css();
		hd.include_js('/js/app-bundle.js');

		var body = hd.body();

    // A list down the left, populated with controls.
    //  Click on one of them, an instance of the control appears on the right.


    /*
    var ctrl_list = new List({
			'context': server_page_context
		});
    */

    // Do this within the 2 column view, with navigation on the left and content in the middle.
    //  Possibly this could be done well / best with flexiview.

    // columns-2 view.





    // Then a panel to the right of it.




    /*
		var ctrl_0 = new Window({
			'context': server_page_context
		});
		ctrl_0.resizable();
		ctrl_0.active();

		// style should at least set the CSS.
		//

		ctrl_0.style('background-color', '#DDDDDD');
		ctrl_0.style('width', '300px');
		ctrl_0.style('height', '300px');

		// Would be nice to be able to set up a menu with some simple JSON like this.


		ctrl_0.menu({
			'file': ['New', 'Open', 'Save', 'Exit'],
			'edit': ['Select All', 'Copy', 'Paste', 'Cut', 'Undo']
		});

		body.add(ctrl_0);
    */

		hd.all_html_render(function(err, deferred_html) {
			if (err) {
				throw err;
			} else {
				//console.log('deferred_html', deferred_html);
				var mime_type = 'text/html';
				//console.log('mime_type ' + mime_type);

				res.writeHead(200, { 'Content-Type': mime_type });
				res.end(deferred_html, 'utf-8');
			}
		});
	});


	rt.setRoot404(function(req, res) {

		res.writeHead(404, {"Content-Type": "text/html"});
	  	res.write("<!DOCTYPE \"html\">");
	  	res.write("<html>");
	  	res.write("<head>");
	  	res.write("<title>Page Not Found</title>");
	  	res.write("</head>");
		res.write("<body>");
		res.write("<h1>Page Not Found</h1>");
		res.write("</body>");
		res.write("</html>");
		res.end();

	});

	// We should be able to put info into the db.

});

//});
