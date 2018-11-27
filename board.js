



	function create_board(){

			var board = element('div').background('rgb(240, 240, 240)').size(1200, 800);
			var canvas,	context, 

			E = [],
			G = [],
			B = [],
			BF = [],
			CROSS = [],
			
			over =  {},
			real = {},
			fixed = {},
			clicked = {},
			O = {X: 0, Y: 0, x:0, y:0},
			CR = {X: 0, Y: 0},
			
			INTERSECT = [],
			
			scale = 1,

			fixpos = [],
			button = [],

			edit_mode = 'Select',
			edit_type = 'Resize', 
			edit_step = 0,
			selected_groups = [],
			same_clicked;

			//*************************************
			var MMB = [], MAB = [], MUAB = [],
				current_MMB;

			var infoline = element('div', board).background('rgb(240, 240, 240)').size(1200, 25).fontStyle(11, "Ubuntu", "#222", "left")
				infoline.material = element('div', infoline).background('rgba(255, 255, 255, 0)').border('0px solid #aaa').size(200, 23).position(1000, 0);


			//*****************************************************************************************************************
			var MMB_A = [	{name: "File", item:["New", "Open", "Reopen", "Save", "Save As", "Print", "Import", "Export", "Exit"]},
						{name: "Edit", item:["Undo", "Redo", "Cut", "Copy", "Paste", "Delete", "Select All", "Find", "Replace", "Preferences"]},
						{name: "View", item:["3D", "Top", "Bottom", "Front", "Back", "Left", "Right"]},
						{name: "Line", item:["Group", "Ungroup", "Intersect", "Divide", "Corner", "Tangents", "Contour", "Repeat", "Scale", "Rotate", "Mirror", "Simplify", "Nudge", "Convert spline to arc", "Machine...", "Properties...", "Color fill", "Layer", "Prior", "Next", "Select connected"]},
						{name: "Tools", item:["Statistics", "Compute", "Convert", "Shape library", "Fix all", "Confirm changes", "Show comments to Self"]},
						{name: "Job", item:["Material", "Settings", "Finishing", "Model bends", "Price/Analize", "Checklist"]},
						{name: "Order", item:["Review & place order... ", "Request order status"]},
						{name: "Help", item:["Drawing tutorial", "Quick start", "Contents...", "Forum", "Video Tutorials", "Tech Support", "Suggestion", "Check for Updates", "About..."]}
			];

			var MAB_A = [	{name: "Select", pic: "images/Select.png"},
							{name: "Line", pic: "images/Line.png"},
							{name: "Spline", pic: "images/Spline.png"},
							{name: "Rectangle", pic: "images/Rectangle.png"},
							{name: "Circle", pic: "images/Circle.png"},
							{name: "Freehand", pic: "images/Freehand.png"},
							{name: "Erase", pic: "images/Eraser.png"},
							{name: "Corner", pic: "images/Corner.png"},
							{name: "Text", pic: "images/Text.png"},
							{name: "Line Edit", pic: "images/LineEdit.png"},
							{name: "Ruler", pic: "images/Ruler.png"},
							{name: "Snap to Lines", pic: "images/SnapToLines.png"},
							{name: "Help", pic: "images/Help.png"}
			];

			var MUAB_A = [	{name: "Group", pic: "images/Group.png", pic_active: "images/Group_active.png"},
							{name: "Ungroup", pic: "images/Ungroup.png", pic_active: "images/Ungroup_active.png"},
							{name: "Zoom to fit screen", pic: "images/ZoomToFitScreen.png"},
							{name: "Zoom to actual size", pic: "images/ZoomToActualSize.png"},
							{name: "Zoom", pic: "images/Zoom.png"},
							{name: "Delete", pic: "images/Delete.png"},
							{name: "Preferences", pic: "images/Preferences.png"},
							{name: "Toggle inch", pic: "images/ToggleInch.png"},
							{name: "Liny type", pic: "images/LinyType.png"},
							{name: "Intersect", pic: "images/Intersect.png"},
							{name: "3D preview", pic: "images/3DPreview.png"},
							{name: "Price/Analize", pic: "images/Check.png"}
			];


			//**************************************************************************
			board.setPosition = function(left, top){
				board.style.position = 'absolute';
				board.style.left = left + 'px';
				board.style.top = top + 'px';
				return board;
			}


			//**************************************************************************
			board.setSize = function(width, height){
				board.size(width, height);
				
					canvas.style.position = 'absolute';
					canvas.width = width - 60;
					canvas.height = height - 105 - infoline.height;
					canvas.style.left = 50 + 'px';
					canvas.style.top = 100 + 'px';
					
						infoline.size(width).position(0, height - infoline.height -5);
						infoline.material.position(width - infoline.material.width - 12, 0);
						
					
					O = {x: (canvas.width - 0) / 2 , y: (canvas.height - 0) / 2, X:canvas.width / 2, Y: canvas.height / 2};
					setBound();
					refresh_All();
					redraw();
					
				return board;
			}


		//########################################### menu ###############################################################################################################
			for (var n = 0; n < MMB_A.length; n++){
					MMB[n] = element('div', board).size(80, 27).position(10 + n * 82, 5).text(MMB_A[n].name).cursor('pointer').classname('button');

					MMB[n].onclick = function(){
						for (var i = 0; i < MMB.length; i++) {MMB[i].background("linear-gradient(0deg, rgb(100, 100, 100) 0px, rgb(140, 140, 140) 35px)"); MMB[i].panel.hide()}
						this.background("linear-gradient(0deg, rgb(50, 50, 50) 0px, rgb(75, 75, 75) 35px)");
						if (current_MMB) {
							if (current_MMB == this) {
								this.panel.hide();
								current_MMB = null;
							} else {
								this.panel.show();
								current_MMB = this;
							}
						} else {
							this.panel.show();
							current_MMB = this;
						};
					}

					MMB[n].panel = element('div', board).size(185, MMB_A[n].item.length * 25 + 20).position(10 + n * 82, 35).cursor('pointer').classname('menu_panel').order(1000).hide();
					MMB[n].panel.item = [];
					for (var i = 0; i < MMB_A[n].item.length; i++) {
						MMB[n].panel.item[i] = element('div', MMB[n].panel).text(MMB_A[n].item[i]).size(175, 20).position(0, 10 + i * 25).cursor('pointer').fontStyle(12, "Ubuntu", "#555", "left").padding(25);
						MMB[n].panel.item[i].onmouseover = function(){this.fontStyle(12, "Ubuntu", "#fff", "left").background("rgb(125, 125, 125)")}
						MMB[n].panel.item[i].onmouseout = function(){this.fontStyle(12, "Ubuntu", "#555", "left").background("")}
					}
			}


			//************************************ Left menu ******************************
			for (var n = 0; n < MAB_A.length; n++){
					MAB[n] = element('div', board).size(33, 33).position(10, 104 + n * 39).cursor('pointer').background("rgba(0, 0, 0, 0.0)").border("1px solid rgba(0, 0, 0, 0)");
						if (MAB_A[n].pic){
							MAB[n].pic = element('img', MAB[n]).size(27, 27).position(3, 3);
							MAB[n].pic.src = MAB_A[n].pic;
						}
						
					MAB[n].name = MAB_A[n].name;

					MAB[n].onmousedown = function(){
						for (var i = 0; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
						this.background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");
						edit_mode = this.name;
						edit_step = 0;
						//edit_type == "Resize";
						//same_clicked = false;
						if (edit_mode == "Line" || edit_mode == "Rectangle" || edit_mode == "Circle" || edit_mode == "Spline") skipSelected();
						setBound();
						redraw();
					}
			}


			//************************************ Up menu ******************************
			for (var n = 0; n < MUAB_A.length; n++){
					MUAB[n] = element('div', board).size(27, 27).position(10 + n * 35, 35).cursor('pointer').background("rgba(0, 0, 0, 0.0)").border("1px solid rgba(0, 0, 0, 0)");
						if (MUAB_A[n].pic) MUAB[n].pic = element('img', MUAB[n]).size(23, 23).position(2, 2);
							MUAB[n].pic.src = MUAB_A[n].pic;

					MUAB[n].name = MUAB_A[n].name;
					
					MUAB[n].onmouseover = function(){
						this.background("rgba(255, 255, 255, 0.55)");
					}

					MUAB[n].onmouseleave = function(){
						this.background("rgba(0, 0, 0, 0.0)");
					}

					MUAB[n].onmousedown = function(){

						//****************** Intersect *************************
						if (this.name == "Intersect"){
							var ES = []
							for (var n = 0; n < E.length; n++) E[n].forStrike = false;
							
							for (n = 1; n < E.length; n++) if (E[n].selected) ES.push(E[n]);
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

						//******************* Group ************************
						if (this.name == "Group"){
							var group = {enable: true, E:[]};
							for (var n = 1; n < E.length; n++) if (E[n].selected) group.E.push(n);

							G.push(group);
							//console.log(G);
							MUAB[0].pic.src = MUAB_A[0].pic;
							MUAB[1].pic.src = MUAB_A[1].pic_active;
						}

						//******************** Ungroup ************************
						if (this.name == "Ungroup"){
							for (var n = 0; n < selected_groups.length; n++)
								if (G[selected_groups[n]]) G[selected_groups[n]].enable = false;
								//console.log(n + ": ", selected_groups[n]);
							
								MUAB[0].pic.src = MUAB_A[0].pic_active;
								MUAB[1].pic.src = MUAB_A[1].pic;
								
								skipSelected();
								setBound();
								redraw();
						}
						
						
					}
					
					
			}


				element('div', board).size(board.width - 20 , 1).position(10, 65).background("rgba(0, 0, 0, 0.25)");
				element('div', board).size(board.width - 20 , 1).position(10, 93).background("rgba(0, 0, 0, 0.25)");

				element('div', board).size(1 , 23).position(77, 40).background("rgba(0, 0, 0, 0.25)");
				element('div', board).size(1 , 23).position(182, 40).background("rgba(0, 0, 0, 0.25)");
				element('div', board).size(1 , 23).position(426, 40).background("rgba(0, 0, 0, 0.25)");




			//*************************************************************************************************************************************************************************
			board.addEventListener('mouseup', function(){
				if (current_MMB) for (var i = 0; i < MMB.length; i++) {MMB[i].background("linear-gradient(0deg, rgb(100, 100, 100) 0px, rgb(140, 140, 140) 35px)"); MMB[i].panel.hide()}
				current_MMB = null;
			});


			//######################################### canvas field ###################################################
			canvas = document.createElement('canvas');
			canvas.style.background = '#fff';
			board.appendChild(canvas);
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
			
			
			//****************************** draw line ********************************************
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

			



								/*
									var LINE = add_Element('polyline', [{X:0, Y:0}, {X:100, Y:100}, {X: 200, Y: 400}]);

										var P0 = {X: 200, Y: 200};
										var P1 = {X: 200 + 150, Y: 200};

										var P2 = {X: 400, Y: 200};
										var P3 = {X: 400 + 100, Y: 200};


									var CIRC = add_Element('circle', [P0, P1, P1, P1]);
									CIRC.R = 150;
									CIRC.startAngle = 0.5;
									CIRC.endAngle = 1.5 * Math.PI;

									var CIRC2 = add_Element('circle', [P2, P3, P3, P3]);
									CIRC2.R = 100;
									CIRC2.startAngle = 0.25;
									CIRC2.endAngle = 1 * Math.PI;

									recalculateCurve(LINE);
									recalculateCurve(CIRC);
									recalculateCurve(CIRC2);
								*/




			//############################################## Mouse move ################################################
			canvas.addEventListener('mousemove', function(e){
				
									//INTERSECT = [];
									//intersectLineCircle(LINE.CP[1], LINE.CP[2], CIRC.CP[0], CIRC.R, CIRC.startAngle, CIRC.endAngle);
									//intersectTwoCircles(CIRC.CP[0], CIRC.R, CIRC.startAngle, CIRC.endAngle, CIRC2.CP[0], CIRC2.R, CIRC2.startAngle, CIRC2.endAngle);

					over = getOverMouse(e);
					infoline.material.text('x: ' + Math.round(over.X * 1000) / 1000 + ' mm,      y: ' + Math.round(over.Y * 1000) / 1000 + ' mm');


								//******************************* moving scene ********************************
								if (button[1])
								if (edit_mode == 'move_scene'){
									O.x = fixed.Ox + over.dx;
									O.y = fixed.Oy + over.dy;

									O.X = O.x / scale;
									O.Y = O.y / scale;

										setBound();	
										refresh_All();
										redraw();
										return
								}


								//****************************** draw freehand line ***************************
								if (button[1])
								if (edit_mode == "Freehand"){
									E[E.length-1].CP.push({X: over.X, Y: over.Y});
									recalculateCurve(E[E.length-1]);
								}
								

								//****************************** moving center point **************************
								if (button[1])
								if (edit_mode == 'Line Edit')
								if (fixed.Element && fixed.Point == 5){
										E[fixed.Element].CP[5].X = E[fixed.Element].CP[5].XF + over.DX;
										E[fixed.Element].CP[5].Y = E[fixed.Element].CP[5].YF + over.DY;
										E[fixed.Element].CP[5].unique = true;

											checkCross(fixed.Element, 5);
											recalculateCurve(E[fixed.Element]);
											setBound();
											refresh_All();
											redraw();
											return
								}


								//****************************** moving points ********************************
								if (button[1])
								if (edit_mode == 'Line Edit')
								if (fixed.Element && fixed.Point){

											E[fixed.Element].CP[fixed.Point].X = E[fixed.Element].CP[fixed.Point].XF + over.DX;
											E[fixed.Element].CP[fixed.Point].Y = E[fixed.Element].CP[fixed.Point].YF + over.DY;

										if (E[fixed.Element].type == "spline") if (fixed.Point == 1){
											E[fixed.Element].CP[2].X = E[fixed.Element].CP[2].XF + over.DX;
											E[fixed.Element].CP[2].Y = E[fixed.Element].CP[2].YF + over.DY;
										}

										if (E[fixed.Element].type == "spline") if (fixed.Point == 4){
											E[fixed.Element].CP[3].X = E[fixed.Element].CP[3].XF + over.DX;
											E[fixed.Element].CP[3].Y = E[fixed.Element].CP[3].YF + over.DY;
										}


										if (E[fixed.Element].type == "circle") {

											var PAR = projections(E[fixed.Element].CP[0], E[fixed.Element].CP[1]);
											var PAR2 = projections(E[fixed.Element].CP[0], E[fixed.Element].CP[2]);
											var PAR3 = projections(E[fixed.Element].CP[0], E[fixed.Element].CP[3]);
											if (PAR2.angle > PAR3.angle)  PAR3.angle += 2 * Math.PI;

											E[fixed.Element].CP[2].X = E[fixed.Element].CP[0].X + PAR.R * Math.cos(PAR2.angle);
											E[fixed.Element].CP[2].Y = E[fixed.Element].CP[0].Y + PAR.R * Math.sin(PAR2.angle);

											E[fixed.Element].startAngle = PAR2.angle;

											E[fixed.Element].CP[3].X = E[fixed.Element].CP[0].X + PAR.R * Math.cos(PAR3.angle);
											E[fixed.Element].CP[3].Y = E[fixed.Element].CP[0].Y + PAR.R * Math.sin(PAR3.angle);
											E[fixed.Element].endAngle = PAR3.angle;

											E[fixed.Element].R = PAR.R;
										}

											//checkCross(fixed.Element, fixed.Point);
											recalculateCurve(E[fixed.Element]);

											setBound();
											refresh_All();
											redraw();

											return
								}


								//**************************** resizing selected ******************************
								if (button[1])
								if (edit_mode == 'Select')
								if (edit_type == 'Resize')
								if (fixed.B){

										var X1 = BF[1].X + 12 / scale;
										var Y1 = BF[1].Y + 12 / scale;
										var X2 = BF[3].X - 12 / scale;
										var Y2 = BF[3].Y - 12 / scale;
										
										var DX = X2 - X1; if (DX == 0) DX = 0.00000000000000000000001;
										var DY = Y2 - Y1; if (DY == 0) DY = 0.00000000000000000000001;

									if (fixed.B == 1){
											var kf = (DY - over.DY) / DY;
										for (var n = 0; n < E.length; n++) if (E[n].selected)
											for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
												E[n].CP[i].X = X2 - (X2 - E[n].CP[i].XF) * kf;
												E[n].CP[i].Y = Y2 - (Y2 - E[n].CP[i].YF) * kf;
											}
									}

									if (fixed.B == 2){
											var kf = (DY + over.DY) / DY;
										for (var n = 0; n < E.length; n++) if (E[n].selected)
											for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
												E[n].CP[i].X = X2 + (E[n].CP[i].XF - X2) * kf;
												E[n].CP[i].Y = Y1 + (E[n].CP[i].YF - Y1) * kf;
											}
									}

									if (fixed.B == 3){
											var kf = (DY + over.DY) / DY;
										for (var n = 0; n < E.length; n++) if (E[n].selected)
											for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
												E[n].CP[i].X = X1 + (E[n].CP[i].XF - X1) * kf;
												E[n].CP[i].Y = Y1 + (E[n].CP[i].YF - Y1) * kf;
											}
									}

									if (fixed.B == 4){
											var kf = (DY - over.DY) / DY;
										for (var n = 0; n < E.length; n++) if (E[n].selected)
											for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]){
												E[n].CP[i].X = X1 + (E[n].CP[i].XF - X1) * kf;
												E[n].CP[i].Y = Y2 - (Y2 - E[n].CP[i].YF) * kf;
											}
									}

									if (fixed.B == 5){
											var kf = (DX - over.DX) / DX;
										for (var n = 0; n < E.length; n++) if (E[n].selected)
											for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) E[n].CP[i].X = X2 - (X2 - E[n].CP[i].XF) * kf;
									}

									if (fixed.B == 6){
											var kf = (DY + over.DY) / DY;
										for (var n = 0; n < E.length; n++) if (E[n].selected)
											for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) E[n].CP[i].Y = Y1 + (E[n].CP[i].YF - Y1) * kf;
									}

									if (fixed.B == 7){
											var kf = (DX + over.DX) / DX;
										for (var n = 0; n < E.length; n++) if (E[n].selected)
											for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) E[n].CP[i].X = X1 + (E[n].CP[i].XF - X1) * kf;
									}

									if (fixed.B == 8){
											var kf = (DY - over.DY) / DY;
										for (var n = 0; n < E.length; n++) if (E[n].selected)
											for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) E[n].CP[i].Y = Y2 - (Y2 - E[n].CP[i].YF) * kf;
									}


										checkCross();
										for (var n = 0; n < E.length; n++) if (E[n].selected) recalculateCurve(E[n]);
											setBound();
											refresh_All();
											redraw();
											return
								}


								//**************************** rotating selected ******************************
								if (button[1])
								if (edit_mode == 'Select')
								if (edit_type == 'Rotate')
								if (fixed.B){

									var DX = fixed.X - CR.X;
									var DY = fixed.Y - CR.Y;
									R = Math.sqrt(DX * DX + DY * DY);
									var start_angle = Math.acos(DX / R);
									if (DY < 0) start_angle = 2 * Math.PI - start_angle;

									var DX = over.X - CR.X;
									var DY = over.Y - CR.Y;
									R = Math.sqrt(DX * DX + DY * DY);
									var angle = Math.acos(DX / R);
									if (DY < 0) angle = 2 * Math.PI - angle;

									//console.log(angle - start_angle);

									for (var n = 1; n < E.length; n++) if (E[n].selected)
										for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) {
											var RC = rotate({X: E[n].CP[i].XF, Y: E[n].CP[i].YF}, CR, angle - start_angle);
											E[n].CP[i].X = RC.X;
											E[n].CP[i].Y = RC.Y;
										}

									
									for (var i = 9; i < B.length; i++) {
											var RC = rotate({X: BF[i].X, Y: BF[i].Y}, CR, angle - start_angle);
											B[i].X = RC.X;
											B[i].Y = RC.Y;
									}



										//checkCross();
										for (var n = 0; n < E.length; n++) if (E[n].selected) recalculateCurve(E[n]);
											//setBound();
											refresh_All();
											redraw();
											return
								}


								//****************************** moving selected ******************************
								//if (button[1]) console.log(Math.sqrt(over.dx * over.dx + over.dy * over.dy))
								
								if (button[1])
								if (edit_mode == 'Select')
								if (same_clicked)
								if (!fixed.B && fixed.Element) //if (!fixed.Point){
								if (Math.sqrt(over.dx * over.dx + over.dy * over.dy) > 4){
									for (var n = 0; n < E.length; n++)
										if (E[n].selected){
											for (var i = 0; i < E[n].CP.length; i++) if (E[n].CP[i]) {
												E[n].CP[i].X = E[n].CP[i].XF + over.DX;
												E[n].CP[i].Y = E[n].CP[i].YF + over.DY;
											}
											for (var i = 0; i < E[n].P.length; i++){
												E[n].P[i].X = E[n].P[i].XF + over.DX;
												E[n].P[i].Y = E[n].P[i].YF + over.DY;
											}	
										}
											checkCross();
											for (var n = 0; n < E.length; n++) if (E[n].selected) recalculateCurve(E[n]);
											setBound();	
											refresh_All();
											redraw();
											return
								}



								if (edit_mode == "Line" || edit_mode == "Rectangle" || edit_mode == "Circle" || edit_mode == "Spline"){
									checkCross();
									refresh_All();
									redraw();
									return
								}


					//*****************************
					refresh_All();
					redraw();
			});






			//############################################## Mouse down ####################################################
			canvas.addEventListener('mousedown', function(e){

					button[e.which] = true;

					if (over.x < 20) return;

								edit_step ++;

							//******************************************************** Select ******************************************************************
							if (edit_mode == "Select" || edit_mode == "Line Edit"){

								//************************** click on empty place ****************************
								if (!over.B)
								if (!over.Element){
									skipSelected();
									setBound();
								}								


								//************************** click on B **************************************
								if (over.B)	fixPoints();


								//************************** click on Element ********************************
								if (over.Element){

									if (E[over.Element].selected) {same_clicked = true} else {same_clicked = false}

									if (!E[over.Element].selected)	skipSelected();

									E[over.Element].selected = true;
									fixPoints();

									//****************************** select new element **********************
									if (!same_clicked){
										
											MUAB[0].pic.src = MUAB_A[0].pic;
											MUAB[1].pic.src = MUAB_A[1].pic;
											selected_groups = [];

										//***************************** checking groups *************************
											var group_num = -1;
										for (var n = 0; n < G.length; n++) if (G[n]) if (G[n].enable)
											for (i = 0; i < G[n].E.length; i++) if (G[n].E[i] == over.Element) group_num = n;

											if (group_num >= 0){
												for (i = 0; i < G[group_num].E.length; i++) E[G[group_num].E[i]].selected = true;
												MUAB[1].pic.src = MUAB_A[1].pic_active;
												selected_groups.push(group_num);
											}
											
											//console.log(selected_groups);
											setBound();
									}	
								}
							}


							//******************************************************** Freehand *****************************************************************
							if (edit_mode == "Freehand"){

								if (edit_step == 1)	add_Element('polyline', [{X: over.X, Y: over.Y}], []);
							}


							//******************************************************** Line ********************************************************************
							if (edit_mode == "Line"){

								if (edit_step == 2) {

										var P0 = {X: (real.X + clicked.XR) / 2, Y: (real.Y + clicked.YR) / 2};
										
										var P1 = {X: clicked.XR, Y: clicked.YR};
										var P2 = {X: real.X, Y: real.Y};

									//add_Element('line', [P0, P1, P2], [P1, P2]);
									add_Element('polyline', [P0, P1, P2], [P1, P2]);

									over.Element = E.length - 1;
									E[over.Element].selected = true;
									
									setBound();
									
									//for (var i = 1; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
									//MAB[0].background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");
								}
							}


							//******************************************************** Rectangle ***************************************************************
							if (edit_mode == "Rectangle"){

								if (edit_step == 2) {

										var P1 = {X: clicked.XR, Y: clicked.YR};
										var P4 = {X: real.X, Y: real.Y};
										
										var P = getExtremums([P1, P4]);
									
										var P0 = {X: P.min.X + (P.max.X - P.min.X) / 2, Y: P.min.Y + (P.max.Y - P.min.Y) / 2};
										
										var P1 = {X: P.min.X, Y: P.min.Y};
										var P2 = {X: P.min.X, Y: P.max.Y};
										var P3 = {X: P.max.X, Y: P.max.Y};
										var P4 = {X: P.max.X, Y: P.min.Y};

									add_Element('polyline', [P0, P1, P2, P3, P4], [P1, P2, P3, P4, P1]);

									
									over.Element = E.length - 1;
									E[over.Element].selected = true;
									E[over.Element].closed = true;
									setBound();

									//for (var i = 1; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
									//MAB[0].background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");
								}
							}


							//******************************************************** Circle ***************************************************************
							if (edit_mode == "Circle"){

								if (edit_step == 2) {

										var DX =  real.X - clicked.XR;
										var DY =  real.Y - clicked.YR;
										var R = Math.sqrt(DX * DX + DY * DY);

										var P0 = {X: clicked.XR, Y: clicked.YR};
										var P1 = {X: clicked.XR + R, Y: clicked.YR};
										var P2 = {X: clicked.XR + R, Y: clicked.YR};
										var P3 = {X: clicked.XR + R, Y: clicked.YR};
										var P4 = {X: clicked.XR, Y: clicked.YR - R};
										//var P5 = {X: clicked.XR, Y: clicked.YR};

									add_Element('circle', [P0, P1, P2, P3]);
									
									//add_Element('circle', [P0, P1, P2, P3, P4]);
									
									over.Element = E.length - 1;
									E[over.Element].selected = true;
									E[over.Element].R = R;
									E[over.Element].startAngle = 0;
									E[over.Element].endAngle = 2 * Math.PI;
									recalculateCurve(E[over.Element]);
									setBound();

									//for (var i = 1; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
									//MAB[0].background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");
								}
							}


							//******************************************************** Spline ***************************************************************
							if (edit_mode == "Spline"){

								if (edit_step == 2) {

									var P2 = {X: (real.X - clicked.X) / 2, Y: (real.Y - clicked.Y) / 2}
									var P3 = {X: (clicked.X - real.X) / 2, Y: (clicked.Y - real.Y) / 2}

											P2 = rotate(real, clicked, Math.PI / 4);
											P3 = rotate(clicked, real, Math.PI / 4);

														var P1 = {X: clicked.XR, Y: clicked.YR}
														var P4 = {X: real.X,     Y: real.Y}
														var P0 = {X: (real.X + clicked.XR) / 2, Y: (real.Y + clicked.YR) / 2};
														
														var P2 = rotate({X: P1.X + (P4.X - P1.X)/2, Y: P1.Y + (P4.Y - P1.Y)/2}, P1, Math.PI / 6);
														var P3 = rotate({X: P4.X + (P1.X - P4.X)/2, Y: P4.Y + (P1.Y - P4.Y)/2}, P4, Math.PI / 6);

									add_Element('spline', [P0, P1, P2, P3, P4]);

									over.Element = E.length - 1;
									E[over.Element].selected = true;
									recalculateCurve(E[over.Element]);
									setBound();

									//for (var i = 1; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
									//MAB[0].background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");
								}
							}


							//******************************************************** Corner ******************************************************************
							if (edit_mode == "Corner") 
							if (over.Element){
									//Strike(E[over.Element]);
							}


							//******************************************************** Erase ******************************************************************
							if (edit_mode == "Erase"){

								if (over.Element){

									var current_Element = over.Element;
									var CRS = {X: over.CR.X, Y: over.CR.Y, L: over.Line};
									INTERSECT = [];

										for (var i = 0; i < E[current_Element].P.length - 1; i++)
										for (var m = 1; m < E.length; m++) if (E[m].enable)
										for (var j = 0; j < E[m].P.length - 1; j++){
											var res = intersect(E[current_Element].P[i], E[current_Element].P[i+1], E[m].P[j], E[m].P[j+1]);
											if (res) INTERSECT.push({X: res.X, Y: res.Y, L: i, TE: m, TL: j});
										}


									//****************************** 0 **********************	
									if (INTERSECT.length == 0) E[current_Element].enable = false;


									//****************************** 1 **********************	
									if (INTERSECT.length == 1) if (E[current_Element].closed) E[current_Element].enable = false;


									//******************************************* Polyline ************************************************
									if (E[current_Element].enable)
									if (E[current_Element].type == "polyline"){

												var e = E[current_Element];

														var SEC = [];
														
												for (var i = 0; i < e.P.length - 1; i++){
														var dx = (e.P[i+1].X - e.P[i].X) / 1000;
														var dy = (e.P[i+1].Y - e.P[i].Y) / 1000;
														var ds = Math.sqrt(dx*dx + dy*dy);

													for (var p = 0; p <= 1000; p++){
														var pos = {X: e.P[i].X + p * dx, Y: e.P[i].Y + p * dy}
														if (distance2Point(pos, CRS) <= ds / 2) SEC.push({kind: "cursor", X: pos.X, Y: pos.Y, L: i});
														for (n = 0; n < INTERSECT.length; n++) if (distance2Point(pos, INTERSECT[n]) <= ds / 2) SEC.push({kind: "cross", X: INTERSECT[n].X, Y: INTERSECT[n].Y, L: INTERSECT[n].L});
													}
												}

																	var catched_cross = 0;
																	var CR0 = {};
																	var CR1 = {};
																	var CR2 = {};
																	var CR3 = {};
																for (var n = 0; n < SEC.length; n++){
																	if (SEC[n].kind == "cursor") catched_cross = 1;
																	if (SEC[n].kind == "cross"){
																		if (catched_cross == 0)  CR1 = {X: SEC[n].X, Y: SEC[n].Y, L: SEC[n].L}
																		if (catched_cross == 1) {CR2 = {X: SEC[n].X, Y: SEC[n].Y, L: SEC[n].L}; catched_cross = 2}
																		if (e.closed) CR3 = {X: SEC[n].X, Y: SEC[n].Y, L: SEC[n].L}
																	}
																}
																		if (!CR2.X)
																		if (SEC.length > 2) CR0 = {X: SEC[0].X, Y: SEC[0].Y, L: SEC[0].L}


																	//****************************
																	if (CR1.X){
																		var NP = [{X: 0, Y: 0}];

																		if (CR3.X) if (CR2.X)
																		if (CR3.X == CR2.X && CR3.Y == CR2.Y){
																			NP.push({X: CR2.X, Y: CR2.Y});
																			for (var i = CR2.L+1; i < e.P.length; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
																		}
																		


																		if (!CR0.X) for (var i = 0; i <= CR1.L; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
																		if (CR0.X) {
																			NP.push({X: CR0.X, Y: CR0.Y});
																			for (var i = CR0.L + 1; i <= CR1.L; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
																		}
																		NP.push({X: CR1.X, Y: CR1.Y});

																		if (polylineLength(NP) / polylineLength(E[current_Element].CP) > 0.02) 
																		recalculateCurve(add_Element("polyline", NP, []));
																	}

																	//****************************
																	if (CR2.X){
																		var NP = [{X: 0, Y: 0}];
																		NP.push({X: CR2.X, Y: CR2.Y});
																		if (!CR3.X) for (var i = CR2.L+1; i < e.P.length; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
																		if (CR3.X) {
																			for (var i = CR2.L+1; i <= CR3.L; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
																			NP.push({X: CR3.X, Y: CR3.Y});
																		}
																		
																		if (CR3.X)
																		if (CR3.X != CR2.X || CR3.Y != CR2.Y){
																			NP.push({X: CR3.X, Y: CR3.Y});
																			for (var i = CR3.L+1; i < e.P.length; i++) NP.push({X: e.P[i].X, Y: e.P[i].Y});
																		}

																		if (polylineLength(NP) / polylineLength(E[current_Element].CP) > 0.02) 
																		recalculateCurve(add_Element("polyline", NP, []));
																	}

																		E[current_Element].enable = false;

																		console.log("CR0: " + CR0.X + "/" + CR0.Y);
																		console.log("CR1: " + CR1.X + "/" + CR1.Y);
																		console.log("CR2: " + CR2.X + "/" + CR2.Y);
																		console.log("CR3: " + CR3.X + "/" + CR3.Y);
																		
									}



									
									//******************************************* Circle ************************************************
									if (E[current_Element].enable)
									if (E[current_Element].type == "circle"){

													var e = E[current_Element];

														var SEC_0 = [];
														var SEC = [];

														var angle_1 = 0, angle_2 = 0;
														var closedCurve = false; 
														if (e.startAngle + 2 * Math.PI == e.endAngle) closedCurve = true;

													for (var n = 0; n < INTERSECT.length; n++){
													//if (INTERSECT[n].X != e.CP[0].X && INTERSECT[n].y != e.CP[0].y) 
														var proj = projections(e.CP[0], INTERSECT[n]);
														//if (!closedCurve) SEC_0.push(proj);
														//if (closedCurve) 
															if (INTERSECT[n].TE != current_Element) SEC_0.push(proj);
														//if (proj.angle != e.startAngle && proj.angle != e.endAngle)
														//if (proj.angle != e.startAngle + 2 * Math.PI && proj.angle != e.endAngle + 2 * Math.PI)
													}

													for (n = 0; n < SEC_0.length; n++){
														if (SEC_0[n].angle < e.startAngle) SEC_0[n].angle += 2 * Math.PI;
														if (SEC_0[n].angle > e.endAngle) SEC_0[n].angle -= 2 * Math.PI;
													}

													for (n = 0; n < SEC_0.length; n++) SEC.push({angle: SEC_0[n].angle});
													if (closedCurve) for (n = 0; n < SEC_0.length; n++) SEC.push({angle: SEC_0[n].angle - 2 * Math.PI});
													if (closedCurve) for (n = 0; n < SEC_0.length; n++) SEC.push({angle: SEC_0[n].angle + 2 * Math.PI});

													//var allbigger = false;
													//for (n = 0; n < SEC.length; n++) if (SEC[n].angle)

													SEC.push(projections(e.CP[0], CRS));
													SEC[SEC.length - 1].cursor = true;


													for (n = 0; n < SEC.length - 1; n++)
													for (var i = 0; i < SEC.length - 1; i++)
														if (SEC[i].angle > SEC[i+1].angle){
															var TEMP = {angle: SEC[i].angle, cursor: SEC[i].cursor};
															SEC[i] = {angle: SEC[i+1].angle, cursor: SEC[i+1].cursor};
															SEC[i+1] = {angle: TEMP.angle, cursor: TEMP.cursor};
														}

														var cursor_num;
														for (n = 0; n < SEC.length; n++) if (SEC[n].cursor)	cursor_num = n;

														console.log(SEC);

														if (closedCurve){
															//if (cursor_num < SEC.length - 1) angle_1 = SEC[cursor_num + 1].angle;
															//if (cursor_num > 0) angle_2 = SEC[cursor_num - 1].angle;
															//if (!angle_2) angle_2 = SEC[0].angle;
															angle_1 = SEC[cursor_num + 1].angle;
															angle_2 = SEC[cursor_num - 1].angle;

															add_Curve(e.CP[0], e.R, angle_1, angle_2 + 2 * Math.PI);
															console.log(angle_1, angle_2 + 2 * Math.PI)
														}
														if (!closedCurve){
															if (cursor_num > 0) {angle_1 = SEC[cursor_num - 1].angle} else {angle_1 = e.startAngle}
															if (cursor_num < SEC.length - 1) {angle_2 = SEC[cursor_num + 1].angle} else {angle_2 = e.endAngle}
															if (angle_1 != e.startAngle) add_Curve(e.CP[0], e.R, e.startAngle, angle_1);
															if (angle_2 != e.endAngle)   add_Curve(e.CP[0], e.R, angle_2, e.endAngle);
																console.log("angle_1: " + angle_1);
																console.log("angle_2: " + angle_2);
														}

																		//*************************************************************************
																		function add_Curve(C, R, start, end){
																			
																			//if (start >= 2 * Math.PI) start -= 2 * Math.PI;
																			//if (end >= 2 * Math.PI) end -= 2 * Math.PI;

																			var P0 = {X: C.X, Y: C.Y}
																			var P1 = {X: C.X + R, Y: C.Y}
																			var P2 = {X: C.X + R * Math.cos(start), Y: C.Y + R * Math.sin(start)}
																			var P3 = {X: C.X + R * Math.cos(end), Y: C.Y + R * Math.sin(end)}

																			var newE = add_Element("circle", [P0, P1, P2, P3]);
																			newE.R = e.R;
																			newE.startAngle = start;
																			newE.endAngle = end;
																			recalculateCurve(newE);
																		}

													e.enable = false;

													//console.log(SEC);
									}




									//******************************************** Spline ***********************************************
									if (E[current_Element].enable)
									if (E[current_Element].type == "spline"){

												var e = E[current_Element];

														var SEC = [];

														for (n = 0; n < INTERSECT.length; n++) SEC.push({kind: "cross", X: INTERSECT[n].X, Y: INTERSECT[n].Y, L: INTERSECT[n].L})
														SEC.push({kind: "cursor", X: CRS.X, Y: CRS.Y, L: CRS.L})

														for (n = 0; n < SEC.length; n++)
														for (var i = 0; i < SEC.length - 1; i++)
															if (SEC[i].L > SEC[i+1].L){
																var TEMP = {kind: SEC[i].kind, X: SEC[i].X, Y: SEC[i].Y, L: SEC[i].L}
																SEC[i] = {kind: SEC[i+1].kind, X: SEC[i+1].X, Y: SEC[i+1].Y, L: SEC[i+1].L}
																SEC[i+1] = {kind: TEMP.kind, X: TEMP.X, Y: TEMP.Y, L: TEMP.L}
															}

																	var CR1 = {};
																	var CR2 = {};
														for (n = 0; n < SEC.length; n++) if (SEC[n].kind == "cursor"){
															if (n > 0) CR1 = {kind: SEC[n-1].kind, X: SEC[n-1].X, Y: SEC[n-1].Y, L: SEC[n-1].L}
															if (n < SEC.length - 1) CR2 = {kind: SEC[n+1].kind, X: SEC[n+1].X, Y: SEC[n+1].Y, L: SEC[n+1].L}
														}

																//console.log(SEC);

																	if (CR1.X){
																		
																		var NP = [{X: 0, Y: 0}];

																			var P1 = {X: e.CP[1].X, Y: e.CP[1].Y}
																			var P2 = {X: e.CP[2].X, Y: e.CP[2].Y}
																			var P3 = {X: e.CP[3].X, Y: e.CP[3].Y}
																			var P4 = {X: e.CP[4].X, Y: e.CP[4].Y}
																			
																			//CR1 = spline1000(over.Line * 20, E[over.Element].CP[1], E[over.Element].CP[2], E[over.Element].CP[3], E[over.Element].CP[4]);
																		
																			var DX_P1P2 = P2.X - P1.X;
																			var DY_P1P2 = P2.Y - P1.Y;
																			
																			var DX_P2P3 = P3.X - P2.X;
																			var DY_P2P3 = P3.Y - P2.Y;

																			var DX_P3P4 = P4.X - P3.X;
																			var DY_P3P4 = P4.Y - P3.Y;
																			
																			var t = CR1.L / 50;
																			
																			var P5 = {X: P1.X + DX_P1P2 * t, Y: P1.Y + DY_P1P2 * t}
																			var P6 = {X: P2.X + DX_P2P3 * t, Y: P2.Y + DY_P2P3 * t}
																			var P7 = {X: P3.X + DX_P3P4 * t, Y: P3.Y + DY_P3P4 * t}
																			
																			var DX_P5P6 = P6.X - P5.X;
																			var DY_P5P6 = P6.Y - P5.Y;
																			
																			var DX_P6P7 = P7.X - P6.X;
																			var DY_P6P7 = P7.Y - P6.Y;
																			
																			var P8 = {X: P5.X + DX_P5P6 * t, Y: P5.Y + DY_P5P6 * t}
																			var P9 = {X: P6.X + DX_P6P7 * t, Y: P6.Y + DY_P6P7 * t}
																			
																			var DX_P8P9 = P9.X - P8.X;
																			var DY_P8P9 = P9.Y - P8.Y;
																			

																			var P10 = {X: P8.X + DX_P8P9 * t, Y: P8.Y + DY_P8P9 * t}
																			
																			NP.push({X: P1.X, Y: P1.Y}, {X: P5.X,  Y: P5.Y});
																			NP.push({X: P8.X, Y: P8.Y}, {X: CR1.X, Y: CR1.Y});
																			
																			console.log("SLEN: " + splineLength(NP));
																			
																			if (splineLength(E[current_Element].CP) / splineLength(NP) < 40)
																			recalculateCurve(add_Element("spline", NP, []));
																	}


																	if (CR2.X){
																		var NP = [{X: 0, Y: 0}];

																			var P1 = {X: e.CP[1].X, Y: e.CP[1].Y}
																			var P2 = {X: e.CP[2].X, Y: e.CP[2].Y}
																			var P3 = {X: e.CP[3].X, Y: e.CP[3].Y}
																			var P4 = {X: e.CP[4].X, Y: e.CP[4].Y}

																			var DX_P1P2 = P2.X - P1.X;
																			var DY_P1P2 = P2.Y - P1.Y;

																			var DX_P2P3 = P3.X - P2.X;
																			var DY_P2P3 = P3.Y - P2.Y;

																			var DX_P3P4 = P4.X - P3.X;
																			var DY_P3P4 = P4.Y - P3.Y;
																			
																			var t = CR2.L / 50;
																			
																			var P5 = {X: P1.X + DX_P1P2 * t, Y: P1.Y + DY_P1P2 * t}
																			var P6 = {X: P2.X + DX_P2P3 * t, Y: P2.Y + DY_P2P3 * t}
																			var P7 = {X: P3.X + DX_P3P4 * t, Y: P3.Y + DY_P3P4 * t}

																			var DX_P5P6 = P6.X - P5.X;
																			var DY_P5P6 = P6.Y - P5.Y;

																			var DX_P6P7 = P7.X - P6.X;
																			var DY_P6P7 = P7.Y - P6.Y;

																			var P8 = {X: P5.X + DX_P5P6 * t, Y: P5.Y + DY_P5P6 * t}
																			var P9 = {X: P6.X + DX_P6P7 * t, Y: P6.Y + DY_P6P7 * t}

																			var DX_P8P9 = P9.X - P8.X;
																			var DY_P8P9 = P9.Y - P8.Y;


																			var P10 = {X: P8.X + DX_P8P9 * t, Y: P8.Y + DY_P8P9 * t}

																			NP.push({X: CR2.X, Y: CR2.Y}, {X: P9.X,  Y: P9.Y});
																			NP.push({X: P7.X, Y: P7.Y}, {X: P4.X, Y: P4.Y});

																			if (splineLength(E[current_Element].CP) / splineLength(NP) < 40)
																			recalculateCurve(add_Element("spline", NP, []));
																	}

																			E[current_Element].enable = false;
									}
									
										setTimeout(function(){INTERSECT = []}, 500);
								}
							}


							//********************************************************************************************************************************
							fixed = {x: over.x, y: over.y, X: over.X, Y: over.Y, Element: over.Element, Line: over.Line, Point: over.Point, Ox: O.x, Oy: O.y, B: over.B}
							clicked = {x: over.x, y: over.y, X: over.X, Y: over.Y, Element: over.Element, Line: over.Line, Point: over.Point, Ox: O.x, Oy: O.y, B: over.B, xr: real.x, yr: real.y, XR: real.X, YR: real.Y}


							//*****************************
							refresh_All();
							redraw();
			});









			//################################################ Mouse up ##################################################
			canvas.addEventListener('mouseup', function(e){
					button[e.which] = false;

					//****************** change edit type ******************************************
					if (same_clicked)
					if (!fixed.B)
					if (!over.dx && !over.dy){
						if (edit_type == "Resize") {edit_type = "Rotate"} else {edit_type = "Resize"}
					}


					//******************** select **************************************************
					if (edit_mode == "Select")
					if (!fixed.Element) 
					if (!over.Element)
					if (!fixed.B){
						skipSelected();
						if (distance2Point({X: fixed.x, Y: fixed.y}, {X: over.x, Y: over.y}) > 10) select_Elements_inRect(fixed, over);
							//if (selected.length > 0) for (n = 0; n < selected.length; n++) E[selected[n]].selected = true;
					}


					//********************* skip after building lines ********************************************
					if (edit_mode == "Line" || edit_mode == "Rectangle" || edit_mode == "Circle" || edit_mode == "Spline") if (edit_step == 2) {
						edit_mode = "Select";
						edit_step = 0;
						
						for (var i = 1; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
						MAB[0].background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");
					};


					//********************* skip after building freehand line ************************************
					if (edit_mode == "Freehand"){
						edit_step = 0;

								var current = E.length-1;
								E[current].enable = false;
								var group = {enable: true, E: []};
								
							for (var n = 0; n < Math.floor(E[current].CP.length / 3); n++) if (n*3 + 4 < E[current].CP.length){
									var P1 = {X: E[current].CP[n*3+1].X, Y: E[current].CP[n*3+1].Y};
									var P2 = {X: E[current].CP[n*3+2].X, Y: E[current].CP[n*3+2].Y};
									var P3 = {X: E[current].CP[n*3+3].X, Y: E[current].CP[n*3+3].Y};
									var P4 = {X: E[current].CP[n*3+4].X, Y: E[current].CP[n*3+4].Y};
								var newE = add_Element('spline', [{X: 0, Y: 0}, P1, P2, P3, P4]);
								recalculateCurve(newE);
								newE.selected = true;
								group.E.push(E.length-1);
							}
								
							G.push(group);	
							setBound();	

						//for (var i = 1; i < MAB.length; i++) MAB[i].background("rgba(0, 0, 0, 0)").border("1px solid rgba(0, 0, 0, 0)");
						//MAB[0].background("rgba(255, 255, 255, 1.0)").border("1px solid rgba(0, 0, 0, 0.35)");	
					}


						//refreshSelectedCircles();
						if (edit_type != "Rotate") setBound();
						fixed = {};
						real = {};
						CROSS = [];
						redraw();
			});



			//################################################ Scroll Wheel ##############################################
			addScrollWheel(function(delta){

					scale *= (1 + delta / 10);
				
					O.x = over.x - over.X * scale;
					O.y = over.y - over.Y * scale;

							clicked.xr = clicked.XR * scale + O.x;
							clicked.yr = clicked.YR * scale + O.y;
					
					setBound();
					
					//******************************
					refresh_All();
					redraw();
			});



			//########################################## Mouse double click ###########################################			
			canvas.addEventListener('dblclick', function(e){
					console.log(edit_mode);
				if (edit_mode == 'Select'){
					canvas.style.cursor = "-webkit-grab";
					edit_mode = 'move_scene';
					return
				}
				if (edit_mode == 'move_scene'){
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
						
				redraw();
			});



			//################################################ Key up ######################################################
			window.addEventListener('keyup', function(e){
				button[e.keyCode] = false;
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
													if (n == over.Element)		setStyle(null, 'rgba(255, 100, 25, 0.7)', 2, []);
													if (E[n].selected)			setStyle(null, 'rgba(255, 100, 25, 1.0)', 2, []);


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
												if (edit_mode == "Select" || edit_mode == "Line Edit") if (fixed.x) if (!fixed.Element && !fixed.B){
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
										if (edit_mode == "Corner") context.drawImage(MAB[7].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										if (edit_mode == "Text") context.drawImage(MAB[8].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										if (edit_mode == "Line Edit") context.drawImage(MAB[9].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										if (edit_mode == "Ruler") context.drawImage(MAB[10].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
										if (edit_mode == "Snap to Lines") context.drawImage(MAB[11].pic, over.x + 5, canvas.height - over.y + 17, 24, 24);
								}



								//******************************** draw information ***************************************************	
								function drawInfo(){

											context.textAlign = "left";
											context.fillStyle = 'rgb(40, 40, 40)';
											context.font = '300 11px Arial';
												
											//context.fillText('O.x: ' + O.x, 70, 250);
											//context.fillText('O.y: ' + O.y, 70, 270);
											
											//context.fillText('yy: ' + over.yy, 120, 480);
											context.fillText('edit_mode: ' + edit_mode, 100, 80);
											context.fillText('edit_step: ' + edit_step, 100, 100);											
																
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
											context.fillText('current_group: ' + current_group, 100, 565);
								}
			
			}


			//*******************************************************************************************
			function add_Element(type, ControlPoints, Points){
					var e = {};

					e.type = type;
					e.CP = [];
					e.P = [];
					e.enable = true;

					if (ControlPoints) for (var n = 0; n < ControlPoints.length; n++) e.CP.push(ControlPoints[n]);
					if (Points) for (var n = 0; n < Points.length; n++) e.P.push(Points[n]);
					
					E.push(e);
					return e;
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
									var CR = nearLine(E[n].P[i], E[n].P[i+1], result, DSS);
									if (CR){
										result.Line = i;
										result.Element = n;
										result.CR = {X: CR.X, Y: CR.Y}
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
			function setBound(){
						B = [];
						selected = [];
					for (var n = 0; n < E.length; n ++) if (E[n].enable) if (E[n].selected) selected.push(n);
					if (selected.length == 0) return

						var POSARR = [];
					for (var n = 0; n < selected.length; n++)
						for (var i = 0; i < E[selected[n]].P.length; i++) if (E[selected[n]].P[i]){
							POSARR.push(E[selected[n]].P[i]);
							//if (E[selected[n]].kind == )
						}

				//console.log(POSARR);

					var extremums = getExtremums(POSARR);

					if (!extremums) return
					try{
						extremums.min.x = O.x + extremums.min.X * scale - 12;
						extremums.max.y = canvas.height - (O.y + extremums.min.Y * scale) + 12;
						extremums.max.x = O.x + extremums.max.X * scale + 12;
						extremums.min.y = canvas.height - (O.y + extremums.max.Y * scale) - 12;

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


			//************************************ refreshSelectedCircles ******************************************
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
				if (e.type == "polyline"){
					var extremums = getExtremums(e.CP);

						e.CP[0].X = (extremums.min.X + extremums.max.X) / 2;
						e.CP[0].Y = (extremums.min.Y + extremums.max.Y) / 2;
					
						if (!e.O) e.O = { }
						if (!e.O.unique) e.O = {X: extremums.min.X + (extremums.max.X - extremums.min.X) / 2, Y: extremums.min.Y + (extremums.max.Y - extremums.min.Y) / 2 }

						for (var i = 1; i < e.CP.length; i++) e.P[i-1] = {X: e.CP[i].X, Y: e.CP[i].Y}
					return
				}


				//*********************** Circle ********************************
				if (e.type == "circle"){
					if (!e.O) e.O = { }
					if (!e.O.unique) e.O = e.CP[0];

					e.R = projections(e.CP[0], e.CP[1]).R;
					e.startAngle = projections(e.CP[0], e.CP[2]).angle;
					e.endAngle = projections(e.CP[0], e.CP[3]).angle;
					
						var start = e.startAngle;
						var end = e.endAngle; if (start >= end) end += 2 * Math.PI;
						
						if (end > 2 * Math.PI) if (end - start > 2 * Math.PI) end -= 2 * Math.PI;
						//if (end - start >= 2 * Math.PI) end -= 2 * Math.PI; 
						
						e.startAngle = start; //if (e.startAngle > 2 * Math.PI) e.startAngle -= 2 * Math.PI;
						e.endAngle = end; //if (e.endAngle > 2 * Math.PI) e.endAngle -= 2 * Math.PI; if (e.endAngle > 2 * Math.PI) e.endAngle -= 2 * Math.PI;
						
							//console.log("startAngle: " + e.startAngle * 180 / Math.PI, "endAngle: " + e.endAngle * 180 / Math.PI);
							//console.log("start: " + start, "end: " + end);

						e.P = [];
					for (var a = start; a < end; a += Math.PI / 100)	e.P.push({X: e.CP[0].X + e.R * Math.cos(a), Y: e.CP[0].Y + e.R * Math.sin(a)});
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


			//************************************ nearLine *******************************************
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


			//************************************ distance2Point *******************************************
			function distance2Point(P1, P2){
					var DX = P2.X - P1.X;
					var DY = P2.Y - P1.Y;
					return Math.sqrt(DX * DX + DY * DY);
			}


			//************************************ distance2P *******************************************
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
				var dx = P2.X - P1.X; if (dx == 0) dx = 0.00000001;
				var dy = P2.Y - P1.Y; if (dy == 0) dy = 0.00000001;
				var alpha = Math.atan(dy / dx);

				var s = dx * Math.sin(alpha);

				var dpx = C.X - P2.X;
				var dpy = C.Y - P1.Y;
				var h = dy * (dx + dpx) / dx - dpy;
				var S = s * h / dy;

				if (S > R) return

				var w = h * dx / dy;
				var gamma = Math.asin(w * Math.sin(alpha) / R);
				var beta = Math.PI - alpha - gamma;

				var Y1 = C.Y + R * Math.sin(beta);
				var X1 = C.X - R * Math.cos(beta);
				
					//console.log("X1: " + X1, "Y1: " + Y1);
					//console.log("R: " + R, "beta: " + beta);

					var result = {}
					var E = getExtremums([P1, P2]);
					var ds = 0.001;

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
					
					//console.log("Angle1: ", P1.angle  * 180 / Math.PI);
					//console.log("Angle2: ", P2.angle  * 180 / Math.PI);

						//***********************************************
						function getAngle(P, C, start, end){
							var DX = P.X - C.X;
							var DY = P.Y - C.Y;
							var R = Math.sqrt(DX * DX + DY * DY);
							var angle = Math.acos(DX / R);
							if (DY < 0) angle = 2 * Math.PI - angle;
							if (angle >= start && angle <= end)	return angle;
						};
						
					//console.log({P1: P1, P2: P2});	

					//INTERSECT = [];
					//INTERSECT.push(C1);
					//INTERSECT.push(C2);
					//if (P1.angle) INTERSECT.push(P1);
					//if (P2.angle) INTERSECT.push(P2);
					
					return {P1: P1, P2: P2}
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


			//*************************************** lineLength ***********************************************
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
				if (angle == 0) angle = 0.00000000000001;
				if (DY < 0) angle = 2 * Math.PI - angle;
				
				return {DX: DX, DY: DY, R: R, angle: angle}
			}



			//***************************************** strike *************************************************
			function Strike(e){

						//INTERSECT = [];

					for (var n = 1; n < E.length; n++) if (E[n].forStrike){

								var e2 = E[n];
								var LEN = 0;

							//*************************** polyline ********************************************************
							if (e.type == "polyline"){

										//******************************* polyline & spline *******************************
										if (e2.type == "polyline" || e2.type == "spline"){
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
															if (cross.P1){
																cross.P1.len = LEN + distance2Point(e.P[i], cross.P1);
																cross.P1.L = i;
																INTERSECT.push(cross.P1);
															}
															if (cross.P2){
																cross.P2.len = LEN + distance2Point(e.P[i], cross.P2);
																cross.P2.L = i;
																INTERSECT.push(cross.P2);
															}
														}
												}
										}
							}


							//***************************** circle **********************************************************
							if (e.type == "circle"){
										//******************************* polyline & spline *******************************
										if (e2.type == "polyline" || e2.type == "spline"){

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

										//******************************* polyline & spline *******************************
										if (e2.type == "polyline" || e2.type == "spline"){
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
															if (cross.P1){
																cross.P1.len = LEN + distance2Point(e.P[i], cross.P1);
																cross.P1.L = i;
																INTERSECT.push(cross.P1);
															}
															if (cross.P2){
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
									if (e.type == "polyline"){
											
											INTERSECT = sortByLength(INTERSECT);
											cutToLines();
											//console.log(INTERSECT);
									}

									//**********************************************
									if (e.type == "spline"){
											//INTERSECT.push({X: e.CP[1].X, Y: e.CP[1].Y, len: 0, L: 0});
											//INTERSECT.push({X: e.CP[4].X, Y: e.CP[4].Y, len: 99999999999999, L: 100});
											INTERSECT = sortByLength(INTERSECT);
											cutToSplines();
											//console.log(INTERSECT);
									}

									//**********************************************
									if (e.type == "circle"){
											//console.log(INTERSECT);	
											INTERSECT = sortByAngle(INTERSECT);
											cutToArcs();
											//console.log(INTERSECT);
									}


																//******************************** cutToLines **********************************************	
																function cutToLines(){

																	if (INTERSECT.length > 0){

																		for (i = 0; i < INTERSECT.length-1; i++){
																			var P = [{X: 0, Y: 0}];
																			P.push({X: INTERSECT[i].X, Y: INTERSECT[i].Y});
																			if (INTERSECT[i].L < INTERSECT[i+1].L) for (var j = INTERSECT[i].L + 1; j <= INTERSECT[i+1].L; j++)
																				P.push({X: e.P[j].X, Y: e.P[j].Y});
																			P.push({X: INTERSECT[i+1].X, Y: INTERSECT[i+1].Y});
																			add_Line(P);
																			//console.log(P);
																		}

																		if (e.P[e.P.length-1].X == e.P[0].X && e.P[e.P.length-1].Y == e.P[0].Y){
																			var P = [{X: 0, Y: 0}];
																			P.push({X: INTERSECT[INTERSECT.length-1].X, Y: INTERSECT[INTERSECT.length-1].Y});
																			for (var j = INTERSECT[INTERSECT.length-1].L + 1; j < e.P.length; j++) P.push({X: e.P[j].X, Y: e.P[j].Y});
																				for (var j = 0; j <= INTERSECT[0].L; j++) P.push({X: e.P[j].X, Y: e.P[j].Y});
																			P.push({X: INTERSECT[0].X, Y: INTERSECT[0].Y});
																			add_Line(P);
																		} else{
																			
																			var P = [{X: 0, Y: 0}];
																			P.push({X: INTERSECT[INTERSECT.length-1].X, Y: INTERSECT[INTERSECT.length-1].Y});
																			for (var j = INTERSECT[INTERSECT.length-1].L + 1; j < e.P.length; j++) P.push({X: e.P[j].X, Y: e.P[j].Y});
																			add_Line(P);
																			
																			var P = [{X: 0, Y: 0}];
																			for (var j = 0; j <= INTERSECT[0].L; j++) P.push({X: e.P[j].X, Y: e.P[j].Y});
																			P.push({X: INTERSECT[0].X, Y: INTERSECT[0].Y});
																			add_Line(P);	
																		}
																			e.enable = false;
																	}


																					//**********************************************************************
																					function add_Line(P){
																						var newE = add_Element("polyline", P, P);
																						recalculateCurve(newE);
																						newE.selected = true;
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
																			add_Curve(e.CP[0], e.R, INTERSECT[i].angle, INTERSECT[i+1].angle);
																		
																		if (e.startAngle + 2 * Math.PI == e.endAngle){
																			add_Curve(e.CP[0], e.R, INTERSECT[INTERSECT.length-1].angle, INTERSECT[0].angle + 2 * Math.PI);
																		} else {
																			add_Curve(e.CP[0], e.R, INTERSECT[INTERSECT.length-1].angle, e.endAngle);
																			add_Curve(e.CP[0], e.R, e.startAngle, INTERSECT[0].angle);
																		}

																			e.enable = false;
																	}

																					//*************************************************************************
																					function add_Curve(C, R, start, end){

																						//if (start >= 2 * Math.PI) start -= 2 * Math.PI;
																						//if (end >= 2 * Math.PI) end -= 2 * Math.PI;

																						var P0 = {X: C.X, Y: C.Y}
																						var P1 = {X: C.X + R, Y: C.Y}
																						var P2 = {X: C.X + R * Math.cos(start), Y: C.Y + R * Math.sin(start)}
																						var P3 = {X: C.X + R * Math.cos(end), Y: C.Y + R * Math.sin(end)}

																						var newE = add_Element("circle", [P0, P1, P2, P3]);
																						newE.R = e.R;
																						newE.startAngle = start;
																						newE.endAngle = end;
																						
																						recalculateCurve(newE);
																						newE.selected = true;
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

			
			
			return board;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	