define(["./jsgui-lang-essentials", './data-object', './collection', './database'], function(jsgui, Data_Object, Collection, Database) {
	// Takes a database that is constructed using the easy syntax, and then creates the normalized database class and classes needed for it.
	
	// Not sure that it would really work in memory.
	//  May need to have some abstract function that don't do things, just say those things would need to be done.
	
	// May be able to just map the tables, then create functions a bit later?
	//  The previous database could have had some abstract functions defined.
	//  But we want the developer not to have to type things like 'get_user_id_by_username' all over the place, but have these functions made and used fairly automatically.
	
	// Also, will have to make sure the database is using ids
	//  That could be a general property in abstract databases. Could have ids as GUIDs always, or sequentially incrementing.
	
	// May have a general way / class for referring to a Database ID. ID or Id class. It will be automatically generating.
	//  could have a GUID, or a unique id within the collection.
	var stringify = jsgui.stringify;
	var each = jsgui.each;
	// I think Id should be used within the whole system (Data_Object, Collection, Database). It makes sense as a data type. When something is specified as an Id, it knows what that means.
	//  int id
	//  guid
	//  id
	//  int pk
	var Table = Database.Table;
	// will have flags for a field, saying that it is a primary key.
	// Data_Object.field_flags_map
	//  field will store that it is a primary key, will have the unique constraint too and the unique index, but the fact it is a PK won't make much difference in the JavaScript database
	//  It will matter when it gets persisted to a relational database.
	//  May want to use a function that generates the abstract database using GUID PKs if generating for Mongo.
	
	// Normalization could happen on resources...
	//  Though possibly abstract representations of databases will be better to work on.

	

	var normalize_database = function(database) {
		
		// Outputting Classes...
		//  Databases may be defined as classes - that's a convenient way of defining them in an abstract way within JavaScript.
		//  That way the constructor could be used to create an object that would store the data as required.
		//  It will be nice to have that component so that things can be mirrored / co-ordinated better.
		//   It may be expanded, especially for server-side use, so that it can interact with various databases.
		
		// Perhaps on the client it can act as an interface to remote databases, or be used in that system.
		// Resource seems the likely way that that would work though.
		
		// This takes an instance of the database though...
		//  Could create new object classes for the new database, and list / index them so they can be used easily.
		
		
		// will have options set here, but will have them in parameters.
		
		//  creation of primary keys
		//   are they incrementing integers
		
		// Data_Object will automatically generate IDs saying which Data_Object it is in an index for the front-end.
		//  Want some other kind of automatic sequential IDs for when things are within a collection.
		
		// I think auto_increment would make a nice flag.
		//  GUID would be another data type that is referenced in the type system.
		//   They can be generated by SQL Server, Mongo, a fair few DBs.
		//   PKs would work well as either an autoincrementing int, scoped within the collection, or a GUID.
		
		// The jsgui Data_Object system kind of has hidden PKs with the '__id' or is it '_id' field.
		//  Here we want something that gets explicitly set and referenced.
		
		// I think we can take a data type here as what the PK is - or the whole data type information really.
		
		
		
		
		// This should be working before too long.
		//  Then I'll take the normalized database and use it to construct an Abstract-Mongo database
		//   Perhaps that abstract mongo database will be used to generate instructions (which can be viewed / transmitted as objects)
		//   that will then be used to set up an actual instance of that mongo database.
		
		
		//console.log('');
		//console.log('normalize_database');
		
		
		
		
		//console.log('1) normalize_database database ' + stringify(database));
		//console.log('database ' + stringify(database.__data_type));
		
		var db_name = database.get('name');
		//console.log('db_name ' + db_name);
		//console.log('1.5) normalize_database database ' + stringify(database));
		//var db2 = database;
		
		var res = new Database({
			// so the constructor overwrites the tables in the old one???
			
			// perhaps they are accidently being stored in a global variable.
			//  not sure what is going on right now... need to go through the db constructor.
			//  it getting its fields from the chain being the problem?
			
			// Maybe do some tests with multiple Data_Objects.
			
			'name': db_name
		});
		//console.log('2) normalize_database db2 ' + stringify(db2));
		var db_tables = database.get('tables');
		
		//console.log('db_tables ' + stringify(db_tables));
		//console.log('database._ ' + stringify(database._));
		
		var res_tables = res.get('tables');
		//console.log('3) normalize_database database ' + stringify(database));
		//console.log('');
		
		//console.log('res_tables ' + stringify(res_tables));
		
		each(db_tables, function(i, old_table) {
			console.log('old_table ' + stringify(old_table));
			console.log('Processing table');
			
			// We could create new table classes.
			
			var old_name = old_table.get('name');
			
			// Maybe declaring new types for the new tables?
			
			
			// But thinking of making a new class...
			
			// That class could then have its fields analysed, and could possibly even be used to store data.
			//  Would need more functionality such as GUID working too.
			//  That would be an interesting one.
			//   I do want to make the client-side code though.
			//    Would be good to have the client library as a moderate amount of KB.
			// Data_Object and Collection now have quite a lot between them.
			//  That code should, however, make the HTML processing code much more concise.
			// I'm just not sure how small it would be. I may wind up doing quite a lot on build and compression once it is running.
			
			// Once it is up, and generating discussion, I could carry out some improvements, size would be one thing, but there would be other things too.
			//  Having the fairly large library and then compacting it makes sense.
			//  There would then be different builds with less in them...?
			//   The collection and the indexing system seem like they will be very useful for HTML.
			
			// I'll get Collection, it's Index_System and Data_Object all a lot smaller.
			//  Once their functionality is stable, much more can be done to get them to work on a lower level.
			//  Could have a Simple_Data_Object and Simple_Collection, which could get used in minimal builds.
			//   They would not have such flexible APIs and querying potential.
			//   They would also be used to implement Data_Object and Collection.
			//    The Collection_Index_System could maybe benefit from this... but it's quite a big refactoring.
			// Build-level refactoring, such as global renames, and having strings that refer to properties stored as local variables,
			//  quite a few things, could get the number of KB down, at the cost of maintainability.
			//   A routine for this would help.
			//
			
			// Building the classes for the new database system
			//  But not sure about this...
			
			// The old database is given as classes, could be nice to produce some new classes.
			//  Not really... it's definied as classes, then an instance is given to the normalizer.
			
			// Could make the classes, then make instances of the classes.
			//  That is how it is done in web-db.
			
			
			
			
			
			
			
			
			// Could develop a new data type?
			//  But I think just creating the relatively simple abstract database would do.
			
			// Creating the classes is something that could maybe be done as an expansion.
			//  Just getting the objects made seems like the main thing right now.
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			var new_table = new Table({
				'name': old_name
			});
			
			//new_table.add_field()
			new_table.fields({
				'id': 'guid'
			});
			
			// Get the info from the Table.
			//  Maybe it should have fields.
			console.log('old_table._data_type_constraint.data_type_constructor ' + stringify(old_table._data_type_constraint.data_type_constructor));
			// we can look at the data type here.
			//  we need to get the field information.
			
			var old_fc = Data_Object.get_chained_fields(old_table._data_type_constraint.data_type_constructor);
			console.log('old_fc ' + stringify(old_fc));
			
			/*
			each(old_fc, function(i, v) {
				console.log('old_fc i ' + i);
				console.log('old_fc v ' + stringify(v));
				
				// depending on what type of field it is, we treat it differently.
				//  the fields will get translated to a normal form involving PKs.
				
				// the fields can go in directly?
				//   needs to set the field on its data_object_constraint.
				
				
				
				new_table.set_field(i, v);
				
			});
			*/
			
			new_table.fields(old_fc);
			
			console.log('new_table.fields() ' + stringify(new_table.fields()));
			// May have a full_view function.
			//  It would be like stringify, but be sure to show more.
			//  What about showing the constructor name when stringifying things.
			
			
			
			
			
			//var old_c = old_table.constructor;
			// get the fields chain?
			// the fields don't really get set on the object.
			//var old_fc = Data_Object.get_chained_fields(old_table.constructor);
			//console.log('old_fc ' + stringify(old_fc));
			
			// it should be fields?
			
			//var old_fields = old_table.get('fields');
			
			/*
			var old_fields = old_table.fields();
			//  would be nice to get the fields easily.
			
			console.log('old_name ' + old_name);
			
			console.log('old_fields ' + stringify(old_fields));
			
			
			each(old_table.fields(), function(i, old_field) {
				console.log('old_field ' + stringify(old_field));
			});
			*/
			res_tables.push(new_table);
		});
		
		return res;
		
	};
	
	
	
	
	//   Mongo can do sequences but it is more complicated, involving a counter document.
	
	// The Abstract database may not have primary keys declared.
	//  In a document database they may be the document ID that gets automatically generated, and is automatically unique.
	
	
	
	
	// This database won't be puttin in access/crud functions anyway.
	//  That would likely be in the abstract-rdb layer.
	
	// for every table in the database...
	//  create the new table
	//   for every field
	//    create the corresponding field or table
	//    
	
	
	
	return normalize_database;
	
	
});