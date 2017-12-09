const Schema = (schema) => {

	Object.prototype.map = function(call = function(){}){
		let indexes = Object.keys(this);
		Object.values(this).map((value, index) => call(indexes[index], value));
  	};
	
	const types = new Map();
	const is_valid = (i, v) => {
		if(types.has(schema[i])){
			return types.get(schema[i])(v);
		}
		return false;
	};
	const filter_mail = (v) => v.includes('@') && v.split('@').pop().split('.').length >= 2;
	const filter_number = (v) => typeof v === "number";
	const filter_string = (v) => typeof v === "string";

  	types.set('mail', filter_mail);
	types.set('int', filter_number);	
	types.set('string', filter_string);

	return function(value){
		value.map((i, v) => (!is_valid(i, v)) 
			? (() => { throw `Error in: ${i} value defined in Schema ${schema[i]}` })() 
			: true
		);
		return true;
  	};

};
