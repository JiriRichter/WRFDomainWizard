/*
 * Tokenize namelist and return as JavaScript object
 * tokens { pos: position in namelist string
 *              name: category of item, i.e. group, object, value
 *              value: name of item
 *              index: index for array
 *             }
 */
export class Namelist {

    // regular expression for each item	
    static _re_comment = /(!.*)\n\s*/;

    static _re_group = /(?:&|\$)\s*([a-zA-Z_][\w]*)\s*/;

    static _re_array = /([a-zA-Z_][\w]*)\s*(\(\s*((\s*:\s*(\-|\+)?\d*){1,2}|((\-|\+)?\d+(\s*:\s*(\-|\+)?\d*){0,2}))(\s*,\s*(((\-|\+)?\d*(\s*:\s*(\-|\+)?\d*){0,2})))*\s*\)(\s*\(\s*(:\s*\d*|\d+(\s*:\s*\d*)?)\s*\))?)\s*=\s*/;

    static _re_object = /([a-zA-Z_][\w]*)\s*=\s*/;

    static _re_repeat = /([0-9]+)\s*\*\s*/;

    static _re_complex_start = /\(\s*/;
    static _re_complex_end = /\)\s*,?\s*/;

    static _re_string = /('((?:[^']+|'')*)'|"((?:[^"]+|"")*)")\s*,?\s*/;

    static _re_nondelimited_c = /([^'"\*\s,\/!&\$(=%\.][^\*\s,\/!&\$(=%\.]*)\s*,?\s*/;
    static _re_nondelimited_d = /(\d+[^\*\s\d,\/!&\$\(=%\.][^\s,\/!&\$\(=%\.]*)\s*,?\s*/;

    static _re_real = /(((\-|\+)?\d*\.\d*([eEdDqQ](\-|\+)?\d+)?)|((\-|\+)?\d+[eEdDqQ](\-|\+)?\d+))\s*,?\s*/;

    static _re_integer = /((\-|\+)?\d+)\b\s*,?\s*/;

    static _re_logical_c = /([tT][rR][uU][eE]|[tT]|[fF][aA][lL][sS][eE]|[fF])\s*,?\s*/;
    static _re_logical_p = /(\.(([tT][rR][uU][eE]|[[fF][aA][lL][sS][eE])\.?|[tTfF]\w*))\s*,?\s*/;

    static _re_null = /\s*\b|\s*,\s*/;

    static _re_orphan = /[^&]*/;

    constructor(data) {

        if (!data) {
            throw new Error("Invalid data");
        }

        var tokens = Namelist._tokenize(data), 
            current_group = null,
            current_prop = null,
            i,
            name,
            value;

        for (i = 0; i < tokens.length; i++) {
            name = tokens[i].name;
            value = tokens[i].value;

            if (name == "group") {
                if (!value.match(/^end$/i)) {
                    current_group = this[value] = {};
                }
                else {
                    current_group = null;
                }
            }
            else if (name == "object") {
                current_prop = value.toLowerCase();
            }
            else if ((name == "character") || (name == "integer") || (name == "real") || (name == "logical")) {

                // check property is inside a group
                if (current_group === null) {
                    throw new NamelistError(`Namelist variable '${current_prop}' is not inside a group section. All properties are expected to be inside a group section starting with '&[GROUPNAME]' and ending with '/'.`);
                }

                if (current_group[current_prop] == null) {
                    current_group[current_prop] = value;
                }
                else {
                    if (!Array.isArray(current_group[current_prop])) {
                        current_group[current_prop] = [current_group[current_prop]];
                    }
                    current_group[current_prop].push(value);
                }
            }
        }
    }

    // parse namelist data to tokens
    static _tokenize(data) {
        var tokens = [];

        function addElement(pos, name, value, index = null) {
            tokens.push({
                pos: pos,
                name: name,
                value: value,
                index: index
            });
        }

        var cur;
        var curstr;
        var prev = "initial";
        var str;
        var subst;
        var i = 0;

        while (i < data.length) {
            cur = data[i];
            curstr = data.substr(i);
            // [1] EXCLAMATION MARK
            // (1-1) a comment
            if (cur.match(/!/)) {
                // COMMENT
                str = Namelist._re_comment.exec(curstr);
                if (str && (str.index == 0)) {
                    //console.log("found comment: " + str);
                    //addElement(i, "comment", str);
                    //console.log("found comment: " + str[1]);
                    addElement(i, "comment", str[1]);

                    i += str[0].length;
                    prev = "comment";
                }
                else {
                    //console.log("error at exclamation");
                    break;
                }
            }

            // [2] SINGLE OR DOUBLE QUOTATION MARK
            // (2-1) a character constant
            else if (cur.match(/['"]/)) {
                // CHARACTER CONSTANT
                str = Namelist._re_string.exec(curstr);
                if (str && (str.index == 0)) {
                    //console.log("found character: " + str[1]);
                    addElement(i, "character", str[2]);
                    i += str[0].length;
                    prev = "character";
                }
                else {
                    //console.log("error at quotation");
                    break;
                }
            }

            // [3] SLASH
            // (3-1) the end of a group
            else if (cur.match(/\//)) {
                // GROUP END
                if (prev == "object") {
                    //console.log("found null #1");
                    addElement(i - 1, "null", "");
                }
                addElement(i, "group", "end");
                //console.log("found group: end");
                i++;
                prev = "group_end";
            }

            // [4] DOLLAR MARK OR AMPERSAND
            // (4-1) the start or the end of a group
            else if (cur.match(/[$&]/)) {
                // GROUP
                str = Namelist._re_group.exec(curstr);
                if (str && (str.index == 0)) {
                    if (str[1].match(/^end$/i)) {
                        if (prev == "object") {
                            //console.log("found null #2");
                            addElement(i - 1, "null", "");
                        }
                        prev = "group_end";
                    }
                    else {
                        prev = "group_start";
                    }
                    //console.log("found group: " + str[1]);
                    addElement(i, "group", str[1]);
                    i += str[0].length;
                }
                else {
                    //console.log("error at ampersand");
                    break;
                }
            }

            // [5] PERIOD
            // (5-1) a logical constant
            // (5-2) a real constant
            else if (cur.match(/\./)) {
                // LOGICAL CONSTANT
                str = Namelist._re_logical_p.exec(curstr);
                if (str && (str.index == 0)) {
                    //console.log("found logical: " + str[1]);
                    addElement(i, "logical", str[1]);
                    i += str[0].length;
                    prev = "logical";
                }
                else {
                    // REAL			
                    str = Namelist._re_real.exec(curstr);
                    if (str && (str.index == 0)) {
                        //console.log("found real: " + str[1]);
                        addElement(i, "real", parseFloat(str[1]));
                        i += str[0].length;
                        prev = "real";
                    }
                    else {
                        //console.log("error at period");
                        break;
                    }
                }
            }

            // [6] ALPHABET OR UNDERSCORE
            // (6-1) an object
            // (6-2) an array
            // (6-3) a logical constant
            // (6-4) a nondelimited character constant
            else if (cur.match(/[[a-zA-Z_]/)) {
                if (prev == "group_end" || prev == "initial") {
                    str = Namelist._re_orphan.exec(curstr);
                    if (str && (str.index == 0)) {
                        //console.log("found orphan: " + str[0]);
                        addElement(i, "orphan", str[0]);
                        i += str[0].length;
                        prev = "orphan";
                    }
                }
                else {
                    // OBJECT
                    str = Namelist._re_object.exec(curstr);
                    if (str && (str.index == 0)) {
                        if (prev == "object") {
                            addElement(i - 1, "null", "");
                            //console.log("found null #3");
                        }
                        //console.log("found object: " + str[1]);
                        addElement(i, "object", str[1]);
                        i += str[0].length;
                        prev = "object";
                    }
                    else {
                        // ARRAY
                        str = Namelist._re_array.exec(curstr);
                        if (str && (str.index == 0)) {
                            //console.log("found array: " + str[1] + " index: " + str[2]);
                            addElement(i, "array", str[1], str[2]);
                            i += str[0].length;
                            prev = "array";
                        }
                        else {
                            // LOGICAL CONSTANT
                            str = Namelist._re_logical_c.exec(curstr);
                            if (str && (str.index == 0)) {
                                //console.log("found logical: " + str[1]);
                                addElement(i, "logical", str[1]);
                                i += str[0].length;
                                prev = "logical";
                            }
                            else {
                                // NONDELIMITED CHARACTER CONSTANT
                                str = Namelist._re_nondelimited_c.exec(curstr);
                                if (str && (str.index == 0)) {
                                    //console.log("found nondelimited: " + str[1]);
                                    addElement(i, "nondelimited", str[1]);
                                    i += str[0].length;
                                    prev = "nondelimited";
                                }
                                else {
                                    //console.log("found unknown");
                                    addElement(i, "unknown", null);
                                    i++;
                                }
                            }
                        }
                    }
                }
            }

            // [7] LEFT PARENTHESIS
            // (7-1) the start of a complex number
            else if (cur.match(/\(/)) {
                str = Namelist._re_complex_start.exec(curstr);
                if (str && (str.index == 0)) {
                    // COMPLEX START
                    //console.log("found complex start");
                    addElement(i, "complex", "start");
                    i += str[0].length;
                    prev = "complex_start";
                }
                else {
                    //console.log("error at complex start");
                    break;
                }
            }

            // [8] RIGHT PARENTHESIS
            // (8-1) the end of a complex number
            else if (cur.match(/\)/)) {
                str = Namelist._re_complex_end.exec(curstr);
                if (str && (str.index == 0)) {
                    // COMPLEX END
                    //console.log("found complex end");
                    addElement(i, "complex", "end");
                    i += str[0].length;
                    prev = "complex_end";
                }
                else {
                    //console.log("error at complex end");
                    break;
                }
            }

            // [9] PLUS OR MINUS SIGN
            // (9-1) a real constant
            // (9-2) an integer constant
            else if (cur.match(/[\+\-]/)) {
                str = Namelist._re_real.exec(curstr);
                if (str && (str.index == 0)) {
                    // REAL
                    //console.log("found real: " + str[1]);
                    addElement(i, "real", parseFloat(str[1]));
                    i += str[0].length;
                    prev = "real";
                }
                else {
                    str = Namelist._re_integer.exec(curstr);
                    if (str && (str.index == 0)) {
                        // INTEGER
                        //console.log("found integer: " + str[1]);
                        addElement(i, "integer", parseInt(str[1], 10));
                        i += str[0].length;
                        prev = "integer";
                    }
                    else {
                        //console.log("error at +-.");
                        break;
                    }
                }
            }

            // [10] DECIMAL
            // (10-1) a nondelimited character constant
            // (10-2) a repetition
            // (10-3) a real constant
            // (10-4) an integer constant
            else if (cur.match(/[\d]/)) {
                str = Namelist._re_repeat.exec(curstr);
                if (str && (str.index == 0)) {
                    // REPEAT
                    //console.log("found repeat: " + str[1]);
                    addElement(i, "repeat", str[1]);
                    i += str[0].length;
                    prev = "repeat";
                }
                else {
                    str = Namelist._re_real.exec(curstr);
                    if (str && (str.index == 0)) {
                        // REAL
                        //console.log("found real: " + str[1]);
                        addElement(i, "real", parseFloat(str[1]));
                        i += str[0].length;
                        prev = "real";
                    }
                    else {
                        str = Namelist._re_integer.exec(curstr);
                        if (str && (str.index == 0)) {
                            // INTEGER
                            //console.log("found integer: " + str[1]);
                            addElement(i, "integer", parseInt(str[1], 10));
                            i += str[0].length;
                            prev = "integer";
                        }
                        else {
                            str = Namelist._re_nondelimited_d.exec(curstr);
                            if (str && (str.index == 0)) {
                                // NONDELIMITED CHARACTER CONSTANT
                                //console.log("found nondelimited: " + str[1]);
                                addElement(i, "nondelimited", str[1]);
                                i += str[0].length;
                                prev = "nondelimited";
                            }
                            else {
                                //console.log("error at digit");
                                break;
                            }
                        }
                    }
                }
            }

            // [11] BLANK OR CONSECUTIVE COMMAS
            // (11-1) null
            else {
                // NULL
                str = Namelist._re_null.exec(curstr);
                if (str && (str.index == 0)) {
                    //console.log("found null #4");
                    addElement(i, "null", "");
                    i += str[0].length;
                    prev = "null";
                }
                else {
                    i++;
                }
            }
        }
        return tokens;
    }

    static isReal(str) {
        const match = Namelist._re_real.exec(str);
        return match !== null && (match.index == 0);
    }

    static isInteger(str) {
        const match = Namelist._re_integer.exec(str);
        return match !== null && (match.index == 0);
    }

    static isLogical(str) {
        const match = Namelist._re_logical_p.exec(str);
        return match !== null && (match.index == 0);
    }

    static parseLogicalValue(str) {
        return str.toLowerCase() === '.true.';
    }

    static parseValue(str) {
        if (Namelist.isLogical(str)) {
            return Namelist.parseLogicalValue(str);
        }
        else if (Namelist.isReal(str)) {
            return parseFloat(str);
        }
        else if (Namelist.isInteger(str)) {
            return parseInt(str);
        }
        else {
            return str;
        }
    }  

    static _formatValue(val) {
        if (val == undefined) {
            throw new Error('Undefined value');
        }
        else if (Array.isArray(val)) {
            var strVal = Namelist._formatValue(val[0]);
            for (var i = 1; i < val.length; i++) {
                strVal += ', ' + Namelist._formatValue(val[i]);
            }
            return strVal;
        }
        else if (typeof val == "string") {
            return "'" + val + "'";
        }
        else if (typeof val == "boolean") {
            return (val) ? '.true.' : '.false.';
        }
        else if (!Namelist._isInteger(val)) {
            return val.toFixed(3);
        }
        return val.toString();
    }  

    static _isInteger(val) {
        return typeof val === "number" 
            && isFinite(val) 
            && val > -9007199254740992 
            && val < 9007199254740992 
            && Math.floor(val) === val;
    }

    static formatSection(section, properties, values) {
        var content = '&' + section + '\n';
        console.debug(`format namelist section ${section}`);

        for (var i = 0; i < properties.length; i++) {

            console.debug(`   ${properties[i]}: ${values[i]}`);

            if (values[i] === null) {
                // property not set - continue
                continue;                
            }
            else if (values[i] === undefined) {
                throw new Error(`Property ${properties[i]} is not defined`);
            }
            else {
                content += ' ' + properties[i].padEnd(20) + ' = ' + Namelist._formatValue(values[i]) + '\n';
            }
        }

        return content + '/\n\n';
    };   

    static convertToArray(section, paramName) {
        if (section[paramName] != undefined && !Array.isArray(section[paramName])) {
            section[paramName] = [].concat(section[paramName]);
        }
    }
}

export class NamelistError extends Error {
    constructor(message = "", ...args) {
        super(message, ...args);
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, NamelistError);
    }
  
    this.name = "NamelistError";
  }
}