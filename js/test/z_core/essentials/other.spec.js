﻿

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['../../../core/jsgui-lang-essentials', 'assert', '../../test-utils/test-utils'], function (jsgui, assert, test_utils) {


	describe("z_core/essentials/other.spec.js", function() {
					
		// -----------------------------------------------------
		//	is_array()
		// -----------------------------------------------------
			
		it("is_array() should detect the arrays", function() {

			assert.equal(jsgui.is_array([]), true);
			assert.equal(jsgui.is_array([1,2,3]), true);
			assert.equal(jsgui.is_array(new Array()), true);

			assert.equal(jsgui.is_array(), false);
			assert.equal(jsgui.is_array(1), false);
			assert.equal(jsgui.is_array("abc"), false);
			assert.equal(jsgui.is_array(null), false);
			assert.equal(jsgui.is_array({a:1,b:2}), false);
			assert.equal(jsgui.is_array(function(){alert("ok");}), false);

		});
					
		// -----------------------------------------------------
		//	is_dom_node()
		// -----------------------------------------------------
			
		it("is_dom_node() should detect the DOM nodes", function() {

            var domNode = { nodeType: "node", childNodes: "nodes" };

			assert.equal(jsgui.is_dom_node(domNode), true);

			assert.equal(jsgui.is_dom_node(), false);
			assert.equal(jsgui.is_dom_node(1), false);
			assert.equal(jsgui.is_dom_node("abc"), false);
			assert.equal(jsgui.is_dom_node(null), false);
			assert.equal(jsgui.is_dom_node({a:1,b:2}), false);
			assert.equal(jsgui.is_dom_node(function(){alert("ok");}), false);

		});
					
		// -----------------------------------------------------
		//	extend()
		// -----------------------------------------------------
			
		it("extend() should extend the passed onject", function() {

            // simple plain objects

			assert.deepEqual(jsgui.extend({}, {}), {});
			assert.deepEqual(jsgui.extend({}, {a:1}), {a:1});
			assert.deepEqual(jsgui.extend({a:1}, {b:2}), {a:1, b:2});
			assert.deepEqual(jsgui.extend({a:1}, {b:2}, {c:3}), {a:1, b:2, c:3});
			assert.deepEqual(jsgui.extend({a:1}, {a:2}, {a:3}), {a:3});

            // simple arrays

			assert.deepEqual(jsgui.extend([], []), []);
			assert.deepEqual(jsgui.extend([], [1]), [1]);
			assert.deepEqual(jsgui.extend([1,2,3], [4,5]), [4,5,3]);
			assert.deepEqual(jsgui.extend([5,5,5,5,5], [3,3,3], [1]), [1, 3, 3, 5, 5]);

            // empty objects and arrays

			assert.deepEqual([], {}); // !!!
			assert.deepEqual(jsgui.extend({}, []), []);
			assert.deepEqual(jsgui.extend({}, []), {});

            // this

            (function(){
                var target = { extend: jsgui.extend, o1:{p1:1} };
                target.extend({o2:{p2:2}});
                delete target.extend;
                assert.deepEqual(target, {o1:{p1:1}, o2:{p2:2}} );
            })();

           
            //
            // nested objects
            //

			assert.deepEqual(jsgui.extend({o1:{p1:1}}, {}), {o1:{p1:1}});
			assert.deepEqual(jsgui.extend({}, {o1:{p1:1}}), {o1:{p1:1}});

			assert.deepEqual(jsgui.extend(true, {o1:{p1:1}}, {}), {o1:{p1:1}});
			assert.deepEqual(jsgui.extend(true, {}, {o1:{p1:1}}), {o1:{p1:1}});

			assert.deepEqual(jsgui.extend(false, {o1:{p1:1}}, {}), {o1:{p1:1}});
			assert.deepEqual(jsgui.extend(false, {}, {o1:{p1:1}}), {o1:{p1:1}});

            // nested: by reference

            (function(){
                var target = {};
                var ext1 = {o1:{p1:1}};
                var result = jsgui.extend(target, ext1);
                //
                assert.equal(target, result);
                ext1.o1.p1 = 2;
                assert.equal(target.o1.p1, 2);
            })();

            // nested: by clone (deep mode)

            (function(){
                var target = {};
                var ext1 = {o1:{p1:1}};
                var result = jsgui.extend(true, target, ext1);
                //
                assert.equal(target, result);
                ext1.o1.p1 = 2;
                assert.equal(target.o1.p1, 1);
            })();

		});
					
		// -----------------------------------------------------
		//	get_truth_map_from_arr()
		// -----------------------------------------------------
			
		it("get_truth_map_from_arr() should create the truth map", function() {
			assert.deepEqual(jsgui.get_truth_map_from_arr(["a", "b", "c"]), { a: true, b: true, c: true});
			assert.deepEqual(jsgui.get_truth_map_from_arr([]), {});
            assert.deepEqual(jsgui.get_truth_map_from_arr([1, 2, 3]), { "1": true, "2": true, "3": true});
		});
					
		// -----------------------------------------------------
		//	get_map_from_arr()
		// -----------------------------------------------------
			
		it("get_map_from_arr() should create the map", function() {
			assert.deepEqual(jsgui.get_map_from_arr(["a", "b", "c"]), { a: 0, b: 1, c: 2});
			assert.deepEqual(jsgui.get_map_from_arr([]), {});
            assert.deepEqual(jsgui.get_map_from_arr([1, 2, 3]), { "1": 0, "2": 1, "3": 2});
		});
					
		// -----------------------------------------------------
		//	arr_like_to_arr()
		// -----------------------------------------------------
			
		it("arr_like_to_arr() should create an array from the array-like object", function() {
			assert.deepEqual(jsgui.arr_like_to_arr(["a", "b", "c"]), ["a", "b", "c"]);
			assert.deepEqual(jsgui.arr_like_to_arr([]), []);

            (function(){    
                assert.deepEqual(jsgui.arr_like_to_arr(arguments), [1, 2, 3]);                                                            
            }(1, 2, 3));

		});
					
		// -----------------------------------------------------
		//	is_ctrl()
		// -----------------------------------------------------
			
		xit("should ....", function() {

			//assert.deepEqual(jsgui.is_ctrl(["a", "b", "c"]), ["a", "b", "c"]);
			//assert.deepEqual(jsgui.arr_like_to_arr([]), []);


		});
					
		// -----------------------------------------------------
		//	tof()
		// -----------------------------------------------------
			
		it("tof() should return the type of an object", function() {

            // number

			assert.equal(jsgui.tof(0), "number");
			assert.equal(jsgui.tof(1), "number");
			assert.equal(jsgui.tof(1.5), "number");

			assert.equal(jsgui.tof(Number.POSITIVE_INFINITY), "number");
			assert.equal(jsgui.tof(Number.NEGATIVE_INFINITY), "number");
			assert.equal(jsgui.tof(Number.MAX_VALUE), "number");
			assert.equal(jsgui.tof(Number.MIN_VALUE), "number");

			assert.equal(jsgui.tof(NaN), "number"); // ???

			assert.equal(jsgui.tof(new Number()), "object");
			assert.equal(jsgui.tof(new Number(123)), "object");

            // string

			assert.equal(jsgui.tof(""), "string");
			assert.equal(jsgui.tof("abc"), "string");

			assert.equal(jsgui.tof(new String()), "object");
			assert.equal(jsgui.tof(new String("abc")), "object");

            // function

			assert.equal(jsgui.tof(function(){}), "function");
			assert.equal(jsgui.tof(define), "function");
			assert.equal(jsgui.tof(setInterval), "function");
			assert.equal(jsgui.tof(Object), "function");

			assert.equal(jsgui.tof(new Function()), "function");  // !!!

            // boolean

			assert.equal(jsgui.tof(true), "boolean");
			assert.equal(jsgui.tof(false), "boolean");
			assert.equal(jsgui.tof(1 == 1), "boolean");
			assert.equal(jsgui.tof(1 != 2), "boolean");

            // object

			assert.equal(jsgui.tof(new Object()), "object");
			assert.equal(jsgui.tof({}), "object");

            // undefined

			assert.equal(jsgui.tof(), "undefined");
			assert.equal(jsgui.tof(undefined), "undefined");
			assert.equal(jsgui.tof("undefined"), "string");

            // null

			assert.equal(jsgui.tof(null), "null");

            // obj.__type

			assert.equal(jsgui.tof({__type: "myType"}), "myType");

            // array

			assert.equal(jsgui.tof([]), "array");
			assert.equal(jsgui.tof([1, 2, "3"]), "array");
			assert.equal(jsgui.tof(new Array()), "array");

            // control

            // TODO, moved to tof() - 2 yet

            // regex

			assert.equal(jsgui.tof(new RegExp("")), "regex");

            // buffer

			assert.equal(jsgui.tof(new Buffer("")), "buffer");

            // 
            // t1 param
            // 

			assert.equal(jsgui.tof(1, "myType"), "myType");
			assert.equal(jsgui.tof(undefined, "myType"), "myType");

			assert.equal(jsgui.tof(1, "object"), "object"); // ??
			assert.equal(jsgui.tof(null, "object"), "null");
			assert.equal(jsgui.tof([], "object"), "array");

		});
					
		// -----------------------------------------------------
		//	tof() - 2
		// -----------------------------------------------------
			
		xit("tof() should return the type of an object - TODO", function() {

            // obj.__type

            // TODO: real usage sample

            // control

            // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            // readable_stream

			assert.equal(jsgui.tof(process.stdin), "readable_stream"); // passed

            // writable_stream

            var crypto = require("crypto");
            var verify = crypto.createVerify("RSA-SHA256");
			assert.equal(jsgui.tof(verify), "writable_stream"); // passed

			assert.equal(jsgui.tof(process.stdout), "writable_stream"); // "readable_stream" actually, or "object" if the "readable_stream" is commented off in the tof() code
			assert.equal(jsgui.tof(process.stderr), "writable_stream"); // the same as above

		});
					
		// -----------------------------------------------------
		//	atof()
		// -----------------------------------------------------
			
		it("atof() should return array of types of the given array", function() {
			assert.deepEqual(jsgui.atof([]), []);
			assert.deepEqual(jsgui.atof([1]), ["number"]);
			assert.deepEqual(jsgui.atof([1, "", null]), ["number", "string", "null"]);
		});
					
		// -----------------------------------------------------
		//	is_defined()
		// -----------------------------------------------------
			
		it("is_defined() should return false if the value is undefined", function() {
			assert.equal(jsgui.is_defined(), false);
			assert.equal(jsgui.is_defined(undefined), false);

			assert.equal(jsgui.is_defined(""), true);
			assert.equal(jsgui.is_defined("undefined"), true);
			assert.equal(jsgui.is_defined(null), true);
			assert.equal(jsgui.is_defined(0), true);
			assert.equal(jsgui.is_defined(false), true);
			assert.equal(jsgui.is_defined({}), true);

			assert.equal(jsgui.is_defined(jsgui.is_defined), true);
			assert.equal(jsgui.is_defined(jsgui.not_defined_function), false);

			assert.equal(jsgui.is_defined(Math.PI), true);
			assert.equal(jsgui.is_defined(Math.PI_PI_PI), false);
		});
					
		// -----------------------------------------------------
		//	stringify()
		// -----------------------------------------------------
			
		it("stringify() should return JSON string representation of the value", function() {

			assert.equal(jsgui.stringify(11111), "11111");
			assert.equal(jsgui.stringify(), "undefined");
			assert.equal(jsgui.stringify(undefined), "undefined");
			assert.equal(jsgui.stringify(null), "null");
			assert.equal(jsgui.stringify(NaN), "NaN");
			assert.equal(jsgui.stringify(""), '""');
			assert.equal(jsgui.stringify("abc"), '"abc"');
			assert.equal(jsgui.stringify(0), "0");
			assert.equal(jsgui.stringify(false), "false");
			assert.equal(jsgui.stringify(true), "true");
			assert.equal(jsgui.stringify(1.5), "1.5");
			assert.equal(jsgui.stringify([]), "[]");
			assert.equal(jsgui.stringify({}), "{}");

			//assert.equal(jsgui.stringify(function (){}), "function (){}"); // ?
			assert.equal(jsgui.stringify(function (){}), ""); // ?
			assert.equal(jsgui.stringify(function (){}, false), ""); // ?
			assert.equal(jsgui.stringify(function (){}, true), "function (){}"); // ?

			assert.equal(jsgui.stringify([1, "a", null]), '[1, "a", null]');
			assert.equal(jsgui.stringify({p1:1, p2:"a", p3:null}), '{"p1": 1, "p2": "a", "p3": null}');


			//assert.equal(jsgui.stringify([0, function (){}]), '[0, function (){}]');
			assert.equal(jsgui.stringify([0, function (){}]), '[0, ]'); // ?
			assert.equal(jsgui.stringify({p1: 0, p2: function (){}}), '{"p1": 0}');
			assert.equal(jsgui.stringify({p1: 0, p2: function (){}}, true), '{"p1": 0, "p2": function (){}}');

			assert.equal(jsgui.stringify({p1: 1, p2: {p21: 21, p22: [{}, {p111: 111}]}}), '{"p1": 1, "p2": {"p21": 21, "p22": [{}, {"p111": 111}]}}');

            var obj = {prop1: null};
            obj.prop1 = obj;
			assert.equal(jsgui.stringify(obj), '{"prop1": (CircularRef)}'); // circular reference

			assert.equal(jsgui.stringify({p1: 1, p2: "a", p3: 3}, false, ["p3"]), '{"p1": 1, "p2": "a"}'); // excludingProps

			assert.equal(jsgui.stringify(String), "JS_String"); // ?

            var myStringifyObj = { stringify: function(){ return "custom stringify"; } };
			assert.equal(jsgui.stringify(myStringifyObj), "custom stringify");

            var myToStringObj = { toString: function(){ return "custom toString"; } };
            myToStringObj.toString.stringify = true;
			assert.equal(jsgui.stringify(myToStringObj), '"custom toString"');

		});
					
		// -----------------------------------------------------
		//	get_item_sig()
		// -----------------------------------------------------
			
		it("get_item_sig() should return type signature", function() {
			assert.equal(jsgui.get_item_sig("1"), "s");
			assert.equal(jsgui.get_item_sig(1), "n");
			assert.equal(jsgui.get_item_sig(false), "b");
			assert.equal(jsgui.get_item_sig(setInterval), "f");
			assert.equal(jsgui.get_item_sig([]), "a");
			assert.equal(jsgui.get_item_sig({}), "o");
			assert.equal(jsgui.get_item_sig(undefined), "u");
			assert.equal(jsgui.get_item_sig(null), "!");

			assert.equal(jsgui.get_item_sig(new RegExp()), "r");
			assert.equal(jsgui.get_item_sig(new Buffer(1)), "B");

			assert.deepEqual(jsgui.get_item_sig([1, "a"]), "a");
			assert.deepEqual(jsgui.get_item_sig([1, "a"], 1), "[n,s]");
			assert.deepEqual(jsgui.get_item_sig([1, "a", [null]], 1), "[n,s,a]");
			assert.deepEqual(jsgui.get_item_sig([1, "a", [null]], 2), "[n,s,[!]]");

		});
					
		// -----------------------------------------------------
		//	get_item_sig() - TODO
		// -----------------------------------------------------

		xit("get_item_sig() should return type signature - TODO", function() {

            //* - "c" (control)
            //* - "R" (readable_stream)
            //* - "W" (writable_stream)
            //* - "X" (collection_index)
            //* - "D" (data_object)
            //* - "~D" (abstract data_object)
            //* - "V" (data_value)
            //* - "~V" (abstract data_value)
            //* - "C" (collection)
            //* - "~C" (abstract collection)

		});
					
		// -----------------------------------------------------
		//	trim_sig_brackets()
		// -----------------------------------------------------
			
		it("trim_sig_brackets() should remove the square brackets", function() {
			assert.equal(jsgui.trim_sig_brackets("n"), "n");
			assert.equal(jsgui.trim_sig_brackets("[n]"), "n");
			assert.equal(jsgui.trim_sig_brackets("[]"), "");
			assert.equal(jsgui.trim_sig_brackets(""), "");
		});
					
		// -----------------------------------------------------
		//	arr_trim_undefined()
		// -----------------------------------------------------
			
		it("arr_trim_undefined() should remove the trailing <undefine> values", function() {
			assert.deepEqual(jsgui.arr_trim_undefined([]), []);
			assert.deepEqual(jsgui.arr_trim_undefined([undefined, undefined, 1, undefined]), [undefined, undefined, 1]);
			assert.deepEqual(jsgui.arr_trim_undefined([undefined, undefined, 1, undefined, undefined]), [undefined, undefined, 1]);
			assert.deepEqual(jsgui.arr_trim_undefined([undefined, undefined, undefined, undefined]), []);
			assert.deepEqual(jsgui.arr_trim_undefined([1,2,3]), [1,2,3]);
		});
					
		// -----------------------------------------------------
		//	functional_polymorphism()
		// -----------------------------------------------------
			
		it("functional_polymorphism() should prepare the function for a polymorphic use", function() {

			assert.equal(jsgui.functional_polymorphism, jsgui.fp);

            var f1 = jsgui.functional_polymorphism(function(a, sig){
                return a.l + jsgui.stringify(a) + ":" + sig;
            });

			assert.deepEqual(f1(), "0[]:[]");
			assert.deepEqual(f1(1), "1[1]:[n]");
			assert.deepEqual(f1(1,2), "2[1, 2]:[n,n]");
			assert.deepEqual(f1(1, "a", [null]), '3[1, "a", [null]]:[n,s,a]');

			//assert.deepEqual(f1(1,2,undefined), "2[1, 2]:[n,n]"); -> "3[1, 2]:[n,n]"  !!!

		});
					
		// -----------------------------------------------------
		//	arrayify()
		// -----------------------------------------------------
			
		xit("arrayify() should ...", function() {

            // sig == '[o]'

			assert.deepEqual(jsgui.arrayify({}), []);
			assert.deepEqual(jsgui.arrayify({a: 1, b: 2}), [["a", 1], ["b", 2]]);

            // sig == '[f]'

            var func1 = jsgui.arrayify(function(){
                var args = Array.prototype.slice.call(arguments);
                return jsgui.stringify(args);
                //return args.toString();
            });

			assert.equal(func1(1, 2, "a"), '[1, 2, "a"]');

			//assert.equal(func1([1, 2, "a"]), '[[1, 2, "a"]]');

		});
					
					
		// -----------------------------------------------------
		//	clone()
		// -----------------------------------------------------
			
		it("clone() should clone the object", function() {

            // simple values

			assert.equal(jsgui.clone(), undefined);
			assert.equal(jsgui.clone(undefined), undefined);
			assert.equal(jsgui.clone("abc"), "abc");

			assert.deepEqual(jsgui.clone(1), {});      // !!!
			assert.deepEqual(jsgui.clone(null), {});   // !!!
			assert.deepEqual(jsgui.clone(true), {});   // !!!

            // array

			assert.deepEqual(jsgui.clone([]), []);
			assert.deepEqual(jsgui.clone([undefined, 1, undefined, 2, undefined]), [undefined, 1, undefined, 2, undefined]);

            (function(){
                var arr = [{a: 1}, {a:2}];
                var result = jsgui.clone(arr);
                //
    			assert.notEqual(arr, result);
                arr[0].a = 100;
    			assert.equal(result[0].a, 100);
            })();


            // object

			assert.deepEqual(jsgui.clone({}), {});
			assert.deepEqual(jsgui.clone({a: 1, b:{c:2}}), {a: 1, b:{c:2}});

            (function(){
                var obj = {a: 1, b:{c:2}};
                var result = jsgui.clone(obj);
                //
    			assert.notEqual(obj, result);
                obj.a = 100;
                obj.b.c = 200;
    			assert.equal(result.a, 1);
    			assert.equal(result.b.c, 2);
            })();

            //
            // multiple clones
            //

			assert.deepEqual(jsgui.clone("abc", 3), ["abc", "abc", "abc"]);
			assert.deepEqual(jsgui.clone({a:{b:2}}, 3), [{a:{b:2}}, {a:{b:2}}, {a:{b:2}}]);

		});

					
		// -----------------------------------------------------
		//	call_multiple_callback_functions()
		// -----------------------------------------------------
			
		it("call_multiple_callback_functions() should ...", function() {
			//assert.deepEqual(jsgui.arr_trim_undefined([]), []);
		});

	});

});


