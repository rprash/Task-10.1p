import React from 'react';
import { Menu } from 'semantic-ui-react';
import '../App.css';

const Heading = ({ heading }) => {
    return (<Menu secondary>
        <Menu.Item
            name='new'
            active={true}
        >
            {heading}
        </Menu.Item>
    </Menu>)
}

export default Heading;