var container = {
	board: null
};
function create_board(){

	var board = element('div').background('rgb(240, 240, 240)').size(1200, 800);
	
	var canvas,	context, 

	/* 
	 * Array with selected item.
	 * 
	 * @array[] = x: {number}, y: {number}, X: {number}, Y:{number}}
	 */
	E = [],

	/* 
	 * Array with a group of elements
	 * 
	 * @array[] = x: {number}, y: {number}, X: {number}, Y:{number}}
	 */
	G = [],

	/* 
	 * Related points.
	 * 
	 * @array[] = x: {number}, y: {number}, X: {number}, Y:{number}}
	 */
	B = [],

	/* 
	 * array with coordinates of lines in the selected object.
	 * 
	 * @array = X: {number}, Y:{number}}
	 */
	BF = [],
	/* 
	 * cross points.
	 * 
	 * @array = {n: {number}, i: {number}, kind: {string}}.
	 */
	CROSS = [],

	// mouse coordinates
	over =  {},
	// coordinates when creating an object
	real = {},
	// fixing points
	fixed = {},
	// click coordinates
	clicked = {},
	O = {X: 0, Y: 0, x:0, y:0},
	CR = {X: 0, Y: 0},
	//coordinates of cross points
	INTERSECT = [],

	scale = 1,

	fixpos = [],
	button = [],

	edit_mode = 'Select',
	edit_type = 'Resize', 
	edit_step = 0,

	selected_groups = [],
	same_clicked,

	circle_selected = [],
	line_selected = [],
	spline_selected = [],

	mesBox, hintBox, cornerBox, lineBox, transform_panel;


			//*************************************
			// iten in menu.
			var MMB = [], 
			// item in left menu.
			MAB = [], 
			// item in up menu.
			MUAB = [],
			//selected item menu
			current_MMB;

			var infoline = element('div', board).background('rgb(240, 240, 240)').size(1200, 25).fontStyle(11, "Ubuntu", "#222", "left")
				infoline.material = element('div', infoline).background('rgba(255, 255, 255, 0)').border('0px solid #aaa').size(200, 23).position(1000, 0);
			
			var popup3DView = new DraggablePopup().setSize(800,600).setPosition(200,100).moveToCenter().setTitle("3D view").hide();
			var view3D = new View3D({width:800, height:600});
			popup3DView.addContent(view3D.getContent());

			//*****************************************************************************************************************
			//<editor-fold defaultstate="collapsed" desc="create menu">
			var stateStyle = [
                {isActive: function (item) { return true;},
                    style: {
                        'display':'flex',
                        'justify-content': 'center',
                        'align-content': 'center',
                        'line-height': '30px',
                        'position': 'unset',
                        'margin-right':'5px',
						'fontFamily':'Ubuntu',
						'color':'#808080'
                    }
                },{isActive: function (item) { return item.isFocuse;},
					style: {
                        'border-top':'#ff6633 solid 3px',
						// 'background-color': '#f00',
						'font-size': '1.2em',
						'height':'25px',
                        'color':'#fff'
					}
            	},{isActive: function (item) { return !item.isFocuse;},
					style: {
            			'border-top':'none',
						// 'background-color': '#ffffff00',
                        'font-size': '1em',
                        'height':'28px',
                        'color':'#808080'
					}
            	},{isActive: function (item) { return !item.isEnable;},
                    style: {
                        'font-style': 'italic',
                        'font-size': '1em',
                        'cursor': 'no-drop',
                        'color':'#ababab'
                    }
                },{isActive: function (item) { return item.isEnable;},
                    style: {
                        'font-style': 'inherit',
                    }
                }
            ];

			var itemSize = {width:170, height:25}
			var itemStyle = [
                {isActive: function (item) { return true;}, //The standart stule
                    style: {
                        'background-color': '#fff',
                        'color': '#333',
                        'line-height': '25px',
						'font-family': 'Helvetica'
                    }
                },{isActive: function (item) { return item.isFocuse;}, //The hover
                    style: {
                        'background-color': '#656565',
                        'color': '#fff',
                    }
                },{isActive: function (item) { return item.isFocuse && item.isEnable;},
                    style: {
                        'border-left':'#ff6633 solid 3px',
                        'border-radius':'0px 4px 4px 0px',
                        'width':(itemSize.width-3)+'px'
                    }
                },{isActive: function (item) { return !item.isFocuse;},
                    style: {
                        'background-color': '#fff',
                        'border-left':'none',
                        'border-radius':'0px',
                        'width':itemSize.width+'px'
                    }
                },{isActive: function (item) { return item.isEnable;},
                    style: {
                        'font-style': 'inherit',
						'cursor': 'pointer',
                    }
                }
                ,{isActive: function (item) { return !item.isEnable;},
                    style: {
                        'font-style': 'italic',
                        'background-color': '#ccc',
                        'cursor': 'no-drop',
                        'color':'gray'
                    }
                }
			];

			var menu = new MenuBar()
                // .addMenu(new Menu("File")
				// 	.addMenuItem(new MenuItem("New"))
				// 	.addMenuItem(new MenuItem("Open"))
				// 	.addMenuItem(new MenuItem("Reopen"))
				// 	.addMenuItem(new MenuItem("Save"))
				// 	.addMenuItem(new MenuItem("Save As"))
				// 	.addMenuItem(new MenuItem("Print"))
				// 	.addMenuItem(new MenuItem("Import"))
				// 	.addMenuItem(new MenuItem("Export"))
				// 	.addMenuItem(new MenuItem("Exit"))
                //     .setItemSize(itemSize.width,itemSize.height)
                //     .setItemStyle(itemStyle))
				// .addMenu(new Menu("Edit")
                //     .addMenuItem(new MenuItem("Undo"))
                //     .addMenuItem(new MenuItem("Redo"))
                //     .addMenuItem(new MenuItem("Cut"))
                //     .addMenuItem(new MenuItem("Copy"))
                //     .addMenuItem(new MenuItem("Paste"))
                //     .addMenuItem(new MenuItem("Delete"))
                //     .addMenuItem(new MenuItem("Select All"))
                //     // .addMenuItem(new MenuItem("Find"))
                //     // .addMenuItem(new MenuItem("Replace"))
                //     .addMenuItem(new MenuItem("Preferences"))
                //     .setItemSize(itemSize.width,itemSize.height)
                //     .setItemStyle(itemStyle))
				// .addMenu(new Menu("View")
                 //    .addMenuItem(new Menu("Zoom")
                 //        .addMenuItem(new MenuItem("To Fit Screen").setExecutor(zoomToFitScreen))
                 //        .addMenuItem(new MenuItem("Actual Size").setExecutor(zoomToActualSize))
                 //        .addMenuItem(new MenuItem("To Selection"))
                 //        .addMenuItem(new MenuItem("To Region"))
                 //        .addMenuItem(new MenuItem("Out"))
                 //        .addMenuItem(new MenuItem("In"))
                 //        .setItemSize(itemSize.width,itemSize.height)
                 //        .setItemStyle(itemStyle))
                 //    .addMenuItem(new MenuItem("3D"))
                 //    .addMenuItem(new MenuItem("Top"))
                 //    .addMenuItem(new MenuItem("Bottom"))
                 //    .addMenuItem(new MenuItem("Front"))
                 //    .addMenuItem(new MenuItem("Back"))
                 //    .addMenuItem(new MenuItem("Left"))
                 //    .addMenuItem(new MenuItem("Right"))
                 //    .setItemSize(itemSize.width,itemSize.height)
                 //    .setItemStyle(itemStyle))
				// .addMenu(new Menu("Line")
                //     .addMenuItem(new MenuItem("Group").setExecutor(groupSelected))
                //     .addMenuItem(new MenuItem("Ungroup").setExecutor(ungroupSelected))
                //     .addMenuItem(new MenuItem("Intersect").setExecutor(intersectSelected))
                //     .addMenuItem(new MenuItem("Divide"))
                //     .addMenuItem(new MenuItem("Corner").setExecutor(showCornerBox))
                //     .addMenuItem(new MenuItem("Tangents").setExecutor(function(){ //todo: need separate function
				// 		if (circle_selected.length >= 2)
				// 			tangentsTwoCircles(circle_selected[0].CP[0], circle_selected[0].R, circle_selected[1].CP[0], circle_selected[1].R);
				// 	}))
                    // .addMenuItem(new MenuItem("Contour"))
                    // .addMenuItem(new MenuItem("Repeat"))
                    // .addMenuItem(new MenuItem("Scale"))
                    // .addMenuItem(new MenuItem("Rotate"))
                    // .addMenuItem(new Menu("Mirror")
                    //     .addMenuItem(new MenuItem("Horizontally").setExecutor(function(){mirrorSelected(true, false)}))
                    //     .addMenuItem(new MenuItem("Vertically").setExecutor(function(){mirrorSelected(false, true)}))
                    //     .setItemSize(itemSize.width,itemSize.height)
                    //     .setItemStyle(itemStyle))
					// // .addMenuItem(new MenuItem("Simplify"))
					// .addMenuItem(new Menu("Nudge")
					// 	.addMenuItem(new MenuItem("Up").setExecutor(function(){moveSelected(0, parseFloat(input_Length.value))}))
                    //     .addMenuItem(new MenuItem("Down").setExecutor(function(){moveSelected(0, -parseFloat(input_Length.value))}))
                    //     .addMenuItem(new MenuItem("Left").setExecutor(function(){moveSelected(-parseFloat(input_Length.value), 0)}))
                    //     .addMenuItem(new MenuItem("Right").setExecutor(function(){moveSelected(parseFloat(input_Length.value), 0)}))
                    //     .setItemSize(itemSize.width,itemSize.height)
                    //     .setItemStyle(itemStyle))
                    // .addMenuItem(new MenuItem("Convert spline to arc"))
                    // .addMenuItem(new MenuItem("Machine..."))
                    // .addMenuItem(new MenuItem("Properties...").setExecutor(function(){
						// console.log("Properties...");
						// showMessage("Properties...")
                    // }))
                    // .addMenuItem(new MenuItem("Color fill"))
                    // .addMenuItem(new MenuItem("Layer"))
                    // .addMenuItem(new MenuItem("Prior"))
                    // .addMenuItem(new MenuItem("Next"))
                    // .addMenuItem(new MenuItem("Select connected"))
                //     .setItemSize(itemSize.width,itemSize.height)
                //     .setItemStyle(itemStyle)
				// 	// .disable()  //todo: uncomented when will be do disabled menu item
				// )
				// .addMenu(new Menu("Tools")
				// 	.addMenuItem(new MenuItem("Statistics"))
				// 	.addMenuItem(new MenuItem("Compute"))
				// 	.addMenuItem(new MenuItem("Convert"))
				// 	.addMenuItem(new MenuItem("Shape library"))
				// 	.addMenuItem(new MenuItem("Fix all"))
				// 	.addMenuItem(new MenuItem("Confirm changes"))
				// 	.addMenuItem(new MenuItem("Show comments to Self"))
				// 	.setItemSize(itemSize.width,itemSize.height)
				// 	.setItemStyle(itemStyle))
			
				// Job commented Oleg
// 				.addMenu(new Menu("Job")
// 					.addMenuItem(new MenuItem("Material"))
// 					.addMenuItem(new MenuItem("Settings"))
// 					.addMenuItem(new MenuItem("Finishing"))
// 					// .addMenuItem(new MenuItem("Model bends"))
// 					.addMenuItem(new MenuItem("Price/Analyze"))
// 					.addMenuItem(new MenuItem("Checklist"))
// 					.addMenuItem(new MenuItem("Review & place order... "))
// 					.setItemSize(itemSize.width,itemSize.height)
// 					.setItemStyle(itemStyle))
// // ------------------------------------------------------
				// .addMenu(new Menu("Order")
				// 	.addMenuItem(new MenuItem("Review & place order... "))
				// 	.addMenuItem(new MenuItem("Request order status"))
				// 	.setItemSize(itemSize.width,itemSize.height)
				// 	.setItemStyle(itemStyle))
				
				// ---Help comment----
				// .addMenu(new Menu("Help")
				// 	.addMenuItem(new MenuItem("Drawing Tutorials"))
				// 	.addMenuItem(new MenuItem("Quick start"))
				// 	.addMenuItem(new MenuItem("Contents..."))
				// 	// .addMenuItem(new MenuItem("Forum"))
				// 	.addMenuItem(new MenuItem("Video Tutorials"))
				// 	.addMenuItem(new MenuItem("Tech Support"))
				// 	.addMenuItem(new MenuItem("Suggestion"))
				// 	// .addMenuItem(new MenuItem("Check for Updates"))
				// 	.addMenuItem(new MenuItem("About..."))
				// .setItemSize(itemSize.width,itemSize.height)
					// .setItemStyle(itemStyle))
				// ----------/Help com----m----ent -

                .setItemSize(80,28)
				.setPosition(0,0)
				.setSize(innerWidth,30)
                .show()
				.setItemStyle(stateStyle)
				.setListStyle({
                    'display':'flex',
					'background-color':'#ccc',
					'padding-left':'10px'
				});
			board.appendChild(menu.getHtml());
		//</editor-fold>

			// var

			// var MAB_A = [	{name: "Select", pic: "images/Select.png", hint: "Select<br>Chooses a line to which you want to issue a command or make a change. Click on the line.<br>To select multiple lines hold the SHIFT key.<br>To select connected lines hold down CTRL.<br>To select only one line hold down ALT."},
			// 				{name: "Line", pic: "images/Line.png", hint: "Line<br>Draws a straight line. Click again at end point. Hold the CTRL key while drawing<br>for a precise 0, 15, 30 or 45 deg angle. Press spacebar to restart line mode."},
			// 				{name: "Spline", pic: "images/Spline.png", hint: "Spline<br>Draws a special style of curve. In workarea? click to specify start point of the curve.<br>Click again at end poin. Drag the control points to define the desired curve."},
			// 				{name: "Rectangle", pic: "images/Rectangle.png", hint: "Rectangle<br>Draws a rectangle. In workarea, click to specify first corner of the rectangle.<br>Click again at opposite corner."},
			// 				{name: "Circle", pic: "images/Circle.png", hint: "Circle.<br>Draws a circle. In workarea, click to specify center of the circle.<br>Click again to specify circle."},
			// 				{name: "Freehand", pic: "images/Freehand.png", hint: "Freehand.<br>Draws a freehand sketch. To draw click and hold mouse button while moving the mouse.<br>Use the Node edit mode to modify."},
			// 				{name: "Erase", pic: "images/Eraser.png", hint: "Eraser.<br>You nttd this essential tool to create most shapes. First draw overlapping circles,<br>rectangles and straight lines; then click this Eraser tool and click on the appropriate line<br>segments to erase up to where it crosses another line.<br>For example, try creating a «D» shape by drawing a vertical line through a circle<br>and then erasing the appropriate line segments.<br>Or try drawing a thick «+» shape by first drawing overlapping vertical and horisontal<br>rectangles and then erasing the internal segments."},
			// 				{name: "Corner", pic: "images/Corner.png", hint: "Corner<br>Rounds or chamfers sharp 2D corners when two or more lines are selected.<br>To create arcs separately? enable the arc button in preferences or intercect a circle."},
			// 				{name: "Text", pic: "images/Text.png", hint: "Text<br>Adds text to design for making comments or machining letters.<br>In workarea, click to specify starting point. Type the text and press Enter.<br>To machine the text choose Line | Machine | Auto and set Z value on the numeric bar."},
			// 				{name: "Line Edit", pic: "images/LineEdit.png", hint: "Line Edit<br>Allows to move line endpoints or full line segments while staying attached.<br>In workarea click on the line. Drag the line or its endpoint to the desired location."},
			// 				{name: "Ruler", pic: "images/Ruler.png", hint: "Ruler<br>Measures a distance in the workspace. Left-click on the start and end points to be measured."},
			// 				{name: "Snap to Lines", pic: "images/SnapToLines.png", hint: "Snap to lines<br>Places new or moved lines to meet key points on existing lines.<br>It is generally recommended to keep this pushed in."},
			// 				{name: "Help", pic: "images/Help.png", hint: "Mechanical drawing is easy if you know a few key methods<br>Click this button for help on these techniques. For example, it is essential to know how<br>to enter dimensions numerically, apply the intersect command, use the snap feature,<br>nudge lines a specified distance, and combine commands to draw needed shapes."}
			// ];

			// var MUAB_A = [	{name: "Group", pic: "images/Group.png", pic_active: "images/Group_active.png", hint: "Group (Ctrl + G)<br>Combine selected lines into one group to allow selection in one click.<br>Hold the SHIFT key whilw selecting multiple lines, then click this button.<br>To select a series of connected lines in one step - hold CTRL while clicking on one of the lines."},
			// 				{name: "Ungroup", pic: "images/Ungroup.png", pic_active: "images/Ungroup_active.png", hint: "Ungroup (Ctrl + U)<br>Separates a group into its component lines."},
			// 				{name: "Zoom to fit screen", pic: "images/ZoomToFitScreen.png", hint: "Zoom to fit screen (=)<br>Set magnification to show the full design."},
			// 				{name: "Zoom to actual size", pic: "images/ZoomToActualSize.png", hint: "Zoom actual size (1)<br>Show design approximately in real-life size."},
			// 				{name: "Zoom", pic: "images/Zoom.png", hint: "Zoom<br>To magnify a specific area, in workspace drag a rectangle around the area.<br>To set center of magnification and increase magnification, click at desired new center of drawing.<br>To set center of magnification and decrease magnification, right click at desired new center of drawing."},
			// 				{name: "Delete", pic: "images/Delete.png", hint: "Delete (Del)<br>Removes part of your drawing. Click the Selection (arrow) button,<br>then click the line to remove, then click this button."},
			// 				{name: "Preferences", pic: "images/Preferences.png", hint: "Preferences (F2)<br>Set preference options."},
			// 				{name: "Toggle inch", pic: "images/ToggleInch.png", hint: "Toggle inch / metric mode<br>Show all dimensions in inches or in millimeters."},
			// 				{name: "Line type", pic: "images/LinyType.png", hint: "Line type (F5)<br>Specifies whether the selected line represents a shape, bend, thread, comment,<br>dimension, tolerance, etc. Select «Auto» in most cases when creating the part shape."},
			// 				{name: "Intersect", pic: "images/Intersect.png", hint: "Intersect (Ctrl + I)<br>Split lines where they cross."},
			// 				{name: "3D preview", pic: "images/3DPreview.png", hint: "3D Preview (Ctrl + R)<br>Show 3D view of the current design.<br>Use frequently during creation of your drawing."},
			// 				{name: "Price/Analize", pic: "images/check2.png", hint: "Price/Analyze (f9)<br>Check design validity and compute cost.<br>You can also use this button to guide you through the steps.<br>For example, if you click this button with a blanl screen you will be advised to draw a line."}
			// ];


			//***************************************************************************
			board.setPosition = function(left, top){
				board.style.position = 'absolute';
				board.style.left = left + 'px';
				board.style.top = top + 'px';
				return board;
			}


			//***************************************************************************
			board.setSize = function(width, height){
				board.size(width, height);
				menu.setSize(width-10);
				
					canvas.style.position = 'absolute';
					canvas.width = width - 60;
					canvas.height = height - 105 - infoline.height;
					canvas.style.left = 50 + 'px';
					canvas.style.top = 100 + 'px';
					
						infoline.size(width).position(0, height - infoline.height -5);
						infoline.material.position(width - infoline.material.width - 12, 0);
						
						line1.size(width - 25);
						line2.size(width - 25);
					
					O = {x: 20 , y: canvas.height-20 , X:0, Y: canvas.height};
					// setBound();
					// refresh_All();
					// redraw();
				container.board.setSize(width, height);
				return board;
			}


		//########################################### menu ###############################################################################################################
			//************************************ Left menu ****************************	
			// for (var n = 0; n < MAB_A.length; n++){
			// 		MAB[n] = element('div', board).size(33, 33).position(10, 104 + n * 39).cursor('pointer').background("rgba(0, 0, 0, 0.0)").border("1px solid rgba(0, 0, 0, 0)");
			// 			if (MAB_A[n].pic){
			// 				MAB[n].pic = element('img', MAB[n]).size(27, 27).position(3, 3);
			// 				MAB[n].pic.src = MAB_A[n].pic;
			// 			}
			// 		// MAB[0].id = MAB_A[0].id;

			// 		MAB[n].name = MAB_A[n].name;
			// 		MAB[n].hint = MAB_A[n].hint;
					
			// 		MAB[n].onmouseover = function(){
			// 			this.background("rgba(255, 255, 255, 0.75)");
			// 			showHint(this.hint);
			// 		}

			// 		MAB[n].onmouseleave = function(){
			// 			this.background("rgba(0, 0, 0, 0.0)");
			// 			showHint();
			// 		}

			// 		MAB[n].onmousedown = function(){
			// 			canvas.style.cursor = "default";
			// 			for (var i = 0; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
			// 			this.background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");
			// 			edit_mode = this.name;
			// 			edit_step = 0;
			// 			edit_type == "Resize";
			// 			same_clicked = false;
			// 			if (edit_mode == "Line" || edit_mode == "Rectangle" || edit_mode == "Circle" || edit_mode == "Spline") skipSelected();
			// 			container.board.setTool(edit_mode);
						
			// 			if (this.name == "Corner"){
			// 				cornerSelected();
			// 				showCornerBox();
			// 				this.background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
			// 				MAB[0].background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");
			// 				edit_mode = "Select";
			// 			}
						
			// 			setBound();
			// 			redraw();
			// 		}
			// }


			//************************************ Up menu ******************************
			// for (var n = 0; n < MUAB_A.length; n++){
			// 		// MUAB[n] = element('div', board).size(27, 27).position(10 + n * 35, 35).cursor('pointer').background("rgba(0, 0, 0, 0.0)").border("1px solid rgba(0, 0, 0, 0)");
			// 		MUAB[n] = element('div', board).size(27, 27).position(10 + n * 35, 35).cursor('pointer').background("rgba(0, 0, 0, 0.0)").border("1px solid rgba(0, 0, 0, 0)");
			// 		// console.log(MUAB[n])
					
			// 			if (MUAB_A[n].pic) MUAB[n].pic = element('img', MUAB[n]).size(23, 23).position(2, 2);
			// 				MUAB[n].pic.src = MUAB_A[n].pic;

			// 		MUAB[n].name = MUAB_A[n].name;
			// 		MUAB[n].hint = MUAB_A[n].hint;
					
			// 		MUAB[n].onmouseover = function(){
			// 			this.background("rgba(255, 255, 255, 0.75)");
			// 			showHint(this.hint);
			// 		}

			// 		MUAB[n].onmouseleave = function(){
			// 			this.background("rgba(0, 0, 0, 0.0)");
			// 			showHint();
			// 		}

			// 		MUAB[n].onmousedown = function(){
						

			// 			//****************** Intersect *************************
			// 			if (this.name == "Intersect") intersectSelected();


			// 			//******************* Group ************************
			// 			if (this.name == "Group") groupSelected();


			// 			//******************** Ungroup ************************
			// 			if (this.name == "Ungroup")	ungroupSelected()

			// 			//******************** Zoom to fit screen ************************
			// 			if (this.name == "Zoom to fit screen"){
			// 				zoomToFitScreen();
			// 			}

			// 			//******************** Zoom to actual size ************************
			// 			if (this.name == "Zoom to actual size"){
			// 				zoomToActualSize();
			// 			}

			// 			//******************** Delete ************************
			// 			if (this.name == "Delete"){
			// 					for (var n = 0; n < E.length; n++) if (E[n].selected) E[n].enable = false;
			// 					setBound();
			// 					redraw();
			// 			}

			// 			//******************** Zoom ************************
			// 			if (this.name == "Zoom"){
			// 				edit_mode = "Zoom";
			// 				canvas.style.cursor = "zoom-in";
			// 				for (var i = 0; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
			// 			}
			// 			//******************** Ungroup ************************
			// 			if (this.name == "3D preview"){
			// 				try {
			// 					view3D.setGeometry(E, G);
			// 					popup3DView.show();
			// 				}catch (e){
			// 					if(e instanceof Exception) {
			// 						console.log(e.message);
			// 						new MessagePopup(null, e.message).setTitle('Error').moveToCenter().show();
			// 					}else{
			// 						throw e;
			// 					}
			// 				}
			// 			}
						
						
			// 		}
			// }


		//todo: the code must execute in some event handler of drawing board for example "selectElement"
		//todo: menu and drawing board must be independent
			//********************************************* refreshMenuButtons **************************************************
			function refreshMenuButtons(){

				// setBound();
                //
				// var total_selected = circle_selected.length + line_selected.length + spline_selected.length;
                //
				// for (var n = 0; n < MMB[3].panel.item.length; n++) MMB[3].panel.item[n].opacity(0.35);
                //
				// if (total_selected > 1) MMB[3].panel.item[0].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
				// if (selected_groups.length > 0) if (circle_selected.length + line_selected.length + spline_selected.length > 1) MMB[3].panel.item[1].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
                //
				// if (total_selected > 1) MMB[3].panel.item[2].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
                //
				// if (line_selected.length + spline_selected.length > 0) MMB[3].panel.item[4].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
				// if (circle_selected.length > 1) MMB[3].panel.item[5].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
                //
				// if (total_selected > 0) {
				// 	MMB[3].panel.item[3].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
				// 	MMB[3].panel.item[6].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
				// 	MMB[3].panel.item[7].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
				// 	MMB[3].panel.item[8].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
				// 	MMB[3].panel.item[9].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
				// 	MMB[3].panel.item[10].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
				// 	MMB[3].panel.item[12].opacity(1).fontStyle(12, "Ubuntu", "#333", "left");
				// }

				//todo with the new menu the code will be like this
				// menu.getItem("Line").disable();
				// menu.getItem("Line").disableAllItem();
                //
				// if (total_selected > 1) {
				// 	menu.getItem('Group').enable(); //0
				// 	menu.getItem('Divide').enable(); //2
				// }
				// if (selected_groups.length > 0) if (circle_selected.length + line_selected.length + spline_selected.length > 1)
				// 	menu.getItem('Ungroup').enable(); //1
                //
				// if (line_selected.length + spline_selected.length > 0)
				// 	menu.getItem('Corner').enable(); //4
				// if (circle_selected.length > 1)
				// 	menu.getItem('Intersect').enable(); //5
                //
				// if (total_selected > 0) {
				// 	menu.getItem('Intersect').enable();
				// 	menu.getItem('Contour').enable();
				// 	menu.getItem('Repeat').enable();
				// 	menu.getItem('Scale').enable();
				// 	menu.getItem('Rotate').enable();
				// 	menu.getItem('Mirror').enable();
				// 	menu.getItem('Nudge').enable();
				// }
					

				//console.log("L: " + line_selected.length, "C: " + circle_selected.length, "S: " + spline_selected.length, "G: " + selected_groups.length,);
			}


							var line1 = element('div', board).size(board.width - 20 , 1).position(10, 65).background("rgba(0, 0, 0, 0.25)");
							var line2 = element('div', board).size(board.width - 20 , 1).position(10, 93).background("rgba(0, 0, 0, 0.25)");

							
							//********************************************* transform_panel ********************************************************
							transform_panel = element('div').size(board.width - 20, 27).position(10, 66).background("rgb(240, 240, 240)").hide();

							element('div', board).size(1 , 23).position(77, 40).background("rgba(0, 0, 0, 0.25)");
							element('div', board).size(1 , 23).position(182, 40).background("rgba(0, 0, 0, 0.25)");
							element('div', board).size(1 , 23).position(426, 40).background("rgba(0, 0, 0, 0.25)");
							
							
						var machineBut = element("img", transform_panel).size(20, 20).position(35, 3).pic("images/LinyType.png").cursor("pointer");
							machineBut.onmouseover = function(){this.background("#fff")}
							machineBut.onmouseleave = function(){this.background("")}
							machineBut.onmousedown = function(){showLineBox()}


						var select_LineType = select(null, transform_panel).position(60, 3);
							select_LineType.add_option(['Auto', 'Bend', 'Tap']);
							select_LineType.onchange = function(){
								//showMessage(select_LineType.value);
								for (var n = 1; n < E.length; n++) if (E[n].selected){
									if (select_LineType.value == "Auto") E[n].lineType = "auto";
									if (select_LineType.value == "Bend") 
										if (E[n].type == "line" && E[n].CP.length < 4) {E[n].lineType = "bend"} else {showMessage("There must be a straight line"); select_LineType.value = "Auto"}
								}
							}


						var input_Width = input("images/Width.png", transform_panel).position(220, 3);
							input_Width.onkeyup = function(e){

									input_Width.changed = true;

								if (e.keyCode != 13) return

									//if (input_Width.value.indexOf(".") > 0) return
									var value = Math.abs(parseFloat(input_Width.value));
									input_Width.value = value + " \'\'";

									resizeSelected(value, 0);

									setBound();
									refresh_All();
									redraw();
							}


						var input_Height = input("images/Height.png", transform_panel).position(390, 3);
							input_Height.onkeyup = function(e){

									input_Height.changed = true;

								if (e.keyCode != 13) return

									//if (input_Width.value.indexOf(".") > 0) return
									var value = Math.abs(parseFloat(input_Height.value));
									input_Height.value = value + " \'\'";

									resizeSelected(0, value);

									setBound();
									refresh_All();
									redraw();
							}


						var select_Z = select("images/Z.png", transform_panel).position(560, 3);
							select_Z.add_option(["Air inside",  "0.051 \'\'", "0.76 \'\'", "0.127 \'\'", "0.254 \'\'", "0.508 \'\'"," 0.794 \'\'"
								, "1.143 \'\'", "1.588 \'\'", "2.362 \'\'", "3.175 \'\'", "4.750 \'\'", "6.350 \'\'", "9.525 \'\'", "12.700 \'\'", "19.050 \'\'", "25.400 \'\'", "31.750 \'\'", "38.100 \'\'", "50.800 \'\'", "63.500 \'\'", "76.200 \'\'", "Other"]);
							select_Z.onclick = function(){
								input_Z.value = select_Z.value;
								var Z = input_Z.value;
								if(Z=="Air inside"){
									Z=-1E8;
								}
								for (var n = 1; n < E.length; n++) if (E[n].enable) if (E[n].selected) E[n].Z = parseFloat(Z);
							}


						var input_Z = input(null, transform_panel).position(562, 3).setsize(95, 15); //.background("#ffa");
							input_Z.onkeyup = function(){
								for (var n = 1; n < E.length; n++) if (E[n].enable) if (E[n].selected) E[n].Z = parseFloat(input_Z.value);
							}


						var button_Repeat = element('img', transform_panel).position(705, 3).size(22, 21).imagename("images/Copy.png").cursor("pointer");
							button_Repeat.onmousedown = function(){
								if (!button_Repeat.active) {button_Repeat.active = true} else {button_Repeat.active = false};
								button_Repeat.imagename("images/Copy.png");
								if (button_Repeat.active) button_Repeat.imagename("images/Copy_active.png");
							}


						var button_Up = element('img', transform_panel).position(740, 3).size(22, 22).imagename("images/Up.png").cursor("pointer");
							button_Up.onmousedown = function(){
								moveSelected(0, parseFloat(input_Length.value));
							}


						var button_Down = element('img', transform_panel).position(775, 3).size(22, 22).imagename("images/Down.png").cursor("pointer");
							button_Down.onmousedown = function(){
								moveSelected(0, -parseFloat(input_Length.value));
							}


						var button_Left = element('img', transform_panel).position(810, 3).size(22, 22).imagename("images/Left.png").cursor("pointer");
							button_Left.onmousedown = function(){
								moveSelected(-parseFloat(input_Length.value), 0);
							}


						var button_Right = element('img', transform_panel).position(845, 3).size(22, 22); button_Right.imagename("images/Right.png").cursor("pointer");
							button_Right.onmousedown = function(){
								moveSelected(parseFloat(input_Length.value), 0);
							}


						var input_Length = input(null, transform_panel).position(880, 3).setsize(80, 15);
							input_Length.onkeyup = function(){
								if (input_Length.value.indexOf(".") == input_Length.value.length-1) return
								input_Length.value = Math.abs(parseFloat(input_Length.value));
							}
							input_Length.value = "10 \'\'";


						var button_UnClock = element('img', transform_panel).position(990, 3).size(22, 22).imagename("images/Unclock.png").cursor("pointer");
							button_UnClock.onmousedown = function(){
								rotateSelected(parseFloat(parseFloat(input_Angle.value) * Math.PI / 180), 0);
							}


						var button_Clock = element('img', transform_panel).position(1025, 3).size(22, 22).imagename("images/Clock.png").cursor("pointer");
							button_Clock.onmousedown = function(){
								rotateSelected(parseFloat(-parseFloat(input_Angle.value) * Math.PI / 180), 0);
							}


						var input_Angle = input(null, transform_panel).position(1060, 3).setsize(80, 15);
							input_Angle.value = "15 deg";



			//***************************************** showMessage ***************************************************
			function showMessage(showtext){
				if (!mesBox){
					mesBox = element('div').size(300, 100).background("rgba(100, 100, 100, 0.85)").fontStyle(16, "Ubuntu", "#fff", "center").hide();
				}
				
					mesBox.text(showtext, "center", true).position((innerWidth - mesBox.width) / 2, (innerHeight- mesBox.height) / 2).show();
					setTimeout(function(){mesBox.hide()}, 2000);
			}


			//***************************************** showHint ******************************************************
			function showHint(showtext){
				if (!hintBox){
					hintBox = element('div').background("rgba(100, 100, 100, 0.85)").fontStyle(12, "Ubuntu", "#fff", "center").lineHeight(16).padding(8);
				}

					var pos = mouseXY();
					hintBox.text(showtext, "left").position(pos.x + 30, pos.y + 30).show();
					if (!showtext) hintBox.hide();
			}
	

			//***************************************** showCornerBox *************************************************
			function showCornerBox(){
				if (!cornerBox){

					cornerBox = element('div').size(210, 410).background("linear-gradient(0deg, rgb(235, 235, 235) 0px, rgb(255, 255, 255) 225px)").shadow("2px 2px 18px rgba(0, 0, 0, 0.5)");

					var catchPan = element('div', cornerBox).size(211, 36).position(0, 0).background("rgba(35, 35, 35, 0.75)").text("Corner", "center", true).fontStyle(14, "Ubuntu", "#fff", "center").cursor("pointer");
						catchPan.onmousedown = function(){

						}

					var closeBut = element('div', cornerBox).size(20, 20).position(178, 0).background("rgba(35, 35, 35, 0.0)").fontStyle(18, "Ubuntu", "#fff", "center").text("x", "center", true).cursor("pointer");
						closeBut.style.lineHeight = "32px";
						closeBut.onmousedown = function(){
							cornerBox.hide();
						}

									var kind;
								//***********************************************************
								function set(element, _kind){
									round_But.background("rgba(35, 35, 35, 0.0)").fontStyle(14, "Ubuntu", "#333", "center").border("1px solid #555");
									mate_But.background("rgba(35, 35, 35, 0.0)").fontStyle(14, "Ubuntu", "#333", "center").border("1px solid #555");
									chamfer_But.background("rgba(35, 35, 35, 0.0)").fontStyle(14, "Ubuntu", "#333", "center").border("1px solid #555");
									
									if (element) element.background("rgba(35, 35, 35, 0.7)").fontStyle(14, "Ubuntu", "#fff", "center").border("1px solid #555");
									kind = _kind;
									
									if (kind == "round")   picture.src = "images/Round.png";
									if (kind == "mate")    picture.src = "images/Mate.png";
									if (kind == "chamfer") picture.src = "images/Chamfer.png";
								}


					//**************************************************************************
					var round_But = element('div', cornerBox).size(120, 25).position(45, 60).fontStyle(14, "Ubuntu", "#fff", "center").text("Round", "center", true).cursor("pointer").transition(0.3);
						round_But.onmousedown = function(){
							set(this, 'round');
						}

					//**************************************************************************
					var mate_But = element('div', cornerBox).size(120, 25).position(45, 95).fontStyle(14, "Ubuntu", "#fff", "center").text("Mate", "center", true).cursor("pointer").transition(0.3);
						mate_But.onmousedown = function(){
							set(this, 'mate');
						}

					//**************************************************************************
					var chamfer_But = element('div', cornerBox).size(120, 25).position(45, 130).fontStyle(14, "Ubuntu", "#fff", "center").text("Chamfer", "center", true).cursor("pointer").transition(0.3);
						chamfer_But.onmousedown = function(){
							set(this, 'chamfer');
						}

					//**************************************************************************
						//element('div', cornerBox).size(120, 18).position(65, 267).text("Distance").fontStyle(14, "Ubuntu", "#333", "center");
						
					var picture = element('img', cornerBox).size(110, 110).position(50, 170);
						picture.src = "images/Round.png";
						
					var inputSize = input(null, cornerBox).setsize(112, 18).position(45, 290).border("1px solid #555");
						inputSize.value = "10.000 \'\'";

					var applyBut = element('div', cornerBox).size(120, 35).position(45, 330).background("rgba(35, 35, 35, 0.75)").fontStyle(16, "Ubuntu", "#fff", "center").text("Apply", "center", true).cursor("pointer").transition(0.4);
						applyBut.onmousedown = function(){
							applyBut.background("rgba(35, 35, 35, 0.0)");
							cornerSelected(parseFloat(inputSize.value), kind);
							setTimeout(function(){applyBut.background("rgba(35, 35, 35, 0.75)")}, 150);
						}

					set(round_But, 'round');

				}

					cornerBox.position(innerWidth - 255, 140).show();
			}


			
			
			//***************************************** showLineBox ***************************************************
			function showLineBox(){
				if (!lineBox){

					lineBox = element('div').size(620, 650).background("linear-gradient(0deg, rgb(235, 235, 235) 0px, rgb(255, 255, 255) 225px)").shadow("2px 2px 18px rgba(0, 0, 0, 0.5)");
					
					var catchPan = element('div', lineBox).size(621, 36).position(0, 0).background("rgba(35, 35, 35, 0.75)").text("Machine", "center", true).fontStyle(14, "Ubuntu", "#fff", "center").cursor("pointer");
						catchPan.onmousedown = function(){

						}

					var closeBut = element('div', lineBox).size(20, 20).position(588, 0).background("rgba(35, 35, 35, 0.0)").fontStyle(18, "Ubuntu", "#fff", "center").text("x", "center", true).cursor("pointer");
						closeBut.style.lineHeight = "32px";
						closeBut.onmousedown = function(){
							lineBox.hide();
						}
						
						element('div', lineBox).size(611, 20).position(20, 45).text("Use the selections below to assign the purpose to each line in your drawing.", "left", true).fontStyle(12, "Ubuntu", "#555");
						
						element('div', lineBox).size(611, 20).position(20, 75).text("Relevant items", "left", true).fontStyle(12, "Ubuntu", "#555");
					

									var kind;
								//***********************************************************
								function set(element, _kind){
									auto_But.background("rgba(35, 35, 35, 0.0)").fontStyle(14, "Ubuntu", "#333", "center").border("1px solid #555");
									bend_But.background("rgba(35, 35, 35, 0.0)").fontStyle(14, "Ubuntu", "#333", "center").border("1px solid #555");
									tap_But.background("rgba(35, 35, 35, 0.0)").fontStyle(14, "Ubuntu", "#333", "center").border("1px solid #555");
									
									if (element) element.background("rgba(35, 35, 35, 0.7)").fontStyle(14, "Ubuntu", "#fff", "center").border("1px solid #555");
									kind = _kind;
									
									auto_Pan.hide();
									auto_Pan.hide();
									auto_Pan.hide();
									
									if (kind == "auto")   auto_Pan.show(); //picture.src = "images/Round.png";
									//if (kind == "bend")   auto_Pan.show(); //picture.src = "images/Mate.png";
									//if (kind == "tap")    auto_Pan.show(); //picture.src = "images/Chamfer.png";
								}


					//**************************************************************************
					var auto_But = element('div', lineBox).size(120, 25).position(20, 100).fontStyle(14, "Ubuntu", "#fff", "center").text("Auto", "center", true).cursor("pointer").transition(0.3);
						auto_But.onmousedown = function(){
							set(this, 'auto');
						}

					//**************************************************************************
					var bend_But = element('div', lineBox).size(120, 25).position(20, 135).fontStyle(14, "Ubuntu", "#fff", "center").text("Bend", "center", true).cursor("pointer").transition(0.3);
						bend_But.onmousedown = function(){
							set(this, 'bend');
						}

					//**************************************************************************
					var tap_But = element('div', lineBox).size(120, 25).position(20, 170).fontStyle(14, "Ubuntu", "#fff", "center").text("Tap", "center", true).cursor("pointer").transition(0.3);
						tap_But.onmousedown = function(){
							set(this, 'tap');
						}

														//#########################################################################################################################
														var auto_Pan = element('div', lineBox).size(435, 550).position(163, 80).transition(0.3).border("1px solid #aaa").hide();
														
															element('div', auto_Pan).size(300, 20).position(20, 10).text("Use this selection to design the shape of your part.", "left", true).fontStyle(12, "Ubuntu", "#555");
															
															
																	//**********************************************************************************************
																	element('div', auto_Pan).size(200, 20).position(20, 45).text("Near edge", "left", true).fontStyle(12, "Ubuntu", "#555");
																	element('div', auto_Pan).size(325, 1).position(85, 55).background("#aaa");
																	
																	var straight_But = element('div', auto_Pan).size(90, 21).position(20, 77).fontStyle(10, "Ubuntu", "#fff", "center").text("Straight", "center", true).cursor("pointer").transition(0.3);
																		straight_But.onmousedown = function(){
																			set_edge(this, 'straight');
																		}
																		
																	var chamfer_But = element('div', auto_Pan).size(90, 21).position(20, 110).fontStyle(10, "Ubuntu", "#fff", "center").text("Chamfer", "center", true).cursor("pointer").transition(0.3);
																		chamfer_But.onmousedown = function(){
																			set_edge(this, 'chamfer');
																		}
																		
																	var round_But = element('div', auto_Pan).size(90, 21).position(20, 143).fontStyle(10, "Ubuntu", "#fff", "center").text("Round", "center", true).cursor("pointer").transition(0.3);
																		round_But.onmousedown = function(){
																			set_edge(this, 'round');
																		}
															
																	
																						var edge;
																					//***********************************************************
																					function set_edge(element, _edge){
																						straight_But.background("rgba(35, 35, 35, 0.0)").fontStyle(12, "Ubuntu", "#333", "center").border("1px solid #555");
																						chamfer_But.background("rgba(35, 35, 35, 0.0)").fontStyle(12, "Ubuntu", "#333", "center").border("1px solid #555");
																						round_But.background("rgba(35, 35, 35, 0.0)").fontStyle(12, "Ubuntu", "#333", "center").border("1px solid #555");
																						
																						if (element) element.background("rgba(35, 35, 35, 0.7)").fontStyle(12, "Ubuntu", "#fff", "center").border("1px solid #555");
																						edge = _edge;
																						
																							inputSize.hide();
																							inputAngle.hide();
																							inputRadius.hide();
																						
																						if (edge == "straight"){
																							edge_pic.src = "images/StraightLine.png";
																						}
																						if (edge == "chamfer"){
																							edge_pic.src = "images/ChumferLine.png";
																							inputSize.show();
																							inputAngle.show();
																						}
																						if (edge == "round"){
																							edge_pic.src = "images/RoundLine.png";
																							inputRadius.show();
																						}
																					}


																					var edge_pic = element('img', auto_Pan).size(155).position(135, 65);
																						//edge_pic.src = "images/StraightLine.png";

																					var inputSize = input(null, auto_Pan).setsize(100, 18).position(300, 75).border("1px solid #555");
																						inputSize.value = "10.000 \'\'";

																					var inputAngle = input(null, auto_Pan).setsize(100, 18).position(300, 109).border("1px solid #555");
																						inputAngle.value = "10.000 deg";

																					var inputRadius = input(null, auto_Pan).setsize(100, 18).position(300, 75).border("1px solid #555");
																						inputRadius.value = "10.000 \'\'";



																	//**********************************************************************************************
																	element('div', auto_Pan).size(200, 20).position(20, 185).text("Stock material wall", "left", true).fontStyle(12, "Ubuntu", "#555");
																	element('div', auto_Pan).size(280, 1).position(130, 195).background("#aaa");

																	element('div', auto_Pan).size(320, 20).position(110, 210).text("Use to specify raw material shape of tube, beam, etc.<br>-specify vendor and part number in comments.", "left", true).fontStyle(12, "Ubuntu", "#555").lineHeight(15);

																	var stock_But = element('div', auto_Pan).size(21, 21).position(20, 215).fontStyle(10, "Ubuntu", "#fff", "center").text("+", "center", true).cursor("pointer").background("#555").transition(0.3);
																		stock_But.onmousedown = function(){
																			//set_edge(this, 'straight');
																		}


																	//**********************************************************************************************
																	element('div', auto_Pan).size(411, 20).position(20, 250).text("Side wall", "left", true).fontStyle(12, "Ubuntu", "#555");
																	element('div', auto_Pan).size(330, 1).position(75, 260).background("#aaa");

																	element('div', auto_Pan).size(411, 20).position(20, 340).text("The highlighted angle will offset the position of the far edge.<br>The near edge, treated as if the round was removed will match<br>the line position in the drawing.", "left", true).fontStyle(12, "Ubuntu", "#555").lineHeight(15);;

																					var inputSideAngle = input(null, auto_Pan).setsize(100, 18).position(300, 282).border("1px solid #555");
																						inputSideAngle.value = "45 deg";
																	
																					var side_wall_pic = element('img', auto_Pan).size(155).position(135, 250);
																						side_wall_pic.src = "images/SideWall_1.png";

																	//**********************************************************************************************
																	element('div', auto_Pan).size(385, 1).position(20, 400).background("#aaa");

																	var grooves_But = element('div', auto_Pan).size(21, 21).position(20, 432).fontStyle(10, "Ubuntu", "#fff", "center").text("+", "center", true).cursor("pointer").background("#555").transition(0.3);
																		grooves_But.onmousedown = function(){
																			
																		}

																		element('div', auto_Pan).size(411, 20).position(55, 435).text("Grooves", "left", true).fontStyle(12, "Ubuntu", "#555").lineHeight(15);;


																					var grooves_pic = element('img', auto_Pan).size(155).position(135, 390);
																						grooves_pic.src = "images/Grooves.png";


														//#########################################################################################################################								



					set(auto_But, 'auto');
					set_edge(straight_But, 'straight');

				}

					lineBox.position(innerWidth - 665, 140).show();
			}

					//showLineBox();


			//*************************************************************************************************************************************************************************
			board.addEventListener('mouseup', function(e){
				
				if (current_MMB) for (var i = 0; i < MMB.length; i++) {MMB[i].background("linear-gradient(0deg, rgb(100, 100, 100) 0px, rgb(140, 140, 140) 35px)"); MMB[i].panel.hide()}
				current_MMB = null;
				
			});



			//######################################### canvas field ###################################################
			canvas = document.createElement('canvas');
			canvas.style.background = '#fff';
			board.appendChild(canvas);
			container.board  = new Board2(canvas);
			context = canvas.getContext('2d');
			
			//**************************************************************************
			canvas.oncontextmenu = function(){
				return false
			}



			add_Element('line', []);




													//********************************* set shadow *****************************************
													setShadow = function(){
														context.shadowOffsetX = 0;
														context.shadowOffsetY = 0;
														context.shadowBlur = 4;
														context.shadowColor = "rgba(0, 0, 0, 0.3)";
													}


													//****************************** draw line ********************************************
													setStyle = function(fillStyle, strokeStyle, lineWidth, LineDash){
														if (fillStyle) context.fillStyle = fillStyle;
														if (strokeStyle) context.strokeStyle = strokeStyle;
														if (lineWidth) context.lineWidth = lineWidth;
														if (LineDash) context.setLineDash(LineDash);
													}


													//****************************** draw arc ********************************************
													arc = function(CX, CY, R, fillStyle, strokeStyle, lineWidth, LineDash, angleStart, angleEnd){
														
														if (fillStyle) context.fillStyle = fillStyle;
														if (strokeStyle) context.strokeStyle = strokeStyle;
														if (lineWidth) context.lineWidth = lineWidth;
														if (LineDash) context.setLineDash(LineDash);
														if (!angleStart) angleStart = 0;
														if (!angleEnd) angleEnd = 2 * Math.PI;
															
														context.beginPath();
															context.arc(CX, CY, R, angleStart, angleEnd);
														if (fillStyle)   context.fill();
														if (strokeStyle) context.stroke();
													}


													//****************************** draw line ********************************************
													drawLine = function(P1, P2, strokeStyle, lineWidth, LineDash){
														
														if (strokeStyle) context.strokeStyle = strokeStyle;
														if (lineWidth) context.lineWidth = lineWidth;
														if (LineDash) context.setLineDash(LineDash);
															
														context.beginPath();
															context.moveTo(P1.x, P1.y);
															context.lineTo(P2.x, P2.y);
														context.stroke();
													}
													
													
													//****************************** draw polyline ********************************************
													drawPolyLine = function(PARR, strokeStyle, lineWidth, LineDash){
														
														if (strokeStyle) context.strokeStyle = strokeStyle;
														if (lineWidth) context.lineWidth = lineWidth;
														if (LineDash) context.setLineDash(LineDash);
															
														try{	
														context.beginPath();
															context.moveTo(PARR[0].x, PARR[0].y);
															for (var n = 1; n < PARR.length; n++) context.lineTo(PARR[n].x, PARR[n].y);
														context.stroke();
														} catch(e) {}
													}	






							//############################################## Mouse move ################################################
							// canvas.addEventListener('mousemove', function(e){
                            //
								// 	over = getOverMouse(e);
							// 		infoline.material.text('x: ' + Math.round(over.X * 1000) / 1000 + ' \'\',      y: ' + Math.round(over.Y * 1000) / 1000 + ' \'\'');
                            //
                            //
							// 					//******************************* moving scene ********************************
							// 					if (button[1])
							// 					if (edit_mode == 'move_scene'){
							// 						O.x = fixed.Ox + over.dx;
							// 						O.y = fixed.Oy + over.dy;
                            //
							// 						O.X = O.x / scale;
							// 						O.Y = O.y / scale;
                            //
							// 							setBound();	
							// 							refresh_All();
							// 							redraw();
							// 							return
							// 					}
                            //
                            //
							// 					//****************************** draw freehand line ***************************
							// 					if (button[1])
							// 					if (edit_mode == "Freehand"){
							// 						E[E.length-1].CP.push({X: over.X, Y: over.Y});
							// 						recalculateCurve(E[E.length-1]);
							// 					}
                            //
                            //
							// 					//****************************** moving center point **************************
							// 					if (button[1])
							// 					if (edit_mode == 'Line Edit')
							// 					if (fixed.Element && fixed.Point == 5){
							// 							E[fixed.Element].CP[5].X = E[fixed.Element].CP[5].XF + over.DX;
							// 							E[fixed.Element].CP[5].Y = E[fixed.Element].CP[5].YF + over.DY;
							// 							E[fixed.Element].CP[5].unique = true;
                            //
							// 								checkCross(fixed.Element, 5);
							// 								recalculateCurve(E[fixed.Element]);
							// 								setBound();
							// 								refresh_All();
							// 								redraw();
							// 								return
							// 					}
                            //
                            //
							// 					//****************************** moving points ********************************
							// 					if (button[1])
							// 					if (edit_mode == 'Line Edit')
							// 					if (fixed.Element && fixed.Point){
                            //
							// 								E[fixed.Element].CP[fixed.Point].X = E[fixed.Element].CP[fixed.Point].XF + over.DX;
							// 								E[fixed.Element].CP[fixed.Point].Y = E[fixed.Element].CP[fixed.Point].YF + over.DY;
							//								
							// 								//console.log(E[fixed.Element].CP[fixed.Point]);
							//								
							//							
							// 							for (var n = 1; n < E.length; n++) if (E[n].enable) if (E[n].selected) if (n != fixed.Element)
							// 							for (var i = 1; i < E[n].CP.length; i++) if (i != fixed.Point)
							// 							if (E[fixed.Element].CP[fixed.Point].XF == E[n].CP[i].XF)
							// 							if (E[fixed.Element].CP[fixed.Point].YF == E[n].CP[i].YF)
							// 								E[n].CP[i] = {X: E[fixed.Element].CP[fixed.Point].X, Y: E[fixed.Element].CP[fixed.Point].Y, XF:E[fixed.Element].CP[fixed.Point].XF, YF: E[fixed.Element].CP[fixed.Point].YF}
                            //
							// 							if (E[fixed.Element].type == "spline") if (fixed.Point == 1){
							// 								E[fixed.Element].CP[2].X = E[fixed.Element].CP[2].XF + over.DX;
							// 								E[fixed.Element].CP[2].Y = E[fixed.Element].CP[2].YF + over.DY;
							// 							}
                            //
							// 							if (E[fixed.Element].type == "spline") if (fixed.Point == 4){
							// 								E[fixed.Element].CP[3].X = E[fixed.Element].CP[3].XF + over.DX;
							// 								E[fixed.Element].CP[3].Y = E[fixed.Element].CP[3].YF + over.DY;
							// 							}
                            //
                            //
							// 							if (E[fixed.Element].type == "circle") {
                            //
							// 								var PAR = projections(E[fixed.Element].CP[0], E[fixed.Element].CP[1]);
							// 								var PAR2 = projections(E[fixed.Element].CP[0], E[fixed.Element].CP[2]);
							// 								var PAR3 = projections(E[fixed.Element].CP[0], E[fixed.Element].CP[3]);
							// 								if (PAR2.angle > PAR3.angle)  PAR3.angle += 2 * Math.PI;
                            //
							// 								E[fixed.Element].CP[2].X = E[fixed.Element].CP[0].X + PAR.R * Math.cos(PAR2.angle);
							// 								E[fixed.Element].CP[2].Y = E[fixed.Element].CP[0].Y + PAR.R * Math.sin(PAR2.angle);
                            //
							// 								E[fixed.Element].startAngle = PAR2.angle;
                            //
							// 								E[fixed.Element].CP[3].X = E[fixed.Element].CP[0].X + PAR.R * Math.cos(PAR3.angle);
							// 								E[fixed.Element].CP[3].Y = E[fixed.Element].CP[0].Y + PAR.R * Math.sin(PAR3.angle);
							// 								E[fixed.Element].endAngle = PAR3.angle;
                            //
							// 								E[fixed.Element].R = PAR.R;
							// 							}
                            //
							// 								//checkCross(fixed.Element, fixed.Point);
							// 								for (var n = 1; n < E.length; n++) if (E[n].enable) if (E[n].selected) recalculateCurve(E[n]);
                            //
							// 								setBound();
							// 								refresh_All();
							// 								redraw();
                            //
							// 								return
							// 					}
                            //
                            //
							// 					//**************************** resizing selected ******************************
							// 					if (button[1])
							// 					if (edit_mode == 'Select')
							// 					if (edit_type == 'Resize')
							// 					if (fixed.B){
                            //
							// 							var X1 = BF[1].X + 12 / scale;
							// 							var Y1 = BF[1].Y + 12 / scale;
							// 							var X2 = BF[3].X - 12 / scale;
							// 							var Y2 = BF[3].Y - 12 / scale;
							//							
							// 							var DX = X2 - X1; if (DX == 0) DX = 0.00000000000000000000001;
							// 							var DY = Y2 - Y1; if (DY == 0) DY = 0.00000000000000000000001;
                            //
							// 						if (fixed.B == 1){
							// 								var kf = (DY - over.DY) / DY;
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected){
							// 									E[n].R = E[n].RF * kf;												//console.log(E[n])
							// 								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
							// 									E[n].CP[i].X = X2 - (X2 - E[n].CP[i].XF) * kf;
							// 									E[n].CP[i].Y = Y2 - (Y2 - E[n].CP[i].YF) * kf;
							// 								}
							// 							}		
							// 						}
                            //
							// 						if (fixed.B == 2){
							// 								var kf = (DY + over.DY) / DY;
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected){
							// 									E[n].R = E[n].RF * kf;
							// 								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
							// 									E[n].CP[i].X = X2 + (E[n].CP[i].XF - X2) * kf;
							// 									E[n].CP[i].Y = Y1 + (E[n].CP[i].YF - Y1) * kf;
							// 								}
							// 							}
							// 						}
                            //
							// 						if (fixed.B == 3){
							// 								var kf = (DY + over.DY) / DY;
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected){
							// 									E[n].R = E[n].RF * kf;
							// 								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
							// 									E[n].CP[i].X = X1 + (E[n].CP[i].XF - X1) * kf;
							// 									E[n].CP[i].Y = Y1 + (E[n].CP[i].YF - Y1) * kf;
							// 								}
							// 							}
							// 						}
                            //
							// 						if (fixed.B == 4){
							// 								var kf = (DY - over.DY) / DY;
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected){
							// 									E[n].R = E[n].RF * kf;
							// 								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
							// 									E[n].CP[i].X = X1 + (E[n].CP[i].XF - X1) * kf;
							// 									E[n].CP[i].Y = Y2 - (Y2 - E[n].CP[i].YF) * kf;
							// 								}
							// 							}
							// 						}
                            //
							// 						if (fixed.B == 5){
							// 								var kf = (DX - over.DX) / DX;
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected){
							// 								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) E[n].CP[i].X = X2 - (X2 - E[n].CP[i].XF) * kf;
							// 								E[n].R = E[n].RF * kf;
							// 							}
							// 						}
                            //
							// 						if (fixed.B == 6){
							// 								var kf = (DY + over.DY) / DY;
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected){
							// 								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) E[n].CP[i].Y = Y1 + (E[n].CP[i].YF - Y1) * kf;
							// 								E[n].R = E[n].RF * kf;
							// 							}
							// 						}
                            //
							// 						if (fixed.B == 7){
							// 								var kf = (DX + over.DX) / DX;
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected){
							// 								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) E[n].CP[i].X = X1 + (E[n].CP[i].XF - X1) * kf;
							// 								E[n].R = E[n].RF * kf;
							// 							}
							// 						}
                            //
							// 						if (fixed.B == 8){
							// 								var kf = (DY - over.DY) / DY;
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected){
							// 								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) E[n].CP[i].Y = Y2 - (Y2 - E[n].CP[i].YF) * kf;
							// 								E[n].R = E[n].RF * kf;
							// 							}
							// 						}
                            //
                            //
							// 								checkCross();
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected) recalculateCurve(E[n]);
							// 								setBound();
							// 								refresh_All();
							// 								redraw();
							// 								return
							// 					}
                            //
                            //
							// 					//**************************** rotating selected ******************************
							// 					if (button[1])
							// 					if (edit_mode == 'Select')
							// 					if (edit_type == 'Rotate')
							// 					if (fixed.B){
                            //
							// 						var DX = fixed.X - CR.X;
							// 						var DY = fixed.Y - CR.Y;
							// 						R = Math.sqrt(DX * DX + DY * DY);
							// 						var start_angle = Math.acos(DX / R);
							// 						if (DY < 0) start_angle = 2 * Math.PI - start_angle;
                            //
							// 						var DX = over.X - CR.X;
							// 						var DY = over.Y - CR.Y;
							// 						R = Math.sqrt(DX * DX + DY * DY);
							// 						var angle = Math.acos(DX / R);
							// 						if (DY < 0) angle = 2 * Math.PI - angle;
                            //
							// 						//console.log(angle - start_angle);
                            //
							// 						for (var n = 1; n < E.length; n++) if (E[n].selected){										//console.log(E[n])
							// 							for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) {
							// 								var RC = rotate({X: E[n].CP[i].XF, Y: E[n].CP[i].YF}, CR, angle - start_angle);
							// 								E[n].CP[i].X = RC.X;
							// 								E[n].CP[i].Y = RC.Y;
							// 							}
							// 						}
                            //
							//						
							// 						for (var i = 9; i < B.length; i++) {
							// 								var RC = rotate({X: BF[i].X, Y: BF[i].Y}, CR, angle - start_angle);
							// 								B[i].X = RC.X;
							// 								B[i].Y = RC.Y;
							// 						}
                            //
                            //
                            //
							// 							//checkCross();
							// 							for (var n = 0; n < E.length; n++) if (E[n].selected) recalculateCurve(E[n]);
							// 								setBound(true);
							// 								refresh_All();
							// 								redraw();
							// 								return
							// 					}
                            //
                            //
							// 					//****************************** moving selected ******************************
							// 					//if (button[1]) console.log(Math.sqrt(over.dx * over.dx + over.dy * over.dy))
							// 					if (button[1])
							// 					if (edit_mode == 'Select')
							// 					if (same_clicked)
							// 					if (!fixed.B && fixed.Element) //if (!fixed.Point){
							// 					if (Math.sqrt(over.dx * over.dx + over.dy * over.dy) > 4){
							// 						for (var n = 0; n < E.length; n++)
							// 							if (E[n].selected){
							// 								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) {
							// 									E[n].CP[i].X = E[n].CP[i].XF + over.DX;
							// 									E[n].CP[i].Y = E[n].CP[i].YF + over.DY;
							// 								}
							// 								for (var i = 0; i < E[n].P.length; i++){
							// 									E[n].P[i].X = E[n].P[i].XF + over.DX;
							// 									E[n].P[i].Y = E[n].P[i].YF + over.DY;
							// 								}	
							// 							}
							// 								checkCross();
							// 								for (var n = 0; n < E.length; n++) if (E[n].selected) recalculateCurve(E[n]);
							// 								setBound();	
							// 								refresh_All();
							// 								redraw();
							// 								return
							// 					}
                            //
                            //
							// 					if (edit_mode == "Line" || edit_mode == "Rectangle" || edit_mode == "Circle" || edit_mode == "Spline"){
							// 						checkCross();
							// 						refresh_All();
							// 						redraw();
							// 						return
							// 					}
                            //
							// 		//*****************************
							// 		refresh_All();
							// 		redraw();
							// });




							//############################################## Mouse down ####################################################
							// canvas.addEventListener('mousedown', function(e){
                            //
							// 		button[e.which] = true;
                            //
							// 		if (over.x < 20) return;
                            //
							// 					edit_step ++;
                            //
							// 				//******************************************************** Zoom ******************************************************************
							// 				if (edit_mode == "Zoom"){
							// 					if (button[1]) canvas.style.cursor = "zoom-in";
							// 					if (button[3]) canvas.style.cursor = "zoom-out";
							// 				}
                            //
                            //
							// 				//******************************************************** Select ******************************************************************
							// 				if (edit_mode == "Select" || edit_mode == "Line Edit"){
                            //
							// 					//************************** click on empty place ****************************
							// 					if (!over.B)
							// 					if (!over.Element){
							// 							if (input_Width.changed)  resizeSelected(Math.abs(parseFloat(input_Width.value)), 0);
							// 							if (input_Height.changed) resizeSelected(0, Math.abs(parseFloat(input_Height.value)));
                            //
							// 						if (!input_Width.changed && !input_Height.changed) skipSelected();
							//						
							// 						setBound();
							// 					}								
                            //
                            //
							// 					//************************** click on B **************************************
							// 					if (over.B)	fixPoints();
                            //
                            //
							// 					//************************** click on Element ********************************
							// 					if (over.Element){
                            //
							// 						if (E[over.Element].selected) {same_clicked = true} else {same_clicked = false}
                            //
							// 						if (!E[over.Element].selected)	skipSelected();
                            //
							// 						E[over.Element].selected = true;
							// 						fixPoints();
                            //
							// 						//****************************** select new element **********************
							// 						if (!same_clicked){
							//							
							// 								MUAB[0].pic.src = MUAB_A[0].pic;
							// 								MUAB[1].pic.src = MUAB_A[1].pic;
							// 								selected_groups = [];
                            //
							// 							//***************************** checking groups *************************
							// 								var group_num = -1;
							// 							for (var n = 0; n < G.length; n++) if (G[n]) if (G[n].enable)
							// 								for (i = 0; i < G[n].E.length; i++) if (G[n].E[i] == over.Element) group_num = n;
                            //
							// 								if (group_num >= 0){
							// 									for (i = 0; i < G[group_num].E.length; i++) E[G[group_num].E[i]].selected = true;
							// 									MUAB[1].pic.src = MUAB_A[1].pic_active;
							// 									selected_groups.push(group_num);
							// 								}
							//								
							// 								//console.log(selected_groups);
							// 								setBound();
							// 						}	
							// 					}
							// 				}
                            //
                            //
							// 				//******************************************************** Freehand *****************************************************************
							// 				if (edit_mode == "Freehand"){
							// 					if (edit_step == 1)	add_Element('line', [{X: over.X, Y: over.Y}], []);
							// 				}
                            //
                            //
							// 				//******************************************************** Line ********************************************************************
							// 				if (edit_mode == "Line"){
							// 					if (edit_step == 2){
							// 						var line = add_Line({X: clicked.XR, Y: clicked.YR}, {X: real.X, Y: real.Y}).selected = true;
							// 						setBound();
							// 					}
							// 				}
                            //
                            //
							// 				//******************************************************** Rectangle ***************************************************************
							// 				if (edit_mode == "Rectangle"){
                            //
							// 					if (edit_step == 2){
                            //
							// 							var P = getExtremums([{X: clicked.XR, Y: clicked.YR}, real]);
                            //
							// 							var group = {enable: true, E: []};
                            //
							// 							add_Line({X: P.min.X, Y: P.min.Y}, {X: P.min.X, Y: P.max.Y}).selected = true;	group.E.push(E.length-1);
							// 							add_Line({X: P.min.X, Y: P.max.Y}, {X: P.max.X, Y: P.max.Y}).selected = true;	group.E.push(E.length-1);
							// 							add_Line({X: P.max.X, Y: P.max.Y}, {X: P.max.X, Y: P.min.Y}).selected = true;	group.E.push(E.length-1);
							// 							add_Line({X: P.max.X, Y: P.min.Y}, {X: P.min.X, Y: P.min.Y}).selected = true;	group.E.push(E.length-1);
							// 							setBound();
                            //
							// 							G.push(group);
							// 							selected_groups = [G.length-1];
							// 					}
							// 				}
                            //
                            //
							// 				//******************************************************** Circle ***************************************************************
							// 				if (edit_mode == "Circle"){
                            //
							// 					if (edit_step == 2){
							// 							var DX =  real.X - clicked.XR;
							// 							var DY =  real.Y - clicked.YR;
							// 							var R = Math.sqrt(DX * DX + DY * DY);
                            //
							// 							add_Circle(clicked, R).selected = true;
							// 							setBound();
							// 					}
							// 				}
                            //
                            //
							// 				//******************************************************** Spline ***************************************************************
							// 				if (edit_mode == "Spline"){
                            //
							// 					if (edit_step == 2){
							// 							add_Spline({X: clicked.XR, Y: clicked.YR}, {X: real.X, Y: real.Y}).selected = true;
							// 							setBound();
							// 					}
							// 				}
                            //
                            //
							// 				//******************************************************** Erase ******************************************************************
							// 				if (edit_mode == "Erase"){
                            //
							// 					if (over.Element){
                            //
							// 						var current_Element = over.Element;
							// 						var CRS = {X: over.CR.X, Y: over.CR.Y, L: over.Line};
							// 						INTERSECT = [];
                            //
							// 							for (var i = 0; i < E[current_Element].P.length - 1; i++)
							// 							for (var m = 1; m < E.length; m++) if (E[m].enable)
							// 							for (var j = 0; j < E[m].P.length - 1; j++){
							// 								var res = intersect(E[current_Element].P[i], E[current_Element].P[i+1], E[m].P[j], E[m].P[j+1]);
							// 								if (res) INTERSECT.push({X: res.X, Y: res.Y, L: i, TE: m, TL: j});
							// 							}
                            //
                            //
							// 						//****************************** 0 **********************	
							// 						if (INTERSECT.length == 0) E[current_Element].enable = false;
                            //
                            //
							// 						//****************************** 1 **********************	
							// 						if (INTERSECT.length == 1) if (E[current_Element].closed) E[current_Element].enable = false;
                            //
                            //
							// 						//******************************************* line ************************************************
							// 						if (E[current_Element].enable)
							// 						if (E[current_Element].type == "line"){
                            //
							// 									var e = E[current_Element];
                            //
							// 											var SEC = [];
							//											
							// 									for (var i = 0; i < e.P.length - 1; i++){
							// 											var dx = (e.P[i+1].X - e.P[i].X) / 1000;
							// 											var dy = (e.P[i+1].Y - e.P[i].Y) / 1000;
							// 											var ds = Math.sqrt(dx*dx + dy*dy);
                            //
							// 										for (var p = 0; p <= 1000; p++){
							// 											var pos = {X: e.P[i].X + p * dx, Y: e.P[i].Y + p * dy}
							// 											if (distance2Point(pos, CRS) <= ds / 2) SEC.push({kind: "cursor", X: pos.X, Y: pos.Y, L: i});
							// 											for (n = 0; n < INTERSECT.length; n++) if (distance2Point(pos, INTERSECT[n]) <= ds / 2) SEC.push({kind: "cross", X: INTERSECT[n].X, Y: INTERSECT[n].Y, L: INTERSECT[n].L});
							// 										}
							// 									}
                            //
							// 														var catched_cross = 0;
							// 														var CR0 = {};
							// 														var CR1 = {};
							// 														var CR2 = {};
							// 														var CR3 = {};
							// 													for (var n = 0; n < SEC.length; n++){
							// 														if (SEC[n].kind == "cursor") catched_cross = 1;
							// 														if (SEC[n].kind == "cross"){
							// 															if (catched_cross == 0)  CR1 = {X: SEC[n].X, Y: SEC[n].Y, L: SEC[n].L}
							// 															if (catched_cross == 1) {CR2 = {X: SEC[n].X, Y: SEC[n].Y, L: SEC[n].L}; catched_cross = 2}
							// 															if (e.closed) CR3 = {X: SEC[n].X, Y: SEC[n].Y, L: SEC[n].L}
							// 														}
							// 													}
							// 															if (!CR2.X)
							// 															if (SEC.length > 2) CR0 = {X: SEC[0].X, Y: SEC[0].Y, L: SEC[0].L}
                            //
                            //
							// 														//****************************
							// 														if (CR1.X){
							// 															var NP = [{X: 0, Y: 0}];
                            //
							// 															if (CR3.X) if (CR2.X)
							// 															if (CR3.X == CR2.X && CR3.Y == CR2.Y){
							// 																NP.push({X: CR2.X, Y: CR2.Y});
							// 																for (var i = CR2.L+1; i < e.P.length; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
							// 															}
							//															
                            //
                            //
							// 															if (!CR0.X) for (var i = 0; i <= CR1.L; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
							// 															if (CR0.X) {
							// 																NP.push({X: CR0.X, Y: CR0.Y});
							// 																for (var i = CR0.L + 1; i <= CR1.L; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
							// 															}
							// 															NP.push({X: CR1.X, Y: CR1.Y});
                            //
							// 															if (polylineLength(NP) / polylineLength(E[current_Element].CP) > 0.02) 
							// 															recalculateCurve(add_Element("line", NP, []));
							// 														}
                            //
							// 														//****************************
							// 														if (CR2.X){
							// 															var NP = [{X: 0, Y: 0}];
							// 															NP.push({X: CR2.X, Y: CR2.Y});
							// 															if (!CR3.X) for (var i = CR2.L+1; i < e.P.length; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
							// 															if (CR3.X) {
							// 																for (var i = CR2.L+1; i <= CR3.L; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
							// 																NP.push({X: CR3.X, Y: CR3.Y});
							// 															}
							//															
							// 															if (CR3.X)
							// 															if (CR3.X != CR2.X || CR3.Y != CR2.Y){
							// 																NP.push({X: CR3.X, Y: CR3.Y});
							// 																for (var i = CR3.L+1; i < e.P.length; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
							// 															}
                            //
							// 															if (polylineLength(NP) / polylineLength(E[current_Element].CP) > 0.02) 
							// 															recalculateCurve(add_Element("line", NP, []));
							// 														}
                            //
							// 															E[current_Element].enable = false;
                            //
							// 															console.log("CR0: " + CR0.X + "/" + CR0.Y);
							// 															console.log("CR1: " + CR1.X + "/" + CR1.Y);
							// 															console.log("CR2: " + CR2.X + "/" + CR2.Y);
							// 															console.log("CR3: " + CR3.X + "/" + CR3.Y);
							//															
							// 						}
                            //
                            //
                            //
							//						
							// 						//******************************************* Circle ************************************************
							// 						if (E[current_Element].enable)
							// 						if (E[current_Element].type == "circle"){
                            //
							// 										var e = E[current_Element];
                            //
							// 											var SEC_0 = [];
							// 											var SEC = [];
                            //
							// 											var angle_1 = 0, angle_2 = 0;
							// 											var closedCurve = false; 
							// 											if (e.startAngle + 2 * Math.PI == e.endAngle) closedCurve = true;
                            //
							// 										for (var n = 0; n < INTERSECT.length; n++){
							// 										//if (INTERSECT[n].X != e.CP[0].X && INTERSECT[n].y != e.CP[0].y) 
							// 											var proj = projections(e.CP[0], INTERSECT[n]);
							// 											//if (!closedCurve) SEC_0.push(proj);
							// 											//if (closedCurve) 
							// 												if (INTERSECT[n].TE != current_Element) SEC_0.push(proj);
							// 											//if (proj.angle != e.startAngle && proj.angle != e.endAngle)
							// 											//if (proj.angle != e.startAngle + 2 * Math.PI && proj.angle != e.endAngle + 2 * Math.PI)
							// 										}
                            //
							// 										for (n = 0; n < SEC_0.length; n++){
							// 											if (SEC_0[n].angle < e.startAngle) SEC_0[n].angle += 2 * Math.PI;
							// 											if (SEC_0[n].angle > e.endAngle) SEC_0[n].angle -= 2 * Math.PI;
							// 										}
                            //
							// 										for (n = 0; n < SEC_0.length; n++) SEC.push({angle: SEC_0[n].angle});
							// 										if (closedCurve) for (n = 0; n < SEC_0.length; n++) SEC.push({angle: SEC_0[n].angle - 2 * Math.PI});
							// 										if (closedCurve) for (n = 0; n < SEC_0.length; n++) SEC.push({angle: SEC_0[n].angle + 2 * Math.PI});
                            //
							// 										//var allbigger = false;
							// 										//for (n = 0; n < SEC.length; n++) if (SEC[n].angle)
                            //
							// 										SEC.push(projections(e.CP[0], CRS));
							// 										SEC[SEC.length - 1].cursor = true;
                            //
                            //
							// 										for (n = 0; n < SEC.length - 1; n++)
							// 										for (var i = 0; i < SEC.length - 1; i++)
							// 											if (SEC[i].angle > SEC[i+1].angle){
							// 												var TEMP = {angle: SEC[i].angle, cursor: SEC[i].cursor};
							// 												SEC[i] = {angle: SEC[i+1].angle, cursor: SEC[i+1].cursor};
							// 												SEC[i+1] = {angle: TEMP.angle, cursor: TEMP.cursor};
							// 											}
                            //
							// 											var cursor_num;
							// 											for (n = 0; n < SEC.length; n++) if (SEC[n].cursor)	cursor_num = n;
                            //
							// 											console.log(SEC);
                            //
							// 											if (closedCurve){
							// 												//if (cursor_num < SEC.length - 1) angle_1 = SEC[cursor_num + 1].angle;
							// 												//if (cursor_num > 0) angle_2 = SEC[cursor_num - 1].angle;
							// 												//if (!angle_2) angle_2 = SEC[0].angle;
							// 												angle_1 = SEC[cursor_num + 1].angle;
							// 												angle_2 = SEC[cursor_num - 1].angle;
                            //
							// 												add_Curve(e.CP[0], e.R, angle_1, angle_2 + 2 * Math.PI);
							// 												console.log(angle_1, angle_2 + 2 * Math.PI)
							// 											}
							// 											if (!closedCurve){
							// 												if (cursor_num > 0) {angle_1 = SEC[cursor_num - 1].angle} else {angle_1 = e.startAngle}
							// 												if (cursor_num < SEC.length - 1) {angle_2 = SEC[cursor_num + 1].angle} else {angle_2 = e.endAngle}
							// 												if (angle_1 != e.startAngle) add_Curve(e.CP[0], e.R, e.startAngle, angle_1);
							// 												if (angle_2 != e.endAngle)   add_Curve(e.CP[0], e.R, angle_2, e.endAngle);
							// 													console.log("angle_1: " + angle_1);
							// 													console.log("angle_2: " + angle_2);
							// 											}
                            //
							// 															//*************************************************************************
							// 															function add_Curve(C, R, start, end){
							//																
							// 																//if (start >= 2 * Math.PI) start -= 2 * Math.PI;
							// 																//if (end >= 2 * Math.PI) end -= 2 * Math.PI;
                            //
							// 																var P0 = {X: C.X, Y: C.Y}
							// 																var P1 = {X: C.X + R, Y: C.Y}
							// 																var P2 = {X: C.X + R * Math.cos(start), Y: C.Y + R * Math.sin(start)}
							// 																var P3 = {X: C.X + R * Math.cos(end), Y: C.Y + R * Math.sin(end)}
                            //
							// 																var newE = add_Element("circle", [P0, P1, P2, P3]);
							// 																newE.R = e.R;
							// 																newE.startAngle = start;
							// 																newE.endAngle = end;
							// 																recalculateCurve(newE);
							// 															}
                            //
							// 										e.enable = false;
                            //
							// 										//console.log(SEC);
							// 						}
                            //
                            //
                            //
                            //
							// 						//******************************************** Spline ***********************************************
							// 						if (E[current_Element].enable)
							// 						if (E[current_Element].type == "spline"){
                            //
							// 									var e = E[current_Element];
                            //
							// 											var SEC = [];
                            //
							// 											for (n = 0; n < INTERSECT.length; n++) SEC.push({kind: "cross", X: INTERSECT[n].X, Y: INTERSECT[n].Y, L: INTERSECT[n].L})
							// 											SEC.push({kind: "cursor", X: CRS.X, Y: CRS.Y, L: CRS.L})
                            //
							// 											for (n = 0; n < SEC.length; n++)
							// 											for (var i = 0; i < SEC.length - 1; i++)
							// 												if (SEC[i].L > SEC[i+1].L){
							// 													var TEMP = {kind: SEC[i].kind, X: SEC[i].X, Y: SEC[i].Y, L: SEC[i].L}
							// 													SEC[i] = {kind: SEC[i+1].kind, X: SEC[i+1].X, Y: SEC[i+1].Y, L: SEC[i+1].L}
							// 													SEC[i+1] = {kind: TEMP.kind, X: TEMP.X, Y: TEMP.Y, L: TEMP.L}
							// 												}
                            //
							// 														var CR1 = {};
							// 														var CR2 = {};
							// 											for (n = 0; n < SEC.length; n++) if (SEC[n].kind == "cursor"){
							// 												if (n > 0) CR1 = {kind: SEC[n-1].kind, X: SEC[n-1].X, Y: SEC[n-1].Y, L: SEC[n-1].L}
							// 												if (n < SEC.length - 1) CR2 = {kind: SEC[n+1].kind, X: SEC[n+1].X, Y: SEC[n+1].Y, L: SEC[n+1].L}
							// 											}
                            //
							// 													//console.log(SEC);
                            //
							// 														if (CR1.X){
							//															
							// 															var NP = [{X: 0, Y: 0}];
                            //
							// 																var P1 = {X: e.CP[1].X, Y: e.CP[1].Y}
							// 																var P2 = {X: e.CP[2].X, Y: e.CP[2].Y}
							// 																var P3 = {X: e.CP[3].X, Y: e.CP[3].Y}
							// 																var P4 = {X: e.CP[4].X, Y: e.CP[4].Y}
							//																
							// 																//CR1 = spline1000(over.Line * 20, E[over.Element].CP[1], E[over.Element].CP[2], E[over.Element].CP[3], E[over.Element].CP[4]);
							//															
							// 																var DX_P1P2 = P2.X - P1.X;
							// 																var DY_P1P2 = P2.Y - P1.Y;
							//																
							// 																var DX_P2P3 = P3.X - P2.X;
							// 																var DY_P2P3 = P3.Y - P2.Y;
                            //
							// 																var DX_P3P4 = P4.X - P3.X;
							// 																var DY_P3P4 = P4.Y - P3.Y;
							//																
							// 																var t = CR1.L / 50;
							//																
							// 																var P5 = {X: P1.X + DX_P1P2 * t, Y: P1.Y + DY_P1P2 * t}
							// 																var P6 = {X: P2.X + DX_P2P3 * t, Y: P2.Y + DY_P2P3 * t}
							// 																var P7 = {X: P3.X + DX_P3P4 * t, Y: P3.Y + DY_P3P4 * t}
							//																
							// 																var DX_P5P6 = P6.X - P5.X;
							// 																var DY_P5P6 = P6.Y - P5.Y;
							//																
							// 																var DX_P6P7 = P7.X - P6.X;
							// 																var DY_P6P7 = P7.Y - P6.Y;
							//																
							// 																var P8 = {X: P5.X + DX_P5P6 * t, Y: P5.Y + DY_P5P6 * t}
							// 																var P9 = {X: P6.X + DX_P6P7 * t, Y: P6.Y + DY_P6P7 * t}
							//																
							// 																var DX_P8P9 = P9.X - P8.X;
							// 																var DY_P8P9 = P9.Y - P8.Y;
							//																
                            //
							// 																var P10 = {X: P8.X + DX_P8P9 * t, Y: P8.Y + DY_P8P9 * t}
							//																
							// 																NP.push({X: P1.X, Y: P1.Y}, {X: P5.X,  Y: P5.Y});
							// 																NP.push({X: P8.X, Y: P8.Y}, {X: CR1.X, Y: CR1.Y});
							//																
							// 																console.log("SLEN: " + splineLength(NP));
							//																
							// 																if (splineLength(E[current_Element].CP) / splineLength(NP) < 40)
							// 																recalculateCurve(add_Element("spline", NP, []));
							// 														}
                            //
                            //
							// 														if (CR2.X){
							// 															var NP = [{X: 0, Y: 0}];
                            //
							// 																var P1 = {X: e.CP[1].X, Y: e.CP[1].Y}
							// 																var P2 = {X: e.CP[2].X, Y: e.CP[2].Y}
							// 																var P3 = {X: e.CP[3].X, Y: e.CP[3].Y}
							// 																var P4 = {X: e.CP[4].X, Y: e.CP[4].Y}
                            //
							// 																var DX_P1P2 = P2.X - P1.X;
							// 																var DY_P1P2 = P2.Y - P1.Y;
                            //
							// 																var DX_P2P3 = P3.X - P2.X;
							// 																var DY_P2P3 = P3.Y - P2.Y;
                            //
							// 																var DX_P3P4 = P4.X - P3.X;
							// 																var DY_P3P4 = P4.Y - P3.Y;
							//																
							// 																var t = CR2.L / 50;
							//																
							// 																var P5 = {X: P1.X + DX_P1P2 * t, Y: P1.Y + DY_P1P2 * t}
							// 																var P6 = {X: P2.X + DX_P2P3 * t, Y: P2.Y + DY_P2P3 * t}
							// 																var P7 = {X: P3.X + DX_P3P4 * t, Y: P3.Y + DY_P3P4 * t}
                            //
							// 																var DX_P5P6 = P6.X - P5.X;
							// 																var DY_P5P6 = P6.Y - P5.Y;
                            //
							// 																var DX_P6P7 = P7.X - P6.X;
							// 																var DY_P6P7 = P7.Y - P6.Y;
                            //
							// 																var P8 = {X: P5.X + DX_P5P6 * t, Y: P5.Y + DY_P5P6 * t}
							// 																var P9 = {X: P6.X + DX_P6P7 * t, Y: P6.Y + DY_P6P7 * t}
                            //
							// 																var DX_P8P9 = P9.X - P8.X;
							// 																var DY_P8P9 = P9.Y - P8.Y;
                            //
                            //
							// 																var P10 = {X: P8.X + DX_P8P9 * t, Y: P8.Y + DY_P8P9 * t}
                            //
							// 																NP.push({X: CR2.X, Y: CR2.Y}, {X: P9.X,  Y: P9.Y});
							// 																NP.push({X: P7.X, Y: P7.Y}, {X: P4.X, Y: P4.Y});
                            //
							// 																if (splineLength(E[current_Element].CP) / splineLength(NP) < 40)
							// 																recalculateCurve(add_Element("spline", NP, []));
							// 														}
                            //
							// 																E[current_Element].enable = false;
							// 						}
							//						
							// 							setTimeout(function(){INTERSECT = []}, 500);
							// 					}
							// 				}
                            //
                            //
                            //
							// 				//********************************************************************************************************************************
							// 				fixed = {x: over.x, y: over.y, X: over.X, Y: over.Y, Element: over.Element, Line: over.Line, Point: over.Point, Ox: O.x, Oy: O.y, B: over.B}
							// 				clicked = {x: over.x, y: over.y, X: over.X, Y: over.Y, Element: over.Element, Line: over.Line, Point: over.Point, Ox: O.x, Oy: O.y, B: over.B, xr: real.x, yr: real.y, XR: real.X, YR: real.Y}
                            //
                            //
							// 				//*****************************
							// 				// refresh_All();
							// 				// redraw();
							// });
                            //
                            //


							//################################################ Mouse up ##################################################
							// canvas.addEventListener('mouseup', function(e){
                            //
							// 		if (current_MMB) for (var i = 0; i < MMB.length; i++) {MMB[i].background("linear-gradient(0deg, rgb(100, 100, 100) 0px, rgb(140, 140, 140) 35px)"); MMB[i].panel.hide()}
                            //
							// 		current_MMB = null;
                            //
							// 		button[e.which] = false;
                            //
							// 		//****************** Zoom ******************************************************
							// 		if (edit_mode == "Zoom"){
							//			
							// 			canvas.style.cursor = "zoom-in";
							// 			var ds = distance2Point(fixed, over);
							//			
							// 				if (ds > 10){
                            //
							// 					var minX = fixed.X; if (over.X < minX) minX = over.X;
							// 					var minY = fixed.Y; if (over.Y < minY) minY = over.Y;
							// 					var maxX = fixed.X; if (over.X > maxX) maxX = over.X;
							// 					var maxY = fixed.Y; if (over.Y > maxY) maxY = over.Y;
                            //
							// 						scale = canvas.width / (maxX - minX) * 0.9;
							// 						scale2 = (canvas.height - 20) / (maxY - minY) * 0.9;
							// 						if (scale2 < scale) scale = scale2;
                            //
							// 						O.X = (maxX + minX) / 2;
							// 						O.Y = (maxY + minY) / 2;
                            //
							// 						O.x = 0 - O.X * scale;
							// 						O.y = 10 / 2 - O.Y * scale;
							//						
							// 				} else {
							//					
							// 					if (e.which == 1) scale *= 1.3;
							// 					if (e.which == 3) scale *= 0.7;
							//	
							// 					O.x = over.x - over.X * scale;
							// 					O.y = over.y - over.Y * scale;								
							// 				}
							//				
							// 					refresh_All();
							// 					//redraw();
							// 		}
                            //
                            //
							// 		//****************** change edit type ******************************************
							// 		if (same_clicked)
							// 		if (!fixed.B)
							// 		if (!over.dx && !over.dy){
							// 			if (edit_type == "Resize") {edit_type = "Rotate"} else {edit_type = "Resize"}
							// 		}
                            //
                            //
							// 		//******************** select **************************************************
							// 		if (edit_mode == "Select")
							// 		if (!fixed.Element) 
							// 		if (!over.Element)
							// 		if (!fixed.B)
							// 		if (!input_Width.changed && !input_Height.changed){
							// 			skipSelected();
							// 			if (distance2Point({X: fixed.x, Y: fixed.y}, {X: over.x, Y: over.y}) > 10) select_Elements_inRect(fixed, over);
							// 		}
							// 			input_Width.changed = false;
							// 			input_Height.changed = false;
                            //
                            //
							// 		//********************* skip after building lines ********************************************
							// 		if (edit_mode == "Line" || edit_mode == "Rectangle" || edit_mode == "Circle" || edit_mode == "Spline") if (edit_step == 2) {
							// 			edit_mode = "Select";
							// 			edit_step = 0;
                            //
							// 			for (var i = 1; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
							// 			MAB[0].background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");
							// 		};
                            //
                            //
							// 		//********************* skip after building freehand line ************************************
							// 		if (edit_mode == "Freehand"){
							// 			edit_step = 0;
                            //
							// 					var current = E.length-1;
							// 					E[current].enable = false;
							// 					var group = {enable: true, E: []};
							//					
							// 				for (var n = 0; n < Math.floor(E[current].CP.length / 3); n++) if (n*3 + 4 < E[current].CP.length){
							// 						var P1 = {X: E[current].CP[n*3+1].X, Y: E[current].CP[n*3+1].Y};
							// 						var P2 = {X: E[current].CP[n*3+2].X, Y: E[current].CP[n*3+2].Y};
							// 						var P3 = {X: E[current].CP[n*3+3].X, Y: E[current].CP[n*3+3].Y};
							// 						var P4 = {X: E[current].CP[n*3+4].X, Y: E[current].CP[n*3+4].Y};
							// 						var newE = add_Element('spline', [{X: 0, Y: 0}, P1, P2, P3, P4]);
							// 						recalculateCurve(newE);
							// 						newE.selected = true;
							// 					group.E.push(E.length-1);
							// 				}
							//					
							// 				G.push(group);	
							// 				setBound();		
							// 		}
                            //
							// 			//refreshSelectedCircles();
							// 			if (edit_type != "Rotate") setBound();
							// 			fixed = {};
							// 			real = {};
							// 			CROSS = [];
							// 			redraw();
							// });
                            //



							//################################################ Scroll Wheel ##############################################
							// addScrollWheel(function(delta){
                            //
							// 		scale *= (1 + delta / 10);
                            //
							// 		O.x = over.x - over.X * scale;
							// 		O.y = over.y - over.Y * scale;
                            //
							// 				clicked.xr = clicked.XR * scale + O.x;
							// 				clicked.yr = clicked.YR * scale + O.y;
                            //
							// 		setBound();
                            //
							// 		//******************************
							// 		refresh_All();
							// 		redraw();
							// });



							//########################################## Mouse double click ###########################################			
							canvas.addEventListener('dblclick', function(e){
									console.log(edit_mode);
								if (edit_mode == 'Select'){
									canvas.style.cursor = "-webkit-grab";
									edit_mode = 'move_scene';
									return
								}
								if (edit_mode == 'move_scene' || edit_mode == 'Zoom'){
									canvas.style.cursor = "default";
									edit_mode = 'Select';
									return
								}
							});



							//################################################ Key down ####################################################
							window.addEventListener('keydown', function(e){
								button[e.keyCode] = true;
									//console.log(e.keyCode);
									
									if (e.keyCode == 46){
										for (var n = 0; n < E.length; n++) if (E[n].selected) E[n].enable = false;
										setBound();
									}
									
									if (e.keyCode == 37) moveSelected(-parseFloat(input_Length.value), 0);
									if (e.keyCode == 38) moveSelected(0, parseFloat(input_Length.value));
									if (e.keyCode == 39) moveSelected(parseFloat(input_Length.value), 0);
									if (e.keyCode == 40) moveSelected(0, -parseFloat(input_Length.value));
										
								redraw();
							});



							//################################################ Key up ######################################################
							window.addEventListener('keyup', function(e){
								button[e.keyCode] = false;
								
								if (e.keyCode == 32) if (clicked.Element) console.log(E[clicked.Element]);
							});





			//##################################### REDRAW #######################################
			function redraw(){
						context.clearRect(0, 0, canvas.width, canvas.height);
						context.lineJoin = 'round';

									drawElements();
									drawAxis();
									drawScales();
									drawSides();
									drawCursor();
									//drawInfo();

								//********************************** draw Axis *******************************************************
								function drawAxis(){
										context.fillStyle = 'rgba(0, 0, 0, 0.2)';
										context.strokeStyle = 'rgba(125, 125, 125, 0.5)';
										context.lineWidth = 1;
										context.setLineDash([4, 4]);
										
										context.beginPath();
											context.moveTo(O.x, 40);
											context.lineTo(O.x, canvas.height - 40);
											context.moveTo(20, canvas.height - O.y);
											context.lineTo(canvas.width - 20, canvas.height - O.y);
										context.stroke();
										
										context.fillStyle = 'rgb(240, 240, 240)';
										context.fillRect(0, 0, canvas.width, 19);
										context.fillRect(0, 0, 19, canvas.height);
								}

	
								//********************************** draw elements *******************************************************
								function drawElements(){

										for (var n = 1; n < E.length; n++) if (E[n].enable){

																					setStyle(null, 'rgba(50, 50, 50, 1.0)', 1, []);
													if (E[n].lineType == "bend")	setStyle(null, 'rgba(50, 175, 0, 1.0)', 1, []);
													if (n == over.Element)			setStyle(null, 'rgba(255, 100, 25, 0.7)', 2, []);
													if (E[n].selected)				setStyle(null, 'rgba(255, 100, 25, 1.0)', 2, []);
													
													if (E[n].lineType == "bend" && n == over.Element)	setStyle(null, 'rgba(50, 225, 0, 0.7)', 1, []);
													if (E[n].lineType == "bend" && E[n].selected)		setStyle(null, 'rgba(50, 225, 0, 1.0)', 1, []);

													drawPolyLine(E[n].P);


												//*********************** draw polyline ************************
												if (E[n].type == "polyline"){
													
												}


												//*********************** draw circles ************************
												if (E[n].type == "circle"){

												}


												//*********************** draw splines ************************
												if (E[n].type == "spline"){

														if (edit_mode == "Line Edit")
														if (E[n].selected){
															drawLine(E[n].CP[1], E[n].CP[2], 'rgba(125, 125, 125, 1.0)', 1, [4, 4]);
															drawLine(E[n].CP[3], E[n].CP[4], 'rgba(125, 125, 125, 1.0)', 1, [4, 4]);
														}
												}
										}


														//*********************** draw points *****************************
														if (edit_mode == "Line Edit")
														for (var n = 1; n < E.length; n++) if (E[n].enable){
																if (E[n].selected){
																	
																	if (E[n].type == "circle") drawLine(E[n].CP[0], E[n].CP[1], 'rgba(125, 125, 125, 1.0)', 1, [4, 4]);
																	
																	for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){

																		arc(E[n].CP[i].x, E[n].CP[i].y, 3, 'rgba(255, 255, 255, 1.0)', 'rgba(50, 50, 50, 1.0)', 1, []);

																		if (n == over.Element) if (over.Point == i){
																			arc(E[n].CP[i].x, E[n].CP[i].y, 4, 'rgba(255, 255, 255, 1.0)', 'rgba(200, 70, 0, 1.0)', 2, []);
																		}
																	}
																}
	
														}



														//********************* draw selected bound **********************************************************
														if (edit_mode == "Select")
														if (B.length > 0){

																//************************** Resize ***********************
																if (edit_type == "Resize"){
																
																		context.strokeStyle = 'rgba(125, 125, 125, 1.0)';
																		context.setLineDash([4, 4]);
																		context.lineWidth = 1;
																		context.strokeRect(B[1].x, B[1].y, B[3].x - B[1].x, B[3].y - B[1].y);
																	
																	for (var n = 1; n <= 8; n++){
																		if (n == fixed.B) {
																			context.fillStyle = 'rgba(50, 50, 50, 1.0)';
																			context.fillRect(B[n].x - 5, B[n].y - 5, 10, 10);
																		} else 
																		if (n == over.B) {
																			context.fillStyle = 'rgba(50, 50, 50, 1.0)';
																			context.fillRect(B[n].x - 4, B[n].y - 4, 8, 8);
																		} else {
																			context.fillStyle = 'rgba(50, 50, 50, 1.0)';
																			context.fillRect(B[n].x - 3, B[n].y - 3, 6, 6);
																		}
																	}
																}


																//************************** Rotate ***********************
																if (edit_type == "Rotate"){

																		/*
																		for (var n = 1; n < E.length; n++) if (E[n].enable)
																		if (E[n].selected){
																			arc(E[n].CP[5].x, E[n].CP[5].y, 8, 'rgba(255, 255, 255, 1.0)', 'rgba(100, 100, 100, 1.0)', 2, []);
																			arc(E[n].CP[5].x, E[n].CP[5].y, 2, 'rgba(100, 100, 100, 1.0)', 'rgba(100, 100, 100, 1.0)', 1, []);
																		}
																		*/


																			arc(CR.x, CR.y, 8, 'rgba(255, 255, 255, 1.0)', 'rgba(100, 100, 100, 1.0)', 2, []);
																			arc(CR.x, CR.y, 2, 'rgba(100, 100, 100, 1.0)', 'rgba(100, 100, 100, 1.0)', 1, []);


																			var r = distance2Point(B[9], CR) * scale; // Math.sqrt(DX * DX + DY * DY) * scale;
																			arc(CR.x, CR.y, r, null, 'rgba(100, 100, 100, 1.0)', 1, [4, 4]);


																			for (var n = 9; n <= 12; n++){

																					var DX = B[n].X - CR.X;
																					var DY = B[n].Y - CR.Y;
																					R = Math.sqrt(DX * DX + DY * DY);
																					var angle = -Math.acos(DX / R);
																					if (DY < 0) angle = 2 * Math.PI - angle;

																					var da = 0.02;

																					arc(B[n].x, B[n].y, 3.5,'rgb(50, 50, 50)',  null, 1, []);
																					arc(CR.x, CR.y, r, null, 'rgb(50, 50, 50)', 1, [], angle - Math.PI / 16, angle + Math.PI / 16);

																					if (over.B == n){
																							arc(B[n].x, B[n].y, 4.5,'rgb(50, 50, 50)',  null, 1, []);
																							
																							setStyle('rgb(220, 220, 220)', null, 1, [2, 5]);
																							context.beginPath();
																								context.moveTo(CR.x + r * Math.cos(angle), CR.y + r * Math.sin(angle));
																								context.lineTo(CR.x + 8 * Math.cos(angle), CR.y + 8 * Math.sin(angle));
																							context.stroke();
																					}
																					
																					if (fixed.B == n){
																							arc(B[n].x, B[n].y, 5.5,'rgb(50, 50, 50)',  null, 1, []);
																							
																							setStyle('rgb(150, 150, 150)', null, 1, [2, 5]);
																							context.beginPath();
																								context.moveTo(CR.x + r * Math.cos(angle), CR.y + r * Math.sin(angle));
																								context.lineTo(CR.x + 8 * Math.cos(angle), CR.y + 8 * Math.sin(angle));
																							context.stroke();	
																					}
																			}
																}
														}
								}


												//************************************* draw select area *************************************************
												if (edit_mode == "Select" || edit_mode == "Line Edit" || edit_mode == "Zoom") if (fixed.x) if (!fixed.Element && !fixed.B){
													context.setLineDash([4, 4]);
													context.strokeStyle = 'rgba(125, 125, 125, 1.0)';
													context.strokeRect(clicked.x, canvas.height - clicked.y, over.x - clicked.x, - over.y + clicked.y);
												}


												if (edit_mode == "Line") if (edit_step == 1){
														drawLine({x: clicked.xr, y: canvas.height - clicked.yr}, {x: real.x, y: canvas.height - real.y}, 'rgba(125, 125, 125, 1.0)', 1, [4, 4]);
												}


												if (edit_mode == "Rectangle") if (edit_step == 1){
														setStyle(null, 'rgba(125, 125, 125, 1.0)', 1, [4, 4]);
														context.strokeRect(clicked.xr, canvas.height - clicked.yr, real.x - clicked.x, - real.y + clicked.y);
												}


												if (edit_mode == "Circle") if (edit_step == 1){
															var dx = real.x - clicked.xr;
															var dy = real.y - clicked.yr;
															var r = Math.sqrt(dx * dx + dy * dy);
														arc(clicked.xr, canvas.height - clicked.yr, r, null, 'rgba(125, 125, 125, 1.0)',  1, [4, 4]);
												}


												if (edit_mode == "Spline") if (edit_step == 1){

														var P1 = {X: clicked.xr, Y: canvas.height - clicked.yr}
														var P4 = {X: real.x, Y: canvas.height - real.y}
														
														var P2 = rotate({X: P1.X + (P4.X - P1.X)/2, Y: P1.Y + (P4.Y - P1.Y)/2}, P1, -Math.PI / 6);
														var P3 = rotate({X: P4.X + (P1.X - P4.X)/2, Y: P4.Y + (P1.Y - P4.Y)/2}, P4, -Math.PI / 6);
														
														context.setLineDash([4, 4]);
														context.strokeStyle = 'rgba(125, 125, 125, 1.0)';
														context.beginPath();
															context.moveTo(P1.X, P1.Y);
															context.bezierCurveTo(P2.X, P2.Y, P3.X, P3.Y, P4.X, P4.Y);
														context.stroke();
												}
												
												
														//*********************************** Cursor ******************************************************
														arc(real.x, canvas.height - real.y, 4, 'rgba(255, 255, 255, 1.0)', 'rgba(200, 70, 0, 1.0)', 2, []);
												
														//*********************** draw CROSS points *******************************************************
														if (CROSS.length > 0)
														for (var k = 0; k < CROSS.length; k++) try{
															arc(E[CROSS[k].n].CP[CROSS[k].i].x, E[CROSS[k].n].CP[CROSS[k].i].y, 5, 'rgba(255, 255, 255, 1.0)', 'rgba(200, 70, 0, 1.0)', 2, []);
														} catch(e) {console.log()}


														//*********************** draw INTERSEC points *******************************************************
														if (INTERSECT.length > 0)
														for (var k = 0; k < INTERSECT.length; k++) try{
															arc(INTERSECT[k].x, INTERSECT[k].y, 3, 'rgba(255, 255, 255, 1.0)', 'rgba(200, 70, 0, 1.0)', 2, []);
														} catch(e) {console.log()}


								//************************************ draw scales & cursors ******************************************
								function drawScales(){
									
										//********************************** coordinates *********************
											var len = 50 * scale;

											len = Math.round(len / 50 + 1) * 50;

											var step = len * scale;
											if (step < 30) {len = (len * 2 / 100 + 1) * 100;  if (len > 1000) len = (len * 2 / 1000 + 1) * 1000; if (len > 3000) len = (len * 2 / 1000 + 1) * 1000; step = len * scale}
											if (step < 30) {len = (len * 2 / 100 + 1) * 100;  if (len > 1000) len = (len * 2 / 1000 + 1) * 1000; if (len > 3000) len = (len * 2 / 1000 + 1) * 1000; step = len * scale}
											if (step < 30) {len = (len * 2 / 100 + 1) * 100;  if (len > 1000) len = (len * 2 / 1000 + 1) * 1000; if (len > 3000) len = (len * 2 / 1000 + 1) * 1000; step = len * scale}
											
											for (var n = 0; n < 5; n++){
												if (step > 80) if (len == 5) {len = 2; step = len * scale}
												if (step > 80) if (len == 10) {len = 5; step = len * scale}
												if (step > 80) if (len == 15) {len = 10; step = len * scale}
												if (step > 80) if (len == 25) {len = 10; step = len * scale}
												if (step > 80) if (len == 50) {len = 20; step = len * scale}
												if (step > 80) if (len == 100) {len = 50; step = len * scale}
												if (step > 80) if (len == 150) {len = 100; step = len * scale}
												if (step > 80) if (len == 200) {len = 100; step = len * scale}
												if (step > 80) if (len == 250) {len = 200; step = len * scale}
												if (step > 80) if (len == 300) {len = 150; step = len * scale}
												if (step > 80) if (len == 350) {len = 250; step = len * scale}
												if (step > 80) if (len == 400) {len = 200; step = len * scale}
												if (step > 80) if (len == 450) {len = 200; step = len * scale}
												if (step > 80) if (len == 500) {len = 200; step = len * scale}
												if (step > 80) if (len == 550) {len = 200; step = len * scale}
												if (step > 80) if (len == 600) {len = 200; step = len * scale}
												if (step > 80) if (len == 650) {len = 200; step = len * scale}
												if (step > 80) if (len == 700) {len = 500; step = len * scale}
												if (step > 80) if (len == 750) {len = 500; step = len * scale}
											}

									
											context.font = "400 9px Arial";
											context.textBaseline = "middle";
											context.textAlign = "center";
											context.fillStyle = 'rgba(50, 50, 50, 1.0)';
											context.strokeStyle = 'rgba(125, 125, 125, 0.5)';

									//*************************************** X Scale *************************************
									for (var x = 0; x <= canvas.width / step * 2; x++){
										context.fillRect(O.x  + x * step, 13, 1, 7);
										context.fillText(len * x, O.x  + x * step, 6);
											for (x2 = 1; x2 < 10; x2++) context.fillRect(O.x + x * step + x2 * step/10, 17, 1, 3);
									}

									for (var x = 0; x <= canvas.width / step * 2; x++){
										context.fillRect(O.x  - x * step, 13, 1, 7);
										context.fillText(-len * x, O.x  - x * step, 6);
										for (x2 = 1; x2 < 10; x2++) context.fillRect(O.x - x * step - x2 * step/10, 17, 1, 3);
									}

											//********************************** X Cursor *********************************
											context.fillStyle = 'rgba(200, 100, 50, 1.0)';
											context.beginPath();
												context.moveTo(over.x, 20);
												context.lineTo(over.x - 3, 20 - 9);
												context.lineTo(over.x + 3, 20 - 9);
												context.lineTo(over.x, 20);
											context.fill();

											
									//*************************************** X Scale *************************************
														context.setTransform(1, 0, 0, 1, 0, 0);
														context.translate(canvas.height / 2, canvas.height / 2);
														context.rotate(-Math.PI / 2);
														context.translate(-canvas.height / 2, -canvas.height / 2);
														

											context.fillStyle = 'rgba(50, 50, 50, 1.0)';
									for (var y = 0; y <= canvas.width / step * 2; y++){
										context.fillRect(O.y + y * step, 13, 1, 7);
										context.fillText(len * y, O.y  + y * step, 6);
											for (y2 = 1; y2 < 10; y2++) context.fillRect(O.y + y * step + y2 * step / 10, 17, 1, 3);
									}

									for (var y = 0; y <= canvas.width / step * 2; y++){
										context.fillRect(O.y - y * step, 13, 1, 7);
										context.fillText(-len * y, O.y  - y * step, 6);
										for (y2 = 1; y2 < 10; y2++) context.fillRect(O.y - y * step - y2 * step / 10, 17, 1, 3);
									}
									
											//********************************** Y Cursor *********************************
											context.fillStyle = 'rgba(200, 100, 50, 1.0)';
											context.beginPath();
												context.moveTo(over.y, 20);
												context.lineTo(over.y - 3, 20 - 9);
												context.lineTo(over.y + 3, 20 - 9);
												context.lineTo(over.y, 20);
											context.fill();

												context.setTransform(1, 0, 0, 1, 0, 0);
																											
															
											//**********************************************************************					
											context.fillStyle = 'rgb(240, 240, 240)';
											context.strokeStyle = 'rgb(140, 140, 140)';
											context.font = '300 11px Arial';
										
											context.setLineDash([]);
											context.fillRect(0, 0, 19, 27);
											context.fillRect(0, 0, 27, 19);
											context.fillRect(0, 0, 25, 25);
											
											context.beginPath();
												context.moveTo(20, canvas.height-1);
												context.lineTo(canvas.width-1, canvas.height-1);
												context.lineTo(canvas.width-1, 20);
											context.stroke();
								}


								//********************************** draw sides *******************************************************		
								function drawSides(){		
										context.font = "400 11px  Ubuntu, Arial";
										context.textBaseline = "middle";
										context.textAlign = "center";
										
										context.setLineDash([]);
										context.strokeStyle = 'rgba(125, 125, 125, 0.5)';
										context.lineWidth = 1;

										//********************* Back **************************************************************************************************************									
											context.fillStyle = 'rgb(240, 240, 240)';
											if (over.y > canvas.height - 40) if (over.y < canvas.height - 17) if (over.x > canvas.width / 2 - 40) if (over.x < canvas.width / 2 + 40) context.fillStyle = 'rgb(140, 140, 140)';

										context.beginPath();
											context.moveTo(canvas.width / 2 - 40, 19);
											context.lineTo(canvas.width / 2 - 30, 40);
											context.lineTo(canvas.width / 2 + 30, 40);
											context.lineTo(canvas.width / 2 + 40, 19);
										context.fill();
										context.stroke();
										
											context.fillStyle = 'rgb(100, 100, 100)';
											if (over.y > canvas.height - 40) if (over.y < canvas.height - 17) if (over.x > canvas.width / 2 - 40) if (over.x < canvas.width / 2 + 40) context.fillStyle = 'rgb(255, 255, 255)';
											context.fillText("Back", canvas.width / 2, 30);


										//********************* Front **************************************************************************************************************
											context.fillStyle = 'rgb(240, 240, 240)';
											if (over.y > 0) if (over.y < 23) if (over.x > canvas.width / 2 - 40) if (over.x < canvas.width / 2 + 40) context.fillStyle = 'rgb(140, 140, 140)';

										context.beginPath();
											context.moveTo(canvas.width / 2 - 40, canvas.height);
											context.lineTo(canvas.width / 2 - 30, canvas.height - 21);
											context.lineTo(canvas.width / 2 + 30, canvas.height - 21);
											context.lineTo(canvas.width / 2 + 40, canvas.height);
										context.fill();
										context.stroke();

											context.fillStyle = 'rgb(100, 100, 100)';
											if (over.y > 0) if (over.y < 23) if (over.x > canvas.width / 2 - 40) if (over.x < canvas.width / 2 + 40) context.fillStyle = 'rgb(255, 255, 255)';
											context.fillText("Front", canvas.width / 2, canvas.height - 10);


										//********************* Left **************************************************************************************************************
											context.fillStyle = 'rgb(240, 240, 240)';
											if (over.x > 18) if (over.x < 41) if (over.y > canvas.height / 2 - 40) if (over.y < canvas.height / 2 + 40) context.fillStyle = 'rgb(140, 140, 140)';

										context.beginPath();
											context.moveTo(19, canvas.height / 2 - 40);
											context.lineTo(40, canvas.height / 2 - 30);
											context.lineTo(40, canvas.height / 2 + 30);
											context.lineTo(19, canvas.height / 2 + 40);
										context.fill();
										context.stroke();
										
											context.fillStyle = 'rgb(100, 100, 100)';
											if (over.x > 18) if (over.x < 41) if (over.y > canvas.height / 2 - 40) if (over.y < canvas.height / 2 + 40) context.fillStyle = 'rgb(255, 255, 255)';
											
													context.setTransform(1, 0, 0, 1, 0, 0);
													context.translate(canvas.width / 2, canvas.height / 2);
													context.rotate(-Math.PI / 2);
												context.fillText("Left", 0, -canvas.width / 2 + 30);
													context.setTransform(1, 0, 0, 1, 0, 0);


										//********************* Right **************************************************************************************************************										
											context.fillStyle = 'rgb(240, 240, 240)';
											if (over.x > canvas.width - 22) if (over.x < canvas.width) if (over.y > canvas.height / 2 - 40) if (over.y < canvas.height / 2 + 40) context.fillStyle = 'rgb(140, 140, 140)';

										context.beginPath();
											context.moveTo(canvas.width, canvas.height / 2 - 40);
											context.lineTo(canvas.width - 21, canvas.height / 2 - 30);
											context.lineTo(canvas.width - 21, canvas.height / 2 + 30);
											context.lineTo(canvas.width, canvas.height / 2 + 40);
										context.fill();
										context.stroke();
										
											context.fillStyle = 'rgb(100, 100, 100)';
											if (over.x > canvas.width - 22) if (over.x < canvas.width) if (over.y > canvas.height / 2 - 40) if (over.y < canvas.height / 2 + 40) context.fillStyle = 'rgb(255, 255, 255)';

													context.setTransform(1, 0, 0, 1, 0, 0);
													context.translate(canvas.width / 2, canvas.height / 2);
													context.rotate(Math.PI / 2);
											context.fillText("Right", 0, -canvas.width / 2 + 10);
													context.setTransform(1, 0, 0, 1, 0, 0);
								}


								//********************************** draw cursor & selecting *******************************************************
								function drawCursor(){
										if (edit_mode == "Line") context.drawImage(MAB[1].pic, real.x + 5, canvas.height - real.y + 17, 24, 24);
										if (edit_mode == "Spline") context.drawImage(MAB[2].pic, real.x + 5, canvas.height - real.y + 17, 24, 24);
										if (edit_mode == "Rectangle") context.drawImage(MAB[3].pic, real.x + 5, canvas.height - real.y + 17, 24, 24);
										if (edit_mode == "Circle") context.drawImage(MAB[4].pic, real.x + 5, canvas.height - real.y + 17, 24, 24);
										if (edit_mode == "Freehand") context.drawImage(MAB[5].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										if (edit_mode == "Erase") context.drawImage(MAB[6].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										//if (edit_mode == "Corner") context.drawImage(MAB[7].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										if (edit_mode == "Text") context.drawImage(MAB[8].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										if (edit_mode == "Line Edit") context.drawImage(MAB[9].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										if (edit_mode == "Ruler") context.drawImage(MAB[10].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										if (edit_mode == "Snap to Lines") context.drawImage(MAB[11].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										//if (edit_mode == "Zoom") context.drawImage(MUAB[4].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
								}



								//******************************** draw information ***************************************************	
								function drawInfo(){

											context.textAlign = "left";
											context.fillStyle = 'rgb(40, 40, 40)';
											context.font = '300 11px Arial';
												
											context.fillText('O.x: ' + O.x + " / " + O.X, 100, 40);
											context.fillText('O.y: ' + O.y + " / " + O.Y, 100, 60);
											
											//context.fillText('yy: ' + over.yy, 120, 480);
											context.fillText('edit_mode: ' + edit_mode, 100, 90);
											context.fillText('edit_step: ' + edit_step, 100, 110);											
																
											context.fillText('x: ' + Math.round(over.x), 100, 130);	
											context.fillText('y: ' + Math.round(over.y), 185, 130);
											
											context.fillText('X: ' + Math.round(over.X), 100, 150);	
											context.fillText('Y: ' + Math.round(over.Y), 185, 150);
											
											context.fillText('DX: ' + over.DX , 100, 170);
											context.fillText('DY: ' + over.DY , 185, 170);

											//context.fillText('X: ' + Math.round(over.X), 100, 140);	context.fillText('Y: ' + Math.round(over.Y), 150, 140);

											context.fillText('over_Element: ' + over.Element, 100, 200);  if (over.Element) context.fillText('Element_type: ' + E[over.Element].P.length, 200, 200);
											context.fillText('over_Point: ' + over.Point, 100, 220);
											context.fillText('over_Line: ' + over.Line, 100, 240);

											context.fillText('fixed_Element: ' + fixed.Element, 100, 300);
											context.fillText('fixed_Point: ' + fixed.Point, 100, 320);
											context.fillText('fixed_Line: ' + fixed.Line, 100, 340);
											
											context.fillText('clicked_Element: ' + clicked.Element, 100, 400);
											context.fillText('clicked_Point: ' + clicked.Point, 100, 420);
											context.fillText('clicked_Line: ' + clicked.Line, 100, 440);
											
											context.fillText('over_B: ' + over.B, 100, 480);

											//context.fillText('fixed: ' + fixed.x + ' / ' + fixed.y, 120, 540);
											//context.fillText('clicked: ' + clicked.x + ' / ' + clicked.y, 120, 560);
											
											//for (var n = 1; n < B.length; n++) context.fillText(B[n].XF, 100 * n, 520);
											//if (B[3]) context.fillText(B[3].X + " / " + B[3].Y, 100, 520);
											
											if (over.CR) context.fillText('CR_X: ' + over.CR.X, 100, 520);
											if (over.CR) context.fillText('CR_Y: ' + over.CR.Y, 250, 520);
											
											context.fillText('same_clicked: ' + same_clicked, 100, 540);
											context.fillText('selected_groups: ' + selected_groups.length, 100, 565);
								}
			
			}



						/**
						 * Creating element.
						 *
						 * @param {string} type.
						 * @param {array} ControlPoints {X: {number}, Y: {number}}
						 * @param {array} Points
						 */
						function add_Element(type, ControlPoints, Points){
								var e = {};

								// Element type.
								e.type = type;
								// Control points {X: {number}, Y: {number}}
								e.CP = [];
								//Points
								e.P = [];

								e.enable = true;

								if (ControlPoints) for (var n = 0; n < ControlPoints.length; n++) e.CP.push(ControlPoints[n]);
								if (Points) for (var n = 0; n < Points.length; n++) e.P.push(Points[n]);
								
								E.push(e);
								e.num = E.length - 1;
								
								return e;
						}



						//**************************************** add_Line *****************************************
						function add_Line(P1, P2){
							var line = add_Element('line', [{X: (P2.X + P1.X) / 2, Y: (P2.Y + P1.Y) / 2}, P1, P2]);

							recalculateCurve(line);

							return line;
						}



						//*************************************** add_Circle ****************************************
						function add_Circle(Center, Radius, startAngle, endAngle){
							var P0 = {X: Center.X, Y: Center.Y};

								if (!startAngle) startAngle = 0;
								if (!endAngle)   endAngle = 2 * Math.PI;		

							var P1 = {X: Center.X + Radius, Y: Center.Y};

							var P2 = rotate({X: Center.X + Radius, Y: Center.Y}, {X: Center.X, Y: Center.Y}, startAngle);
							var P3 = rotate({X: Center.X + Radius, Y: Center.Y}, {X: Center.X, Y: Center.Y}, endAngle);
							
							var circle = add_Element('circle', [P0, P1, P2, P3], []);

								circle.R = Radius;
								circle.startAngle = startAngle;
								circle.endAngle = endAngle;

								recalculateCurve(circle);

							return circle;
						}



						//*************************************** add_Spline ****************************************
						function add_Spline(P1, P4){

							var P0 = {X: (P4.X + P1.X) / 2, Y: (P4.Y + P1.Y) / 2};

							var P2 = rotate(P0, P1, Math.PI / 6);
							var P3 = rotate(P0, P4, Math.PI / 6);

							var spline = add_Element('spline', [P0, P1, P2, P3, P4]);
							recalculateCurve(spline);

							return spline;
						}



			//************************************ getOverMouse *****************************************
			function getOverMouse(e){
				var pos = mouseXY(e, canvas);
				
				var result = {x: pos.x, y: canvas.height - pos.y}

				result.X = (result.x - O.x) / scale;
				result.Y = (result.y - O.y) / scale;
				
				var DSS = 5 / scale;
						
						//************************ check lines *******************************
						for (var n = 1; n < E.length; n++) if (E[n].enable){
							for (var i = 0; i < E[n].P.length - 1; i++){
									var CRL = nearLine(E[n].P[i], E[n].P[i+1], result, DSS);
									if (CRL){
										result.Line = i;
										result.Element = n;
										result.CR = {X: CRL.X, Y: CRL.Y}
									}
							}
						}


						//********************** check points *******************************
						for (var n = 1; n < E.length; n++) if (E[n].enable)
								if (E[n].selected)
								for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
										var DX = result.X - E[n].CP[i].X;
										var DY = result.Y - E[n].CP[i].Y;
										var DS = Math.sqrt(DX * DX + DY * DY);
										if (DS < DSS) {
											result.Point = i;
											result.Element = n;
											//result.Line = null;
										}
								}


						//********************** check bound points ********************************
						for (var n = 1; n < B.length; n++){
							var DX = result.X - B[n].X;
							var DY = result.Y - B[n].Y;
							var DS = Math.sqrt(DX * DX + DY * DY); //if (n == 3) console.log(DS)
							if (DS < DSS) result.B = n;
						}


				if (fixed.x) {
					result.dx = result.x - fixed.x;
					result.dy = result.y - fixed.y;
					result.DX = result.dx / scale;
					result.DY = result.dy / scale;
				}

					return result;
			}


			//********************************* Select_Elements_inRect **********************************
			function select_Elements_inRect(pos1, pos2){
				if (!pos1) return

				var extr = getExtremums([pos1, pos2]);

				for (var n = 0; n < E.length; n++) E[n].preselected = false;

				for (n = 0; n < E.length; n++) if (E[n].enable){
						var hited = true;
					if (hited) if (E[n].P.length > 0)
					for (var i = 0; i < E[n].P.length; i++)
						if (E[n].P[i].X < extr.min.X - 7 || E[n].P[i].X > extr.max.X + 7 || E[n].P[i].Y < extr.min.Y - 7 || E[n].P[i].Y > extr.max.Y + 7) hited = false;

					if (hited) if (E[n].P.length > 0) E[n].preselected = true;
				}


					MUAB[0].pic.src = MUAB_A[0].pic;
					MUAB[1].pic.src = MUAB_A[1].pic;
					selected_groups = [];

				for (n = 0; n < E.length; n++) if (E[n].preselected) if (!E[n].selected){
						var self_group = -1;
					for (var g = 0; g < G.length; g++) if (G[g].enable) 
					for (var i = 0; i < G[g].E.length; i++) if (G[g].E[i] == n) self_group = g;

						//console.log(self_group)

					if (self_group  < 0){
						E[n].selected = true;
						if (E[n].P.length > 3) MUAB[0].pic.src = MUAB_A[0].pic_active;
					}

					if (self_group >= 0){
							var full_group = true;
						for (i = 0; i < G[self_group].E.length; i++) if (!E[G[self_group].E[i]].preselected) full_group = false;
							//console.log(full_group)
						if (full_group) {
							for (i = 0; i < G[self_group].E.length; i++) E[G[self_group].E[i]].selected = true;
							//MUAB[0].pic.src = MUAB_A[0].pic_active;
							MUAB[1].pic.src = MUAB_A[1].pic_active;
							selected_groups.push(self_group);
						}
					}
				}
						//console.log(selected_groups);
				
			}


			//******************************************* Set Bound *************************************
			function setBound(calculate_only){
						if (!calculate_only) B = [];
						var selected = [];
						
						circle_selected = [];
						line_selected = [];
						spline_selected = [];
						Zvalue = null;
						//diff = false;
							
					for (var n = 0; n < E.length; n ++) if (E[n].enable) if (E[n].selected){
						selected.push(n);
						if (E[n].type == "line")		line_selected.push(E[n]);
						if (E[n].type == "circle") 		circle_selected.push(E[n]);
						if (E[n].type == "spline") 		spline_selected.push(E[n]);
						//if (E[n].Z) if (!Zvalue) {(Zvalue = E[n].Z)} else {if (Zvalue != E[n].Z) diff = true}
						Zvalue = E[n].Z;
					}
					if (selected.length == 0) return
					
						//if (diff) Zvalue = '';

						var POSARR = [];
					for (var n = 0; n < selected.length; n++)
						for (var i = 0; i < E[selected[n]].P.length; i++) if (E[selected[n]].P[i]){
							POSARR.push(E[selected[n]].P[i]);
							//if (E[selected[n]].kind == )
						}

					var extremums = getExtremums(POSARR);

					if (!extremums) return
					try{
						extremums.min.x = O.x + extremums.min.X * scale - 12;
						extremums.max.y = canvas.height - (O.y + extremums.min.Y * scale) + 12;
						extremums.max.x = O.x + extremums.max.X * scale + 12;
						extremums.min.y = canvas.height - (O.y + extremums.max.Y * scale) - 12;
						
							input_Width.value = Math.round((extremums.max.X - extremums.min.X) * 1000) / 1000 + " \'\'";
							input_Height.value = Math.round((extremums.max.Y - extremums.min.Y) * 1000) / 1000 + " \'\'";
							
							input_Z.value = "0.76 \'\'";
							if (Zvalue ) input_Z.value = Zvalue + " \'\'";
							if (Zvalue == -1E8) input_Z.value ="Air inside";

							if (calculate_only) return(extremums)

						extremums.min.X -= 12 / scale;
						extremums.min.Y -= 12 / scale;
						extremums.max.X += 12 / scale;
						extremums.max.Y += 12 / scale;
					} catch(e){console.log("error", extremums)}

						B[1] = {x: extremums.min.x, y: extremums.max.y, X: extremums.min.X, Y: extremums.min.Y}
						B[2] = {x: extremums.min.x, y: extremums.min.y, X: extremums.min.X, Y: extremums.max.Y}
						B[3] = {x: extremums.max.x, y: extremums.min.y, X: extremums.max.X, Y: extremums.max.Y}
						B[4] = {x: extremums.max.x, y: extremums.max.y, X: extremums.max.X, Y: extremums.min.Y}

							var dmx = (extremums.max.x - extremums.min.x) / 2;
							var dmy = (extremums.max.y - extremums.min.y) / 2;

							var DMX = (extremums.max.X - extremums.min.X) / 2;
							var DMY = (extremums.max.Y - extremums.min.Y) / 2;

						B[5] = {x: extremums.min.x, y: extremums.max.y - dmy, X: extremums.min.X, Y: extremums.min.Y + DMY}
						B[6] = {x: extremums.min.x + dmx, y: extremums.min.y, X: extremums.min.X + DMX, Y: extremums.max.Y}
						B[7] = {x: extremums.max.x, y: extremums.max.y - dmy, X: extremums.max.X, Y: extremums.min.Y + DMY}
						B[8] = {x: extremums.min.x + dmx, y: extremums.max.y, X: extremums.min.X + DMX, Y: extremums.min.Y}

						//***************************** rotate center ***********************************************
						CR = {X: (extremums.min.X + extremums.max.X) / 2, Y: (extremums.min.Y + extremums.max.Y) / 2}

						//***************************** rotate radius ***********************************************
						//if (edit_mode == 'Select')
						//if (edit_type == 'Rotate'){
							var R = 0;
							for (var i = 0; i < POSARR.length; i++){
								var d = distance2Point(CR, POSARR[i]);
								if (d > R) R = d;
							}

								R += 12 / scale;

								B[9] = rotate({X: CR.X + R, Y: CR.Y}, CR, 1 * Math.PI / 4);	
								B[9].x = O.x + B[9].X * scale;
								B[9].y = canvas.height - (O.y + B[9].Y * scale);
								
								B[10] = rotate({X: CR.X + R, Y: CR.Y}, CR, 3 * Math.PI / 4);	
								B[10].x = O.x + B[10].X * scale;
								B[10].y = canvas.height - (O.y + B[10].Y * scale);
								
								B[11] = rotate({X: CR.X + R, Y: CR.Y}, CR, 5 * Math.PI / 4);	
								B[11].x = O.x + B[11].X * scale;
								B[11].y = canvas.height - (O.y + B[11].Y * scale);
								
								B[12] = rotate({X: CR.X + R, Y: CR.Y}, CR, 7 * Math.PI / 4);	
								B[12].x = O.x + B[12].X * scale;
								B[12].y = canvas.height - (O.y + B[12].Y * scale);


						//*******************************************************
						transform_panel.show();

						//*******************************************************
							var Auto_count = 0;
							var Bend_count = 0;
							var Tap_count = 0;
						
						for (var n = 1; n < E.length; n++) if (E[n].selected) {
							if (!E[n].lineType) Auto_count ++;
							if (E[n].lineType == "auto") Auto_count ++;
							if (E[n].lineType == "bend") Bend_count ++;
							if (E[n].lineType == "tap") Tap_count ++;
						}
						
						select_LineType.value = "";
						if (Auto_count > 0 && Bend_count == 0 && Tap_count == 0) select_LineType.value = "Auto";
						if (Bend_count > 0 && Auto_count == 0 && Tap_count == 0) select_LineType.value = "Bend";
						if (Tap_count > 0 && Auto_count == 0 && Bend_count == 0) select_LineType.value = "Tap";

			}


			//************************************ check Cross ******************************************
			function checkCross(e_num, p_num){
					
					CROSS = [];
					MIN = {DS: 1000000000, DX: 0, DY: 0, N: -1, I: -1};
					real = {}


				//*********************************** moving points ***********************************************************
				if (edit_mode == "Select" && e_num && p_num){
					
						for (var n = 0; n < E.length; n++) if (E[n].enable) if (n != e_num)
							for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
								var DX = E[n].CP[i].X - E[e_num].CP[p_num].X;
								var DY = E[n].CP[i].Y - E[e_num].CP[p_num].Y;
								var DS = Math.sqrt(DX * DX + DY * DY);
								if (DS < MIN.DS) MIN = {DS: DS, X: E[n].CP[i].X, Y: E[n].CP[i].Y, N: n, I: i};

							}

						if (MIN.DS < 10 / scale){
								CROSS.push({n: MIN.N, i: MIN.I, kind: "selected"});
									E[e_num].CP[p_num].X = MIN.X;
									E[e_num].CP[p_num].Y = MIN.Y;
									
									if (E[e_num].type == "spline") if (p_num == 1){
										E[e_num].CP[2].X = E[e_num].CP[2].XF + MIN.X - E[e_num].CP[1].XF;
										E[e_num].CP[2].Y = E[e_num].CP[2].YF + MIN.Y - E[e_num].CP[1].YF;
									}
									
									if (E[e_num].type == "spline") if (p_num == 4){
										E[e_num].CP[3].X = E[e_num].CP[3].XF + MIN.X - E[e_num].CP[4].XF;
										E[e_num].CP[3].Y = E[e_num].CP[3].YF + MIN.Y - E[e_num].CP[4].YF;
									}
						}

					return
				}


				//*********************************** drawing new lines *******************************************************
				if (edit_mode == "Line" || edit_mode == "Rectangle" || edit_mode == "Circle" || edit_mode == "Spline" )
				if (!fixed.Element){
								real = {x: over.x, y: over.y, X: over.X, Y: over.Y}
						for (var n = 0; n < E.length; n++) if (E[n].enable)
							for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
								var DX = over.X - E[n].CP[i].X ;
								var DY = over.Y - E[n].CP[i].Y;
								var DS = Math.sqrt(DX * DX + DY * DY);
								if (DS < MIN.DS) MIN = {DS: DS, DX: DX, DY: DY, N: n, I: i};
							}

						if (MIN.DS < 10 / scale){
							real.X -= MIN.DX;
							real.Y -= MIN.DY;
							CROSS.push({n: MIN.N, i: MIN.I, kind: "selected"});
						}
							real.x = real.X * scale + O.x;
							real.y = real.Y * scale + O.y;

					return
				}

				
				//********************************** moving elements ****************************************************	
				for (var n = 0; n < E.length; n++) if (E[n].enable) if (E[n].selected)
					for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){

						for (var m = 0; m < E.length; m++) if (E[m].enable) if (!E[m].selected)
							for (var j = 0; j < E[m].CP.length; j++) if (E[m].CP[j]){
								var DX = E[n].CP[i].X - E[m].CP[j].X;
								var DY = E[n].CP[i].Y - E[m].CP[j].Y;
								var DS = Math.sqrt(DX * DX + DY * DY);
								if (DS < MIN.DS) MIN = {DS: DS, DX: DX, DY: DY, N: n, I: i};
							}
					}

					if (MIN.DS < 10 / scale){
							CROSS.push({n: MIN.N, i: MIN.I, kind: "selected"});
						for (var n = 0; n < E.length; n++) if (E[n].enable) if (E[n].selected)
							for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
								E[n].CP[i].X -= MIN.DX;
								E[n].CP[i].Y -= MIN.DY;
							}
					}
			}


			//************************************ skip Selected ****************************************
			function skipSelected(){
				for (var n = 0; n < E.length; n++){
					E[n].selected = false;
					E[n].clickCount = 0;
				}
					transform_panel.hide();
					/*
					select_LineType.style.display = "none";
					input_Width.parent.style.display = "none";
					input_Height.parent.style.display = "none";
					input_Z.parent.style.display = "none";
					button_Copy.hide();
					button_Up.hide();
					button_Down.hide();
					button_Left.hide();
					button_Right.hide();
					input_Length.parent.style.display = "none";
					button_Clock.hide();
					button_UnClock.hide();
					input_Angle.parent.style.display = "none";
					*/
			}


			//************************************ fix Points *******************************************
			function fixPoints(){
					for (var n = 0; n < E.length; n++) if (E[n].enable)
						if (E[n].selected){
							for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
									E[n].CP[i].XF = E[n].CP[i].X;
									E[n].CP[i].YF = E[n].CP[i].Y;
							}
							for (var i = 0; i < E[n].P.length; i++){
									E[n].P[i].XF = E[n].P[i].X;
									E[n].P[i].YF = E[n].P[i].Y;
							}
									// {number} RF Radius.
									E[n].RF = E[n].R;
						}

					for (var n = 1; n < B.length; n++) BF[n] = {X: B[n].X, Y: B[n].Y};
					//CRF = {X: CR.X, Y: CR.Y}
			}


			//*************************************** get Extremums *************************************
			function getExtremums(POSARR, hint){
					//console.log(hint + " / " + POSARR[0].X)
				if (!POSARR) return
				if (POSARR.length == 0) return
					var result = {min: {X: POSARR[0].X, Y: POSARR[0].Y}, max: {X: POSARR[0].X, Y: POSARR[0].Y}}
				for (var n = 1; n < POSARR.length; n++){
					if (POSARR[n].X < result.min.X) result.min.X = POSARR[n].X;
					if (POSARR[n].Y < result.min.Y) result.min.Y = POSARR[n].Y;
					if (POSARR[n].X > result.max.X) result.max.X = POSARR[n].X;
					if (POSARR[n].Y > result.max.Y) result.max.Y = POSARR[n].Y;
				}
					return result;
			}


			//************************************ refresh_All ******************************************
			function refresh_All(){
				for (var n = 0; n < E.length; n++) if (E[n].enable){ //E[n].refreshSceneCoords();

						for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
							E[n].CP[i].x = O.x + E[n].CP[i].X * scale;
							E[n].CP[i].y = canvas.height - (O.y + E[n].CP[i].Y * scale);
						}
						
						for (var i = 0; i < E[n].P.length; i++){
							E[n].P[i].x = O.x + E[n].P[i].X * scale;
							E[n].P[i].y = canvas.height - (O.y + E[n].P[i].Y * scale);
						}
				}


				for (n = 1; n < B.length; n++) if (B[n]){
						B[n].x = O.x + B[n].X * scale;
						B[n].y = canvas.height - (O.y + B[n].Y * scale);
				}
					
					
				for (n = 0; n < INTERSECT.length; n++) if (INTERSECT[n]){
						INTERSECT[n].x = O.x + INTERSECT[n].X * scale;
						INTERSECT[n].y = canvas.height - (O.y + INTERSECT[n].Y * scale);
				}

						CR.x = O.x + CR.X * scale;
						CR.y = canvas.height - (O.y + CR.Y * scale);
			}


			//************************************** rotate *********************************************
			function rotate(point, center, angle){

				var DX = point.X - center.X;
				var DY = point.Y - center.Y;

				result = {}
				result.X = DX * Math.cos(angle) - DY * Math.sin(angle) + center.X;
				result.Y = DX * Math.sin(angle) + DY * Math.cos(angle) + center.Y;

				return result;
			}


			//************************************ refreshSelectedCircles *******************************
			function refreshSelectedCircles(){
					return
				
				for (var n = 0; n < E.length; n++) if (E[n].selected) if (E[n].type == "circle"){

					var CX = E[n].CP[0].X;
					var CY = E[n].CP[0].Y;
					var R = Math.abs(E[n].CP[1].X - CX);
					var R2 = Math.abs(E[n].CP[2].Y - CY);
					if (R2 < R) R = R2;

					E[n].CP[1] = {X: CX + R, Y: CY}
					E[n].CP[2] = {X: CX, Y: CY + R}
					E[n].CP[3] = {X: CX - R, Y: CY}
					E[n].CP[4] = {X: CX, Y: CY - R}
				}
			}


			//************************************ recalculate Curve ************************************
			function recalculateCurve(e, steps){

				if (!e) return

				//*********************** Line ********************************
				if (e.type == "line"){
					var extremums = getExtremums(e.CP);

						e.CP[0].X = (extremums.min.X + extremums.max.X) / 2;
						e.CP[0].Y = (extremums.min.Y + extremums.max.Y) / 2;
					
						if (!e.O) e.O = { }
						if (!e.O.unique) e.O = {X:(extremums.max.X + extremums.min.X) / 2, Y: (extremums.max.Y + extremums.min.Y) / 2 }

						for (var i = 1; i < e.CP.length; i++) e.P[i-1] = {X: e.CP[i].X, Y: e.CP[i].Y}
						//if (e.closed) e.P[e.CP.length-1] = {X: e.CP[1].X, Y: e.CP[1].Y};

					return
				}


				//*********************** Circle ********************************
				if (e.type == "circle"){
					if (!e.O) e.O = { }
					if (!e.O.unique) e.O = e.CP[0];

					//e.R = projections(e.CP[0], e.CP[1]).R;
					e.startAngle = projections(e.CP[0], e.CP[2]).angle;
					e.endAngle = projections(e.CP[0], e.CP[3]).angle;
					
						if (Math.abs(e.startAngle - e.endAngle) < 0.000000000001) e.endAngle += 2 * Math.PI;

						var start = e.startAngle;
						var end = e.endAngle;	 if (start >= end) end += 2 * Math.PI;
					/*	
						if (end > 2 * Math.PI) if (end - start > 2 * Math.PI) end -= 2 * Math.PI;
						//if (end - start >= 2 * Math.PI) end -= 2 * Math.PI; 
						
						e.startAngle = start; //if (e.startAngle > 2 * Math.PI) e.startAngle -= 2 * Math.PI;
						e.endAngle = end; //if (e.endAngle > 2 * Math.PI) e.endAngle -= 2 * Math.PI; if (e.endAngle > 2 * Math.PI) e.endAngle -= 2 * Math.PI;
						
							//console.log("startAngle: " + e.startAngle * 180 / Math.PI, "endAngle: " + e.endAngle * 180 / Math.PI);
							//console.log("start: " + start, "end: " + end);
					*/

						e.P = [];
					for (var a = start; a < end; a += Math.PI / 100) e.P.push({X: e.CP[0].X + e.R * Math.cos(a), Y: e.CP[0].Y + e.R * Math.sin(a)});
						e.P.push({X: e.CP[0].X + e.R * Math.cos(end), Y: e.CP[0].Y + e.R * Math.sin(end)});

					return
				}


				//*********************** Spline ********************************
				if (e.type == "spline"){

					/*
						var V = e.CP;
						e.P = [];
						var KnotValues = [-1, 0,0,0,0, 1,1,1,1];
						var N = [];

						for (var t = 0; t <= 1; t+= 0.03){

								for (var i = 1; i < KnotValues.length + 4; i++){
									N[i] = [];
									for (var k = 0; k < 5; k++) N[i][k] = 0;
									if (t >= KnotValues[i]) if (t < KnotValues[i+1]) N[i][0] = 1;
								}

								for (k = 1; k < 4; k++)
								for (i = 1; i <= 4; i++){
									var n1 = N[i][k-1] * (t - KnotValues[i]) / (KnotValues[i+k] - KnotValues[i] + 0.00000000001);
									var n2 = N[i][k] = N[i+1][k-1] * (KnotValues[i+k+1] - t) / (KnotValues[i+k+1] - KnotValues[i+1] + 0.0000000001);
									N[i][k] = n1 + n2;
								}

									var X = 0;
									var Y = 0;
									var degree = 3;
								for (i = 1; i <= 4; i++) if (N[i][degree]){
									X += V[i].X * N[i][degree];
									Y += V[i].Y * N[i][degree];
									
								}
									//context.strokeRect(X - 2, Y - 2, 4, 4);
									e.P.push({X: X, Y: Y});
									if (t > 0.48 && t < 0.52) {
										e.CP[0] = {X: X, Y: Y};
										if (!e.CP[5].unique) e.CP[5] = {X: X, Y: Y};
									}
						}					

									//console.log(e.P);
									e.P.push(V[4]);
						*/


								//****************************** Bezier *******************************
								if (!steps) steps = 100;
								//var steps = 40;
									e.P = [];
								for (var g = 0; g <= steps; g++){
									t = g / steps;
									q1 = t*t*t*-1 + t*t*3 + t*(-3) + 1;
									q2 = t*t*t*3 + t*t*(-6) + t*3;
									q3 = t*t*t*(-3) + t*t*3;
									q4 = t*t*t;	
																									
									var X = q1 * e.CP[1].X + q2 * e.CP[2].X + q3 * e.CP[3].X + q4 * e.CP[4].X;
									var Y = q1 * e.CP[1].Y + q2 * e.CP[2].Y + q3 * e.CP[3].Y + q4 * e.CP[4].Y;
									e.P.push({X: X, Y: Y});
									
									if (g == 500) e.CP[0] = {X: X, Y: Y};
								}
									if (!e.O) e.O = {}
									if (!e.O.unique) e.O = e.CP[0];

				}
			}


			//************************************ nearLine *********************************************
			function nearLine(P1, P2, POS, DSS){

					if (Math.abs(P2.X - P1.X) > Math.abs(P2.Y - P1.Y)){
						var X = POS.X;
						var Y = (X * (P2.Y - P1.Y) - P1.X * P2.Y + P2.X * P1.Y) / (P2.X - P1.X);
						var DS = Math.abs(POS.Y - Y);
					} else {
						var Y = POS.Y;
						var X = (POS.Y * (P2.X - P1.X) + P1.X * P2.Y - P2.X * P1.Y) / (P2.Y - P1.Y);
						var DS = Math.abs(POS.X - X);
					}
						
						if (DS < DSS){
							var extr = getExtremums([P1, P2]);
							if (X > extr.min.X - DSS)
							if (X < extr.max.X + DSS)
							if (Y > extr.min.Y - DSS)
							if (Y < extr.max.Y + DSS) return {X: X, Y: Y};
						}
			}


			//************************************ distance2Point ***************************************
			function distance2Point(P1, P2){
					var DX = P2.X - P1.X;
					var DY = P2.Y - P1.Y;
					return Math.sqrt(DX * DX + DY * DY);
			}


			//************************************ distance2Straight ************************************
			function distance2Straight(P1, P2, POS ){

					if (Math.abs(P2.X - P1.X) > Math.abs(P2.Y - P1.Y)){
						var Y = (POS.X * (P2.Y - P1.Y) - P1.X * P2.Y + P2.X * P1.Y) / (P2.X - P1.X);
						return Math.abs(POS.Y - Y);
					}
						var X = (POS.Y * (P2.X - P1.X) + P1.X * P2.Y - P2.X * P1.Y) / (P2.Y - P1.Y);
						return Math.abs(POS.X - X);
			}


			//************************************* intersect *******************************************
			function intersect(P1, P2, P3, P4){

				if (P1.X == P3.X && P1.Y == P3.Y) return
				if (P2.X == P3.X && P2.Y == P3.Y) return
				if (P1.X == P4.X && P1.Y == P4.Y) return
				if (P2.X == P4.X && P2.Y == P4.Y) return
				
				var DIV = (P1.X - P2.X) * (P3.Y - P4.Y) - (P1.Y - P2.Y) * (P3.X - P4.X);

				if (DIV == 0) return

				var X = ( (P1.X * P2.Y - P1.Y * P2.X) * (P3.X - P4.X) - (P1.X - P2.X) * (P3.X * P4.Y - P3.Y * P4.X) ) / DIV;
				var Y = ( (P1.X * P2.Y - P1.Y * P2.X) * (P3.Y - P4.Y) - (P1.Y - P2.Y) * (P3.X * P4.Y - P3.Y * P4.X) ) / DIV;

				var E1 = getExtremums([P1, P2]);
				var E2 = getExtremums([P3, P4]);
				
				var ds = 0.001;

				if (X >= E1.min.X - ds) if (X <= E1.max.X + ds) if (Y >= E1.min.Y - ds) if (Y <= E1.max.Y + ds)
				if (X >= E2.min.X - ds) if (X <= E2.max.X + ds) if (Y >= E2.min.Y - ds) if (Y <= E2.max.Y + ds) return {X: X, Y: Y}
			}


			//************************************* intersectLineCircle *******************************************
			function intersectLineCircle(P1, P2, C, R, startAngle, endAngle){
				var dx = P2.X - P1.X; if (dx == 0) dx = 0.00000000001;
				var dy = P2.Y - P1.Y; if (dy == 0) dy = 0.00000000001;
				var alpha = Math.atan(dy / dx);

				var s = dx * Math.sin(alpha);

				var dpx = C.X - P2.X;
				var dpy = C.Y - P1.Y;
				var h = dy * (dx + dpx) / dx - dpy;
				var S = s * h / dy;

				if (S > R + 0.001) return

				var w = h * dx / dy;
				var gamma = Math.asin(w * Math.sin(alpha) / R);
				var beta = Math.PI - alpha - gamma;

				var Y1 = C.Y + R * Math.sin(beta);
				var X1 = C.X - R * Math.cos(beta);
				
					//console.log("X1: " + X1, "Y1: " + Y1);
					//console.log("R: " + R, "beta: " + beta);

					var result = {}
					var E = getExtremums([P1, P2]);
					var ds = 0.01;

					if (X1 >= E.min.X - ds) if (X1 <= E.max.X + ds) if (Y1 >= E.min.Y - ds) if (Y1 <= E.max.Y + ds) result.P1 = {X: X1, Y: Y1}

				var psi = Math.PI / 2 - alpha - beta;
				//var omega = Math.PI / 2 - alpha;
				var teta = Math.PI / 2 - beta - 2 * psi;

				var Y2 = C.Y + R * Math.cos(teta);
				var X2 = C.X - R * Math.sin(teta);
					if (X2 >= E.min.X - ds) if (X2 <= E.max.X + ds) if (Y2 >= E.min.Y - ds) if (Y2 <= E.max.Y + ds) result.P2 = {X: X2, Y: Y2}

				if (result.P1) result.P1.angle = getAngle(result.P1, C, startAngle, endAngle);
				if (result.P2) result.P2.angle = getAngle(result.P2, C, startAngle, endAngle);
				

						//***********************************************
						function getAngle(P, C, start, end){
							var DX = P.X - C.X;
							var DY = P.Y - C.Y;
							var R = Math.sqrt(DX * DX + DY * DY);
							var angle = Math.acos(DX / R);
							if (DY < 0) angle = 2 * Math.PI - angle;
							if (angle >= start && angle <= end)	return angle;
						};


						//INTERSECT = [];
						//INTERSECT.push(C);
						//if (result.P1) if (result.P1.angle) INTERSECT.push({X: X1, Y: Y1});
						//if (result.P2) if (result.P2.angle) INTERSECT.push({X: X2, Y: Y2});

				//console.log(result);		
				return result	
				
			}


			//************************************* intersectTwoCircles *******************************************
			function intersectTwoCircles(C1, R1, startAngle1, endAngle1, C2, R2, startAngle2, endAngle2){

				var dx = C2.X - C1.X;
				var dy = C2.Y - C1.Y;
				var ds = Math.sqrt(dx*dx + dy*dy);

				if (ds > R1 + R2) return;

				var dr = Math.abs(R2 - R1);
				if (ds < dr) return

				var alpha = Math.acos((R2*R2 + ds*ds - R1*R1) / 2 / R2 / ds);
				var h = R2 * Math.sin(alpha);
				var w = R2 * Math.cos(alpha);

				var beta = Math.acos(dx / ds);
				if (dy < 0) beta = 2 * Math.PI - beta;

				var P1 = rotate({X: C2.X - w, Y: C2.Y + h}, C2, beta);
				var P2 = rotate({X: C2.X - w, Y: C2.Y - h}, C2, beta);

				var Angle1 = getAngle(P1, C1, startAngle1, endAngle1);
				var Angle2 = getAngle(P2, C1, startAngle1, endAngle1);

				if (Angle1) var Angle3 = getAngle(P1, C2, startAngle2, endAngle2);
				if (Angle2) var Angle4 = getAngle(P2, C2, startAngle2, endAngle2);

					if (Angle3)	P1.angle = Angle1;
					if (Angle4)	P2.angle = Angle2;

						//***********************************************
						function getAngle(P, C, start, end){
							var DX = P.X - C.X;
							var DY = P.Y - C.Y;
							var R = Math.sqrt(DX * DX + DY * DY);
							var angle = Math.acos(DX / R);
							if (DY < 0) angle = 2 * Math.PI - angle;
							if (angle >= start && angle <= end)	return angle;
						};

					return {P1: P1, P2: P2}
			}




			//************************************* tangentsTwoCircles *******************************************
			function tangentsTwoCircles(C1, R1, C2, R2){

				if (R1 > R2){
					var TR = R1;
					R1 = R2;
					R2 = TR;
					var TC = {X: C1.X, Y: C1.Y}
					C1 = {X: C2.X, Y: C2.Y}
					C2 = {X: TC.X, Y: TC.Y}
				}

				var DX = C1.X - C2.X;
				var DY = C1.Y - C2.Y;
				var DR = Math.sqrt(DX * DX + DY * DY);

				var DRR = R2 - R1;
				if (DRR == 0) DRR = 0.0000000000001;

				if (DR < DRR) return;

				var DS = R1 * DR / DRR;

				var DSX = (DS + DR) * DX / DR - DX;
				var DSY = DY * (DR + DS) / DR;

				var C0 = {X: C1.X + DSX, Y: C1.Y + DSY - DY}

				var P = projections(C2, C0);

				var C1_A = rotate(C1, C2, -P.angle);
				var C0_A = rotate(C0, C2, -P.angle);

					var gamma = Math.acos(R1 / DS);

					//showMessage(gamma * 180 / Math.PI);

					var T1 = rotate({X: C1_A.X + R1, Y: C1_A.Y}, C1_A, gamma);
					var T2 = rotate({X: C1_A.X + R1, Y: C1_A.Y}, C1_A, -gamma);

						T1 = rotate(T1, C2, P.angle);
						T2 = rotate(T2, C2, P.angle);

					var T3 = rotate({X: C2.X + R2, Y: C2.Y}, C2, gamma);
					var T4 = rotate({X: C2.X + R2, Y: C2.Y}, C2, -gamma);

						T3 = rotate(T3, C2, P.angle);
						T4 = rotate(T4, C2, P.angle);

					var teta = Math.acos((R1 + R2) / DR);

					var T5 = rotate({X: C2.X + R2, Y: C2.Y}, C2, teta);
					var T6 = rotate({X: C2.X + R2, Y: C2.Y}, C2, -teta);

					var T7 = rotate({X: C1_A.X - R1, Y: C1_A.Y}, C1_A, -teta);
					var T8 = rotate({X: C1_A.X - R1, Y: C1_A.Y}, C1_A, teta);	

						T5 = rotate(T5, C2, P.angle);
						T6 = rotate(T6, C2, P.angle);

						T7 = rotate(T7, C2, P.angle);
						T8 = rotate(T8, C2, P.angle);

					/*
					var	angle = projections(C1, T1).angle;	T1 = {X: C1.X + R1 * Math.cos(angle), Y: C1.Y + R1 * Math.sin(angle)}
						angle = projections(C1, T2).angle;	T2 = {X: C1.X + R1 * Math.cos(angle), Y: C1.Y + R1 * Math.sin(angle)}
						angle = projections(C1, T7).angle;	T7 = {X: C1.X + R1 * Math.cos(angle), Y: C1.Y + R1 * Math.sin(angle)}
						angle = projections(C1, T8).angle;	T8 = {X: C1.X + R1 * Math.cos(angle), Y: C1.Y + R1 * Math.sin(angle)}

						angle = projections(C2, T3).angle;	T3 = {X: C2.X + R2 * Math.cos(angle), Y: C2.Y + R2 * Math.sin(angle)}
						angle = projections(C2, T4).angle;	T4 = {X: C2.X + R2 * Math.cos(angle), Y: C2.Y + R2 * Math.sin(angle)}
						angle = projections(C2, T5).angle;	T5 = {X: C2.X + R2 * Math.cos(angle), Y: C2.Y + R2 * Math.sin(angle)}
						angle = projections(C2, T6).angle;	T6 = {X: C2.X + R2 * Math.cos(angle), Y: C2.Y + R2 * Math.sin(angle)}
					*/

						add_Line(T1, T3).selected = true;
						add_Line(T2, T4).selected = true;
						add_Line(T5, T8).selected = true;
						add_Line(T6, T7).selected = true;

				refresh_All();
				redraw();

				return
			}




									var q_1000 = [];	q_1000[1] = []; q_1000[2] = []; q_1000[3] = []; q_1000[4] = [];
									for (var i = 0; i <= 1000; i++){
										var t = i / 1000;
										q_1000[1][i] = t*t*t*-1 + t*t*3 + t*(-3) + 1;
										q_1000[2][i] = t*t*t*3 + t*t*(-6) + t*3;
										q_1000[3][i] = t*t*t*(-3) + t*t*3;
										q_1000[4][i] = t*t*t;
									}



			//**************************************** spline 1000 *********************************************
			function spline1000(pos, P1, P2, P3, P4){				
					var X = q_1000[1][pos] * P1.X + q_1000[2][pos] * P2.X + q_1000[3][pos] * P3.X + q_1000[4][pos] * P4.X;
					var Y = q_1000[1][pos] * P1.Y + q_1000[2][pos] * P2.Y + q_1000[3][pos] * P3.Y + q_1000[4][pos] * P4.Y;
					
					return {X: X, Y: Y};
			}


			//*************************************** splineLength *********************************************
			function splineLength(P){
				var length = 0;

						var pos = {X: P[1].X, Y: P[1].Y};
					for (var i = 1; i <= 1000; i++){
						var newpos = spline1000(i, P[1], P[2], P[3], P[4]);
						length += distance2Point(pos, newpos);
						pos = {X: newpos.X, Y: newpos.Y}
					}

				return length;
			}


			//*************************************** polylineLength *******************************************
			function polylineLength(P){
				var length = 0;
					if (P.length == 3) return distance2Point(P[1], P[2]);
					for (var i = 1; i < P.length - 1; i++) length += distance2Point(P[i], P[i+1]);
				return length;
			}


			//*************************************** projection ***********************************************
			function projections(Center, Point){
				var DX = Point.X - Center.X;
				var DY = Point.Y - Center.Y;
				var R = Math.sqrt(DX * DX + DY * DY);
				var angle = Math.acos(DX / R);
				//if (angle == 0) angle = 0.00000000000001;
				if (DY < 0) angle = 2 * Math.PI - angle;
				
				return {DX: DX, DY: DY, R: R, angle: angle}
			}


			//***************************************** strike *************************************************
			function Strike(e){

					for (var n = 1; n < E.length; n++) if (E[n].forStrike){

								var e2 = E[n];
								var LEN = 0;

							//*************************** line ********************************************************
							if (e.type == "line"){
												
										//******************************* line & spline *******************************
										if (e2.type == "line" || e2.type == "spline"){
													for (var j = 0; j < e2.P.length-1; j++){
														var cross = intersect(e.CP[1], e.CP[2], e2.P[j], e2.P[j+1]);
														if (cross){
															cross.len = distance2Point(e.CP[1], cross);
															INTERSECT.push(cross);
														}
													}
										}

										//******************************* circle **************************************
										if (e2.type == "circle"){
														var cross = intersectLineCircle(e.CP[1], e.CP[2], e2.CP[0], e2.R, e2.startAngle, e2.endAngle);
														if (cross){
															if (cross.P1) if (cross.P1.angle){
																cross.P1.len = distance2Point(e.CP[1], cross.P1);
																INTERSECT.push(cross.P1);
															}
															if (cross.P2) if (cross.P2.angle){
																cross.P2.len = distance2Point(e.CP[1], cross.P2);
																INTERSECT.push(cross.P2);
															}
														}
										}
							}



							//***************************** circle **********************************************************
							if (e.type == "circle"){
										//******************************* line & spline *******************************
										if (e2.type == "line" || e2.type == "spline"){

													for (var j = 0; j < e2.P.length-1; j++){
														
														var cross = intersectLineCircle(e2.P[j], e2.P[j+1], e.CP[0], e.R, e.startAngle, e.endAngle);
														if (cross){
															if (cross.P1) if (cross.P1.angle){
																INTERSECT.push(cross.P1);
															}
															if (cross.P2) if (cross.P2.angle){
																INTERSECT.push(cross.P2);
															}
														}

													}
										}
										

										//******************************* circle **************************************
										if (e2.type == "circle"){

														var cross = intersectTwoCircles(e.CP[0], e.R, e.startAngle, e.endAngle, e2.CP[0], e2.R, e2.startAngle, e2.endAngle);

														if (cross){
															if (cross.P1) if (cross.P1.angle){
																INTERSECT.push(cross.P1);
															}
															if (cross.P2) if (cross.P2.angle){
																INTERSECT.push(cross.P2);
															}
														}
										}
							}



							//*************************** spline ********************************************************
							if (e.type == "spline"){

										//******************************* line & spline *******************************
										if (e2.type == "line" || e2.type == "spline"){
												for (var i = 0; i < e.P.length-1; i++){
														if (i > 0) LEN += distance2Point(e.P[i-1], e.P[i]);
													for (var j = 0; j < e2.P.length-1; j++){
														
														var cross = intersect(e.P[i], e.P[i+1], e2.P[j], e2.P[j+1]);
														if (cross){
															cross.len = LEN + distance2Point(e.P[i], cross);
															cross.L = i;
															INTERSECT.push(cross);
														}
													}
												}	
										}
										

										//******************************* circle **************************************
										if (e2.type == "circle"){
												for (var i = 0; i < e.P.length-1; i++){
														if (i > 0) LEN += distance2Point(e.P[i-1], e.P[i]);
															
														var cross = intersectLineCircle(e.P[i], e.P[i+1], e2.CP[0], e2.R, e2.startAngle, e2.endAngle);
															//console.log(cross);
														if (cross){
															if (cross.P1) if (cross.P1.angle){
																cross.P1.len = LEN + distance2Point(e.P[i], cross.P1);
																cross.P1.L = i;
																INTERSECT.push(cross.P1);
															}
															if (cross.P2) if (cross.P2.angle){
																cross.P2.len = LEN + distance2Point(e.P[i], cross.P2);
																cross.P2.L = i;
																INTERSECT.push(cross.P2);
															}
														}
												}
										}
							}

					}

									//**********************************************
									if (e.type == "line"){
											var start = {X: e.CP[1].X, Y: e.CP[1].Y, len: 0}
												INTERSECT.push(start);
											var end = {X: e.CP[2].X, Y: e.CP[2].Y, len: distance2Point(e.CP[1], e.CP[2])}
												INTERSECT.push(end);
											INTERSECT = sortByLength(INTERSECT);
											cutToLines();
									}

									//**********************************************
									if (e.type == "spline"){
											//INTERSECT.push({X: e.CP[1].X, Y: e.CP[1].Y, len: 0, L: 0});
											//INTERSECT.push({X: e.CP[4].X, Y: e.CP[4].Y, len: 99999999999999, L: 100});
											INTERSECT = sortByLength(INTERSECT);
											cutToSplines();
											console.log(INTERSECT);
									}

									//**********************************************
									if (e.type == "circle"){
											//console.log(INTERSECT);	
											INTERSECT = sortByAngle(INTERSECT);
											cutToArcs();
											console.log(INTERSECT);
									}


																//******************************** cutToLines **********************************************	
																function cutToLines(){

																	if (INTERSECT.length > 2){
																		for (i = 0; i < INTERSECT.length-1; i++){
																			var line = add_Line({X: INTERSECT[i].X, Y: INTERSECT[i].Y}, {X: INTERSECT[i+1].X, Y: INTERSECT[i+1].Y})
																			line.selected = true;
																		}
																			e.enable = false;
																	}
																}


																//******************************* cutToSplines *********************************************	
																function cutToSplines(){

																	if (INTERSECT.length > 0){
																		
																			var INTERSECT2 = [];
																			INTERSECT2.push({X: e.CP[1].X, Y: e.CP[1].Y, len: 0, L: 0});
																			for (var n = 0; n < INTERSECT.length; n++) INTERSECT2.push(INTERSECT[n]);
																			INTERSECT2.push({X: e.CP[4].X, Y: e.CP[4].Y, len: 99999999999999, L: 100});

																			var S = {P1: e.CP[1], P2: e.CP[2], P3: e.CP[3], P4: e.CP[4]}

																		for (i = 0; i < INTERSECT2.length - 1; i++){
																				var k = INTERSECT2[i+1].L;
																				if (i > 0) k = (INTERSECT2[i+1].L - INTERSECT2[i].L) / (100 - INTERSECT2[i].L) * 100;
																			S = addSpline(S.P1, S.P2, S.P3, S.P4, k, INTERSECT2[i], INTERSECT2[i+1]);
																		}

																			e.enable = false;
																	}
																			//setTimeout(function(){INTERSECT = []; redraw()}, 1000);


																			//*************************** addSpline ****************************
																			function addSpline(P1, P2, P3, P4, Pos, CR1, CR2 ){

																				var NP = [{X: 0, Y: 0}];

																					//CR1 = spline1000(over.Line * 20, E[over.Element].CP[1], E[over.Element].CP[2], E[over.Element].CP[3], E[over.Element].CP[4]);

																					var t = Pos / 100;

																					var P5 = {X: P1.X + (P2.X - P1.X) * t, Y: P1.Y + (P2.Y - P1.Y) * t}
																					var P6 = {X: P2.X + (P3.X - P2.X) * t, Y: P2.Y + (P3.Y - P2.Y) * t}
																					var P7 = {X: P3.X + (P4.X - P3.X) * t, Y: P3.Y + (P4.Y - P3.Y) * t}
																					var P8 = {X: P5.X + (P6.X - P5.X) * t, Y: P5.Y + (P6.Y - P5.Y) * t}
																					var P9 = {X: P6.X + (P7.X - P6.X) * t, Y: P6.Y + (P7.Y - P6.Y) * t}
																					var P10 = {X: P8.X + (P9.X - P8.X) * t, Y: P8.Y + (P9.Y - P8.Y) * t}

																					NP.push({X: CR1.X, Y: CR1.Y}, {X: P5.X, Y: P5.Y});
																					NP.push({X: P8.X, Y: P8.Y}, {X: CR2.X, Y: CR2.Y});

																					//console.log("SLEN: " + splineLength(NP));
																					//if (splineLength(E[current_Element].CP) / splineLength(NP) < 40)
																					newE = add_Element("spline", NP, []);
																					recalculateCurve(newE);
																					newE.selected = true;
																					return {P1: CR2, P2: P9, P3: P7, P4: P4}
																			}
																}


																//******************************** cutToArcs **********************************************	
																function cutToArcs(){

																	if (INTERSECT.length > 0){

																		for (i = 0; i < INTERSECT.length-1; i++)
																			add_Circle(e.CP[0], e.R, INTERSECT[i].angle, INTERSECT[i+1].angle);
																		
																		if (e.startAngle + 2 * Math.PI == e.endAngle){
																			add_Circle(e.CP[0], e.R, INTERSECT[INTERSECT.length-1].angle, INTERSECT[0].angle + 2 * Math.PI);
																		} else {
																			add_Circle(e.CP[0], e.R, INTERSECT[INTERSECT.length-1].angle, e.endAngle);
																			add_Circle(e.CP[0], e.R, e.startAngle, INTERSECT[0].angle);
																		}
																			e.enable = false
																			//var CCC = add_Circle({X: 100, Y: 100}, 150, 0, 2.0);
																	}
																}


																//************** sortByLength *******************
																function sortByLength(A){
																	for (var m = 0; m < A.length-1; m++)
																	for (var n = 0; n < A.length-1; n++)
																	if (A[n].len > A[n+1].len){
																		var temp = {X: A[n].X, Y: A[n].Y, len: A[n].len, L: A[n].L}
																		A[n] = {X: A[n+1].X, Y: A[n+1].Y, len: A[n+1].len, L: A[n+1].L}
																		A[n+1] = {X: temp.X, Y: temp.Y, len: temp.len, L: temp.L}
																	}
																		return A;
																}


																//************** sortByAngle *******************
																function sortByAngle(A){
																	for (var m = 0; m < A.length-1; m++)
																	for (var n = 0; n < A.length-1; n++)
																	if (A[n].angle > A[n+1].angle){
																		var temp = {X: A[n].X, Y: A[n].Y, angle: A[n].angle, L: A[n].L}
																		A[n] = {X: A[n+1].X, Y: A[n+1].Y, angle: A[n+1].angle, L: A[n+1].L}
																		A[n+1] = {X: temp.X, Y: temp.Y, angle: temp.angle, L: temp.L}
																	}
																		return A;
																}										


			}


			//************************************* intersectSelected ******************************************
			function intersectSelected(){
							var ES = []
							for (var n = 0; n < E.length; n++) E[n].forStrike = false;
							
							for (n = 1; n < E.length; n++) if (E[n].selected) ES.push(E[n]);
							
							if (selected_groups.length > 0) for (var n = 0; n < selected_groups.length; n++) G[selected_groups[n]].enable = false;
							
								skipSelected();
								
							for (var n = 0; n < ES.length; n++) ES[n].forStrike = true;
							
							var INTERSECT3 = [];

							for (n = 0; n < ES.length; n++){
								INTERSECT = [];
								Strike(ES[n]);
								//console.log(n, ES[n]);
								for (var i = 0; i < INTERSECT.length; i++) INTERSECT3.push(INTERSECT[i]);
							}
							
							INTERSECT = INTERSECT3;
							
							setTimeout(function(){
									skipSelected();
								
									var pos1 = {X: -100, Y: -100};
									var pos2 = {X: 100,  Y: 100};
								
									pos1.x = pos1.X * scale + O.x;
									pos1.y = pos1.Y * scale + O.y;
									
									pos2.x = pos2.X * scale + O.x;
									pos2.y = pos2.Y * scale + O.y;
									
									//console.log(pos1, pos2);
								
									select_Elements_inRect(pos1, pos2);
									refresh_All();
									redraw();
									
									var extremums = getExtremums(INTERSECT);
									//console.log(extremums);
									
									INTERSECT = [];
								
							}, 500);
							setBound();
							refresh_All();
							redraw();
			}


			//************************************* cornerSelected ******************************************
			function cornerSelected(distance, kind){
			
					var POINTS = [];

					for (var n = 1; n < E.length; n++)	if (E[n].enable) if (E[n].selected){
						if (E[n].type == "line") {add_POINT(E[n], 1); add_POINT(E[n], 2)}
					}

					for (n = 0; n < POINTS.length; n++) if (POINTS[n].E.length == 2){

							var num1 = POINTS[n].num[0];	if (num1 == 1) {num11 = 2} else {num11 = 1}
							var num2 = POINTS[n].num[1];	if (num2 == 1) {num22 = 2} else {num22 = 1}

							var E1 = POINTS[n].E[0];
							var E2 = POINTS[n].E[1];


						//*********************************************************************
						if (kind == "round"){
							/*
							P = makeRoundCorner(POINTS[n], E1.CP[num11], E2.CP[num22], distance);

							if (!P) return;

							E1.CP[num1] = {X: P.P1.X, Y: P.P1.Y}
							E2.CP[num2] = {X: P.P2.X, Y: P.P2.Y}

							var circle = add_Circle(P.C, distance);

								if (P.DA1 < P.DA2){
									//circle.CP[2] = {X: P.P1.X, Y: P.P1.Y};
									//circle.CP[3] = {X: P.P2.X, Y: P.P2.Y};
								} else{
									//circle.CP[3] = {X: P.P1.X, Y: P.P1.Y};
									//circle.CP[2] = {X: P.P2.X, Y: P.P2.Y};
								}

								recalculateCurve(circle);
								recalculateCurve(E1);
								recalculateCurve(E2);
								
							*/
						//*********************************************************************

							var P = intersectLineCircle(E1.CP[1], E1.CP[2], POINTS[n], distance, 0, 2 * Math.PI);
							if (P.P1){
								SP1 = P.P1;
								ANG1 = P.P1.angle;
							}
							if (P.P2){
								SP1 = P.P2;
								ANG1 = P.P2.angle;
							}

							P = intersectLineCircle(E2.CP[1], E2.CP[2], POINTS[n], distance, 0, 2 * Math.PI);
							if (P.P1){
								SP2 = P.P1;
								ANG2 = P.P1.angle;
							}
							if (P.P2){
								SP2 = P.P2;
								ANG2 = P.P2.angle;
							}

							//ANG1 = Math.round(ANG1 * 180 / Math.PI);
							//ANG2 = Math.round(ANG2 * 180 / Math.PI);

							var DA1 = ANG1 - ANG2; if (DA1 < 0) DA1 += 2 * Math.PI;
							var DA2 = ANG2 - ANG1; if (DA2 < 0) DA2 += 2 * Math.PI;

								if (DA1 < DA2){
									//newE.CP[2] = {X: SP1.X, Y: SP1.Y};
									//newE.CP[3] = {X: SP2.X, Y: SP2.Y};
									var alpha = DA1 / 2;
									var ANG0 = ANG2 + DA1 / 2;
								} else{
									//newE.CP[3] = {X: SP1.X, Y: SP1.Y};
									//newE.CP[2] = {X: SP2.X, Y: SP2.Y};
									alpha = DA2 / 2;
									ANG0 = ANG1 + DA2 / 2;
								}

							var S = distance / Math.sin(alpha);
							var DP = Math.abs(S * Math.cos(alpha));
							
							var P1 = rotate({X: POINTS[n].X + DP, Y: POINTS[n].Y}, POINTS[n], ANG1);
							var P2 = rotate({X: POINTS[n].X + DP, Y: POINTS[n].Y}, POINTS[n], ANG2);
							var P0 = rotate({X: POINTS[n].X + S,  Y: POINTS[n].Y}, POINTS[n], ANG0);

							var newE = add_Circle(P0, distance);
								newE.selected = true;
								putToSameGroup(newE, E1, E2);
								
								if (DA1 < DA2){
									newE.CP[2] = {X: P1.X, Y: P1.Y};
									newE.CP[3] = {X: P2.X, Y: P2.Y};
								} else{
									newE.CP[3] = {X: P1.X, Y: P1.Y};
									newE.CP[2] = {X: P2.X, Y: P2.Y};
								}
								

								E1.CP[num1] = {X: P1.X, Y: P1.Y}
								E2.CP[num2] = {X: P2.X, Y: P2.Y}
								

								recalculateCurve(newE);
								recalculateCurve(E1);
								recalculateCurve(E2);
						}



						//*********************************************************************
						if (kind == "mate"){
							var newE = add_Circle(POINTS[n], distance);
								newE.selected = true;
								putToSameGroup(newE, E1, E2);

							var P = intersectLineCircle(E1.CP[1], E1.CP[2], POINTS[n], distance, 0, 2 * Math.PI);
							if (P.P1){
								SP1 = P.P1;
								ANG1 = P.P1.angle;
							}
							if (P.P2){
								SP1 = P.P2;
								ANG1 = P.P2.angle;
							}

							P = intersectLineCircle(E2.CP[1], E2.CP[2], POINTS[n], distance, 0, 2 * Math.PI);
							if (P.P1){
								SP2 = P.P1;
								ANG2 = P.P1.angle;
							}
							if (P.P2){
								SP2 = P.P2;
								ANG2 = P.P2.angle;
							}

							ANG1 = Math.round(ANG1 * 180 / Math.PI);
							ANG2 = Math.round(ANG2 * 180 / Math.PI);

							var DA1 = ANG1 - ANG2; if (DA1 < 0) DA1 += 360;
							var DA2 = ANG2 - ANG1; if (DA2 < 0) DA2 += 360;

								if (DA1 < DA2){
									newE.CP[2] = {X: SP1.X, Y: SP1.Y};
									newE.CP[3] = {X: SP2.X, Y: SP2.Y};
								} else{
									newE.CP[3] = {X: SP1.X, Y: SP1.Y};
									newE.CP[2] = {X: SP2.X, Y: SP2.Y};
								}

								E1.CP[num1] = {X: SP1.X, Y: SP1.Y}
								E2.CP[num2] = {X: SP2.X, Y: SP2.Y}

								recalculateCurve(newE);
								recalculateCurve(E1);
								recalculateCurve(E2);
						}

						//*********************************************************************
						if (kind == "chamfer"){
							var P = makeChamferCorner(POINTS[n], E1.CP[num11], E2.CP[num22], distance);
							if (P.P1 && P.P2){
								var newE = add_Line(P.P1, P.P2);
									newE.selected = true;
									putToSameGroup(newE, E1, E2);
								E1.CP[num1] = {X: P.P1.X, Y: P.P1.Y}
								E2.CP[num2] = {X: P.P2.X, Y: P.P2.Y}

								recalculateCurve(E1);
								recalculateCurve(E2);
							}
						}
					}


													//************************* add_POINT *********************
													function add_POINT(E, num){
														var finded_point = -1;
														for (var n = 0; n < POINTS.length; n++) if (POINTS[n].X == E.CP[num].X && POINTS[n].Y == E.CP[num].Y) finded_point = n;
														if (finded_point < 0) POINTS.push({ X: E.CP[num].X, Y: E.CP[num].Y, E: [E], num: [num] });
														if (finded_point >= 0){
															POINTS[finded_point].E.push(E);
															POINTS[finded_point].num.push(num);
														}
													}

													//****************** makeRoundCorner ****************************
													function makeRoundCorner(P0, P1, P2, R){
														var angle_1 = projections(P0, P1).angle;
															var DP1 = distance2Point(P0, P1);

														var angle_2 = projections(P0, P2).angle;
															var DP2 = distance2Point(P0, P2);

															var d_angle1 = angle_1 - angle_2; if (d_angle1 < 0) d_angle1 += 2 * Math.PI;
															var d_angle2 = angle_2 - angle_1; if (d_angle2 < 0) d_angle2 += 2 * Math.PI;

															var angle_0  = angle_1 + d_angle2 / 2;
															var dangle = d_angle2 / 2;

															if (d_angle2 > d_angle1){
																dangle = d_angle1 / 2;
																angle_0 = angle_2 + d_angle1 / 2;
															}

															var S = R / Math.sin(dangle);
															var DP = S * Math.sin(dangle);

															//if (DP > DP1 / 2 || DP > DP2 / 2) return

															var C = rotate({X: P0.X + S, Y: P0.Y}, P0, angle_0);

															P1 = rotate({X: P0.X + DP, Y: P0.Y}, P0, angle_1);
															P2 = rotate({X: P0.X + DP, Y: P0.Y}, P0, angle_2);

														return {C: C, R: R, P1: P1, P2: P2, DA1: d_angle1, DA2: d_angle2}
													}


													//****************** makeChamferCorner ****************************
													function makeChamferCorner(P0, P1, P2, DP){
														var angle_1 = projections(P0, P1).angle;
															var RDP = distance2Point(P0, P1);
															if (DP <= RDP / 2){
																P1 = rotate({X: P0.X + DP, Y: P0.Y}, P0, angle_1);
															} else {P1 = null}

														var angle_2 = projections(P0, P2).angle;
															RDP = distance2Point(P0, P2);
															if (DP <= RDP / 2){
																P2 = rotate({X: P0.X + DP, Y: P0.Y}, P0, angle_2);
															} else {P2 = null}

														return {P1: P1, P2: P2}
													}


													//****************** toSameGroup ***************************
													function putToSameGroup(E0, E1, E2){
														for (var n = 0; n < G.length; n++)
														for (var i = 0; i < G[n].E.length; i++) if (G[n].E[i] == E1.num || G[n].E[i] == E2.num) {
															G[n].E.push(E0.num);
														}
													}


							setBound();
							refresh_All();
							redraw();
			}



					//***************************************** groupSelected ******************************
					function groupSelected(){
							var group = {enable: true, E: []};
							for (var n = 1; n < E.length; n++) if (E[n].selected) group.E.push(n);

							G.push(group);

							MUAB[0].pic.src = MUAB_A[0].pic;
							MUAB[1].pic.src = MUAB_A[1].pic_active;
					}


					//***************************************** ungroupSelected ***************************
					function ungroupSelected(){
									for (var n = 0; n < selected_groups.length; n++)
										if (G[selected_groups[n]]) G[selected_groups[n]].enable = false;

										MUAB[0].pic.src = MUAB_A[0].pic_active;
										MUAB[1].pic.src = MUAB_A[1].pic;

										skipSelected();
										setBound();
										redraw();
					}


					//***********************************  moveSelected ***********************************
					function moveSelected(DX, DY){

						if (button_Repeat.active){
							repeatSelected(DX, DY);
							return
						}

						//*************************************************************
						for (var n = 1; n < E.length; n++) if (E[n].selected){
							for (var i = 0; i < E[n].CP.length; i++){
								E[n].CP[i].X += DX;
								E[n].CP[i].Y += DY;
							}
								recalculateCurve(E[n]);
						}
								setBound();
								refresh_All();
								redraw();
					}


					//***********************************  mirrorSelected ***********************************
					function mirrorSelected(horisontal, vertical){
						
									var POSARR = [];
								for (var n = 1; n < E.length; n++) if (E[n].enable) if (E[n].selected)
									for (var i = 0; i < E[n].P.length; i++) if (E[n].P[i]) POSARR.push(E[n].P[i]);

								var extremums = getExtremums(POSARR);
								if (!extremums) return

								var AX = (extremums.max.X + extremums.min.X) / 2;
								var AY = (extremums.max.Y + extremums.min.Y) / 2;

						
						for (var n = 1; n < E.length; n++) if (E[n].selected){
							for (var i = 0; i < E[n].CP.length; i++){
								if (horisontal) E[n].CP[i].X = AX - (E[n].CP[i].X - AX);
								if (vertical)   E[n].CP[i].Y = AY - (E[n].CP[i].Y - AY);
							}
								recalculateCurve(E[n]);
						}
								setBound();
								refresh_All();
								redraw();
					}


					//***********************************  resizeSelected *********************************
					function resizeSelected(newWidth, newHeight){
						
										selected = [];
									for (var n = 0; n < E.length; n ++) if (E[n].enable) if (E[n].selected) selected.push(n);
									if (selected.length == 0) return

										var POSARR = [];
									for (var n = 0; n < selected.length; n++)
										for (var i = 0; i < E[selected[n]].P.length; i++) if (E[selected[n]].P[i]){
											POSARR.push(E[selected[n]].P[i]);
										}

									var extremums = getExtremums(POSARR);
									
									var oldWidth = extremums.max.X - extremums.min.X;
									var oldHeight = extremums.max.Y - extremums.min.Y;
									
									var kx = 1;	if (newWidth)  kx = newWidth / oldWidth;
									var ky = 1;	if (newHeight) ky = newHeight / oldHeight;
									
									for (var n = 0; n < E.length; n ++) if (E[n].enable) if (E[n].selected){
										for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
											var CCP = {X: E[n].CP[i].X, Y: E[n].CP[i].Y}
											if (newWidth)  E[n].CP[i].X = extremums.min.X + (CCP.X - extremums.min.X) * kx;
											if (newHeight) E[n].CP[i].Y = extremums.min.Y + (CCP.Y - extremums.min.Y) * ky;
										}
											recalculateCurve(E[n]);
									}
					}
					

					//***********************************  repeatSelected *********************************
					function repeatSelected(DX, DY){

									var SEL = [];
							for (var n = 1; n < E.length; n++) if (E[n].selected){
									var NCP = [];
								for (var i = 0; i < E[n].CP.length; i++) NCP.push({X: E[n].CP[i].X + DX, Y: E[n].CP[i].Y + DY});
								var new_E = add_Element(E[n].type, NCP, []);
									new_E.closed = E[n].closed;
									new_E.R = E[n].R;
									
									recalculateCurve(new_E);
									SEL.push(new_E);
									
									E[n].clone_num = E.length-1;
							}
									//console.log(selected_groups)
							
								if (selected_groups.length > 0)
								for (n = 0; n < selected_groups.length; n++){
									var group = {enable: true, E: []};
									for (var i = 0; i < G[selected_groups[n]].E.length; i++) group.E.push(E[G[selected_groups[n]].E[i]].clone_num);
									G.push(group);
									//console.log(group);
								}
							
								for (n = 1; n < E.length; n++) E[n].selected = false;
								for (n = 0; n < SEL.length; n++) SEL[n].selected = true;

								setBound();
								refresh_All();
								redraw();
					}


					//************************************ rotateSelected *********************************
					function rotateSelected(angle){
						for (var n = 1; n < E.length; n++) if (E[n].selected){
							for (var i = 0; i < E[n].CP.length; i++){
								var RC = rotate({X: E[n].CP[i].X, Y: E[n].CP[i].Y}, CR, angle);
								E[n].CP[i].X = RC.X;
								E[n].CP[i].Y = RC.Y;								
							}
								recalculateCurve(E[n]);
						}
								setBound();
								refresh_All();
								redraw();
					}


					//************************************ zoomToFitScreen ********************************
					function zoomToFitScreen(){
									var POSARR = [];
								for (var n = 1; n < E.length; n++) if (E[n].enable)
									for (var i = 0; i < E[n].P.length; i++) if (E[n].P[i]) POSARR.push(E[n].P[i]);

								var extremums = getExtremums(POSARR);

								if (!extremums){
									scale = 1;
									O.x = 20;
									O.y = (canvas.height - 20);
									refresh_All();
									redraw();
									return
								}

									scale = canvas.width / (extremums.max.X - extremums.min.X) * 0.9;
									scale2 = (canvas.height - 20) / (extremums.max.Y - extremums.min.Y) * 0.9;
									if (scale2 < scale) scale = scale2;

									O.X = (extremums.max.X + extremums.min.X) / 2;
									O.Y = (extremums.max.Y + extremums.min.Y) / 2;

									O.x = canvas.width / 2 - O.X * scale;
									O.y = (canvas.height - 20) / 2 - O.Y * scale;

									refresh_All();
									redraw();
					}
			

					//************************************ zoomToActualSize *******************************
					function zoomToActualSize(){
									var POSARR = [];
								for (var n = 1; n < E.length; n++) if (E[n].enable)
									for (var i = 0; i < E[n].P.length; i++) if (E[n].P[i]) POSARR.push(E[n].P[i]);

								var extremums = getExtremums(POSARR);

								if (!extremums){
									scale = 3.6;
									O.x = 20;
									O.y = (canvas.height - 20);
									refresh_All();
									redraw();
									return
								}

									scale = 3.6;

									O.X = (extremums.max.X + extremums.min.X) / 2;
									O.Y = (extremums.max.Y + extremums.min.Y) / 2;

									O.x = canvas.width / 2 - O.X * scale;
									O.y = (canvas.height - 20) / 2 - O.Y * scale;

									refresh_All();
									redraw();
					}





			container.board.clear();
			return board;
	}