var fs = require('fs');
var DEFAULT_INDENT = 2;


// Read data from the source md file
var data = fs.readFileSync('./SUMMARY.md');
// Get available data entry in raw data
var data_array = data.toString().replace(/\\/g, '').split('\n').filter(item =>{
    return /^(\s*)\*\s\[(.+)\]\((.+)\)/.test(item);
});

var global_array = [];  // Define the final array used in manifest.json
var first_class_json = {};  // First class of the final array
var index = 0;

// Parse on line md to a json object, end when the next line class is not bigger than the present line class
parseOneLine = oneline_array => {
    let str_class = getStrClass(oneline_array[1]);
    let cname = oneline_array[2];
    let path = oneline_array[3];
    let name = oneline_array[3].replace(/\//g,'-').replace(/\.md$/, '');
    let children = [];
    
    while(true){
        let new_array = /^(\s*)\*\s\[(.+)\]\((.+)\)/g.exec(data_array[index]);
        if(new_array){
            if(getStrClass(new_array[1]) <= str_class){
                break;
            } else if(getStrClass(new_array[1]) - 1 === str_class){
                index++;
                children.push(parseOneLine(new_array));
            } else {
                // index++;
            }
        }
        if(index >= data_array.length){
            break;
        }
    }
    let json_temp = {name: name, path: path, cname: cname};
    if(children.length > 0){
        json_temp.children = children;
    }
    return json_temp;
}

// Get the indent class of a string (default two space is a class)
getStrClass = str => {
    if(str === undefined){
        return 0;
    }
    else{
        return str.length / DEFAULT_INDENT;
    }
}

while(index < data_array.length){
    if(JSON.stringify(first_class_json) !== JSON.stringify({})){
        global_array.push(first_class_json);
        first_class_json = {};
    }
    let oneline_array = /^(\s*)\*\s\[(.+)\]\((.+)\)/g.exec(data_array[index++]);
    if(oneline_array){
        global_array.push(parseOneLine(oneline_array));
    }
};
fs.writeFileSync('./manifest.json', JSON.stringify(global_array));
