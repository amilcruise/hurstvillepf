import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class TopAppMenu extends React.Component {
    render () {
        return (
            <div>
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                iconStyle={{color: 'rgb(255,255,255)', marginTop: 8}}
            >
                <MenuItem primaryText="Sign out" onClick={this.props.signOut} />
            </IconMenu>
          </div>
        )
    }
}

export default TopAppMenu;