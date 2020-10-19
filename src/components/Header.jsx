import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import '../App.css';

const Header = () => {
    const [activeItem, setActiveItem] = useState('new');
    return (<Menu secondary>
        <Menu.Item
            name='new'
            active={activeItem === 'new'}
        // onClick={this.handleItemClick}
        >
            New Requester Task
        </Menu.Item>

        <Menu.Item
            name='worker'
            active={activeItem === 'worker'}
        // onClick={this.handleItemClick}
        >
            Worker Task
        </Menu.Item>
    </Menu>)
}

export default Header;