import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";
import { connect } from "react-redux";


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
class Machining extends React.PureComponent {

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

Machining.defaultProps = {
  headerHeight: 38,
  rowHeight: 32
};

const WrappedMachining = withStyles(styles)(Machining);

class MachiningGrid extends React.PureComponent {
  constructor(props){
    super(props)
   
  }

  render(){
   
    const data = [
      ["",''],
      ["", "" ],
      ["", ""],
      ["", ""], 
      ["", ""]  

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
    <Paper style={{ height: 200, width: "100%" }}>
      <WrappedMachining
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        // onRowClick={event => console.log(event, "event")}
        columns={[
          {
            width: 300,
            flexGrow: 1.0,
            label: "Price",
            dataKey: "price"
          },
          {
            width: 300,
            textAlign: "left",
            label: "Each",
            dataKey: "each"
            // numeric: true,
          },          
          {
            width: 300,
            textAlign: "left",
            label: "Est.Bus.Days*",
            dataKey: "days"
            // numeric: true,
          },        
          {
            width: 300,
            textAlign: "left",
            label: "Alternative",
            dataKey: "alternative"
            // numeric: true,
          }
       
        ]}
      />
    </Paper>
  );
}
}
// const mapStateToProps = state => {
//   return {
//     material: state.materialReducer.material
//   };
// };

// // const mapDispatchToProps = dispatch => {
// //   return {
// //     updateMaterial: material => {
// //       dispatch({ type: "UPDATE_MATERIAL", payload: material });
// //     }
// //   };
// // };
// export default connect(mapStateToProps)(ReactVirtualizedTable);
// export default ReactVirtualizedTable;
export default MachiningGrid;
