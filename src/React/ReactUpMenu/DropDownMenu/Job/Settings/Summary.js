import React from "react";
import "./summary.scss";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";


const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box"
  },
  tableRow: {
    cursor: "pointer"
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  tableCell: {
    flex: 1
  },
  noClick: {
    cursor: "initial"
  }
});
class Summary extends React.PureComponent {

  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction = {
      [SortDirection.ASC]: "asc",
      [SortDirection.DESC]: "desc"
    };

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel
          active={dataKey === sortBy}
          direction={direction[sortDirection]}
        >
          {label}
        </TableSortLabel>
      ) : (
        label
      );

    return (
      <TableCell
        component="div"
        className={classNames(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(
              (
                { cellContentRenderer = null, className, dataKey, ...other },
                index
              ) => {
                let renderer;
                if (cellContentRenderer != null) {
                  renderer = cellRendererProps =>
                    this.cellRenderer({
                      cellData: cellContentRenderer(cellRendererProps),
                      columnIndex: index
                    });
                } else {
                  renderer = this.cellRenderer;
                }

                return (
                  <Column
                    key={dataKey}
                    headerRenderer={headerProps =>
                      this.headerRenderer({
                        ...headerProps,
                        columnIndex: index
                      })
                    }
                    style={{ textAlign: "left" }}
                    className={classNames(classes.flexContainer, className)}
                    cellRenderer={renderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              }
            )}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

Summary.defaultProps = {
  headerHeight: 38,
  rowHeight: 32
};

const WrappedSummary = withStyles(styles)(Summary);

class ReactVirtualizedTable extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      firstName:'',
      lastName:'',
      businessName:'',
      email:'',
      order:"Standard order",
      originalOrder:'',
      adressLine1:''

    }
  }

  componentWillMount(){
    const FirstName = localStorage.getItem('firstName');
    if(FirstName===null){
    this.setState({firstName:this.state.firstName})
    } else{
      this.setState({firstName:FirstName})

    }
    const LastName = localStorage.getItem('lastName');
    if(LastName===null){
    this.setState({lastName:this.state.lastName})
    } else{
      this.setState({lastName:LastName})
    }
    const BusinessName = localStorage.getItem('businessName');
    if(BusinessName===null){
    this.setState({businessName:this.state.businessName})
    } else{
      this.setState({businessName:BusinessName})
    }

    const Email = localStorage.getItem('email');
    if(Email ===null){
    this.setState({email:this.state.email})
    } else{
      this.setState({email:Email })
    }
    const Order = localStorage.getItem('order');
    if(Order===null){
    this.setState({order:this.state.order})
    } else{
      this.setState({order:Order})
    }
    const OriginalOrder = localStorage.getItem('originalOrder');
    if(OriginalOrder===null){
    this.setState({originalOrder:this.state.originalOrder})
    } else{
      this.setState({originalOrder:OriginalOrder})
    }
    const AdressLine1 = localStorage.getItem('adressLine1');
    if(AdressLine1 === null){
    this.setState({adressLine1:this.state.adressLine1})
    } else{
      this.setState({adressLine1:AdressLine1 })
    }
  }
  render(){
    const data = [
      ["File name","Untitled"],
      ["Customer", this.state.firstName + ' '+ this.state.lastName +' ' + this.state.businessName],
      ["Customer email", this.state.email],
      ["Order type", this.state.order + ' '+this.state.originalOrder],
      ["Shipping to",this.state.adressLine1+ "U.S.A."],
      ["Quantity", 25],
      ["Material", "Acetal Black"],
      ["Thickness", `0,000${String.fromCharCode(34)}, tolerance: 20,00%`],
      ["Used machines", "Comments to Machinist"],
      ["Finishing", "None"],
      // ["Packing", "Pack parts in bulk"],
      ["Comments to machinist", "None"]
    ];
    
    let id = 0;
    
    function createData(filename, untitled) {
      id += 1;
      return { id, filename, untitled };
    }
    const rows = [];
    
    for (let i = 0; i < data.length; i += 1) {
      const renderData = data[i];
      rows.push(createData(...renderData));
    
    }
  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <WrappedSummary
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={event => console.log(event, "event")}
        columns={[
          {
            width: 300,
            flexGrow: 1.0,
            // label: "File name",
            dataKey: "filename"
          },
          {
            width: 300,
            textAlign: "left",
            // label: "Untitled",
            dataKey: "untitled"
            // numeric: true,
          }
       
        ]}
      />
    </Paper>
  );
}
}
export default ReactVirtualizedTable;
