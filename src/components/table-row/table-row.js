import React from 'react';
import Icon from './../icon';
import ImmutableHelper from './../../utils/helpers/immutable';

/**
 * A table row widget for use in an input grid. This is virtually a subcomponent of InputGrid.
 * Using it outside of InputGrid would require extending TableRow.
 *
 * @class TableRow
 * @constructor
 */
class TableRow extends React.Component {

  /**
   * Only renders component if data has changed, or if the row has
   * forceUpdate set to true or is a gutter row
   *
   * @method shouldComponentUpdate
   * @param {Object} nextProps
   */
  shouldComponentUpdate = (nextProps) => {
    if (nextProps.forceUpdate) { return true; }

    if (nextProps.gutterFields) { return true; }

    return (nextProps.data !== this.props.data);
  }

  /**
   * Builds row inlcuding buttons, classnames & optional gutterfields.
   *
   * @method buildRow
   */
  buildRow = () => {
    let row = [];

    row.push(this.buildRowActionCell());

    // Builds fields for row
    for (let key in this.props.fields) {
      let field = this.props.fields[key];
      row.push(this.buildRowField(key, field));
    }

    return row;
  }

  /**
   * Builds initial row action cell
   *
   * @method buildActionCell
   */
  buildRowActionCell = () => {
    // If row is not a placeholder or gutterfield add delete button.
    if (!this.props.placeholder && !this.props.gutterFields) {
      return this.buildRowDeleteButton();
    }
    else {
      let tdClass = "ui-table-row__td ui-table-row__td--actions";
      if (this.props.gutterFields) { tdClass += " ui-table-row__td--gutter"; }

      return (<td key={ this.props.row_id + 'actions' } className={ tdClass }></td>);
    }
  }

  /**
   * Builds a table field
   *
   * @method buildRowField
   * @param {String} key
   * @param {Object} field
   */
  buildRowField = (key, field) => {
    if (this.props.gutterFields) {
      return this.buildRowGutterField(key, field);
    } else { // Uses buildCell to build cell with appropriate values
      let name = ImmutableHelper.parseName(field.props.name, 'last');
      let value = (this.props.data) ? this.props.data.get(name) : null;
      return this.buildCell(field, value);
    }
  };

  /**
   * Builds and returns delete button cell
   *
   * @method buildRowDeleteButton
   */
  buildRowDeleteButton = () => {
    return (
      <td key={ this.props.row_id + 'actions' } className="ui-table-row__td ui-table-row__td--actions">
        <button type="button" className="ui-table-row__delete" id={ this.props.row_id } onClick={this.deleteMethod}>
          <Icon type="delete" className="ui-table-row__delete-icon" />
        </button>
      </td>
    );
  }

  /**
   * Builds and returns a gutter field cell
   *
   * @method addGutterField
   * @param {String} key
   * @param {Object} field
   */
  buildRowGutterField = (key, field) => {
    let name = ImmutableHelper.parseName(field.props.name, 'last');
    let gutterField = this.props.gutterFields[name];
    return(<td hidden={ field.props.hidden } key={ key + "gutter" } className="ui-table-row__td ui-table-row__td--gutter">{ gutterField }</td>);
  }

  /**
   * Calls delete row handler
   *
   * @method buildRpw
   * @param {Object}
   */
  deleteMethod = (ev) => {
    ev.preventDefault();
    this.props.deleteRowHandler(ev, this.props);
  }

  /**
   * Build each cell with appropriate values and attributes.
   *
   * @method buildCell
   * @param {Object} field
   * @param {String | Number | Boolean} value
   */
  buildCell = (field, value) => {
    if (!field.props.name.match("{ROWID}")) {
      throw new Error("Inputs used in a grid should supply a {ROWID} placeholder within the input's name, which will be replaced on render with a unique row id.");
    }

    let rowID = this.props.row_id,
        fieldProps = {
          label: false,
          key: rowID,
          name: field.props.name.replace("{ROWID}", rowID),
          row_id: rowID,
          namespace: this.props.name,
          onChange: this.props.updateRowHandler
        };

    if (typeof value !== 'undefined') {
      fieldProps.value = value;
    }

    if (this.props.placeholder) { fieldProps._placeholder = true; }

    let fieldHTML = React.cloneElement(field, fieldProps);

    return <td hidden={ field.props.hidden } key={ rowID + field.props.name } className="ui-table-row__td">{ fieldHTML }</td>;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let mainClasses = "ui-table-row";

    if (this.props.gutterFields) { mainClasses += " ui-table-row--gutter"; }

    return (
      <tr className={ mainClasses }>
        { this.buildRow() }
      </tr>
    );
  }
}

export default TableRow;
