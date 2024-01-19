/*
 * Tokenize namelist and return as JavaScript object
 * tokens { pos: position in namelist string
 *              name: category of item, i.e. group, object, value
 *              value: name of item
 *              index: index for array
 *             }
 */
/**
 * @constructor
 * @dict
 * */
export class Namelist {
    constructor(data) {

        var tokens = this.parse(data), current_group = null, current_prop = null, current_value = null, i, name, value;

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
    parse(data) {
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

        // regular expression for each item	
        var re_comment = /(!.*)\n\s*/;

        var re_group = /(?:&|\$)\s*([a-zA-Z_][\w]*)\s*/;

        var re_array = /([a-zA-Z_][\w]*)\s*(\(\s*((\s*:\s*(\-|\+)?\d*){1,2}|((\-|\+)?\d+(\s*:\s*(\-|\+)?\d*){0,2}))(\s*,\s*(((\-|\+)?\d*(\s*:\s*(\-|\+)?\d*){0,2})))*\s*\)(\s*\(\s*(:\s*\d*|\d+(\s*:\s*\d*)?)\s*\))?)\s*=\s*/;

        var re_object = /([a-zA-Z_][\w]*)\s*=\s*/;

        var re_repeat = /([0-9]+)\s*\*\s*/;

        var re_complex_start = /\(\s*/;
        var re_complex_end = /\)\s*,?\s*/;

        var re_string = /('((?:[^']+|'')*)'|"((?:[^"]+|"")*)")\s*,?\s*/;

        var re_nondelimited_c = /([^'"\*\s,\/!&\$(=%\.][^\*\s,\/!&\$(=%\.]*)\s*,?\s*/;
        var re_nondelimited_d = /(\d+[^\*\s\d,\/!&\$\(=%\.][^\s,\/!&\$\(=%\.]*)\s*,?\s*/;

        var re_real = /(((\-|\+)?\d*\.\d*([eEdDqQ](\-|\+)?\d+)?)|((\-|\+)?\d+[eEdDqQ](\-|\+)?\d+))\s*,?\s*/;

        var re_integer = /((\-|\+)?\d+)\b\s*,?\s*/;

        var re_logical_c = /([tT][rR][uU][eE]|[tT]|[fF][aA][lL][sS][eE]|[fF])\s*,?\s*/;
        var re_logical_p = /(\.(([tT][rR][uU][eE]|[[fF][aA][lL][sS][eE])\.?|[tTfF]\w*))\s*,?\s*/;

        var re_null = /\s*\b|\s*,\s*/;

        var re_orphan = /[^&]*/;

        while (i < data.length) {
            cur = data[i];
            curstr = data.substr(i);
            // [1] EXCLAMATION MARK
            // (1-1) a comment
            if (cur.match(/!/)) {
                // COMMENT
                str = re_comment.exec(curstr);
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
                str = re_string.exec(curstr);
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
                str = re_group.exec(curstr);
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
                str = re_logical_p.exec(curstr);
                if (str && (str.index == 0)) {
                    //console.log("found logical: " + str[1]);
                    addElement(i, "logical", str[1]);
                    i += str[0].length;
                    prev = "logical";
                }
                else {
                    // REAL			
                    str = re_real.exec(curstr);
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
                    str = re_orphan.exec(curstr);
                    if (str && (str.index == 0)) {
                        //console.log("found orphan: " + str[0]);
                        addElement(i, "orphan", str[0]);
                        i += str[0].length;
                        prev = "orphan";
                    }
                }
                else {
                    // OBJECT
                    str = re_object.exec(curstr);
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
                        str = re_array.exec(curstr);
                        if (str && (str.index == 0)) {
                            //console.log("found array: " + str[1] + " index: " + str[2]);
                            addElement(i, "array", str[1], str[2]);
                            i += str[0].length;
                            prev = "array";
                        }
                        else {
                            // LOGICAL CONSTANT
                            str = re_logical_c.exec(curstr);
                            if (str && (str.index == 0)) {
                                //console.log("found logical: " + str[1]);
                                addElement(i, "logical", str[1]);
                                i += str[0].length;
                                prev = "logical";
                            }
                            else {
                                // NONDELIMITED CHARACTER CONSTANT
                                str = re_nondelimited_c.exec(curstr);
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
                str = re_complex_start.exec(curstr);
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
                str = re_complex_end.exec(curstr);
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
                str = re_real.exec(curstr);
                if (str && (str.index == 0)) {
                    // REAL
                    //console.log("found real: " + str[1]);
                    addElement(i, "real", parseFloat(str[1]));
                    i += str[0].length;
                    prev = "real";
                }
                else {
                    str = re_integer.exec(curstr);
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
                str = re_repeat.exec(curstr);
                if (str && (str.index == 0)) {
                    // REPEAT
                    //console.log("found repeat: " + str[1]);
                    addElement(i, "repeat", str[1]);
                    i += str[0].length;
                    prev = "repeat";
                }
                else {
                    str = re_real.exec(curstr);
                    if (str && (str.index == 0)) {
                        // REAL
                        //console.log("found real: " + str[1]);
                        addElement(i, "real", parseFloat(str[1]));
                        i += str[0].length;
                        prev = "real";
                    }
                    else {
                        str = re_integer.exec(curstr);
                        if (str && (str.index == 0)) {
                            // INTEGER
                            //console.log("found integer: " + str[1]);
                            addElement(i, "integer", parseInt(str[1], 10));
                            i += str[0].length;
                            prev = "integer";
                        }
                        else {
                            str = re_nondelimited_d.exec(curstr);
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
                str = re_null.exec(curstr);
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
}