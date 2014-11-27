//Dalton James, Dalton_James@student.uml.edu   
//UMass Lowell Computer Science
//Student in Jesse Heines GUI Programming I
//    
//File: mult_table.js
//Created: 2014/11/20
//   
//Description: makes the dynamic multiplication table with input to the html form 
//also validates all of the inputs                


//a var that will be used to ensure the correct inputs are targeted
var strVarToTest = "";

//used to decide if the table should be generated
var bool_error = false;

//var to hold the current number of tabs
var num_tabs = 0;

//wait for html to be ready
$(document).ready(function () {

    //Jesse Heines add tab code
    $("#tabs").tabs();

    $("#m_form").submit(function() {
                             
        $("#tabs > ul").append(
            "<li><a href='#tabs-" + num_tabs + "'>#" + num_tabs + "</a><span class='ui-icon ui-icon-close'>Remove Tab</span></li>"
        );

//<span class="ui-icon ui-icon-close">Remove Tab</span>

        $("#tabs").tabs("refresh");
    
        $("#tabs").append(
            "<div id='tabs-" + num_tabs + "'>" + makeTable() + "</div>"
        );
    });


    // $("#remove_selected").click(function(){
    //     var selectedTab = $("#TabList").tabs().data("selected.tabs");
    //     $("#tabs").find( ".ui-tabs-nav li:eq(selectedTab)" ).remove();

    // });

        //(e) {
    //     e.preventDefault();
    //     var selIndex = $("#tabs").tabs("option", "selected");
    //     $("#tabs").tabs("remove", selIndex);
    // });

    // $("#remove-first").click(function(){
    //     $("#tabs").find( ".ui-tabs-nav li:eq(0)" ).remove();

    // });

    $("#remove-all").click(function(){

        $("#tabs > ul").empty();
        $("#tabs > div").empty();

    });

    $("#m_form").validate({
        rules: {
            min_h: {
                required: true,
                digits: true
            },
            max_h: {
                required: true,
                digits: true
            },
            min_v: {
                required: true,
                digits: true
            },
            max_v: {
                required: true,
                digits: true
            }
        },
        messages: {
            min_h: {
                required: function(){
                    strVarToTest = "#min_h";
                    highlightError( strVarToTest );
                    return"<br>All boxes must be filled" ;
                },

                digits: function(){
                    strVarToTest = "#min_h";
                    highlightError( strVarToTest );
                    return"<br>A number must be used for Min Horizontal Value" ;
                }
            },

            max_h: {
                required: function(){
                    strVarToTest = "#max_h";
                    highlightError( strVarToTest );
                    return"<br>All boxes must be filled" ;
                },

                digits: function(){
                    strVarToTest = "#max_h";
                    highlightError( strVarToTest );
                    return"<br>A number must be used for Max Horizontal Value" ;
                }
            },
            min_v: {
                required: function(){
                    strVarToTest = "#min_v";
                    highlightError( strVarToTest );
                    return"<br>All boxes must be filled" ;
                },

                digits: function(){
                    strVarToTest = "#min_v";
                    highlightError( strVarToTest );
                    return"<br>A number must be used for Min Vertical Value" ;
                }
            },
            max_v: {
                required: function(){
                    strVarToTest = "#max_v";
                    highlightError( strVarToTest );
                    return"<br>All boxes must be filled" ;
                },

                digits: function(){
                    strVarToTest = "#max_v";
                    highlightError( strVarToTest );
                    return"<br>A number must be used for Max Vertical Value" ;
                }
            }
        },
        errorPlacement: function (error, element) {
            $(error).appendTo($("#error_msg"));
        },
        success: function(error, element){
            unhighlightError(strVarToTest);
        }
    });
});

function makeTable(){

    //clears error message if any exist
    $("#error_msg").empty();
    
    //checks if all of the values are set
    if($("#max_v").val() === "" || $("#min_v").val() === "" || $("#max_h").val() === "" || $("#min_h").val() === ""){
        return;  
    }

    var rows = ($("#max_v").val() - $("#min_v").val()) + 2;
    var columns = ($("#max_h").val() - $("#min_h").val()) + 2;


    //error for min being greater than max rows
    if ( rows-2 < 0 ) {
        return;        
    }
    
    //error for min being greater than max columns
    if( columns-2 < 0 ) {
        return; 
    }


    //appendStr used to build the table
    var appendStr = "<table id='result'>"; 

    //2 for loops iterate and concat table rows and columns to "appendStr"
    //which is appended to the DOM when all "tr's" and "td's" are added

    //this loop runs for the number of rows needed
    for( var i = 0; i < Math.abs(rows); i++){
        appendStr = appendStr.concat("<tr>");

        //this loop runs for the number of columns needed per row
        for( var j = 0; j < Math.abs(columns); j++){
           
            //checks for the first cell of the table
            if ( i === 0 && j === 0 ) {
                appendStr = appendStr.concat("<th></th>");
            }

            //checks for the first row which will be headers
            else if ( i === 0 ) {
                appendStr = appendStr.concat("<th>");
                appendStr = appendStr.concat( (j-1 + $("#min_h").numVal()).toString() );
                appendStr = appendStr.concat("</th>");
            }

            //checks for first column which will also be headers
            else if ( j === 0 ) {
                appendStr = appendStr.concat("<th>");
                appendStr = appendStr.concat( (i-1 + $("#min_v").numVal()).toString() );
                appendStr = appendStr.concat("</th>");
            }

            //all other cells will use td tags
            else {
                appendStr = appendStr.concat("<td>");
                appendStr = appendStr.concat( ((i-1 + $("#min_v").numVal()) * (j-1 + $("#min_h").numVal())).toString() );
                appendStr = appendStr.concat("</td>");
            }

        }
        appendStr = appendStr.concat("</tr>");
    }

    appendStr = appendStr.concat("</table>");

    num_tabs++;

    //append the table fully contained in a string to the DOM 
    return appendStr; 
}



//takes a string (of a number) and returns a number
//mainly used to make code above easier to read due to line size
jQuery.fn.numVal = function() {
   return parseInt($(this).val());
};



highlightError = function( strVarToTest ) {

    bool_error = true;

    $("#error_msg").empty();

    $( strVarToTest ).css( { "border" : "2px solid red" } )  ;
    $( strVarToTest ).focus() ;
} 

unhighlightError = function( strVarToTest ) {

    bool_error = false;

    $("#error_msg").empty();

    $( strVarToTest ).css( { "border" : "" } )  ;
}
