import React from 'react'
import PropTypes from 'prop-types';

class SingleGridCell extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      selected_id: '',
      window_width: window.innerWidth
    }
  }

  cellClick (event) {
    this.props.handleCellClick(event)
  }

  render () {
    var SingleGridCellStyle = {
      background: 'url(' + this.props.SingleGridCellData['url'] + ') no-repeat center center',
      backgroundSize: this.props.cellSize,
      width: this.props.cellSize,
      height: this.props.cellSize,
      display: 'inline-block',
      margin: this.props.cellMargin,
      marginBottom: 25,
      position: 'relative',
      backgroundColor: this.props.detailBackgroundColor
    }

    return (
      <li className='SingleGridCell' style={SingleGridCellStyle} id={this.props.id} onClick={this.cellClick.bind(this)} />
    )
  }
 }

class ExpandableGrid extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      selected_id: '',
      gridData: JSON.parse(JSON.stringify(this.props.gridData))
    }
  }

  handleResize () {
    if (this.state.expanded) {
    //   var target = document.getElementById(this.state.selected_id)
    //   this.renderExpandedDetail(target)
    }
    //this.makeItMobileFriendly()
  }

  componentWillMount () {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentWillUnmount () { }

  renderExpandedDetail (target) {
    var thisId = target.id
    var thisIdNumber = parseInt(thisId)
    var detail = document.getElementById('expandedDetail')
    var ol = target.parentNode
    var lengthOfList = parseInt(ol.childNodes.length)
    var startingIndex = thisIdNumber + 1

    var insertedFlag = false

    ol.insertBefore(detail, ol.childNodes[lengthOfList])

    for (var i = startingIndex; i < lengthOfList; i++) {
      if (ol.childNodes[i].className === 'SingleGridCell') {
        if (ol.childNodes[i].offsetTop !== ol.childNodes[thisIdNumber].offsetTop) {
          ol.childNodes[i].insertAdjacentElement('beforebegin', detail)
          insertedFlag = true
          break
        }
      }
    }

    if (insertedFlag === false) {
      ol.childNodes[lengthOfList - 1].insertAdjacentElement('afterend', detail)
    }

    var cell = document.getElementById(thisId)
    var arrow = document.getElementById('selected_arrow')
    cell.append(arrow)
    arrow.style.display = 'block'
  }

  closeExpandedDetail () {
    this.setState({
      expanded: false,
      selected_id: ''
    }, function afterStateChange () {
      var detail = document.getElementById('expandedDetail')
      detail.style.display = 'none'
      var arrow = document.getElementById('selected_arrow')
      arrow.style.display = 'none'
    })
  }

  handleCellClick (event) {
    var target = event.target
    var thisIdNumber = parseInt(event.target.id)

    if (this.state.expanded) { // expanded == true
      if (this.state.selected_id === thisIdNumber) { // Clicking on already opened detail
        this.closeExpandedDetail()
        this.renderExpandedDetail(target)
      } else { // Clicking on a different thumbnail, when detail is already expanded
        this.setState({
          expanded: true,
          selected_id: thisIdNumber
        }, function afterStateChange () {
          var detail = document.getElementById('expandedDetail')
          

          this.renderExpandedDetail(target)

          detail.style.display = 'block'
        })
      }
    } else { // expanded == false
      this.setState({
        expanded: true,
        selected_id: event.target.id
      }, function afterStateChange () {
        var detail = document.getElementById('expandedDetail')
        

        this.renderExpandedDetail(target)

        detail.style.display = 'block'
      })
    }
  }

  generateGrid () {
    var grid = []
    var idCounter = -1 // To help simplify mapping to object array indices. For example, <li> with 0th id corresponds to 0th child of <ol>
    var gridData = this.state.gridData

    for (var i in gridData) {
      idCounter = idCounter + 1
      var thisUniqueKey = idCounter;
      grid.push(<SingleGridCell handleCellClick={this.handleCellClick.bind(this)} key={thisUniqueKey} id={thisUniqueKey} cellMargin={this.props.cellMargin} SingleGridCellData={gridData[i]} cellSize={this.props.cellSize} />)
    }

    var cssforExpandedDetail = {
      backgroundColor: this.props.detailBackgroundColor,
      display: 'none',
      position: 'relative',
      padding: '20px',
      transition: 'display 2s ease-in-out 0.5s',
    }

    var cssforExpandedDetailImage = {
      display: 'inline-block',
      maxWidth: "100%",
      width: '100%',
      height: 'auto',
      align: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto'
    }

    var cssforExpandedDetailTitle = {
      backgroundColor: "#566df4",
      width: '100%',
      height: 'auto',
      marginBottom: '15px'
    }

    var cssforExpandedDetailDescription = {
      backgroundColor: this.props.ExpandedDetail_description_bgColor,
      color: this.props.ExpandedDetail_font_color,
      width: 'auto%',
      height: '80%',
      marginRight: '30px',
      marginLeft: '30px',
      textAlign: 'justify'
    }

    var cssforExpandedDetailLeft
    var cssforExpandedDetailRight

    cssforExpandedDetailLeft = {
      width: this.props.ExpandedDetail_left_width,
      height: '100%',
      float: 'left',
      position: 'relative'
    }

    cssforExpandedDetailRight = {
      width: this.props.ExpandedDetail_right_width,
      height: '100%',
      float: 'right',
      position: 'relative'
    }

    var cssForDescriptionLink = {
      textDecoration: 'none',
      position: 'relative',
      float: 'bottom',
      bottom: 20,
      cursor: 'pointer'
    }

    var cssForImageLink = {
      cursor: 'pointer'
    }

    var cssforExpandedDetailClose = {
      textDecoration: 'none',
      position: 'relative',
      float: 'right',
      top: 10,
      right: 10,
      cursor: 'pointer'
    }

    // Make Mobile Friendly
    if (window.innerWidth < this.props.show_mobile_style_from_width) {
      cssforExpandedDetailLeft = {
        width: '0%',
        height: '100%',
        float: 'left',
        position: 'relative',
        display: 'none'
      }

      cssforExpandedDetailRight = {
        width: '100%',
        height: '100%',
        float: 'right',
        position: 'relative'
      }
    }

    var closeX
    if (this.props.ExpandedDetail_closeX_bool) {
      closeX = 'X'
    } else {
      closeX = ''
    }
    const RendererComponent = this.props.RenderImageContent;
    grid.push(
      <li style={cssforExpandedDetail} key='expandedDetail' id='expandedDetail'>
        <RendererComponent imageId={this.state.selected_id}>
            <div id='ExpandedDetail_close' key='ExpandedDetail_close' style={cssforExpandedDetailClose} onClick={this.closeExpandedDetail.bind(this)}></div>
        </RendererComponent>
      </li>
     )

    return grid
  }

  render () {
    var rows = this.generateGrid()

    var cssForGridDetailExpansion = {
      width: '100%',
      position: 'relative'
    }

    var cssForGridList = {
      listStyle: 'none',
      padding: 0,
      display: 'inline-block'
    }

    var cssForTheGridHolder = {
      width: '100%',
      backgroundColor: this.props.bgColor,
      margin: 0,
      textAlign: 'center'
    }

    var cssForSelectedArrow = {
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderBottom: '20px solid' + this.props.detailBackgroundColor,
      marginTop: this.props.cellSize + 10,
      marginLeft: this.props.cellSize / 2 - 20,
      display: 'none'
    }

    return (
      <div id='GridDetailExpansion' style={cssForGridDetailExpansion}>
        <div id='theGridHolder' style={cssForTheGridHolder}>
          <ol id='gridList' style={cssForGridList}>
            {rows}
          </ol>
        </div>
        <div id='selected_arrow' style={cssForSelectedArrow} />
      </div>
    )
  }
}

ExpandableGrid.propTypes = {
  gridData: PropTypes.string,
  cellSize: PropTypes.number,
  cellMargin: PropTypes.number,
  bgColor: PropTypes.string,
  detailWidth: PropTypes.string, // in %
  detailHeight: PropTypes.number,
  detailBackgroundColor: PropTypes.string,
  ExpandedDetail_right_width: PropTypes.string, // in %
  ExpandedDetail_left_width: PropTypes.string, // in %
  ExpandedDetail_description_bgColor: PropTypes.string,
  ExpandedDetail_title_bgColor: PropTypes.string,
  ExpandedDetail_img_bgColor: PropTypes.string,
  ExpandedDetail_link_text: PropTypes.string,
  ExpandedDetail_font_color: PropTypes.string,
  ExpandedDetail_closeX_bool: PropTypes.bool,
  show_mobile_style_from_width: PropTypes.number
}



ExpandableGrid.defaultProps = {
  gridData: [],
  cellSize: 250,
  cellMargin: 25,
  bgColor: '#f2f2f2',
  detailWidth: '100%',
  detailHeight: 300,
  detailBackgroundColor: '#D9D9D9',
  ExpandedDetail_right_width: '60%',
  ExpandedDetail_left_width: '40%',
  ExpandedDetail_image_size: 300,
  ExpandedDetail_description_bgColor: '#D9D9D9',
  ExpandedDetail_title_bgColor: '#D9D9D9',
  ExpandedDetail_img_bgColor: '#D9D9D9',
  ExpandedDetail_link_text: '→ Link',
  ExpandedDetail_font_color: '#434343',
  ExpandedDetail_closeX_bool: true,
  show_mobile_style_from_width: 600,
}

export default ExpandableGrid
