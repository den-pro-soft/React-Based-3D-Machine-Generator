/**
 * Class needed for grouping tips
 */
export default class Tips{

    constructor(){

        this.tips = [];
        this.tips['group'] = "Group (Ctrl +G) </br> Combine selected lines into one group to allow selection in </br> " +
            "one click. Hold the SHIFT key while selecting multiple lines, </br>" +
            "then click this button. To select a series of connected lines in</br>" +
            "one step - hold CTRL while clicking on one of the lines.";
        this.tips['ungroup'] = "Ungroup (Ctrl+U)</br>Separates a group into its component lines."
        this.tips['fitScreen'] = "Zoom to fit screen (=)</br>Set magnification to show the full design.";
        this.tips['actualSize'] = "Zoom actual size (1)</br>Show design approximately in real-life size.";
        this.tips['zoomTool'] = "Zoom</br>To modify a specific area, in workspace drag a rectangle</br> around the area.</br>" +
            "To set center of magnification and increase magnification,</br> click at desired new center of drawing.</br>" +
            "To set center of magnification and decrease magnification,</br> right click at desired new center of drawing.";
        this.tips['delete'] = "Delete (Del)</br>Remover part of your drawing. Click the selection (arrow)</br>" +
            "button, then click the line to remove, then click the button.";
        this.tips['preferences'] = "Preferences (F2)</br> Set preference options.";
        this.tips['toggle'] = "Toggle inch/metric mode</br> Show all dimensions on inches or in millimeters";
        this.tips['intersect'] = "Intersect (Ctrl+I)</br> Split lines where they cross.";
        this.tips['3D'] = "3D Preview (Ctrl+R)</br> Show 3D view of the current design.</br> Use frequently during creating of your drawing.";
        this.tips['price-analyze'] = "Price/Analyze (F9)</br> Check design validity and compute cost.</br>" +
            "You can also use this button to guide you thru the steps. For</br>example, if you click this button with a blank " +
            "screen you will</br> be advised to draw a line";
    }

    getTip(name){
        return '<span>'+this.tips[name]+'</span>';
    }
}